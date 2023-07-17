"use strict";

const url = "https://v2.jokeapi.dev/joke/Any?type=twopart";

const header = {
  method: "GET",
};

async function getJokes(url, header) {
  try {
    const response = await fetch(url, header);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(`ERROR: `, err);
  }
}

async function showJoke() {
  description.classList.add("fade");
  const data = await getJokes(url, header);
  const { setup, delivery: punchline } = data;
  setupEl.innerText = `${setup}...🤔`;
  punchlineEl.innerText = `${punchline}...🤣`;
  description.classList.remove("fade");
}

const description = document.querySelector(".description");
const setupEl = document.getElementById("setup");
const punchlineEl = document.getElementById("punchline");
const btnEl = document.querySelector(".btn");

btnEl.addEventListener("click", showJoke);
