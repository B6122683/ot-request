import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Axios from "axios";
import "./Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");

  // Axios.defaults.withCredentials = true;

  // const loginadmin = () => {
  //   Axios.post("http://localhost:3333/login", {
  //     username: username,
  //     password: password,
  //   }).then((response) => {
  //     if (response.data.message) {
  //       setLoginStatus(response.data.message);
  //     } else {
  //       setLoginStatus(response.data[0].username);
  //     }
  //   });
  // };

  // useEffect(() => {
  //   Axios.get("http://localhost:3333/login").then((response) => {
  //     if (response.data.loggedIn === true) {
  //       setLoginStatus(response.data.user[0].username);
  //     }
  //   });
  // }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsonData = {
      emp_username: data.get("username"),
      emp_password: data.get("password"),
    };

    fetch("http://localhost:3333/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(jsonData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status == "ok") {
          window.location = "/employee";
        } else {
          alert("login failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  return (
    <>
      <Container>
        <Row className="logincard">
          <Col className="loginleft col-md-6 d-md-block d-none"></Col>
          <Col className="loginright col-md-6">
            <h2 style={{ textAlign: "center" }}>Login</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formBasicUsername" >
                <Form.Label>User Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  name="username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                LOGIN
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <h1>{loginStatus}</h1>
    </>
  );
}

export default Login;
