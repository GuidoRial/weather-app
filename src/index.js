import "./style.css";
import { getFullDate } from "./getFullDate";
import { KtoF, KtoC } from "./units";
import GithubIcon from "./github-logo.png";
import LinkedinIcon from "./linkedin-logo.png";

const city = document.getElementById("city");
const date = document.getElementById("date");
const temperature = document.getElementById("temperature");
const weather = document.getElementById("weather");
const feelsLike = document.getElementById("feelsLike");
const tempMax = document.getElementById("tempMax");
const tempMin = document.getElementById("tempMin");
const cityInput = document.getElementById("cityInput");
const checkbox = document.getElementById("checkbox");
const form = document.getElementById("form");
const imgContainer = document.getElementById("imgContainer");

async function getWeather(cityName) {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=83ddabf3f0eb1b795b7f0198b3e6a4ac`,
            { mode: "cors" }
        );
        const weatherData = await response.json();
        const setTempToF = function () {
            temperature.innerText = `Temperature: ${KtoF(
                weatherData.main.temp
            )} °F`;
            feelsLike.innerText = `It feels like: ${KtoF(
                weatherData.main.feels_like
            )} °F`;
            tempMax.innerText = `Max. temperature: ${KtoF(
                weatherData.main.temp_max
            )} °F`;
            tempMin.innerText = `Min. temperature: ${KtoF(
                weatherData.main.temp_min
            )} °F`;
        };

        const setTempToC = function () {
            temperature.innerText = `Temperature: ${KtoC(
                weatherData.main.temp
            )} °C`;
            feelsLike.innerText = `It feels like: ${KtoC(
                weatherData.main.feels_like
            )} °C`;
            tempMax.innerText = `Max. temperature: ${KtoC(
                weatherData.main.temp_max
            )} °C`;
            tempMin.innerText = `Min. temperature: ${KtoC(
                weatherData.main.temp_min
            )} °C`;
        };
        city.innerText = `The weather in ${weatherData.name} city`;
        date.innerText = getFullDate();
        weather.innerText = weatherData.weather[0].main;
        setTempToF();
        checkbox.addEventListener("change", (e) => {
            if (e.target.checked) {
                setTempToC();
            } else {
                setTempToF();
            }
        });
    } catch (error) {
        console.error(error);
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (cityInput.value == "") {
        alert("Insert a valid city");
        return;
    } else {
        getWeather(cityInput.value);
    }
    cityInput.value = "";
    setTempToF();
});

function openGithub() {
    window.open("https://github.com/GuidoRial", "_blank");
}

function openLinkedin() {
    window.open("https://www.linkedin.com/in/guido-rial-275552221/", "_blank");
}

const githubLogo = document.createElement("img");
githubLogo.src = GithubIcon;
const linkedinLogo = document.createElement("img");
linkedinLogo.src = LinkedinIcon;
imgContainer.appendChild(githubLogo);
imgContainer.appendChild(linkedinLogo);
githubLogo.addEventListener("click", openGithub);
linkedinLogo.addEventListener("click", openLinkedin);

getWeather("Rosario");
