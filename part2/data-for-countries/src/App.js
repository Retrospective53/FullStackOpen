import { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [weather, setWeather] = useState([]);
  const [timer, setTimer] = useState(null);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data);
    })
  }, [])

  const filteredCountries = countries.filter(country => 
    country.name.common.toLowerCase().includes(searchCountry.toLowerCase()))

  useEffect(() => {
      if (filteredCountries.length === 1) {

        console.log('effect');
        axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${filteredCountries[0].capital[0]}&appid=${api_key}`)
        .then(response => {
          setWeather(response.data)
        })
      }
  }, [filteredCountries.length])


 

  const handleNameChange = (e) => {
    setInputValue(e.target.value);
    clearTimeout(timer);
    const newTimer = setTimeout(() => setSearchCountry(e.target.value), 1000) ;

    setTimer(newTimer)
  }
  
  return(
    <div>
      find countries <input type="text" onChange={handleNameChange} value={inputValue}/>
      <div>
        {filteredCountries.length === 1 ? 
        <>
          <div>
            <h2>{filteredCountries[0].name.common}</h2>
            <h2>{filteredCountries[0].name.official}</h2>
            <p>capital: {filteredCountries[0].capital[0]}</p>
            <p>area: {filteredCountries[0].area}</p>
            <h3>languages:</h3>
            <ul>
              {Object.keys(filteredCountries[0].languages).map(key =>
                <li key={key}>{filteredCountries[0].languages[key]}</li>)}
            </ul>
            <p style={{ fontSize: '200px', margin: '0px' }}>{filteredCountries[0].flag}</p>
          </div>
          {weather.main &&
          <div>
            <h2>Weather in {filteredCountries[0].capital[0]}</h2>
            <p>Temperature: {weather.main.temp}</p>
            <p>Humidity: {weather.main.humidity}</p>
            <p>Wind: {weather.wind.speed} m/s</p>
            <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="weather icon" />
            <p>Weather: {weather.weather[0].description}</p>
          </div>
          }
        </>
        :filteredCountries.length < 9 ? filteredCountries.map(country =>
           <p key={country.name.common}>{country.name.common} <button onClick={() => {setSearchCountry(country.name.common); setInputValue(country.name.common)}}>show</button></p>) 
           : <p>Too many matches, specify another filter</p> }
      </div>
      <button onClick={() => console.log(weather)}>weather</button>
    </div>
  )
}

export default App;
