const apiKey = "bc6b0dfaf2b1c895493b006652c98e8b";

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");

const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");
const weatherBox = document.getElementById("weather");

const cityName = document.getElementById("cityName");
const dateTime = document.getElementById("dateTime");
const weatherIcon = document.getElementById("weatherIcon");

const temp = document.getElementById("temp");
const description = document.getElementById("description");

const feelsLike = document.getElementById("feelsLike");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const pressure = document.getElementById("pressure");
const minTemp = document.getElementById("minTemp");
const maxTemp = document.getElementById("maxTemp");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");

// click event
searchBtn.addEventListener("click", getWeather);

// enter key event
cityInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    getWeather();
  }
});

async function getWeather() {
  const city = cityInput.value.trim();

  if (!city) return;

  loading.style.display = "flex";
  errorBox.style.display = "none";
  weatherBox.style.display = "none";

  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = await res.json();

    loading.style.display = "none";

    if (data.cod !== 200) {
      errorBox.style.display = "block";
      return;
    }

    // show weather box
    weatherBox.style.display = "block";

    cityName.textContent = data.name;

    temp.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;

    feelsLike.textContent = `${Math.round(data.main.feels_like)}°C`;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} km/h`;
    pressure.textContent = `${data.main.pressure} hPa`;

    minTemp.textContent = `${Math.round(data.main.temp_min)}°C`;
    maxTemp.textContent = `${Math.round(data.main.temp_max)}°C`;

    // sunrise/sunset
    const sunriseTime = new Date(data.sys.sunrise * 1000);
    const sunsetTime = new Date(data.sys.sunset * 1000);

    sunrise.textContent = sunriseTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    sunset.textContent = sunsetTime.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    // icon
    const icon = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;

    // date time
    dateTime.textContent = new Date().toLocaleString();

  } catch (err) {
    loading.style.display = "none";
    errorBox.style.display = "block";
  }
}