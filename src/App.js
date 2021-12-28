import { useEffect, useState } from "react";
import "./App.css";
import DataLeft from "./Components/DataLeft/DataLeft";
import { countries } from 'country-data';
import DataRight from "./Components/DataRight/DataRight";
import BottomPart from "./Components/BottomPart/BottomPart";
import ErrorMain from './Assets/screen.png';

function App() {
  const [iconCode, setIconCode] = useState('');
  const [temp, setTemp] = useState('');
  const [dateFinal, setDateFinal] = useState('');
  const [dateFinalDay, setDateFinalDay] = useState('');
  const [wind, setWind] = useState('');
  const [humidity, setHumidity] = useState('');
  const [rain, setRain] = useState('');
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [sunrise, setSunrise] = useState(new Date());
  const [sunset, setSunset] = useState(new Date());
  const [sunriseTimeState, setSunriseTimeState] = useState('');
  const [sunsetTimeState, setSunsetTimeState] = useState('');
  const [maxtemp, setMaxtemp] = useState('');
  const [mintemp, setMintemp] = useState('');
  const [feelsLike, setFeelsLike] = useState('');
  const [desc, setDesc] = useState('');
  const [celcius, setCelcius] = useState('metric');
  const [isToggled, setIsToggled] = useState(false);
  const [query, setQuery] = useState('');
  const [coords, setCoords] = useState(true);
  const [finalSearch, setFinalSearcch] = useState('');
  const [prevState, setPrevState] = useState('');
  const [prevCoords, setPrevCoords] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isToggled) {
      setCelcius('imperial');
    } else {
      setCelcius('metric');
    }
  }, [isToggled]);

  useEffect(() => {

    if (coords) {
      navigator.geolocation.getCurrentPosition((position) => {

        const getWeatherCoords = async (lat, lon) => {
          const apiCoords = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${celcius}&appid=${process.env.REACT_APP_API_KEY}`);

          const dataCoords = await apiCoords.json();

          setError(false);

          shortArray(dataCoords);
        };

        getWeatherCoords(position.coords.latitude, position.coords.longitude);

      },
        function (error) {
          if (error.code === error.PERMISSION_DENIED)
            console.log("Location Permission not granted! ");
          setError(true);
        }
      );
    } else {
      const getWeather = async () => {

        const api = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${finalSearch}&units=${celcius}&appid=${process.env.REACT_APP_API_KEY}`);

        const data = await api.json();

        if (data.message !== 'city not found') {
          setPrevState(finalSearch);
          shortArray(data);
          setQuery('');
          setError(false);
          setPrevCoords(false);
        } else {
          alert('No result found for your search!');
          if (prevState !== '' && prevCoords === false)
            setFinalSearcch(prevState);
          else
            setCoords(true);
        }

      };

      getWeather();

    }

  }, [celcius, coords, finalSearch, prevState, prevCoords]);

  const shortArray = (dataFull) => {
    var weatherDateWise = [];
    var weatherForecast = [];

    const data = dataFull.list;

    let lastDate = data[0].dt_txt.substring(0, 10);

    weatherDateWise.push(data[0]);

    for (let i = 0; i < data.length; i++) {
      if (lastDate !== data[i].dt_txt.substring(0, 10)) {
        lastDate = data[i].dt_txt.substring(0, 10);
        weatherDateWise.push(data[i]);
      }
    }

    let dat = weatherDateWise[0].dt_txt.substring(0, 10);

    let date = new Date(dat);

    let shortMonth = date.toLocaleString('en-us', { month: 'short' });

    let dateDay = date.toLocaleString("en-US", { "weekday": "long" });

    let finalDate = dat.substring(8) + " " + shortMonth + ", " + dat.substring(0, 4);

    setIconCode(weatherDateWise[0].weather[0].icon);

    setTemp(Math.round(weatherDateWise[0].main.temp));

    setDateFinal(finalDate);

    setDateFinalDay(dateDay);

    setWind(weatherDateWise[0].wind.speed);

    setHumidity(weatherDateWise[0].main.humidity);

    setRain(weatherDateWise[0].pop);

    for (let j = 1; j < weatherDateWise.length; j++) {
      let dayDate = new Date(weatherDateWise[j].dt_txt.substring(0, 10)).toLocaleString("en-US", { "weekday": "long" });
      weatherForecast.push(
        {
          "temperature": Math.round(weatherDateWise[j].main.temp),
          "icon": weatherDateWise[j].weather[0].icon,
          "day": dayDate.substring(0, 3),
          "date": weatherDateWise[j].dt_txt.substring(0, 10)
        }
      );
    }

    setForecast(weatherForecast);

    setCity(dataFull.city.name);

    setCountry(countries[dataFull.city.country].name);

    var sunriseTime = new Date(null);
    sunriseTime.setSeconds(dataFull.city.sunrise + dataFull.city.timezone);
    var sunriseResult = sunriseTime.toISOString().substring(11, 16);

    setSunrise(new Date(dataFull.city.sunrise * 1000));

    setSunset(new Date(dataFull.city.sunset * 1000));

    setSunriseTimeState(sunriseResult + ' AM');

    var sunsetTime = new Date(null);
    sunsetTime.setSeconds(dataFull.city.sunset + dataFull.city.timezone - 43200);
    var sunsetResult = sunsetTime.toISOString().substring(11, 16);

    setSunsetTimeState(sunsetResult + ' PM');

    setMaxtemp(Math.round(weatherDateWise[0].main.temp_max));

    setMintemp(Math.round(weatherDateWise[0].main.temp_min));

    setFeelsLike(Math.round(weatherDateWise[0].main.feels_like));

    setDesc(weatherDateWise[0].weather[0].description.charAt(0).toUpperCase() + weatherDateWise[0].weather[0].description.slice(1));

  }

  return <div className="app">
    <div className="app__Top">
      {
        error ?
          <img src={ErrorMain} alt="error page" className="app__Top__Error" /> :
          <DataLeft iconCode={iconCode} temp={temp} dateFinal={dateFinal} dateFinalDay={dateFinalDay} wind={wind} humidity={humidity} rain={rain} forecast={forecast} isToggled={isToggled} onToggle={() => setIsToggled(!isToggled)} />
      }

      <DataRight city={city} country={country} sunrise={sunrise} sunset={sunset} sunriseTimeState={sunriseTimeState} sunsetTimeState={sunsetTimeState} maxtemp={maxtemp} mintemp={mintemp} desc={desc} feelsLike={feelsLike} isToggled={isToggled} setQuery={setQuery} query={query} setCoords={setCoords} setFinalSearch={setFinalSearcch} error={error} setPrevCoords={setPrevCoords} />
    </div>

    <BottomPart />

  </div>;
}

export default App;
