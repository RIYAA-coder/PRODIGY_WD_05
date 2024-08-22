const apiKey = '5150d4d8e37dbbd9fdd7606ea36b2739'; 

function getWeather() {
    const city = document.getElementById('city').value.trim();
    if (city === '') {
        alert('Please enter a city name');
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.cod !== 200) {
                alert(data.message || 'City not found');
                return;
            }

            const weatherInfo = document.getElementById('weather-info');
            const weatherIcon = getCustomIcon(data.weather[0].icon);

            weatherInfo.innerHTML = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <img src="${weatherIcon}" alt="${data.weather[0].description}">
                <p>Temperature: ${data.main.temp} °C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
            `;
            weatherInfo.style.display = 'block';
        })
        .catch(error => {
            console.error('Error fetching the weather data:', error);
            alert('Error fetching the weather data');
        });
}

function getCustomIcon(iconCode) {
    const iconMapping = {
        '01d': 'icons/clear-day.png',
        
        '02d': 'icons/partly-cloudy-day.png',
        
        '03d': 'icons/cloudy.png',
        
        '04d': 'icons/overcast.png',
        
        '09d': 'icons/shower-rain.png',
        
        '10d': 'icons/rain.png',
        
        '11d': 'icons/thunderstorm.png',
        
        '13d': 'icons/snow.png',
        
        '50d': 'icons/mist.png',
        
    };

    return iconMapping[iconCode] || 'icons/default.png';
}
