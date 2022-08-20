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

//stores local storage for perviously searched cities
function loadPreviousCities() {
  for (var i = 0; i < localStorage.length; i++) {
    var newButton = localStorage.key(i);
    createButton(newButton);
  }
}
//tells which icon to use
function getIcon(clouds, precip) {
  if (clouds > 50 && precip > 0.2) {
    return "./assets/Rainy.png";
  } else if (clouds > 50 && precip <= 0.2) {
    return "./assets/Cloudy.png";
  } else if (clouds <= 50 && precip <= 0.2) {
    return "./assets/Sunny.png";
  }
}

loadPreviousCities();

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
      var currentDateTime = new Date(data.data[0].datetime);
      var currentDate = currentDateTime.toLocaleDateString();
      var currentClouds = data.data[0].clouds_mid;
      var currentPercipitation = data.data[0].precip;
      var currentIcon = getIcon(currentClouds, currentPercipitation);
      $(".date-0").text(currentDate);
      $("#current-city").text(nameOfCity + " " + currentDate);

      //console.log(currentIcon);
      document.getElementById("icon-0").setAttribute("src", currentIcon);
      $(".temperature-0").text("Temp: " + data.data[0].temp + " \u00B0" + "F");
      $(".wind-0").text("Wind: " + data.data[0].wind_spd + " MPH");
      $(".humidity-0").text("Humidity: " + data.data[0].rh + "%");
      $("#uv-index-0").text("UV Index: " + data.data[0].uv);
      uvIndexCompare(data.data[0].uv);
      for (i = 1; i < data.data.length; i++) {
        var dateTime = new Date(data.data[i].datetime);
        var date = dateTime.toLocaleDateString();
        var clouds = data.data[i].clouds_mid;
        var precip = data.data[i].precip;
        var icon = getIcon(clouds, precip);
        document.getElementById("icon-" + i).setAttribute("src", icon);
        var temp = "Temp: " + data.data[i].temp + " \u00B0" + "F";
        var wind = "Wind: " + data.data[i].wind_spd + " MPH";
        var humidity = "Humidity: " + data.data[i].rh + "%";
        var cardDate = "#date-" + i;
        $(cardDate).text(date);
        $("#temperature-" + i).text(temp);
        $("#wind-" + i).text(wind);
        $("#humidity-" + i).text(humidity);
      }
    });
}

function uvIndexCompare(uvIndex) {
  //console.log("UV INDEX: " + uvIndex);
  if (uvIndex > 0.5) {
    $("#uv-index-0").addClass("green");
  } else if (uvIndex <= 0.5) {
    $("uv-index-0").addClass("red");
  }
}
getWeather(nameOfCity);

$("#search-button").on("click", function (event) {
  event.preventDefault();
  // var textValue = $(event.target).siblings().eq(0).val();
  // console.log($(event.target).siblings().eq(0).val());

  //console.log("click");
  var array = [];
  var cityInput = $('input[name="city-input"]');
  //console.log(cityInput.val());
  nameOfCity = cityInput.val();
  let newButton = document.createElement("button");
  newButton.setAttribute("id", nameOfCity);
  newButton.setAttribute("onclick", "cityClicked(event)");
  newButton.innerHTML = nameOfCity;
  document.getElementById("button-list").appendChild(newButton);
  localStorage.setItem(nameOfCity, nameOfCity);
  getWeather(nameOfCity);
});

function cityClicked(event) {
  nameOfCity = event.srcElement.innerHTML;
  getWeather(nameOfCity);
}

function createButton(name) {
  let newButton = document.createElement("button");
  newButton.setAttribute("id", name);
  newButton.setAttribute("onclick", "cityClicked(event)");
  newButton.innerHTML = name;
  document.getElementById("button-list").appendChild(newButton);
}
