import React from "react";
import { Container, Row, Col } from "reactstrap";
import heroImg from "../../assests/images/kids-learning.png";
import "./hero-section.css";

const HeroSection = () => {
  return (
    <section>
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2 className="mb-4 hero__title">
               About Us 
              </h2>
              <p>We are dedicated to providing a nurturing and educational environment for young children.</p>
        <p>Our curriculum focuses on fostering creativity, social skills, and a love for learning.</p>
        <p>At Bright School, we believe in the power of play-based learning to help children develop holistically.</p>
            </div>
           
          </Col>

          <Col lg="6" md="6">
            <img src={heroImg} alt="" className="w-100 hero__img" />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default HeroSection;
