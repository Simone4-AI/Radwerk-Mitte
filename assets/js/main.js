(function () {
  "use strict";

  var navToggle = document.querySelector(".nav-toggle");
  var mainNav = document.getElementById("main-nav");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  function formatCurrency(value) {
    return value.toLocaleString("de-DE", {
      style: "currency",
      currency: "EUR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  // Modellrechnung: Faktor je Laufzeit bildet Versicherung/Service/Finanzierung ab.
  // Platzhalter, bis Radwerk die realen Konditionen der Leasinggesellschaft liefert.
  var LAUFZEIT_FAKTOR = {
    "36": 1.18,
    "48": 1.14,
    "60": 1.11
  };

  var calcForm = document.getElementById("leasing-calc");
  if (calcForm) {
    var priceInput = document.getElementById("calc-price");
    var countInput = document.getElementById("calc-count");
    var durationSelect = document.getElementById("calc-duration");
    var resultEl = document.getElementById("calc-result-value");
    var resultSummary = document.getElementById("calc-result-summary");
    var resultTotal = document.getElementById("calc-result-total");
    var toInquiryBtn = document.getElementById("calc-to-inquiry");

    function currentCalculation() {
      var price = parseFloat(priceInput.value) || 0;
      var count = parseInt(countInput.value, 10) || 0;
      var duration = durationSelect.value;
      var faktor = LAUFZEIT_FAKTOR[duration] || 1.15;
      var months = parseInt(duration, 10);
      var ratePerBike = months > 0 ? (price * faktor) / months : 0;
      var rateTotal = ratePerBike * count;
      return { price: price, count: count, duration: months, ratePerBike: ratePerBike, rateTotal: rateTotal };
    }

    function updateResult() {
      var calc = currentCalculation();
      resultEl.textContent = formatCurrency(calc.ratePerBike);
      resultSummary.textContent =
        "pro Rad, Laufzeit " + calc.duration + " Monate, Radpreis " + formatCurrency(calc.price);
      if (resultTotal) {
        resultTotal.textContent =
          "Gesamt für " +
          calc.count +
          (calc.count === 1 ? " Rad" : " Räder") +
          ": " +
          formatCurrency(calc.rateTotal) +
          " pro Monat";
      }
    }

    calcForm.addEventListener("input", updateResult);
    updateResult();

    if (toInquiryBtn) {
      toInquiryBtn.addEventListener("click", function () {
        var calc = currentCalculation();
        var params = new URLSearchParams({
          anfrageart: "b2b-leasing",
          radpreis: calc.price,
          anzahl: calc.count,
          laufzeit: calc.duration,
          monatsrate: calc.ratePerBike.toFixed(2),
          gesamtrate: calc.rateTotal.toFixed(2)
        });
        window.location.href = "kontakt.html?" + params.toString() + "#kontaktformular";
      });
    }
  }

  // FAQ-Filter
  var filterButtons = document.querySelectorAll("[data-faq-filter]");
  var faqItems = document.querySelectorAll("[data-faq-category]");

  filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      filterButtons.forEach(function (b) {
        b.setAttribute("aria-pressed", "false");
      });
      button.setAttribute("aria-pressed", "true");
      var category = button.getAttribute("data-faq-filter");

      faqItems.forEach(function (item) {
        var matches = category === "alle" || item.getAttribute("data-faq-category") === category;
        item.style.display = matches ? "" : "none";
      });
    });
  });

  // Kontaktformular: Anfrageart steuert sichtbare Zusatzfelder + optionale Übernahme aus Rechner
  var contactForm = document.getElementById("kontaktformular");
  if (contactForm) {
    var anfrageartSelect = document.getElementById("anfrageart");
    var conditionalBlocks = document.querySelectorAll("[data-show-for]");

    function updateConditionalFields() {
      var value = anfrageartSelect.value;
      conditionalBlocks.forEach(function (block) {
        var showFor = block.getAttribute("data-show-for").split(",");
        var isVisible = showFor.indexOf(value) !== -1;
        block.hidden = !isVisible;
        block.querySelectorAll("input, textarea, select").forEach(function (field) {
          if (isVisible) {
            if (field.dataset.requiredWhenVisible === "true") {
              field.required = true;
            }
          } else {
            field.required = false;
          }
        });
      });
    }

    anfrageartSelect.addEventListener("change", updateConditionalFields);

    var urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get("anfrageart")) {
      anfrageartSelect.value = urlParams.get("anfrageart");
    }
    updateConditionalFields();

    var messageField = document.getElementById("nachricht");
    if (urlParams.get("radpreis") && messageField) {
      var zusammenfassung =
        "Übernommen aus dem Leasing-Rechner:\n" +
        "- Radpreis: " + urlParams.get("radpreis") + " €\n" +
        "- Anzahl Räder: " + urlParams.get("anzahl") + "\n" +
        "- Laufzeit: " + urlParams.get("laufzeit") + " Monate\n" +
        "- Unverbindliche Monatsrate: " + urlParams.get("monatsrate") + " € pro Rad\n" +
        "- Unverbindliche Monatsrate gesamt: " + urlParams.get("gesamtrate") + " €\n\n";
      messageField.value = zusammenfassung;
    }

    contactForm.addEventListener("submit", function (event) {
      if (!contactForm.checkValidity()) {
        return;
      }
      event.preventDefault();

      var mailBody = [];
      new FormData(contactForm).forEach(function (value, key) {
        if (value) {
          mailBody.push(key + ": " + value);
        }
      });

      var subject = "Anfrage über Website – " + anfrageartSelect.options[anfrageartSelect.selectedIndex].text;
      var mailtoUrl =
        "mailto:anfrage@radwerk-mitte-beispiel.de?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(mailBody.join("\n"));

      window.location.href = mailtoUrl;

      var successEl = document.getElementById("form-success");
      if (successEl) {
        successEl.classList.add("is-visible");
        successEl.focus();
      }
    });
  }
})();
