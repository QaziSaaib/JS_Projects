"use strict";

const hoursHand = document.getElementById("hours_hand");
const minutesHand = document.getElementById("minutes_hand");
const secondsHand = document.getElementById("seconds_hand");

setInterval(() => {
  const now = new Date();
  let h = now.getHours();
  let m = now.getMinutes();
  let s = now.getSeconds();

  hoursHand.style.transform = `rotate(${(h / 12) * 360}deg)`;
  minutesHand.style.transform = `rotate(${(m / 60) * 360}deg)`;
  secondsHand.style.transform = `rotate(${(s / 60) * 360}deg)`;
}, 1000);
