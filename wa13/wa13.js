//Navigation Buttons

const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

function showMenu() {
    var shown = navMenu.classList.toggle("show");
    navMenu.classList.toggle("hide");

    if (shown) {
        navToggle.setAttribute("aria-expanded", "true");
        navToggle.style.transform = "rotate(360deg)"
    }
    else {
        navToggle.setAttribute("aria-expanded", "false");
        navToggle.style.transform = "rotate(0deg)"
    }
}

function checkKey(key_code) {
    if (key_code == 32) {
        showMenu();
        console.log("worked");
    }
}

navToggle.addEventListener('click', showMenu);


//Weather API

let weatherBtn = document.querySelector('#get-weather-btn').addEventListener('click', getWeather);

let currentWeather = {
    location: "",
    temp: "",
    conditions: "",
    humidity: "",
    wind: ""
}

const apiKey = 'GNJYCDBQXGKVBPPAU93M9GRRV';

async function getWeather() {
    let location = document.getElementById('city-input').value;

    if (location === "") {
        alert("Please enter a city.");
        return;
    }

    const apiURL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/" + location + "?unitGroup=us&key=" + apiKey + "&contentType=json";

    try {
        const response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error(response.statusText);
        }

        const json = await response.json();
        currentWeather.location = json["address"];
        currentWeather.temp = json["currentConditions"]["temp"];
        currentWeather.conditions = json["currentConditions"]["conditions"];
        currentWeather.humidity = json["currentConditions"]["humidity"];
        currentWeather.wind = json["currentConditions"]["windspeed"];

        displayWeather(currentWeather);

    } catch (err) {
        console.log(err);
        alert("Failed to get weather data");
    }
}

function displayWeather(weather) {
    const weatherContainer = document.querySelector('.weather-container');
    const weatherText =
        "Location: " + weather.location + "\n" +
        "Temperature: " + weather.temp + " F\n" +
        "Conditions: " + weather.conditions + "\n" +
        "Humidity: " + weather.humidity + "%\n" +
        "Wind Speed: " + weather.wind + " mph\n\n" +
        "To get weather for another location, please refresh the page."
    ;


    weatherContainer.innerText = weatherText;
}