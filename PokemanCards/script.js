"use strict";

const cardEl = document.querySelector(".card");

const theme_colors = [
  "#1FE274",
  "#09BFEC",
  "#FF9500",
  "#E69770",
  "#A948A2",
  "#F01224",
  "#386641",
  "#040F16",
  "#7678ED",
  "#262626",
];

const append_feature = function (feature, el) {
  const span = document.createElement("span");
  span.innerText = `${feature.type.name}`;
  el.append(span);
};

async function getPokemon() {
  const rand = Math.trunc(Math.random() * 150) + 1;
  const rand_color = Math.trunc(Math.random() * theme_colors.length) + 1;
  const url = ` https://pokeapi.co/api/v2/pokemon/${rand}`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();

  const pokeman_name = data.name;
  const hp_val = data.stats[0].base_stat;
  const img_url = `https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${rand}.svg`;
  const stat_attack = data.stats[1].base_stat;
  const stat_defense = data.stats[2].base_stat;
  const stat_speed = data.stats[3].base_stat;
  const types = data.types[0].type.name;

  cardEl.style.background = `radial-gradient(circle at 50% 0%, ${theme_colors[rand_color]} 36%, #fff 36%)`;

  const html = `<span id="hp">HP <span id="hp_val">${hp_val}</span></span>
        <div class="img_box">
          <img src=${img_url} alt="Character" id="img" />
          <p><span id="char_name">${pokeman_name}</span></p>
        </div>
        <div class="abilities">
      </div>
        <div class="stats">
          <div class="stat">
            <p id="value">${stat_attack}</p>
            <p id="feature">Attack</p>
          </div>
          <div class="stat">
            <p id="value">${stat_defense}</p>
            <p id="feature">Defense</p>
          </div>
          <div class="stat">
            <p id="value">40</p>
            <p id="feature">${stat_speed}</p>
          </div>
        </div>`;
  cardEl.innerHTML = html;
  const abilitiesEl = document.querySelector(".abilities");
  data.types.forEach((curr_item) => {
    append_feature(curr_item, abilitiesEl);
  });
  const span = document.querySelectorAll(".abilities span");
  span.forEach((span_el) => {
    span_el.style.backgroundColor = `${theme_colors[rand_color]}`;
  });
}

getPokemon();

const btn = document.getElementById("btn");
btn.addEventListener("click", getPokemon);
