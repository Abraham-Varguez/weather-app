//Packages that will be used
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const https = require("https");
const { response } = require("express");

//Functions to call my APIs

// //A promise to find the Location Latitude and Longitude
// const getWeatherLocation = async (cityName, stateCode) => {
//   const apiKey = "1c7524fcd17e941d9fc740300d9c9897";
//Geocoding here
// fetch(
//   `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=5&appid=${apiKey}`
// )
//   //Json File that holds the info from the API
//   .then((res) => res.json())
//   .then((data) => {
//     //This is where the information will be shown or executed
//     const location = data.find((data) => data.state === stateCode);
//     // console.log(location.name);
//     // const lat = location.lat;
//     // const lon = location.lon;
//     console.log(location + "<------------------------");
//     return location;
//     //Fetching the Weather API
//     //       return fetch(
//     //         `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
//   });
// };
//     .then((res) => res.json())
//     //Rendering the weather Json into the HTML with the renderWeather function
//     .then((data) => console.log(data))
//     .catch((err) => console.error(`${err.message}`));
// };

// -----------------------------------------------------------------------------------------------------------------------

app.use(bodyParser.urlencoded({ extended: true }));
//Here created our route for URL to page.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {
  const cityName = req.body.cityName;
  const stateCode = req.body.stateCode;
  const apiKey = "1c7524fcd17e941d9fc740300d9c9897";
  const url = `https://api.openweathermap.org/geo/1.0/direct?q=${cityName},${stateCode},US&limit=&appid=${apiKey}`;
  https.get(url, function (response) {
    response.on("data", (data) => {
      const geoData = JSON.parse(data)[0];
      console.log(geoData);
      const lat = geoData.lat;
      console.log(lat);
      const lon = geoData.lon;
      const url2 = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
      https.get(url2, function (response) {
        response.on("data", (data) => {
          const jsondata = JSON.parse(data);
          console.log(jsondata, "<-----------");
          const tempature = jsondata.main.temp;
          const des = jsondata.weather[0].description;
          const icon = jsondata.weather[0].icon;
          const pain = 'Node is pain';
          const imagePain =
            "/pain.png";
          const imageURL =
            "http://openweathermap.org/img/wn/" + icon + "@2x.png";
          console.log("Here is the Weather Currently");

          res.write(
            `
          <h1> The Tempature in ${cityName}, ${geoData.state} is ${tempature} degrees</h1>
          <p>The weather description is ${des}</p>
          <img src="${imageURL}">
          <h2>${pain}</h2>
          <img src="${imagePain}}">

        `
          );
        });
      });
    });
  });
});
app.listen(9000);
