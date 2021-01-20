
function formatDate(date) {

let dayIndex = currentDate.getDay();
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let day = `${days[dayIndex]}`;

let hour = currentDate.getHours();
if (hour < 10) {
    hour = `0${hour}`;
}
let minute = currentDate.getMinutes();
if (minute < 10) {
    minute = `0${minute}`;
}

    return `${day} ${hour}:${minute}`;
}

function showTemperature(response){
    console.log(response);
    let currentTemp = Math.round(response.data.main.temp);
  let citySearchName = response.data.name;
  let heading = document.querySelector("#city-text-1");
  let temperature = document.querySelector("#change-degree-type");
  let largeIconElement = document.querySelector("#large-icon-1")
  let descriptionElement = document.querySelector("#weather-description");
  let humidity = document.querySelector("#humidityButton");
  let windSpeed = document.querySelector("#windSpeedButton");
  largeIconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  largeIconElement.setAttribute("alt", response.data.weather[0].description);
  heading.innerHTML = `${citySearchName}`;
temperature.innerHTML = `${currentTemp}°C`;
descriptionElement.innerHTML = response.data.weather[0].description;
windSpeed.innerHTML = `windspeed = ${response.data.wind.speed}`;
humidity.innerHTML = `humidity = ${response.data.main.humidity}`;
}

function searching(event) {
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    let city = cityInput.value;
    console.log(city);
let units = "metric";
  let apiKey = "574bc54d5d21baaccc60639378150f95";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
}

function showTemperatureLocation(response) {
    console.log(response);
let currentTemp = Math.round(response.data.main.temp);
let cityLocation = response.data.name;
let heading = document.querySelector("#city-text-1");
let temperature = document.querySelector("#change-degree-type");
let largeIconElement = document.querySelector("#large-icon-1")
let descriptionElement = document.querySelector("#weather-description");
let humidity = document.querySelector("#humidityButton");
let windSpeed = document.querySelector("#windSpeedButton");
largeIconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
largeIconElement.setAttribute("alt", response.data.weather[0].description);
heading.innerHTML = `${cityLocation}`;
temperature.innerHTML = `${currentTemp}°C`;
descriptionElement.innerHTML = response.data.weather[0].description;
windSpeed.innerHTML = `windspeed = ${response.data.wind.speed}`;
humidity.innerHTML = `humidity = ${response.data.main.humidity}`;
}

function showPosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiKey = "574bc54d5d21baaccc60639378150f95";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperatureLocation);
}

function getGeoLocation() {
navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#current-location");
currentLocation.addEventListener("click", getGeoLocation);

let currentDate = new Date();
let displayDate = document.querySelector("h3.day-text-large");
displayDate.innerHTML = formatDate(currentDate);

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", searching);