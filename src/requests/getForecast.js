import axios from "axios";

const getForecast = (
  setSelectedDate,
  setForecasts,
  setLocation,
  searchText,
  setErrorMessage
) => {
  let endpoint = "https://cmd-shift-weather-app.onrender.com/forecast";

  if (searchText) {
    endpoint += `?city=${searchText}`;
  }
  axios
    .get(endpoint)
    .then((response) => {
      setSelectedDate(response.data.forecasts[0].date);
      setForecasts(response.data.forecasts);
      setLocation(response.data.location);
      setErrorMessage("");
    })
    .catch((error) => {
      const { status } = error.response;
      if (status === 404) {
        /* eslint-disable-next-line no-console */
        setErrorMessage("No such town or city, try again!");
        console.error("Location is not valid", error);
      }

      if (status === 500) {
        /* eslint-disable-next-line no-console */
        setErrorMessage("Oops, server error, try again later.");
        console.error("Server error", error);
      }
    });
};

export default getForecast;
