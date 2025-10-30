// Define all the fields to be populated with info from API.
// -- 1.0 <div id="container-city-dropdown"> -- //
const dropDownSelection = document.getElementById("citys");

// -- 2.0 <div id="container-current"> -- //
// ----  2.1 <div id="container-location-time"> ---- // 
let [city, time, date]  = document.querySelector("#container-location-time").children 

// ---- 2.2 <div id="container-weatherCurrent"> ---- // 
let [weather, weatherimg, humidity, wind]  = document.querySelector("#container-weatherCurrent").children 

// -- 3.0 <div id="container-forecast"> -- //
let forecastCards = document.querySelectorAll(".forecast-cards")

// Initiate wiith default value first
getWeather(dropDownSelection.value);

//Listen to dropdown change
dropDownSelection.addEventListener("change", () => {
  const selectedCity = dropDownSelection.value;
  getWeather(selectedCity);
});

// Function to get weather
async function getWeather(citySelected){
  const loader = document.getElementById("loading");
  const currentContainer = document.getElementById("container-current");
  const forecastContainer = document.getElementById("container-forecast");


  loader.style.display = "block"; // show loading
  currentContainer.style.display = "none"; 
  forecastContainer.style.display = "none"; 

  document.body.style.pointerEvents = "none"; // prevent user actions during load (optional)

  const loaderTimer = setTimeout(() => {
    loader.querySelector("p").innerHTML = "Please be patience, everyone takes time to wake up after a deep sleep, so do the server! =)";
  }, 5000);

  try{
    const res = await fetch(`https://basic-weather-app-gtst.onrender.com/proxy/forecast.json?q=${citySelected}&days=7&aqi=no&alerts=no`);

    // Fetch completed, clear the timer so text update doesn't trigger
    clearTimeout(loaderTimer);

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

    // hide loader after data fetched
    loader.style.display = "none";
    currentContainer.style.display = "flex"; 
    forecastContainer.style.display = "flex"; 

    document.body.style.pointerEvents = "auto";

      // Current Weather
    const [dateStr, timeStr] = data.location.localtime.split(" ");
    const finalDate = getDaynDate(dateStr);

    city.innerHTML = data.location.name;
    time.innerHTML = timeStr;
    date.innerHTML = finalDate;

    weather.innerHTML = data.current.condition.text;
    weatherimg.src = "https:" + data.current.condition.icon;

    humidity.innerHTML = "Humidity : " + data.current.humidity + " %"
    wind.innerHTML =  "Wind Speed : " + data.current.wind_kph + " km/h"

    //  Forecast Weather
   const forecastWeather = data.forecast.forecastday

    for (let i = 0; i < forecastCards.length; i++){
      forecastCards[i].querySelector("h2").innerHTML = forecastWeather[i].date
      forecastCards[i].querySelector("img").src = "https:" + forecastWeather[i].day.condition.icon
      let dayWeather = forecastCards[i].querySelectorAll("h3")
      dayWeather[0].innerHTML = forecastWeather[i].day.condition.text
      dayWeather[1].innerHTML = forecastWeather[i].day.avgtemp_c + " °C"
    }

  }catch(err){
    console.error("Failed to fetch weather data:", err);
  }
}

function getDaynDate(dateStr){
    let d = new Date(dateStr);
    let dayStr = d.getDay();

    switch (dayStr){
      case 0:
        dayStr = "Sunday";
        break;
      case 1:
        dayStr = "Monday";
        break;
      case 2:
        dayStr = "Tuesday";
        break;
      case 3:
        dayStr = "Wednesday";
        break;
      case 4:
        dayStr = "Thursday";
        break;
      case 5:
        dayStr = "Friday";
        break;
      default:
        dayStr = "Saturday";
    }

    return (`${dayStr}, ${dateStr}`);
}