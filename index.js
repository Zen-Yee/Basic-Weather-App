//Default city
// const dropDownSelection = "Kuala Lumpur";

// Define all the fields to be populated with info from API.
// -- 1.0 <div id="container-city-dropdown"> -- //
const dropDownSelection = document.getElementById("citys");

// -- 2.0 <div id="container-current"> -- //
// ----  2.1 <div id="container-location-time"> ---- // 
let [city, time, date]  = document.querySelector("#container-location-time").children 
// let city  = document.querySelector("h1"); 
// let time = document.querySelector("#container-location-time h2"); 
// let date = document.querySelector("#container-location-time h3"); 

// ---- 2.2 <div id="container-weatherCurrent"> ---- // 
let [weather, humidity, wind]  = document.querySelector("#container-weatherCurrent").children 

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
  try{
    const res = await fetch(`http://localhost:3000/proxy/forecast.json?q=${citySelected}&days=7&aqi=no&alerts=no`);

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    const data = await res.json();

      // Current Weather
    const [dateStr, timeStr] = data.location.localtime.split(" ");

    city.innerHTML = data.location.name;
    time.innerHTML = timeStr;
    date.innerHTML = dateStr;

    weather.innerHTML = data.current.condition.text
    humidity.innerHTML = data.current.humidity + " %"
    wind.innerHTML = data.current.wind_kph + " km/h"

    //  Forecast Weather
   const forecastWeather = data.forecast.forecastday

    for (let i = 0; i < forecastCards.length; i++){
      forecastCards[i].querySelector("h2").innerHTML = forecastWeather[i].date
      forecastCards[i].querySelector("h3").innerHTML = forecastWeather[i].day.avgtemp_c + " °C"
    }

  }catch(err){
    console.error("Failed to fetch weather data:", err);
  }
}


// fetch("http://localhost/:3000/proxy/forecast.json?q=${citySelectedDropdown}&days=7&aqi=no&alerts=no")
//   .then(response => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json();
//   })
//   .then(data => {

      // Current Weather
//     const res_datetime = data.location.localtime.split(" ");

//     city.innerHTML = data.location.name;
//     time.innerHTML = res_datetime[1];
//     date.innerHTML = res_datetime[0];

//     weather.innerHTML = data.current.condition.text
//     humidity.innerHTML = data.current.humidity + " %"
//     wind.innerHTML = data.current.wind_kph + " km/h"

      // Forecast Weather
//    const forecastWeather = data.forecast.forecastday

    // for (let i = 0; i < forecastCards.length; i++){
    //   forecastCards[i].querySelector("h2").innerHTML = forecastWeather[i].date
    //   forecastCards[i].querySelector("h3").innerHTML = forecastWeather[i].avgtemp_c
    // }

//   })
//   .catch(error => {
//     console.error("Fetch error:", error);
//   });
