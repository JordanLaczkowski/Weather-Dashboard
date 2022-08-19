var nameOfCity = "Denver";
var limit = 5;
var lat;
var lon;
//e48f1126c6ee01bbe48f0a9ad118cdd2
//9b430ea1318141ffbb5b685ae9fb887b
var apiKey = "9b430ea1318141ffbb5b685ae9fb887b";
var getLatAndLong =
  "http://api.openweathermap.org/geo/1.0/direct?q=" +
  nameOfCity +
  "&appid=" +
  apiKey;
//console.log(getLatAndLong);

// fetch(getLatAndLong)
//   .then((response) => response.json())
//   .then((data) => {
//     lat = data[0].lat;
//     lon = data[0].lon;
//     getWeather(lat, lon);
//   });

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
        // fillDays(data.dt, data.main.temp, data.wind.speed, data.main.humidity);
        // console.log(data);

        console.log(data);
        $("#card-0 .date-0").val("soomethig");
        // for (i = 0; i < data.data.length; i++) {
        //   var cardId = "card-" + i;
        //   var date = data.data[i].datetime;
        //   var temp = data.data[i].temp;
        //   var wind = data.data[i].wind_spd;
        //   var humidity = data.data[i].rh;
        //   $("date-" + "i").val(date);
        //   $("temperature-" + "i").val(temp);
        //   $("wind-" + "i").val(wind);
        //   $("humidity-" + "i").val(humidity);
        // }
      });
}

getWeather(nameOfCity);

//How are we suppose to know the lat and long of a city when someone types it in if lat and long are required in the api call
function fillDays(date, temp, wind, humidity) {
  console.log(date, temp, wind, humidity);

  $(".day").each(function (date, temp, wind, humidity) {
    date.appendTo($(this).children(".date"));
    $(this).val(temp);
    $(this).val(wind);
    $(this).val(humidity);
  });
}

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
    .then(function (data) {
      //MAKE SURE YOU ITERATE THE SAME NUMBER OF TIMES AS THE NUMBER OF PETS PULLED FROM API (REMEMBER ERIK)
      for (i = 0; i < 6; i++) {
        var weatherForecast = {
          pictureSource: "",
          date: "",
          wind: "",
          temp: "",
          humidity: "",
        };
        console.log(data.animals[i]);
        console.log(data.animals[i].primary_photo_cropped);
        if (data.animals[i].primary_photo_cropped === null) {
          newPet.pictureSource =
            "https://i0.wp.com/orstx.org/wp-content/uploads/2019/10/no-photo-available-icon-12.jpg?fit=300%2C245&ssl=1"; //add path to image in folder
        } else {
          var object = data.animals[i].primary_photo_cropped;
          var key = Object.keys(object)[0];
          newPet.pictureSource = object[key];
        }
        newPet.name = data.animals[i].name;
        newPet.age = data.animals[i].age;
        newPet.sex = data.animals[i].gender;
        array.push(newPet);
      }
      displayPets(array);
    });
});

//timeCompare();

/*Questions: 
1. How to use jQuery to fill in the date, temp, wind, and humidity for each day?
2. How to get the current day and 5 day forecast? 
3. UV Index??? 
*/

/*create a card, display individual to display data for each day given 
append html to each card and (look at project 1)
if uv is ... (<2) the apply class to thing and gives background color 
*/
