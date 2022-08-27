// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

var appKey = "b305ebfd8dd85ed3fe2ac8280f681733";
var city = "Asbury Park";
var requestURL = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+appKey;
console.log(requestURL);

fetch(requestURL)
.then(function (response) {
    return response.json();
})
.then(function (data) {
    console.log(data);
});