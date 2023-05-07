"use strict";

const comingYearEl = document.querySelector(".coming-year");
const days_left = document.querySelector("#days");
const hours_left = document.querySelector("#hours");
const minutes_left = document.querySelector("#minutes");
const seconds_left = document.querySelector("#seconds");

const timerId = setInterval(function () {
  const present_now = new Date();
  const new_year = new Date(present_now.getFullYear() + 1, 0, 1, 0, 0, 0);
  comingYearEl.innerText = new_year.getFullYear();
  const diff = new_year - present_now;
  const days = Math.floor(diff / 1000 / 24 / 60 / 60);
  const hours = Math.floor((diff / 1000 / 60 / 60) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  days_left.innerText = days;
  hours_left.innerText = `${hours}`.padStart(2, 0);
  minutes_left.innerText = `${minutes}`.padStart(2, 0);
  seconds_left.innerText = `${seconds}`.padStart(2, 0);
}, 1000);
