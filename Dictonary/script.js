"use strict";

const url = "https://api.dictionaryapi.dev/api/v2/entries/en";
// https://api.dictionaryapi.dev/api/v2/entries/en/hello

const header = {
  method: "GET",
};

const btn = document.querySelector("#btn");
const inputEl = document.querySelector("#input_feild");
const wordDet = document.querySelector(".word_details");
const wordEl = document.querySelector(".word");
const meaningEl = document.querySelector(".meaning");
const pronEl = document.querySelector("#pronounce");
const verbEl = document.querySelector("#verb");
const examp = document.querySelector(".use_case");
const sound = document.getElementById("sound");

async function get_meaning(word, url, header) {
  try {
    const response = await fetch(`${url}/${word}`, header);
    if (response.status === 200) {
      const data = await response.json();
      const phonetic = data[0].phonetic || data[0].phonetics[1]?.text;
      const defin = data[0].meanings[0].definitions[0].definition;
      const partOfSpeech = data[0].meanings[0].partOfSpeech;
      const voice = data[0].phonetics[0]?.audio || data[0].phonetics[1]?.audio;
      const example = data[0].meanings[0].definitions[0].example || " ";
      const html = `<div class="heading">
      <h1 class="word">${word}</h1>
      <button id="btn_voice" onclick="play_sound()">
      <ion-icon name="mic-circle-outline"class="voice"></ion-icon>
      </button>
    </div>
    <span id="verb">${partOfSpeech}  </span>
    <span id="pronounce">${phonetic}</span>
    <p class="meaning">${defin}</p>
    <p class="use_case">${example}</p>`;
      wordDet.innerHTML = html;
      sound.setAttribute("src", voice);
    } else {
      wordDet.innerText = `Sorry can't find the word...`;
    }
  } catch (err) {
    console.log("ERROR: ", err);
  }
}

btn.addEventListener("click", function () {
  const word = inputEl.value;
  console.log(word);
  get_meaning(word, url, header);
});

function play_sound() {
  sound.play();
}
