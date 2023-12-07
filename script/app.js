//calls for buttons to switch between fahrenheit(buttonF) and celsius(buttonC)
let buttonF = document.getElementById("buttonF");
let buttonC = document.getElementById("buttonC");
let dataCity = document.getElementById("dataCity");
let dataSunsetTime = document.getElementById("dataSunsetTime");
let dataCurrentTemp = document.getElementById("dataCurrentTemp");

//API KEY
let apiKey = '1a08679f5fb4f3387d3f12e3730e0314';

//latitude
let lat = 0;
//longitude
let lon = 0;

let currentCity = "stockton";
let currentCountry = "us";


async function apiCall() {
    const locationPromise = await fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + `${currentCity},` + `${currentCountry}`+ "&appid=" + `${apiKey}`)
    const locationData = await locationPromise.json();

    console.log(locationData);


    dataCity.textContent = `${locationData.city.name}, ${locationData.city.state}`;
    
    // Convert sunset timestamp to digital time format
    const sunsetTimestamp = locationData.city.sunset;
    const sunsetDate = new Date(sunsetTimestamp * 1000); // Convert seconds to milliseconds

    // Round to the nearest minute (up)
    if (sunsetDate.getSeconds() > 30) {
        sunsetDate.setMinutes(sunsetDate.getMinutes() + 1);
    }

    // Round to the nearest minute
    sunsetDate.setSeconds(0);
    sunsetDate.setMilliseconds(0);

    const sunsetTime = sunsetDate.toLocaleTimeString().replace(/:\d{2} /, ' ');;

    // Display the sunset time
    dataSunsetTime.textContent = `${sunsetTime}`;
}

apiCall();