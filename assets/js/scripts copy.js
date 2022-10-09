var displayElement = document.querySelector("#display");
var historyListElement = document.querySelector("#history-list");
var appKey = "d91f911bcf2c0f925fb6535547a5ddc9";
var city = "New York, NY";
var dailyCardElement = document.querySelector("#daily");

console.log("First URL");

// URLS for fetch requests
var requestURL = "https://api.openweathermap.org/geo/1.0/direct?q="+city+",&appid="+appKey;
var requestURLDaily = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+appKey;
console.log(requestURL);
var lat; //latitude from first fetch
var lon; //longitude from second fetch (for 5-day forecast which can't be searched by city)
var inputElement = document.querySelector("#city");
var searchButton = document.querySelector("#search");

// logic for local storage
// Use an array to push search values to, which will then be set to storage (JSON Stringify)
// If there are values in local storage, get and parse using JSON Parse
var cityArray; 
var citiesStored = localStorage.getItem("cities");
if (!citiesStored) { // if there is nothing in local storage, we need an empty array
    cityArray = ["Test"];
}
else { //Otherwise we parse the local storage into an array
    cityArray=JSON.parse(citiesStored);
    populateSearchHistory(cityArray);
}
console.log(cityArray); // Check what's in the array

// Search button
searchButton.addEventListener("click", function () {
    city = inputElement.value; // The city the user typed in. Should be added to search history
    //Add city to the requestURL for the first fetch
    weather(city); 
    searchHistory(city);
})


//current weather: Fetch number 1
function weather (city) {

    requestURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&exclude=current,minutely,hourly,alerts&appid="+appKey+"&units=imperial"
    displayElement.innerHTML = ""; //Clear out whatever was in the display
    var displayHeader = document.createElement("h2"); //Create a header for the city name display
    displayHeader.textContent = city; // + moment().format("MMM Do, YYYY");
    displayElement.appendChild(displayHeader); //Add the header to the display element
fetch(requestURL)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
    //Get and Add the temperature to the display
    var temp = document.createElement("li");
    temp.textContent = "Temperature: "+data.main.temp + " Degrees F";
    displayElement.appendChild(temp);
    //Get and add the wind speed to the display
    var wind = document.createElement("li");
    wind.textContent = "Wind: "+data.wind.speed + " MPH";
    displayElement.appendChild(wind);
    //Get and add the humidity to the display
    var hum = document.createElement("li");
    hum.textContent = "Humidity: "+data.main.humidity;
    displayElement.appendChild(hum);
    //Get the latitude and longitude for the second fetch
    lat = data.coord.lat;
    lon = data.coord.lon;
    console.log("lat: " + lat + " lon: " + lon);
    request(lat, lon);

});

function request(lat, lon) {
    var requestURLDaily = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&appid="+appKey;

fetch(requestURLDaily)
    .then(function (response) {
        console.log("lat: " + lat + " lon: " + lon);

        return response.json();
    })
    .then(function (data) {
        console.log(data);
        //! Create card for 5 days. For loop
        //! This needs to be refactored, reformatted, styled, generally made to actually work
        for (var i = 0; i<5; i++) {
            var weatherCard = document.createElement("ul");
            weatherCard.classList = "grid-x grid-margin-x weather";
            var dailyTemp = data.list[i].main.temp;
            var temp = document.createElement("li");
            temp.textContent = dailyTemp;
            weatherCard.appendChild(temp);
            dailyCardElement.appendChild(weatherCard);
        }
        //Get the daily info I need, plus the day (moment)
    })
}
}

function searchHistory(city){
    pushCity = ""+city;
    console.log("Search history city: " +city);
    console.log("pushCity = " + pushCity);
    console.log("Is my array the null problem??? " +cityArray);
    cityArray.unshift(pushCity);
    localStorage.setItem("cities",JSON.stringify (cityArray));
    populateSearchHistory(cityArray);
}

function populateSearchHistory(cityArray) {
    historyListElement.innerHTML = ""; //clear current history
    // for loop to append each element in array to the ul
    //! Event delegation to make each list item clickable. Remember some hover effects and cursor
    for (var i = 0; i<cityArray.length; i++) {
    var listEl = document.createElement("li");
    listEl.textContent = cityArray[i];
    historyListElement.appendChild(listEl);
}
historyListElement.addEventListener("click", function (event) {
    var cityClicked = event.target;
    city = cityClicked.textContent;
    console.log(city);
    weather(city); 
})

}


