/* =====================================
   VASBERG SPORTS - JAVASCRIPT
   Language Switcher & Mobile Navigation
===================================== */

document.addEventListener("DOMContentLoaded", function () {

  // LANGUAGE SWITCHER

  const languageToggle = document.getElementById("languageToggle");

  let currentLanguage = localStorage.getItem("vasbergLanguage") || "hu";

  function changeLanguage(language) {

    currentLanguage = language;

    // Update all translated elements
    const translatedElements = document.querySelectorAll("[data-hu][data-en]");

    translatedElements.forEach(function (element) {

      const translation = element.getAttribute("data-" + language);

      if (translation !== null) {
        element.textContent = translation;
      }

    });

    // Update HTML language
    document.documentElement.lang = language;

    // Update language button
    if (languageToggle) {
      languageToggle.textContent = language === "hu" ? "EN" : "HU";
    }

    // Save selected language
    localStorage.setItem("vasbergLanguage", language);
  }

  // Language button click
  if (languageToggle) {

    languageToggle.addEventListener("click", function () {

      const newLanguage = currentLanguage === "hu" ? "en" : "hu";

      changeLanguage(newLanguage);

    });

  }

  // Load saved language
  changeLanguage(currentLanguage);


  // MOBILE MENU

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", function () {

      mainNav.classList.toggle("active");

      const menuIsOpen = mainNav.classList.contains("active");

      menuToggle.textContent = menuIsOpen ? "✕" : "☰";

      menuToggle.setAttribute("aria-expanded", menuIsOpen);

    });

    // Close menu after clicking a navigation link
    const navigationLinks = mainNav.querySelectorAll("a");

    navigationLinks.forEach(function (link) {

      link.addEventListener("click", function () {

        mainNav.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

      });

    });

    // Close menu when switching language
    if (languageToggle) {

      languageToggle.addEventListener("click", function () {

        mainNav.classList.remove("active");

        menuToggle.textContent = "☰";

        menuToggle.setAttribute("aria-expanded", "false");

      });

    }

  }


  // CURRENT YEAR IN FOOTER

  const footerCopyright = document.querySelector(".site-footer p");

  if (footerCopyright) {

    footerCopyright.textContent =
      "© " + new Date().getFullYear() + " VASBERG SPORTS. ALL RIGHTS RESERVED.";

  }


  // SMOOTH NAVIGATION

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {

    link.addEventListener("click", function (event) {

      const targetId = link.getAttribute("href");

      const target = document.querySelector(targetId);

      if (target) {

        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });

      }

    });

  });


  console.log("VASBERG SPORTS website loaded successfully.");

});
