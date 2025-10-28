let city  = document.querySelector("h1"); 
let time = document.querySelector("#container-location-time h2"); 
let date = document.querySelector("#container-location-time h3"); 

// fetch("http://localhost/:3000/proxy/current.json?aqi=no&q=KualaLumpur")
//   .then(response => {
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     return response.json();
//   })
//   .then(data => {

//     const res_datetime = data.location.localtime.split(" ");

//     city.innerHTML = data.location.name;
//     time.innerHTML = res_datetime[1];
//     date.innerHTML = res_datetime[0];
//   })
//   .catch(error => {
//     console.error("Fetch error:", error);
//   });
