"use strict";

const mobile_nav_btn = document.querySelector(".mobile_nav_btn");
const header_element = document.querySelector(".header");
mobile_nav_btn.addEventListener("click", function () {
  header_element.classList.toggle("nav-open");
});

// Implement smooth scroll behavior using javascript!

const nav_links = document.querySelectorAll("a:link");

nav_links.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const href = link.getAttribute("href");
    console.log(href);
    if (href === "#") {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else if (href !== "#" && href.startsWith("#")) {
      const scrollToSection = document.querySelector(href);
      // scrollToSection.scrollIntoView(false);
      // scrollToSection.scrollIntoView({
      //   behavior: "smooth",
      //   block: "end",
      //   inline: "nearest",
      // });
      // scrollToSection.scrollIntoView({
      //   behavior: "smooth",
      //   block: "start",
      // });
      scrollToSection.scrollIntoView(true);
    }
    const headerEl = document.querySelector(".header");
    if (link.classList.contains("nav-link")) {
      headerEl.classList.toggle("nav-open");
    }
  });
});

// implementing sticky navigation
const featuredSect = document.getElementById("featured");
const featuredSectCoord = featuredSect.getBoundingClientRect();
window.addEventListener("scroll", function () {
  if (window.scrollY > featuredSectCoord.top) {
    header_element.classList.add("sticky");
  } else header_element.classList.remove("sticky");
});

// blur/fade-in/fade-out animation to nav-links
const navEl = document.querySelector(".navigation");
const logoImg = document.querySelector(".logo-img");

const handlerFun = function (e) {
  if (e.target.classList.contains("nav-link")) {
    const link = e.target;
    const siblings = link.closest(".navigation").querySelectorAll(".nav-link");
    console.log(siblings);
    siblings.forEach((li) => {
      if (link !== li) li.style.opacity = this;
    });
  }
  logoImg.style.opacity = this;
};

navEl.addEventListener("mouseover", handlerFun.bind(0.5));
navEl.addEventListener("mouseout", handlerFun.bind(1));
