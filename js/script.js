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
    "&days=5" +
    "&key=" +
    fetch(getWeather)
      .then((response) => response.json())
      .then((data) => {
        $("#card-0 .date-0").val(data.data[0].datetime);
        $("#card-0 .temperature-0").val(data.data[0].temp);
        $("#card-0 .wind-0").val(data.data[0].wind_spd);
        $("#card-0 .humidity-0").val(data.data[0].rh);
        $("#card-0 .uv-index-0").val(data.data[0].uv);
        console.log(data);
        for (i = 1; i < data.data.length; i++) {
          var date = data.data[i].datetime;
          var temp = data.data[i].temp;
          var wind = data.data[i].wind_spd;
          var humidity = data.data[i].rh;
          $("#card-" + i + " .date-" + i).val(date);
          $("#card-" + i + " .temperature-" + i).val(temp);
          $("#card-" + i + " .wind-" + i).val(wind);
          $("#card-" + i + " .humidity-" + i).val(humidity);
        }
      });
}
getWeather(nameOfCity);

$("#search-button").on("click", function (event) {
  event.preventDefault();
  // var textValue = $(event.target).siblings().eq(0).val();
  // console.log($(event.target).siblings().eq(0).val());
  requestUrl += textValue;
  var array = [];
  getToken()
    .then((response) =>
      fetch(requestUrl, {
        headers: { Authorization: response },
      })
    )
    .then((response) => response.json())
    .then(function (data) {});
});

/* 
Need API key to give back data
HOw do I link the values using jQuery 
*/
