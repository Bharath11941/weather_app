import { useEffect, useState } from "react";
import hotBg from "./assets/hotbg.jpg";
import snowBg from "./assets/snowbg.jpg";
import Description from "./components/Description";
import { getFormattedWeatherData } from "./api/weatherService";

function App() {
  const [city, setCity] = useState("Kakkancheri");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [bg, setBg] = useState(hotBg);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getFormattedWeatherData(city, units);
      if (data) {
        setWeather(data);
        const threshold = units === "metric" ? 20 : 60
        if (data.temp > threshold) {
          setBg(hotBg);
        } else {
          setBg(snowBg);
        }
      } else {
        setErrorMessage("City not found. Please enter a valid location.");
      }
    };

    fetchData();
  }, [units, city]);

  const handleUnitClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    button.innerText = currentUnit === "C" ? "°F" : "°C";
    setUnits(currentUnit === "C" ? "metric" : "imperial");
  };
  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      const value = e.currentTarget.value.trim(); // Remove leading and trailing spaces

      if (value === "") {
        setErrorMessage("Please enter a city name.");
      } else {
        setCity(value);
        setErrorMessage(""); // Clear the error message if there was one
        e.currentTarget.blur();
      }
    }
  };

  return (
    <div className="app" style={{ backgroundImage: `url(${bg})` }}>
      <div className="overlay">
        <h1>Weather App</h1>
        {weather && (
          <div className="container">
            <div className="section section__inputs">
              <div className="search_box_wearther">
                <input
                  className="input_text"
                  onKeyDown={enterKeyPressed}
                  type="text"
                  name="city"
                  placeholder="Enter City.."
                />
                {errorMessage && (
                  <p className="error-message">{errorMessage}</p>
                )}
              </div>
              <button onClick={(e) => handleUnitClick(e)}>°F</button>
            </div>

            <div className="section section__temperature">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weather-icon " />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>
                  {`${weather.temp.toFixed()} °${
                    units === "metric" ? "C" : "F"
                  }`}{" "}
                </h1>
              </div>
            </div>
            {/*bottom description*/}
            <Description weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
