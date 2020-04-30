import React, { useState } from "react";

const api = {
  key: "768a29c0ee60860f6c8f314252b34337",
  base: "https://api.openweathermap.org/data/2.5/"
};

const dateBuilder = d => {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();
  return `${day} ${date} ${month} ${year}`;
};

export default function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState("");

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(res => res.json())
        .then(result => {
          setWeather(result);
          setQuery("");
          console.log(result);
        });
    }
  };

  return (
    <div className="app">
      <main>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
          />
        </div>
        {typeof weather.main != "undefined" ? (
          <div>
            <div className="location-box">
              <div className="location">
                {weather.name}, {weather.sys.country}
              </div>
              <div className="date">{dateBuilder(new Date())} </div>
            </div>
            <div className="weather-box">
              <div className="temp">15°C</div>
              <div className="weather"> Sunny </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}
