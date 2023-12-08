//calls for buttons to switch between fahrenheit(buttonF) and celsius(buttonC)
let buttonF = document.getElementById("buttonF");
let buttonC = document.getElementById("buttonC");
let dataCity = document.getElementById("dataCity");
let dataSunsetTime = document.getElementById("dataSunsetTime");
let dataCurrentTemp = document.getElementById("dataCurrentTemp");
let dataFeelsLike = document.getElementById("dataFeelsLike");
let dataClouds = document.getElementById("dataClouds");
let dataWinds = document.getElementById("dataWinds");
let dataHumid = document.getElementById("dataHumid");
let inputUser = document.getElementById("userInput");
let forecast1 = document.getElementById("forecast1");
let forecast2 = document.getElementById("forecast2");
let forecast3 = document.getElementById("forecast3");
let forecast4 = document.getElementById("forecast4");
let forecast5 = document.getElementById("forecast5");
let condition1 = document.getElementById("condition1");
let condition2 = document.getElementById("condition2");
let condition3 = document.getElementById("condition3");
let condition4 = document.getElementById("condition4");
let condition5 = document.getElementById("condition5");

//API KEY
let apiKey = '1a08679f5fb4f3387d3f12e3730e0314';

//latitude
let lat = 0;
//longitude
let lon = 0;

let currentCity = 'stockton';
let currentCountry = 'us';

async function conditionsCheck(string, forecast) {
    switch (string) {
        case "clear sky":
            forecast.src = "../assets/iconClear.png";
            break;
        case "Clear":
            forecast.src = "../assets/iconClear.png";
            break;
        case "rain":
            forecast.src = '../assets/rainy.png';
            break;
        case "Clouds":
            forecast.src = '../assets/cloud.png';
            break;
        case "few clouds":
            forecast.src = "../assets/cloudy.png";
            break;
        case "scattered clouds":
            forecast.src = "../assets/cloud.png";
            break;
        case "broken clouds":
            forecast.src = "../assets/cloud.png";
            break;
        case "shower rain":
            forecast.src = "../assets/rainy.png";
            break;
        case "thunderstorm":
            forecast.src = "../assets/storm.png";
            break;
        case "snow":
            forecast.src = "../assets/snowflake.png";
            break;
        case "haze":
            forecast.src = "../assets/haze.png";
            break;
        case "light rain":
            forecast.src = "../assets/rainy.png";
            break;
        default:
            break;
    }
}





async function apiCall() {



    //CITY DATA (location API)
    //Fetch Location Data
    const locationPromise = await fetch("http://api.openweathermap.org/data/2.5/forecast?q=" + `${currentCity},` + `${currentCountry}`+ "&appid=" + `${apiKey}`);
    const locationData = await locationPromise.json();

    //Display data of location in console
    console.log(locationData);

    
    //Latitude and Longitude
    lat = locationData.city.coord.lat;
    lon = locationData.city.coord.lon;

    
    //STATE DATA (Geocoding API)
    //Fetch Geoding data
    const reverseGeocodingPromise = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${apiKey}`);
    const reverseGeocodingData = await reverseGeocodingPromise.json();

    console.log(reverseGeocodingData);

    const state = reverseGeocodingData[0].state;

    //Have the dataCity variable be set to the current City and State
    dataCity.textContent = `${locationData.city.name}, ${state}` + ' ';
    

    // SUNSET TIME DATA
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
    // Remove data related to seconds
    const sunsetTime = sunsetDate.toLocaleTimeString().replace(/:\d{2} /, ' ');;
    // Display the sunset time
    dataSunsetTime.textContent = `${sunsetTime}`;
    
    

    //Fetch Current Weather Data
    const weatherPromise = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    const weatherData = await weatherPromise.json()
    console.log(weatherData);
    
    let todayTemp = (`${Math.ceil(weatherData.main.temp)}` + '°F');
    dataCurrentTemp.textContent = todayTemp;

    let todayTempFeels = ('| H.I. ' +  `${Math.ceil(weatherData.main.feels_like)}` + '°F');
    dataFeelsLike.textContent = todayTempFeels;

    let condition = ('Weather: ' + `${weatherData.weather[0].main}`);
    dataClouds.textContent = condition;

    let wind = (`${weatherData.wind.speed}` + ' m/s');
    dataWinds.textContent = wind;

    let humid = (`${weatherData.main.humidity}` + '% Humidity');
    dataHumid.textContent = humid;
   
    //fetch Forecasted Weather Data
    const forecastPromise = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`)
    const forecastData = await forecastPromise.json();
    console.log(forecastData);

    // Display 5-day forecast data
    for (let i = 1; i < forecastData.list.length; i++) {

    let currentDate = new Date(); //Get the current day 
    const forecastItem = forecastData.list[(i*8)-1];
    const forecastDate = new Date(currentDate.getTime() + 86400000 * (i));
 
    const forecastTemp = Math.ceil(forecastItem.main.temp) + '°F';

    // Update forecast elements

    const dayHigh = Math.ceil(forecastData.list[(i*8)-1].main.temp_max);
    const dayLow = Math.floor(forecastData.list[(i*8)-1].main.temp_min);
    // const dayConditions = forecastData.list[i + 1].weather[0].main;
    console.log(forecastDate);
    console.log(dayHigh);
    console.log(dayLow);
    // console.log(dayConditions);

    document.getElementById(`forecast${i}`).textContent = (`${forecastDate.toDateString()}` + ': ↑' + `${dayHigh}` + ' | ' + `${dayLow}` + '↓');
    }
    
}


        
    
    
    // Event listener for Enter key in the input field

    // !!!IMPORTANT TO FIX!!!
    // inputUser.addEventListener('keydown', async function(event) {
    //     if (event.key === "Enter") {
    //         const userInput = inputUser.value.trim().toLowerCase();

    //         if (userInput) {
    //             // Use the entered city for the API call
    //             currentCity = userInput;

    //             // Call the API with the new city
    //             await apiCall();

    //             // Clear the input field
    //             inputUser.value = "";
    //         }
    //     }

    //     return false;
    // });
    
    


apiCall();

