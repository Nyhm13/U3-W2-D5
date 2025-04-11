import { useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyNav from "./Components/MyNav";
import "bootstrap-icons/font/bootstrap-icons.css";
import MyFooter from "./Components/MyFooter";
import Extra from "./Components/Extra";
import Error404 from "./Components/Error404";
import Home from "./Components/Home";
import Dettagli from "./Components/dettagli";

function App() {
  const [searchValue, setSearchValue] = useState("");
  const [weatherData, setWeatherData] = useState(null); // Stato per i dati della fetch
  const [error, setError] = useState("");

  const handleSearchChange = (value) => {
    setSearchValue(value);
  };

  console.log("searchValue", searchValue);

  const fetchWeatherData = () => {
    if (searchValue.trim() === "") {
      setError("Inserire una città valida.");
      return;
    }

    setError("");
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&appid=8c213aae94d24bcb33da8a0f54e3d6e1&units=metric`
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Città non trovata");
        }
      })
      .then((data) => {
        console.log(data);
        setWeatherData(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  return (
    <BrowserRouter>
      <div className="d-flex flex-column min-vh-100">
        <header>
          <MyNav
            valore={searchValue}
            onSearchChange={handleSearchChange}
            onSearchSubmit={fetchWeatherData} // Passa la funzione di fetch
          />
        </header>
        <main className="flex-grow-1 sfondo">
          <Routes>
            <Route
              path="/"
              element={<Home weatherData={weatherData} error={error} />} // Passa i dati e gli errori a Home
            />
            <Route path="/extra" element={<Extra />} />
            <Route path="*" element={<Error404 />} />
            <Route path="/dettagli" element={<Dettagli city={searchValue} />} />
          </Routes>
        </main>
        <footer>
          <MyFooter />
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
