import React, { useState } from 'react';

const api = {
  key: "ac7e9009effe6d900738463e7f8eb303",
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

    return `${day} ${date} ${month} ${year}`
  }
  return (
    <div className={(typeof weather.main != "undefined") 
                      ? ((weather.main.temp >= 65)      // if the fetched weather is 65 degrees or higher 
                        ? "App warm"                        // use the warm background
                        : "App cold")                       // otherwise use the cold background
                      : "App warm"}                     // default with the cold background
    >                     
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
