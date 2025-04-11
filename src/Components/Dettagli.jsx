import { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

const Dettagli = (props) => {
  const [forecastData, setForecastData] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  console.log("data citta", props.city);

  const getBackgroundClass = (description) => {
    if (description.includes("clear")) {
      return "soleggiato";
    } else if (description.includes("cloud")) {
      return "nuvoloso";
    } else if (description.includes("rain")) {
      return "pioggia";
    } else if (description.includes("snow")) {
      return "snowy";
    } else {
      return "default";
    }
  };

  useEffect(() => {
    const fetchForecast = () => {
      fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${props.city}&appid=8c213aae94d24bcb33da8a0f54e3d6e1&units=metric`
      )
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Città non trovata");
          }
        })
        .then((data) => {
          console.log("DATA FETCH DETTAGLI", data);
          setIsLoading(false);
          setError(false);
          setForecastData(data);
        })
        .catch((err) => {
          console.log("errore", err);
          setError(true);
        });
    };
    fetchForecast();
  }, [props.city]);

  return (
    <div>
      {isLoading && <p>Caricamento...</p>}
      {error && (
        <p className="text-danger text-center fs-1">sono caduto malato</p>
      )}
      {forecastData ? (
        <Container>
          <Row className="mt-5">
            <h1>Previsioni prossime ore di {forecastData.city.name}</h1>
            {forecastData.list.slice(0, 12).map((forecast, index) => {
              return (
                <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                  <Card className="glass-card-dettagli">
                    <Card.Body
                      className={getBackgroundClass(
                        forecast.weather[0].description
                      )}
                    >
                      <Card.Title>
                        <strong>{forecast.dt_txt}</strong>
                      </Card.Title>
                      <Card.Text>
                        <p className="mb-0">
                          <strong>Temperatura prevista:</strong>{" "}
                          {forecast.main.temp}°C
                        </p>
                        <p className="mb-0">
                          <strong>Minima prevista </strong>:{" "}
                          {forecast.main.temp_min}°C
                        </p>
                        <p className="mb-0">
                          <strong>Massima prevista </strong>:{" "}
                          {forecast.main.temp_max}°C
                        </p>
                        <p className="mb-0">
                          <strong>Previsto/e:</strong>{" "}
                          {forecast.weather[0].description}
                        </p>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
      ) : (
        !isLoading && <p className=" text-center">Nessun dato disponibile.</p>
      )}
    </div>
  );
};

export default Dettagli;
