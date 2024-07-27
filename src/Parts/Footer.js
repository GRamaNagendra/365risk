import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import './Footer.css';  // Custom CSS for Footer styles

function Footer() {
    return (
        <footer className="footer-custom">
            <Container className="con">
                <Row>
                    <Col xl={3} md={6} sm={12} xs={12} className="footer-section">
                        <h5>About Us</h5>
                        <p>Learn more about our company, mission, and values.</p>
                        <Link to="/about">Read more</Link>
                    </Col>
                    <Col xl={3} md={6} sm={12} xs={12} className="footer-section">
                        <h5>Contact Us</h5>
                        <ul className="list-unstyled">
                            <li><Link><FontAwesomeIcon icon={faPhone} /> (123) 456-7890</Link></li>
                            <li><Link to="/terms"><FontAwesomeIcon icon={faEnvelope} /> info@company.com</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/faq"><FontAwesomeIcon icon={faMapMarkerAlt} /> 1234 Street Name, City, Country</Link></li>
                        </ul>
                        
                    </Col>
                    <Col xl={3} md={6} sm={12} xs={12} className="footer-section">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/privacy">Privacy Policy</Link></li>
                            <li><Link to="/terms">Terms of Service</Link></li>
                            <li><Link to="/contact">Contact</Link></li>
                            <li><Link to="/faq">FAQ</Link></li>
                        </ul>
                    </Col>
                    <Col xl={3} md={6} sm={12} xs={12} className="footer-section">
                        <h5>Newsletter Signup</h5>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Control type="email" placeholder="Enter your email" />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Subscribe
                            </Button>
                        </Form>
                    </Col>
                </Row>
                <Row className="social-row">
                    <Col className="text-center">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebook} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col>
                        <p>&copy; {new Date().getFullYear()} Risk's365. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
