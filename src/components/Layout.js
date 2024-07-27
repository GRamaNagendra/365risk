import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faHome, faBuilding, faBell, faInfoCircle, faUserCircle, faPlusCircle, faCaretDown } from '@fortawesome/free-solid-svg-icons'; // Updated FontAwesome icons
import 'bootstrap/dist/css/bootstrap.min.css';
import './Layout.css'; // Custom CSS file for layout styles
import Footer from '../Parts/Footer';
import image1 from '../images/image copy 2.png'

function Layout() {
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsMobile(true);
            } else {
                setIsMobile(false);
            }
        };

        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            <Navbar expand="lg" className="navbar-custom sticky-top">
                <Container className="container">
                    <Navbar.Brand as={Link} to="/" className="navbar-brand-custom">
                   <img className='logo' src={image1}/>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav">
                        <span className="navbar-toggler-icon"></span>
                    </Navbar.Toggle>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className={isMobile ? 'ms-auto mb-2 mb-lg-0' : 'me-auto mb-2 mb-lg-0'}>
                            <Nav.Link as={Link} className="nav-link-custom" to="/">
                                <FontAwesomeIcon className="iconcolor" icon={faHome} /> Home
                            </Nav.Link>
                            <Nav.Link as={Link} className="nav-link-custom" to="/uindustries">
                                <FontAwesomeIcon className="iconcolor" icon={faBuilding} /> Industries
                            </Nav.Link>
                            <Nav.Link as={Link} className="nav-link-custom" to="/about">
                                <FontAwesomeIcon className="iconcolor" icon={faInfoCircle} /> About Us
                            </Nav.Link>
                            <Nav.Link as={Link} className="nav-link-custom" to="/notifications">
                                <FontAwesomeIcon className="iconcolor" icon={faBell} /> Notifications
                            </Nav.Link>
                            <Nav.Link as={Link} className="nav-link-custom" to="/admin">
                                <FontAwesomeIcon className="iconcolor" icon={faUserCircle} /> Admin
                            </Nav.Link>
                            <NavDropdown title={<span><FontAwesomeIcon className="iconcolor" icon={faCaretDown} /> More</span>} id="basic-nav-dropdown" className="nav-link-custom">
                                <NavDropdown.Item as={Link} to="/risks">
                                    <FontAwesomeIcon className="iconcolor" icon={faPlusCircle} /> Add Risk
                                </NavDropdown.Item>
                                <NavDropdown.Item as={Link} to="/industries">
                                    <FontAwesomeIcon className="iconcolor" icon={faPlusCircle} /> Add Industries
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Outlet />

            <Footer />
        </>
    );
}

export default Layout;