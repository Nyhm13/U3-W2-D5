import { useEffect, useState } from "react";
import { Card, Col, Container, Row, Spinner } from "react-bootstrap";

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
          setIsLoading(false);
        });
    };
    fetchForecast();
  }, [props.city]);

  return (
    <div>
      {isLoading && (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="fs-2">Attendere prego...</p>
        </div>
      )}
      {error && (
        <Container fluid className="text-center">
          <img src="/previsioni.png" alt="" className=" img-fluid" />
        </Container>
      )}
      {forecastData ? (
        <Container>
          <Row className="mt-5">
            <h1>Previsioni prossime ore di {forecastData.city.name}</h1>
            {forecastData.list.slice(0, 12).map((forecast, index) => {
              return (
                <Col key={index} sm={12} md={6} lg={4} className="mb-4">
                  <Card className="glass-card-dettagli bg-transparent">
                    <Card.Body
                      className={getBackgroundClass(
                        forecast.weather[0].description
                      )}
                    >
                      <Card.Title>
                        <strong className="fs-4">{forecast.dt_txt}</strong>
                      </Card.Title>
                      <Card.Text>
                        <p className="mb-0">
                          <strong className="fs-4">
                            Temperatura prevista:
                          </strong>
                          <span className="fs-4">{forecast.main.temp}°C</span>
                        </p>
                        <p className="mb-0">
                          <strong className="fs-4">Minima prevista </strong>
                          <span className="fs-4">
                            {forecast.main.temp_min}°C
                          </span>
                        </p>
                        <p className="mb-0 fs-4">
                          <strong className="fs-4">Massima prevista </strong>
                          <span className="fs-4">
                            {forecast.main.temp_max}°C
                          </span>
                        </p>
                        <p className="mb-0">
                          <strong className="fs-4">Previsto/e:</strong>
                          <span className="fs-4">
                            {forecast.weather[0].description}
                          </span>
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
        !isLoading && (
          <p className=" text-center h1">Nessun dato disponibile.</p>
        )
      )}
    </div>
  );
};

export default Dettagli;
