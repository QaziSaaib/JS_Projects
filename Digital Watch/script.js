"use strict";

const digitalClock = document.querySelector(".digital-clock");
const hoursEl = document.querySelector(".hours");
const minEl = document.querySelector(".minutes");
const secEl = document.querySelector(".seconds");
const statEl = document.querySelector(".stat");

const timerId = setInterval(function () {
  const date = new Date();
  const now = date.getHours();
  statEl.innerText = now >= 12 ? "PM" : "AM";
  if (now > 12) {
    const hours = now - 12;
    hoursEl.innerText = `${hours}`.padStart(2, 0);
  } else {
    now === 0
      ? (hoursEl.innerText = `${date.getHours() + 12}`.padStart(2, 0))
      : (hoursEl.innerText = `${date.getHours()}`.padStart(2, 0));
  }

  minEl.innerText = `${date.getMinutes()}`.padStart(2, 0);
  secEl.innerText = `${date.getSeconds()}`.padStart(2, 0);
}, 1000);
