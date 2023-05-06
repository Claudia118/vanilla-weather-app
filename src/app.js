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

// function forecast(coordinates) {
//   let apiKey = "2t7b32678ae0df330f1a61b393e477oc";
//   let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=metric`;

//   console.log(apiUrl);
// }

function distplayForecast() {
  let forecastElem = document.querySelector("#forecast");

  let forecastHTML = `<div class="row days-info" id="forecast">`;

  let days = ["Thu", "Fri", "Sat"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
          <div class="col weekdays">
            <span class="day">${day}</span>
            <br />
            <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/rain-day.png" alt="" />
            <br />
            <span class="weather-temp-max">21°</span>
            <span class="weather-temp-min">18°</span>
          </div>
      
      `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElem.innerHTML = forecastHTML;
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

  // forecast(response.data.coordinates);
}

function search(city) {
  let apiKey = "2t7b32678ae0df330f1a61b393e477oc";

  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function handlesCity(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city");
  search(cityElement.value);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let tempElement = document.querySelector("#temperature");

  //remove the active class in the celsius element
  celsiusElement.classList.remove("active");
  fahrenheitElement.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  tempElement.innerHTML = Math.round(fahrenheitTemp);
}

function displaycelsius(event) {
  event.preventDefault();
  celsiusElement.classList.add("active");
  fahrenheitElement.classList.remove("active");
  let tempElement = document.querySelector("#temperature");
  tempElement.innerHTML = Math.round(celsiusTemp);
}

let celsiusTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handlesCity);

let fahrenheitElement = document.querySelector("#fahrenheit");
fahrenheitElement.addEventListener("click", displayFahrenheit);

let celsiusElement = document.querySelector("#celsius");
celsiusElement.addEventListener("click", displaycelsius);

distplayForecast();
