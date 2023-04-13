import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom'
import { useState } from 'react';
import CartSidebar from '../components/CartSidebar'

const NavBar = () => {

    const [show, setShow] = useState(false)
    const handleClose = () => {
        setShow(false)
    }


    return ( 
        <>
            <Navbar bg="primary" variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">E-comerce</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/login"><i className="fa-solid fa-user"></i></Nav.Link>
                        <Nav.Link as={Link} to="/purchases"><i className="fa-solid fa-store"></i></Nav.Link>
                        <Nav.Link
                            onClick={()=>setShow(true)}
                        ><i className="fa-solid fa-cart-shopping"></i></Nav.Link>
                    </Nav>
                </Container>
           </Navbar>
           <CartSidebar 
            show={ show }
            handleClose = { handleClose } 
           />
        </>
    );
};

export default NavBar;