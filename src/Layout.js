import { Link, Outlet } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';


function Layout(){

return(

    <>


<Navbar  expand="lg" className="bg-primary navbar-dark">
      <Container>
        <Navbar.Brand href="#home">Risk's365</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link className="fs-4 fw-bold " href="/">Home</Nav.Link>
          
            <NavDropdown className="fs-4 fw-bold " title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Aboutus">Action</NavDropdown.Item>
              <NavDropdown.Item href="#">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>


<Outlet/>
    </>
);

}
export default Layout;