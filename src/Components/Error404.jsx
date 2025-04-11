import { Button, Container } from "react-bootstrap"
import { useNavigate } from "react-router-dom"


const Error404 =()=>{
    const navigate=useNavigate()
    return(
        <Container fluid className="text-center">
                <div className=" d-flex flex-column align-items-center text-white">
                    <h1>Questo indirizzo non esiste </h1> 
                    <p className=" d-flex flex-column  w-25 ">Vuoi tornare alla home?
                    clicca sul bottone qui sotto
                    <Button variant="danger"
                    onClick={()=>{
                        navigate ("/")
                    }}>Home</Button>
                    </p>
                   
                </div>
        </Container>
    )
    
}
export default Error404