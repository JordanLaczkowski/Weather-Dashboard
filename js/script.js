var nameOfCity = "London";
var limit = 5;
var lat;
var lon;
var getLatAndLong =
  "http://api.openweathermap.org/geo/1.0/direct?q=" +
  nameOfCity +
  "&appid=e48f1126c6ee01bbe48f0a9ad118cdd2";
//console.log(getLatAndLong);

fetch(getLatAndLong)
  .then((response) => response.json())
  .then((data) => {
    lat = data[0].lat;
    lon = data[0].lon;
    getWeather(lat, lon);
  });

function getWeather(lat, lon) {
  var getWeather =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=e48f1126c6ee01bbe48f0a9ad118cdd2";

  fetch(getWeather)
    .then((response) => response.json())
    .then((data) => {
      fillDays(data.dt, data.main.temp, data.wind.speed, data.main.humidity);
      console.log(data);
    });
}

//How are we suppose to know the lat and long of a city when someone types it in if lat and long are required in the api call
function fillDays(date, temp, wind, humidity) {
  $(".day").each(function () {
    $(".date").val(date);
    $(".temperature").val(temp);
    $(".wind").val(wind);
    $(".humidity").val(humidity);
  });
}
//timeCompare();

/*Questions: 
1. How to use jQuery to fill in the date, temp, wind, and humidity for each day?
2. How to get the current day and 5 day forecast? 
*/
