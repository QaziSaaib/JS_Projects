"use strict";

const quoteEl = document.querySelector(".quote");
const main_content_el = document.querySelector(".main_content");
const btn = document.getElementById("btn");

const url = "https://api.quotable.io/random";
const header = {
  method: "GET",
};

async function randomQuotes() {
  try {
    const response = await fetch(url, header);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(`ERROR: ${err}`);
  }
}

async function showQuotes() {
  quoteEl.classList.remove("fade");
  const quoteObj = await randomQuotes();
  console.log(quoteObj);
  const { content, author } = quoteObj;
  const html = `<p>${content}</p>
      <span id="author">${author}</span>`;
  console.log(html);
  quoteEl.innerHTML = html;
  quoteEl.classList.add("fade");
}

// function showQuotes() {
//   quoteEl.classList.remove("fade");
//   fetch(url, header)
//     .then((response) => response.json())
//     .then((data) => {
//       const { content, author } = data;
//       const html = `<p>${content}</p>
//               <span id="author">${author}</span>`;
//       console.log(html);
//       quoteEl.innerHTML = html;
//       quoteEl.classList.add("fade");
//     })
//     .catch((err) => console.log("ERROR: ", err));
// }

window.addEventListener("load", showQuotes);
btn.addEventListener("click", showQuotes);
