// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}&units=imperial
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}

//http://api.openweathermap.org/data/2.5/forecast/daily?q=london&units=metric&APPID=value&cnt=7
var displayElement = document.querySelector("#display");
var appKey = "b305ebfd8dd85ed3fe2ac8280f681733";
var city = "Asbury Park";
var requestURLforUV ="https://api.openweathermap.org/data/2.5/uvi?q=portland&appid="+appKey+"&lat="+lat+"&lon="+lon;
var requestURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&exclude=current,minutely,hourly,alerts&appid="+appKey
+"&units=imperial";
console.log(requestURL);
var lat;
var lon;
var inputElement = document.querySelector("#city");
var searchButton = document.querySelector("#search");

searchButton.addEventListener("click", function () {
    city = inputElement.value;
    requestURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&exclude=current,minutely,hourly,alerts&appid="+appKey+"&units=imperial"
    console.log("This should say howell " +city);
    displayElement.innerHTML = "";
    var displayHeader = document.createElement("h2");
    displayHeader.textContent = city; // + moment().format("MMM Do, YYYY");
    displayElement.appendChild(displayHeader);
    weather();
})


//current weather
function weather () {
fetch(requestURL)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    var temp = document.createElement("li");
    temp.textContent = "Temperature: "+data.main.temp + " Degrees F";
    displayElement.appendChild(temp);
    var wind = document.createElement("li");
    wind.textContent = "Wind: "+data.wind.speed + " MPH";
    displayElement.appendChild(wind);
    var hum = document.createElement("li");
    hum.textContent = "Humidity: "+data.main.humidity;
    displayElement.appendChild(hum);
    

    lat = data.coord.lat;
    lon = data.coord.lon;
    console.log("lat: " + lat + " lon: " + lon);

});

// fetch(requestURLforUV)
//     .then(function (response) {
//         return response.json();
//     })
//     .then(function (data) {
//         console.log(data);
//     })

}

