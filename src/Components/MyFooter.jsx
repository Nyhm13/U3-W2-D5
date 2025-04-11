import { Container } from "react-bootstrap";
import "../App.css";

const MyFooter = () => {
  const year = new Date().getFullYear();

  return (
    <Container fluid className=" sfondoNav mb-0 p-4 text-center">
      <p className=" m-0">Epicode-{year}</p>
    </Container>
  );
};
export default MyFooter;
