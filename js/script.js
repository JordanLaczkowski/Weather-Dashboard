var nameOfCity = "Denver";
var limit = 5;
var lat;
var lon;

var apiKey = "9b430ea1318141ffbb5b685ae9fb887b";
var getLatAndLong =
  "http://api.openweathermap.org/geo/1.0/direct?q=" +
  nameOfCity +
  "&appid=" +
  apiKey;

function getWeather(nameOfCity) {
  var getWeather =
    "https://api.weatherbit.io/v2.0/forecast/daily?city=" +
    nameOfCity +
    "&units=I" +
    "&days=6" +
    "&key=" +
    apiKey;
  fetch(getWeather)
    .then((response) => response.json())
    .then((data) => {
      $(".date-0").text(data.data[0].datetime);
      $(".temperature-0").text(data.data[0].temp);
      $(".wind-0").text(data.data[0].wind_spd);
      $(".humidity-0").text(data.data[0].rh);
      $(".uv-index-0").text(data.data[0].uv);
      console.log(data);
      for (i = 1; i < data.data.length; i++) {
        var date = data.data[i].datetime;
        console.log(date);
        var temp = data.data[i].temp;
        var wind = data.data[i].wind_spd;
        var humidity = data.data[i].rh;
        var cardDate = "#date-" + i;
        $(cardDate).text(date);
        $("#temperature-" + i).text(temp);
        $("#wind-" + i).text(wind);
        $("#humidity-" + i).text(humidity);
      }
    });
}
getWeather(nameOfCity);

$("#search-button").on("click", function (event) {
  event.preventDefault();
  // var textValue = $(event.target).siblings().eq(0).val();
  // console.log($(event.target).siblings().eq(0).val());

  console.log("click");
  var array = [];
  var cityInput = $('input[name="city-input"]');
  console.log(cityInput.val());
  nameOfCity = cityInput.val();
  getWeather();
  //still need this to equal the new city that was entered
  //arrray to gain new info -- push to the array to next name
  //array at end (maybe before getWeather - then do the json and have it set to local storage (web apis 21 &22))
});

/* 

Local storage for recent search button 
*/
