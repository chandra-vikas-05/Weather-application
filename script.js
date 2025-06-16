const form = document.getElementById("weatherform");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");

// 🔐 Replace this with your actual valid API key
const API_KEY = '12db379581d68784700ec4fcfe068e75';

form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value.trim();
    if (!city) {
        weatherResult.innerHTML = '<p>Please enter a city name.</p>';
        return;
    }

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=imperial`
        );

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();
        const temp = data.main.temp;
        const description = data.weather[0].description;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;

        weatherResult.innerHTML = `
            <h2>Weather in ${city}</h2>
            <p><strong>Temperature:</strong> ${temp} °F</p>
            <p><strong>Description:</strong> ${description}</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
            <p><strong>Wind Speed:</strong> ${windSpeed} mph</p>
        `;
    } catch (error) {
        weatherResult.innerHTML = `<p style="color:red;">Error: ${error.message}</p>`;
    }
});

