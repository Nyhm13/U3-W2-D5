import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import { Link, useLocation } from "react-router-dom";

function MyNav(props) {
  const [showSearch, setShowSearch] = useState(false);

  const location = useLocation();
  console.log("MITROVO IN", location);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearchSubmit = () => {
    props.onSearchSubmit(); // Usa la funzione passata da App per fare la fetch
  };

  return (
    <Navbar collapseOnSelect expand="lg" className="sfondoNav">
      <Container fluid>
        <Link
          to="/"
          className={
            location.pathname === "/"
              ? "nav-link active d-flex align-items-center text-white"
              : "nav-link  d-flex align-items-center pe-1"
          }
        >
          <img
            alt="Meteo Logo"
            src="/logo meteo.png"
            width="100"
            height="100"
            className="d-inline-block align-top"
          />
          Home
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link
              to="/dettagli"
              className={
                location.pathname === "/dettagli"
                  ? "nav-link active text-white "
                  : "nav-link"
              }
            >
              Previsioni
            </Link>
            <Link
              className={
                location.pathname === "/extra"
                  ? "nav-link active text-white "
                  : "nav-link"
              }
              to="/extra"
            >
              Extra per stefano
            </Link>
          </Nav>

          <Button variant="dark" className="mx-2" onClick={toggleSearch}>
            <i className="bi bi-search"></i>
          </Button>
          {showSearch && (
            <Form className="d-flex mt-3 mt-lg-0">
              <InputGroup>
                <Form.Control
                  type="search"
                  placeholder="Cerca una città"
                  aria-label="Search"
                  value={props.valore}
                  onChange={(e) => {
                    props.onSearchChange(e.target.value);
                  }}
                />
                <Button variant="danger" onClick={handleSearchSubmit}>
                  Cerca
                </Button>
              </InputGroup>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default MyNav;
