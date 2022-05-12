import React, { useState } from 'react';

const api = {
  key: "fc86b30a8b87ed1df4994ac0c8d20e7d",
  base: "https://api.openweathermap.org/data/2.5/weather?q="
}

function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = (e) => {
    if (e.key === "Enter") {
      fetch(`${api.base}${query}&units=imperial&appid=${api.key}`)
        .then(res => res.json())
        .then(result => {         // result is the full JSON object fetched
          setWeather(result);     // set the weather state to the JSON object
          setQuery('');           // clear the search bar
          console.log(result);
        });
    }
  }

  const dateBuilder = (d) => {
    let months = ["January", "February", "March", "April", "May", "June", "July", 
                  "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
                "Friday", "Saturday"];
    
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${month} ${date}, ${year}`
  }

  const backgroundBuilder = () => {
    if (typeof weather.main === "undefined") {    // first-use default
      return "App warm-day";
    }

    let condition = weather.weather[0].main;
    let temp = Math.round(weather.main.temp);
    let time = new Date().getHours();
    
    if (typeof weather.main == "undefined") {
      return "App warm-day";  // default to warm day background if query is invalid              
    } else {
      if (condition === "Thunderstorm" || condition === "Drizzle" || condition === "Rain") {
        return "App rain";
      } else if (condition === "Snow") {
        return "App snow";
      } else if (condition === "Haze") {
          return "App haze";
      } else if (temp >= 65 && (condition === "Clear" || condition === "Clouds") && (time >= 9 && time <= 19)) {
          return "App warm-day";
      } else if (temp < 65 && (condition === "Clear" || condition === "Clouds") && (time >= 9 && time <= 19)) {
          return "App cold-day";
      } else if (temp >= 65 && (condition === "Clear" || condition === "Clouds") && (time < 9 || time > 19)) {
          return "App warm-night";
      } else if (temp < 65 && (condition === "Clear" || condition === "Clouds") && (time < 9 || time > 19)) {
          return "App cold-night";
      } else if (time < 9 || time > 19) {
          return "App warm-night";
      } else {
          return "App warm-day";
      }
    }
  }

  return (
    <div className={backgroundBuilder()}>
      <main>
        <div className="search-box">
          <input 
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)} // get the value of typed in input
            value={query}
            onKeyPress={search}
          />
        </div>
        {(typeof weather.main != "undefined") ? (   // check for first-use and if the search query is invalid
          <div>
            <div className="location-box">
              <div className="location">{weather.name}, {weather.sys.country}</div>
              <div className="date">{dateBuilder(new Date())}</div>
            </div>
            <div className="weather-box">
              <div className="temp">
                {Math.round(weather.main.temp)}°F
              </div>
              <div className="weather">
                {weather.weather[0].main}
              </div>
            </div>
          </div>
        ) : ('')}
      </main>
    </div>
  );
}

export default App;
