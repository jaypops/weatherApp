"use strict";
const load = document.querySelector(".load");
const search = document.querySelector(".sbar");
const searchBr = document.querySelector(".search-bar");
const alart = document.querySelector(".alert");
const hidden = document.querySelector(".hidden");
const closeU = document.querySelector(".close-btn");
const fill = document.querySelector(".fill");
const apiKey = "8205afe29052883522ab1b0617bb0232";
const weather = async function (countries) {
  load.innerHTML = "";
  const timeout = function (sec) {
    return new Promise(function (_, reject) {
      setTimeout(function () {
        reject(new Error("Request took too long"));
      }, sec * 1000);
    });
  };
  try {
    const apiLocation = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${countries}&appid=${apiKey}`
    );
    if (!apiLocation.ok) throw new Error("Invalid input");
    const data = await apiLocation.json();
    await Promise.race([apiLocation, timeout(2)]);
    const iconUrl = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
    const weathercon = function () {
      const html = `
        <div class="weather">
          <h2 class="city">Weather in condition ${data.name}</h2>
          <h1 class="temp">${(data.main.temp - 273.15).toFixed(1)}°C</h1>
          <div class="flex">
            <img
              src="${iconUrl}"
              class="icon"
            />
            <div class="description">${data.weather[0].description}</div>
          </div>
           <div class="humidity">Humidity: ${data.main.humidity}%</div>
           <div class="wind">Wind speed: ${data.wind.speed}km/h</div>
        </div>`;
      load.insertAdjacentHTML("afterbegin", html);
    };
    weathercon();
    alart.innerHTML = "";
  } catch (err) {
    reanderError(`${err.message}`);
  }
};
fill.addEventListener("submit", function (e) {
  e.preventDefault();
  if (searchBr.value === "") {
    reanderError("input empty");
  } else {
    const inputValue = searchBr.value.trim();
    weather(inputValue);
    searchBr.value = "";
  }
});
const reanderError = function (msg) {
  alart.innerHTML = "";
  const html_2 = `
    <span><i class="fa-solid fa-circle-exclamation ex same"></i></span>
    <span class="write">Warning: ${msg}</span>
    <span><i class="fa-solid fa-xmark close-btn"></i></span>
  `;
  alart.insertAdjacentHTML("afterbegin", html_2);
  alart.style.opacity = 1;
};
const removeError = function () {
  document.addEventListener("click", function (e) {
    if (e.target.classList.contains("close-btn")) {
      e.preventDefault();
      alart.style.opacity = 0;
    }
  });
};
removeError();
