const APIKEY = "7e17aa7645b6a83f754930dd42c5ca79";
let units = "imperial";
let units_temp = `&deg;F`;
let units_humid = `%`;
let units_speed = "mph";

let owmGeocode = new OWMGeocode(APIKEY);
let owmWeather = new OWMWeather(APIKEY, units);
let owmForecast = new OWMForecast(APIKEY, units);
let owmPollution = new OWMPollution(APIKEY);

const coolClothing = ["wife-beaters", "dri-fit t-shirts", "sports-shorts", "khaki-shorts", "cotton t-shirts", "garbage bag", "polo shirt", "cargo shorts"]
const coolFootwear = ["flip-flops", "sneakers", "sandals", "dress shoes", ]
const hotClothing = ["long-johns", "Jacket", "long-sleeve shirt", "jeans", "sweatpants", ]
const hotFootwear = ["slippers", "boots", "combat boots", "sneakers", "shoes", "dress shoes"]
const hotItems = ["rubber duck", "umbrella", "portable ac", "phone", "airpods", "watch", "belt", "sunhat"]
const coolItems = ["notebook", "airpods", "socks", "watch", "gloves", "hat", "scarf", "phone", ""]

///////////////////////////////////////////////////////////////
// LOCATION - translate from city, state, country to lat/lon //
///////////////////////////////////////////////////////////////

function displayLocation() {
    const loc = document.getElementById("location");
    loc.innerHTML = `${owmGeocode.json[0].name}`;
    if (owmGeocode.json[0].hasOwnProperty("state")) {
        loc.innerHTML += `, ${owmGeocode.json[0].state}`;
    }
    loc.innerHTML += `, ${owmGeocode.json[0].country}`;
}

///////////////////////////////////////////////////////////////
// WEATHER - the current weather conditions                  //
///////////////////////////////////////////////////////////////

function displayWeather() {
    const weatherReport = document.getElementById("weather-report");

    // Weather Condition Strings
    let cond = owmWeather.json.weather[0].main;
    cond = cond.toLowerCase();
    let condLong = owmWeather.json.weather[0].description;
    condLong = condLong.toLowerCase();
    let condReport = `The current weather condition is "${condLong}" or "${cond}".`;

    // Weather Condition ID
    const condIdURL = "https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2";
    let condId = owmWeather.json.weather[0].id;
    let condIdReport = `The condition ID is ${condId} which can <a href=${condIdURL} target="_blank">help sort by possible conditions</a>.`;

    // Temperature and Feels-Like
    let temp = owmWeather.json.main.temp;
    let tempFeel = owmWeather.json.main.feels_like;
    temp = temp.toFixed(1);
    tempFeel = tempFeel.toFixed(1);
    let tempReport = `The temperature is ${temp}${units_temp} and it feels like ${tempFeel}${units_temp}.`;

    // See https://openweathermap.org/weather-conditions
    let img = `<img src="https://openweathermap.org/img/wn/${owmWeather.json.weather[0].icon}@4x.png">`;

    //Apparel Informere
    let apparel;
    let apparel1;
    let apparel2;
    apparel1 = coolClothing[Math.floor(Math.random() * 7)];
    apparel2 = coolClothing[Math.floor(Math.random() * 7)];
    footwear1 = coolFootwear[Math.floor(Math.random() * 7)];
    item1 = coolItems[Math.floor(Math.random() * 7)];
    item2 = coolItems[Math.floor(Math.random() * 7)];
    apparel3 = hotClothing[Math.floor(Math.random() * 7)];
    apparel4 = hotClothing[Math.floor(Math.random() * 7)];
    item3 = hotItems[Math.floor(Math.random() * 7)];
    item4 = hotItems[Math.floor(Math.random() * 7)];
    footwear2 = hotFootwear[Math.floor(Math.random() * 7)];
    if (owmWeather.json.main.feels_like >= 60 && owmWeather.json.main.feels_like < 110) {
        apparel = `You should wear ${apparel1} and ${apparel2} today due to the conditions outside. Don't forget to bring ${footwear1} and a(n) ${item1}, as well as a(n) ${item2}`
    }
    else if (owmWeather.json.main.feels_like > 0 && owmWeather.json.main.feels_like < 60) {
        apparel = `You should wear ${apparel3} and ${apparel4} today due to the conditionis outside. Don't forget to bring ${footwear2} and a(n) ${item3}, as well as a(n) ${item4}`
    }
    else {
        apparel = `Error.`
    }



    weatherReport.innerHTML = `${condReport}<br>${condIdReport}<br>${tempReport}<br>${img}<br>${apparel}`;
}

///////////////////////////////////////////////////////////////
// FORECAST                                                  //
///////////////////////////////////////////////////////////////

// See https://openweathermap.org/forecast5#5days

function displayForecast() {
    var table = document.getElementById('forecast-table');
    table.innerHTML = '';

    const headerColText = ["Time", "Temperature", "Condition", "Humidity", "Icon"];
    var header = document.createElement('tr');
    for (var j = 0; j < 5; j++) { // number of columns
        var cell = document.createElement('th');
        cell.textContent = headerColText[j];
        header.appendChild(cell);
    }
    table.appendChild(header);

    // Add the current weather if available
    if (owmWeather.json !== undefined) {
        var row = createRow(owmWeather.json);
        table.appendChild(row);
    }

    for (let i = 0; i < 5; i++) { // up to 40
        var row = createRow(owmForecast.json.list[i]);
        table.appendChild(row);
    }
}

function createRow(json) {
    var row = document.createElement('tr');
    var cell;

    cell = document.createElement('td');
    cell.innerHTML = owmForecast.convertTimecode(json.dt);
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.innerHTML = `${json.main.temp.toFixed(1)}${units_temp}`;
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.innerHTML = json.weather[0].main;
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.innerHTML = `${json.main.humidity}${units_humid}`;
    row.appendChild(cell);

    cell = document.createElement('td');
    // Change end to "@2x.png" for larger images
    // See https://openweathermap.org/weather-conditions
    cell.innerHTML = `<img src="https://openweathermap.org/img/wn/${json.weather[0].icon}.png">`;
    row.appendChild(cell);

    return row;
}

///////////////////////////////////////////////////////////////
// POLLUTION - the air quality index (AQI) and contaminants  //
///////////////////////////////////////////////////////////////

function displayPollution() {
    
}
