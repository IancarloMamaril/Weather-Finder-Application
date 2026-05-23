import { useState } from "react";
import "./App.css";

function App() {

  const [city, setCity] = useState("");
  const [weather, setWeather] = useState("");
  const [error, setError] = useState("");

  const API_KEY = "2ccb88e7d20eb4a454a0d4ce6ee23287";

  const getWeather = async () => {

  if (city === "") {
    setError("Please enter a city");
    setWeather(null);
    return;
  }

  try {

    setError("");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    setWeather(data);

  } catch (error) {

    setError(error.message);
    setWeather(null);

  }

};

  return (

    <div className="App">

      <h2>Weather App</h2>

      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <button onClick={getWeather}>
        Get Weather
      </button>

      {error && <p>{error}</p>}

      {weather && (

        <div>

          <h2>{weather.name}</h2>

          <p>
            Temperature: {weather.main.temp} °C
          </p>

          <p>
            Condition: {weather.weather[0].description}
          </p>

        </div>

      )}

    </div>

  );

}

export default App;