var requestUrl =
  "https://api.openweathermap.org/data/2.5/weather?lat=35&lon=139&appid=e48f1126c6ee01bbe48f0a9ad118cdd2";

var nameOfCity = "london";
var limit = 5;
var getLatAndLong =
  "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=e48f1126c6ee01bbe48f0a9ad118cdd2";

fetch(requestUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
  });

//How are we suppose to know the lat and long of a city when someone types it in if lat and long are required in the api call
function fillDays() {
  $(".day").each(function () {
    //note -- referencing this time-block -- depending on time of day it is a certain color
    var hourBlock = $(this).attr("id");
    if (hourBlock < currentHour) {
      $(this).addClass("past");
    }
    if (hourBlock == currentHour) {
      $(this).addClass("present");
    } else if (hourBlock > currentHour) {
      $(this).addClass("future");
    }
  });
}
timeCompare();
