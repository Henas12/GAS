import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ActivationPage = () => {
    return (
        <Container className="mt-5">
            <Row>
                <Col>
                    <h1>Registration Completed!</h1>
                    <p className="lead">Thank you for registering. To activate your account, please contact Out contact center.</p>
                    <p>If you need further assistance, please contact support.</p>
                    <Button variant="primary" href="/login">Go to Login Page</Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ActivationPage;
