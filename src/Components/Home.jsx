import { CardBody, CardText, Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  console.log("data citta", props.weatherData);

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

  const navigate = useNavigate();
  return (
    <div>
      {/* {props.isloading && <Spinner animation="border" variant="primary" />} */}

      {props.error && (
        <h2 className="text-danger text-center">{props.error}</h2>
      )}
      {props.weatherData ? (
        <Card className=" w-75 mx-auto mt-5 bg-secondary-subtle glass-card">
          <Card.Body
            className={getBackgroundClass(
              props.weatherData.weather[0].description
            )}
          >
            <Card.Title className="text-center fs-3">
              Meteo di {props.weatherData.name}
            </Card.Title>
            <Card.Text className=" d-flex justify-content-center align-items-center">
              <img
                className=" rounded-top"
                src={`https://openweathermap.org/img/wn/${props.weatherData.weather[0].icon}@2x.png`}
                alt={props.weatherData.weather[0].description}
              />
              <p className=" mb-0 ps-3 fs-3 ">
                {props.weatherData.main.temp}°C Attuale
              </p>
            </Card.Text>
            <Button variant="primary" onClick={() => navigate("/dettagli")}>
              Piu Dettagli
            </Button>
          </Card.Body>
          <Row className="text-center mt-3 ">
            <Col sm={4}>
              <p className=" fw-semibold mb-0">Minima</p>
              <i className="bi bi-thermometer-snow text-info fs-5"></i>
              <span className="ms-1 fs-5">
                {props.weatherData.main.temp_min}°C
              </span>
            </Col>
            <Col sm={4}>
              <p className=" fw-semibold mb-0">Massima</p>
              <i className="bi bi-thermometer-half text-danger fs-5"></i>
              <span className="ms-1 fs-5">
                {props.weatherData.main.temp_max}°C
              </span>
            </Col>
            <Col sm={4}>
              <p className=" fw-semibold mb-0">Percepiti</p>
              <i className="bi bi-thermometer fs-5"></i>
              <span className="ms-1 fs-5">
                {props.weatherData.main.feels_like}°C
              </span>
            </Col>
          </Row>
          <Row className="text-center mt-3 ">
            <Col sm={4}>
              <p className=" fw-semibold mb-0">Vento</p>
              <i className="bi bi-wind  text-secondary fs-5"></i>
              <span className="ms-1 fs-5">
                {props.weatherData.wind.speed}km/h
              </span>
            </Col>
            <Col sm={4}>
              <p className=" fw-semibold mb-0">Umidità</p>
              <i className="bi bi-droplet text-info fs-5"></i>
              <span className="ms-1 fs-5">
                {props.weatherData.main.humidity}%
              </span>
            </Col>
            <Col sm={4}>
              <p className=" fw-semibold mb-0">Nuvole</p>
              <i className="bi bi-cloud fs-5"></i>
              <span className="ms-1 fs-5">{props.weatherData.clouds.all}%</span>
            </Col>
          </Row>
          <Row className="text-center my-3 ">
            <Col sm={4}>
              <p className=" fw-semibold mb-0">Alba</p>
              <i className="bi bi-sunrise  text-warning fs-5"></i>
              <span className="ms-1 fs-5">
                {new Date(
                  props.weatherData.sys.sunrise * 1000
                ).toLocaleTimeString()}
              </span>
            </Col>
            <Col sm={4}>
              <p className=" fw-semibold mb-0">Tramonto</p>
              <i className="bi bi-sunset text-danger fs-5"></i>
              <span className="ms-1 fs-5">
                {new Date(
                  props.weatherData.sys.sunset * 1000
                ).toLocaleTimeString()}
              </span>
            </Col>
            <Col sm={4}>
              <p className=" fw-semibold mb-0">Nazione</p>
              <i className="bi bi-flag fs-5"></i>
              <span className="ms-1 fs-5">{props.weatherData.sys.country}</span>
            </Col>
          </Row>
        </Card>
      ) : (
        <div className="text-white text-center mt-5">
          <h1>EpiMeteo</h1>
          <p className="h2">Inserisci una città per vedere il meteo.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
