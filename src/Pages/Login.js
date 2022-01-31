import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Axios from "axios";
import "./Login.css";
import Swal from "sweetalert2";

function Login() {
  const [emp_username, setUsername] = useState("");
  const [emp_password, setPassword] = useState("");

  const [loginStatus, setLoginStatus] = useState("");
  var username = document.getElementById("username");
  var password = document.getElementById("password");

  // Axios.defaults.withCredentials = true;

  const loginadmin = () => {
    Axios.post("http://localhost:3333/login", {
      emp_username: emp_username,
      emp_password: emp_password,
    }).then((response) => {
      if (response.data.status == "ok") {
        localStorage.setItem("token", response.data.token);
        window.location = "/";
      } else if (!emp_username && !emp_password) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "กรุณากรอกชื่อผู้ใช้!",
          icon: "error",
        });
      } else if (!emp_username && emp_password) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "กรุณากรอกชื่อผู้ใช้!",
          icon: "error",
        });
      } else if (emp_username && !emp_password) {
        Swal.fire({
          title: "เกิดข้อผิดพลาด!",
          text: "กรุณากรอกรหัสผ่าน!",
          icon: "error",
        });
      } else {
        Swal.fire({
          title: "เข้าสู่ระบบไม่สำเร็จ!",
          text: "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง!",
          icon: "error",
        });
      }
      // if (response.data.message) {
      //   alert(response.data.message);
      // } else {
      //   window.location = "/";
      // }
    });
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);

  //   const jsonData = {
  //     emp_username: data.get("username"),
  //     emp_password: data.get("password"),
  //   };

  //   fetch("http://localhost:3333/login", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(jsonData),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.status == "ok") {
  //         window.location = "/employee";
  //       } else {
  //         alert("login failed");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  // };
  return (
    <>
      <Container>
        <Row className="logincard p-3 p-md-3 col-md-10 col-10">
          <Col className="loginleft col-md-6 d-md-block d-none"></Col>
          <Col className="loginright col-md-6 py-5 px-4 p-md-5">
            <h2 style={{ textAlign: "center" }}>เข้าสู่ระบบ</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>ชื่อผู้ใช้</Form.Label>
                <Form.Control
                  type="text"
                  id="username"
                  placeholder="กรอกชื่อผู้ใช้"
                  name="emp_username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>รหัสผ่าน</Form.Label>
                <Form.Control
                  type="password"
                  id="password"
                  placeholder="กรอกรหัสผ่าน"
                  name="emp_password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Form.Group className="my-4">
                <Button
                  variant="primary"
                  style={{ width: "100%" }}
                  onClick={loginadmin}
                >
                  เข้าสู่ระบบ
                </Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login;
