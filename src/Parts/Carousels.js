import Carousel from 'react-bootstrap/Carousel';
import sampleimage from '../images/risk2.jpeg';
import sampleimage2 from '../images/risk1.avif';
import sampleimage3 from '../images/risk3.webp';
import '../App.css';
function Carousels1() {

  const style={



    
  }



  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block  ciwh"
          src={sampleimage}
          alt="First slide1"
        />
        <Carousel.Caption>
          <h5>First slide label11</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block ciwh"
          src={sampleimage2}
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block ciwh"
          src={sampleimage3}
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels1;