import "./styles.css";

import { useState, useEffect } from "react";
import axios from "axios";
const SearchBar = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const handleSearch = () => {
    onSearch(city);
  };
  return (
    <div className="search-bar">
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

const WeatherCard = ({ title, data }) => {
  return (
    <div className="weather-card">
      <h3>{title}</h3>
      <h3>{data}</h3>
    </div>
  );
};

const WeatherDisplay = ({ city }) => {
  console.log(city);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (city) {
      setLoading(true);
      axios
        .get("https://api.weatherapi.com/v1/current.json", {
          params: {
            key: "b5f386c348a7412c830183101240701",
            q: city,
          },
        })
        .then((res) => {
          console.log(res.data);
          setWeatherData(res.data);
        })
        .catch((err) => {
          // console.log("Error fetching data");
          alert("Failed to fetch weather data");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [city]);

  return (
    <div className="weather-display">
      {loading && <p>Loading data...</p>}
      {!loading && weatherData && (
        <div className="weather-cards">
          <WeatherCard
            title="Temparature"
            data={`${weatherData.current.temp_c}&degC`}
          />
          <WeatherCard
            title="Humidity"
            data={`${weatherData.current.humidity}%`}
          />
          <WeatherCard
            title="Condition"
            data={weatherData.current.condition.text}
          />
          <WeatherCard
            title="Wind"
            data={`${weatherData.current.wind_kph}kph`}
          />
        </div>
      )}
    </div>
  );
};

export default function App() {
  const [city, setCity] = useState("");

  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };
  return (
    <div className="App">
      <SearchBar onSearch={handleSearch} />
      <WeatherDisplay city={city} />
    </div>
  );
}
