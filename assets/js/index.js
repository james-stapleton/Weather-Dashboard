console.log("Document linked")
var displayElement = document.querySelector("#display");
const apiKey = "d91f911bcf2c0f925fb6535547a5ddc9";

var historyEl = document.querySelector("#search-history");
var cityArray; 
var citiesStored = localStorage.getItem("cities");
if (!citiesStored) { // if there is nothing in local storage, we need an empty array
    cityArray = [];
}
else { //Otherwise we parse the local storage into an array
    cityArray=JSON.parse(citiesStored);
    populateSearchHistory(cityArray);
}
console.log(cityArray); // Check what's in the array

var searchFormEl = document.querySelector("#search-form");


searchFormEl.addEventListener("submit", handleSearchFormSubmit);

  function handleSearchFormSubmit(e) {
    e.preventDefault();
    var searchInputVal = document.querySelector("#search-input").value;
    console.log(searchInputVal);
  
    if (!searchInputVal) {
      console.log("Invalid Input!");
      return;
    }
    document.querySelector('#search-input').value="";
    weather(searchInputVal);
  }


  function weather (city) {

    requestURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&exclude=current,minutely,hourly,alerts&appid="+apiKey+"&units=imperial";
    const newCity = document.createElement("li");
    newCity.textContent = city;

    if (!cityArray.includes(city)) {
    cityArray.unshift(city);
    localStorage.setItem("cities", JSON.stringify(cityArray));
    populateSearchHistory(cityArray);
    } 

    displayElement.innerHTML = ""; //Clear out whatever was in the display
    var displayHeader = document.createElement("h2"); //Create a header for the city name display
    displayHeader.textContent = city; // + moment().format("MMM Do, YYYY");
    displayElement.appendChild(displayHeader); //Add the header to the display element
    
fetch(requestURL)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(" First fetch data",data);
    const iconText = data.weather[0].icon;
            console.log('icon:', iconText)
            const iconURL = `http://openweathermap.org/img/wn/${iconText}@2x.png`;
            const iconEl = document.createElement("img");
            iconEl.src = iconURL;
            displayElement.appendChild(iconEl);
    //Get and Add the temperature to the display
    var temp = document.createElement("p");
    temp.textContent = "Temperature: "+data.main.temp + " Degrees F";
    displayElement.appendChild(temp);
    //Get and add the wind speed to the display
    var wind = document.createElement("p");
    wind.textContent = "Wind: "+data.wind.speed + " MPH";
    displayElement.appendChild(wind);
    //Get and add the humidity to the display
    var hum = document.createElement("p");
    hum.textContent = "Humidity: "+data.main.humidity;
    displayElement.appendChild(hum);
    //Get the latitude and longitude for the second fetch
    lat = data.coord.lat;
    lon = data.coord.lon;
    console.log("lat: " + lat + " lon: " + lon);
    request(lat, lon);

});

function request(lat, lon) {
    var requestURLDaily = "https://api.openweathermap.org/data/2.5/forecast?lat="+lat+"&lon="+lon+"&units=imperial&appid="+apiKey;

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
            const cardID = `#box${i+1}`;
            const dailyCardElement = document.querySelector(cardID);
            dailyCardElement.innerHTML = "";
            var weatherCard = document.createElement("ul");
            // weatherCard.classList = "grid-x grid-margin-x weather";
            const currentDate = new Date();
            console.log("date",currentDate);
            const month = currentDate.getMonth();
            const day = currentDate.getDate() + i + 1;
            const year = currentDate.getFullYear();
            const dateLi = document.createElement('h3');
            dateLi.textContent = `${month}/${day}/${year}`;
            weatherCard.appendChild(dateLi);
            const iconText = data.list[i].weather[0].icon;
            console.log('icon:', iconText)
            const iconURL = `http://openweathermap.org/img/wn/${iconText}@2x.png`;
            const iconEl = document.createElement("img");
            iconEl.src = iconURL;
            weatherCard.appendChild(iconEl);
            const dailyTemp = data.list[i].main.temp;
            var temp = document.createElement("p");
            temp.textContent = `Temperature: ${dailyTemp} Degrees F`;
            weatherCard.appendChild(temp);
            const dailyhumidity = data.list[i].main.humidity;
            var humidity = document.createElement("p");
            humidity.textContent = `Humidity: ${dailyhumidity}%`;
            weatherCard.appendChild(humidity);
            const dailywind = data.list[i].wind.speed;
            var wind = document.createElement("p");
            wind.textContent = `Wind speed: ${dailywind}MPH`;
            weatherCard.appendChild(wind);
            dailyCardElement.appendChild(weatherCard);
        }
        //Get the daily info I need, plus the day (moment)
    })
}
}

//  ----------------------------------------------Weather search

// function searchHistory(city){
//     pushCity = ""+city;
//     console.log("Search history city: " +city);
//     console.log("pushCity = " + pushCity);
//     console.log("Is my array the null problem??? " +cityArray);
//     if (!cityArray.includes(city)) {
//         cityArray.unshift(pushCity);
//     localStorage.setItem("cities",JSON.stringify (cityArray));
//     populateSearchHistory(cityArray);
//     }
    
// }


function populateSearchHistory(cityArray) {
    console.log("This is the array of cities to add" ,cityArray);
    historyEl.innerHTML = ""; //clear current history
    // for loop to append each element in array to the ul
    //! Event delegation to make each list item clickable. Remember some hover effects and cursor
    for (var i = 0; i<cityArray.length; i++) {
    var listEl = document.createElement("li");
    listEl.textContent = cityArray[i];
    historyEl.appendChild(listEl);
}
historyEl.addEventListener("click", function (event) {
    var cityClicked = event.target;
    city = cityClicked.textContent;
    console.log(city);
    weather(city); 
})
}