import React, { useState, useEffect } from "react";
import LocationDetails from "./LocationDetails";
import ForecastSummaries from "./ForecastSummaries";
import ForecastDetails from "./ForecastDetails";
import "../styles/App.css";
import getForecast from "../requests/getForecast";
import SearchForm from "./SearchForm";

function App() {
  const [forecasts, setForecasts] = useState([]);
  const [location, setLocation] = useState({ city: "", country: "" });
  const [selectedDate, setSelectedDate] = useState(0);
  const selectedForecast = forecasts.find(
    (forecast) => forecast.date === selectedDate
  );
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleForecastSelect = (date) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    getForecast(
      setSelectedDate,
      setForecasts,
      setLocation,
      "",
      setErrorMessage
    );
  }, []);

  const handleCitySearch = () => {
    getForecast(
      setSelectedDate,
      setForecasts,
      setLocation,
      searchText,
      setErrorMessage
    );
  };

  return (
    <div className="weather-app">
      <LocationDetails
        city={location.city}
        country={location.country}
        errorMessage={errorMessage}
      />
      <SearchForm
        searchText={searchText}
        setSearchText={setSearchText}
        onSubmit={handleCitySearch}
      />
      {!errorMessage && (
        <>
          <ForecastSummaries
            forecasts={forecasts}
            onForecastSelect={handleForecastSelect}
          />
          {selectedForecast && <ForecastDetails forecast={selectedForecast} />}
        </>
      )}
    </div>
  );
}

export default App;
