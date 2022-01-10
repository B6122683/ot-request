import React, { Component } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Login.css";

function Login() {
  return (
    <>
      <Container>
        <Row className="logincard">
          <Col className="loginleft col-md-6 d-md-block d-none"></Col>
          <Col className="loginright col-md-6">
            <h2 style={{ textAlign: "center"}}>Login</h2>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Remember Me" />
              </Form.Group>
              <Button variant="primary" type="submit">
                LOGIN
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
