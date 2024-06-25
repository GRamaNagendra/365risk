import React from 'react';
import { Carousel } from 'react-bootstrap';
import sampleImage1 from '../images/risk2.jpeg'; // Example image 1
import sampleImage2 from '../images/risk3.webp'; // Example image 2
import '../App.css';

function Carousels1() {
  return (
    <Carousel className="custom-carousel" variant="dark" fade>
      <Carousel.Item>
        <img
          className="d-block mx-auto carousel-image"
          src={sampleImage1}
          alt="First slide"
        />
        <Carousel.Caption className="carousel-caption">
          <h5>First Slide Label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block mx-auto carousel-image"
          src="#" // Replace with correct image source
          alt="Second slide"
        />
        <Carousel.Caption className="carousel-caption">
          <h5>Second Slide Label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block mx-auto carousel-image"
          src={sampleImage2}
          alt="Third slide"
        />
        <Carousel.Caption className="carousel-caption">
          <h5>Third Slide Label</h5>
          <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels1;
