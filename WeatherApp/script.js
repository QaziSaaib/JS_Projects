"use strict";
const inputRegion = document.getElementById("input_region");
const searchBtn = document.getElementById("search_btn");
const regionName = document.querySelector(".region_name span");
const weatherNowImg = document.getElementById("weather_now_img");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather_description");
const nowTime = document.querySelector(".day_date_year");
const windVal = document.getElementById("wind_val");
const humidityVal = document.getElementById("humidity_val");
const weather = document.querySelector(".weather");
const navClose = document.querySelector(".nav_close");
const navSearch = document.querySelector(".nav_search");

const fetchWeather = async function (region) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${region}&appid=502f399453104590698f01c129e72bbe&units=metric`
  );
  if (response.status === 200) {
    const data = await response.json();
    weather.style.opacity = "1";
    weather.style.height = "100%";
    navSearch.style.display = "none";
    navClose.style.display = "inline-block";
    inputRegion.disabled = "true";
    inputRegion.value = "";
    return data;
  }
};

const getTime = function () {
  const now = new Date();
  const date = now.getDate();
  //   const day = now.getDay();
  //   const month = now.getMonth();
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thrusday",
    "Friday",
    "Saturday",
  ];
  const day = days.filter((day, ind, arr) => {
    if (now.getDay() === ind) return day;
  });
  const months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months.filter((month, ind, arr) => {
    if (now.getMonth() === ind) return month;
  });
  return `${day},${date} ${month}`;
};

const displayWeatherIcon = function (main) {
  if (main === "Clear") {
    weatherNowImg.src = `imgs/clear.png`;
  } else if (main === "Clouds") {
    weatherNowImg.src = `imgs/clouds.png`;
  } else if (main === "Rain") {
    weatherNowImg.src = `imgs/rain.png`;
  } else if (main === "Snow") {
    weatherNowImg.src = `imgs/snow.png`;
  } else if (main === "Mist" || main === "Haze") {
    weatherNowImg.src = `imgs/haze.png`;
  } else if (main === "Drizzle") {
    weatherNowImg.src = `imgs/drizzle.png`;
  } else if (main === "Thunderstorm") {
    weatherNowImg.src = `imgs/thunder.png`;
  }
};

const reset = function () {
  weather.style.opacity = "0";
  weather.style.height = "0";
  navClose.style.display = "none";
  navSearch.style.display = "inline-block";
  inputRegion.disabled = "";
};

const showWeather = async function () {
  const searchVal = inputRegion.value;
  const data = await fetchWeather(searchVal);
  console.log(data);
  regionName.innerText = data.name;
  temperature.innerText = `${data.main.temp.toFixed(1)}°C`;
  nowTime.innerText = getTime();
  windVal.innerText = `${data.wind.speed.toFixed(1)}km/h`;
  humidityVal.innerText = `${data.main.humidity.toFixed(1)}%`;
  weatherDescription.innerText = `${data.weather[0].main}`;
  displayWeatherIcon(data.weather[0].main);
};

navSearch.addEventListener("click", showWeather);

navClose.addEventListener("click", reset);
