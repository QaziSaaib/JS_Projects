"use strict";
const header = {
  method: "GET",
};

const countryBox = document.querySelector(".country_box");
const inputField = document.getElementById("inpt_field");
const btnSearch = document.getElementById("search_btn");
const countryDetails = document.querySelector(".country_details");

// const imgCountryBox = document.querySelector(".img_country");
// const country_stats = document.querySelector(".country_stats");

async function getCountryStats() {
  const country = inputField.value;
  const url = `https://restcountries.com/v3.1/name/${country}?fullText=true`;
  console.log(url);
  try {
    const response = await fetch(url, header);
    if (response.status === 200) {
      const data = await response.json();
      console.log(data);
      const {
        flags: { png: pic },
        capital: [get_capital],
        continents: [get_continent],
        currencies,
        population,
        languages,
        flags: { png },
      } = data[0];
      const keys = Object.keys(currencies);
      const currency = currencies[keys[0]].name;
      const languages_entries = Object.entries(languages);
      let country_languages = "";
      for (const [key, val] of languages_entries) {
        country_languages += `${val} `;
      }
      const html = `<img src="${png}" alt="Flag" id="img" />
      <p id="tag">${country}</p>
      <ul class="list">
        <li class="item">Capital: <span id="value">${get_capital}</span></li>
        <li class="item">Continent: <span id="value">${get_continent}</span></li>
        <li class="item">Currency: <span id="value">${currency}</span></li>
        <li class="item">
          Languages: <span id="value">${country_languages}</span>
        </li>
        <li class="item">Population: <span id="value">${population}</span></li>
      </ul>`;
      countryDetails.innerHTML = html;
    } else {
      countryDetails.innerHTML = `<h2 class="not_found">Country not found...</h2>`;
    }
  } catch (err) {
    console.log("Could'nt find the data...");
  }
}

btnSearch.addEventListener("click", getCountryStats);
