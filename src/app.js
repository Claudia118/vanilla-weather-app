function formatDate(timestamp) {
  //calculate date
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = ["Sunday", "Monday", "Tuesday", " Wednesday", "Thursday", "Friday", "Saturday"];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();

  let days = ["Sun", "Mon", "Tue", " Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecastInfo = response.data.daily;

  let forecastElem = document.querySelector("#forecast");

  let forecastHTML = `<div class="row days-info" id="forecast">`;

  forecastInfo.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col weekdays">
            <span class="day">${formatDay(forecastDay.time)}</span>
            <br />
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png" alt="" />
            <br />
            <span class="weather-temp-max">${Math.round(forecastDay.temperature.maximum)}°</span>
            <span class="weather-temp-min">${Math.round(forecastDay.temperature.minimum)}°</span>
          </div>
      
      `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElem.innerHTML = forecastHTML;
}

function forecast(coordinates) {
  let apiKey = "2t7b32678ae0df330f1a61b393e477oc";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  //Getting data from api
  let cityElement = document.querySelector("#city-name");
  cityElement.innerHTML = response.data.city;

  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(response.data.temperature.current);

  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.temperature.humidity;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  dateElement = document.querySelector("#date");
  dateElement.innerHTML = formatDate(response.data.time * 1000);

  let iconElement = document.querySelector("#icon-img");
  iconElement.setAttribute("src", `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);

  iconElement.setAttribute("alt", response.data.condition.description);

  celsiusTemp = response.data.temperature.current;

  forecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "2t7b32678ae0df330f1a61b393e477oc";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;

  axios.get(apiUrl).then(displayTemperature);
}

function handlesCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  search(cityElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handlesCity);
