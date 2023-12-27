

const makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`

const getFormattedWeatherData = async (city, units = "metric") => {
  console.log(process.env.REACT_APP_API_KEY);

  const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_API_KEY}&units=${units}`;
  console.log(URL,"url")

    const response = await fetch(URL);
    const data = await response.json();
    if (data?.cod === '404') {
      
      return null;
    }
    
    const {
      weather,
      main: { temp, feels_like, temp_min, temp_max, pressure, humidity },
      wind: { speed },
      sys:{country},
      name
    } = data;

    const {description,icon} = weather[0]

    return {
      description,iconURL:makeIconURL(icon),temp,feels_like,temp_max,temp_min,humidity,speed,country,name,pressure
    }
 
};

export { getFormattedWeatherData };
