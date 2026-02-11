const API_KEY = "Z6JTMUKE5W4K4XLEEAUQSUY8H"; 

let isFahrenheit = true; 
let processedWeatherData = null; 

const locationForm = document.getElementById('location-form');
const locationInput = document.getElementById('location-input');
const weatherDisplay = document.getElementById('weather-display');
const toggleButton = document.getElementById('toggle-units');
const messageArea = document.getElementById('message');
const loadingIndicator = document.getElementById('loading');
const body = document.body;

async function fetchWeatherData(location) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=us&key=${API_KEY}&contentType=json`;

    try {
        const response = await fetch(url, { mode: 'cors' });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }
        
        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        displayMessage(`Could not find weather for "${location}". Please try a different location. (Error: ${error.message.split('-')[0]})`);
        return null;
    }
}

function processData(rawData) {
    if (!rawData.currentConditions || !rawData.address) {
        throw new Error("Invalid data structure from API.");
    }

    const current = rawData.currentConditions;
    const locationName = rawData.address; 
    
    return {
        city: locationName.split(',')[0].trim(),

        tempF: current.temp,
        feelsLikeF: current.feelslike,
        
        tempC: fahrenheitToCelsius(current.temp),
        feelsLikeC: fahrenheitToCelsius(current.feelslike),
        
        humidity: current.humidity,
        windSpeed: current.windspeed,
        conditions: current.conditions.toLowerCase(), 
    };
}

function fahrenheitToCelsius(fahrenheit) {
    return Math.round(((fahrenheit - 32) * 5 / 9) * 10) / 10;
}

function displayWeather(data) {
    const temp = isFahrenheit ? data.tempF : data.tempC;
    const feelsLike = isFahrenheit ? data.feelsLikeF : data.feelsLikeC;
    const unitSymbol = isFahrenheit ? '°F' : '°C';
    const windUnit = isFahrenheit ? ' mph' : ' km/h';

    document.getElementById('city-name').textContent = data.city.toUpperCase();
    document.getElementById('temperature').textContent = `${temp}${unitSymbol}`;
    document.getElementById('feels-like').textContent = `${feelsLike}${unitSymbol}`;
    document.getElementById('humidity').textContent = `${data.humidity}%`;
    document.getElementById('wind-speed').textContent = `${data.windSpeed}${windUnit}`;
    
    const weatherIcon = getWeatherIcon(data.conditions);
    document.getElementById('weather-description').innerHTML = `${weatherIcon} ${data.conditions}`;

    toggleButton.textContent = isFahrenheit ? 'Toggle to °C' : 'Toggle to °F';
    
    setPageTheme(data.conditions);

    messageArea.classList.add('hidden');
    weatherDisplay.classList.remove('hidden');
}

function displayMessage(msg) {
    weatherDisplay.classList.add('hidden');
    messageArea.classList.remove('hidden');
    messageArea.innerHTML = `<p>${msg}</p>`;
}

function getWeatherIcon(conditions) {
    if (conditions.includes('clear') || conditions.includes('sunny')) {
        return '☀️';
    } else if (conditions.includes('rain') || conditions.includes('drizzle')) {
        return '🌧️';
    } else if (conditions.includes('snow') || conditions.includes('ice')) {
        return '❄️';
    } else if (conditions.includes('cloudy') || conditions.includes('overcast')) {
        return '☁️';
    } else if (conditions.includes('partially cloudy')) {
        return '⛅';
    } else if (conditions.includes('fog')) {
        return '🌫️';
    } else {
        return '🌡️';
    }
}

function setPageTheme(conditions) {
    body.className = ''; 

    if (conditions.includes('clear') || conditions.includes('sunny')) {
        body.classList.add('theme-clear');
    } else if (conditions.includes('rain') || conditions.includes('drizzle')) {
        body.classList.add('theme-rain');
    } else if (conditions.includes('snow') || conditions.includes('ice')) {
        body.classList.add('theme-snow');
    } else if (conditions.includes('overcast')) {
        body.classList.add('theme-cloudy');
    } else if (conditions.includes('partially cloudy')) {
        body.classList.add('theme-partly-cloudy');
    } else {
        body.classList.add('theme-clear');
    }
}

locationForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const location = encodeURIComponent(locationInput.value.trim());

    if (!location) return;

    loadingIndicator.classList.remove('hidden');
    weatherDisplay.classList.add('hidden');
    messageArea.classList.add('hidden');

    isFahrenheit = true; 

    const rawData = await fetchWeatherData(location);

    loadingIndicator.classList.add('hidden');
    
    if (rawData) {
        try {
            processedWeatherData = processData(rawData);
            console.log("Processed Weather Data:", processedWeatherData);
            
            displayWeather(processedWeatherData);

        } catch (error) {
            console.error("Data processing error:", error);
            displayMessage("An unexpected error occurred while processing weather data.");
        }
    }
});

toggleButton.addEventListener('click', () => {
    if (!processedWeatherData) return; 

    isFahrenheit = !isFahrenheit; 
    
    displayWeather(processedWeatherData);
});