import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'

const NavBar = () => {

    return ( 
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">E-comerce</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/login"><i class="fa-solid fa-user"></i></Nav.Link>
                        <Nav.Link as={Link} to="/purchases"><i class="fa-solid fa-store"></i></Nav.Link>
                        <Nav.Link><i class="fa-solid fa-cart-shopping"></i></Nav.Link>
                    </Nav>
                </Container>
           </Navbar>
    );
};

export default NavBar;