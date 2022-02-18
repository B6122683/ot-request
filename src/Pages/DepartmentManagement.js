import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import "./Department.css";

function DepartmentManagement() {
  const [dep_name, setDepname] = useState("");
  const [departmentList, setDepartmentList] = useState([]);
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState("");

  const getAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      Axios.get("http://localhost:3333/authen", {
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((response) => {
        if (response.data.decoded.user.role_id != 3) {
          localStorage.removeItem("token");
          window.location = "/login";
        }
      });
    } else {
      window.location = "/login";
    }
  };


  const adddepartment = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() == false) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (dep_name == "") {
      setValidated(true);
    } else {
      const formData = new FormData();
      formData.append("dep_name", dep_name);
      try {
        await Axios.post("/department", formData);
        window.location = "/department";
      } catch (err) {
        if (err.response.status == 500) {
          setMessage("There was a problem with the server");
        } else {
          setMessage(err.response.data.msg);
        }
      }
    }
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <h1 className="adddep">เพิ่มข้อมูลแผนก</h1>
        </Row>
        <Row>
          <Form
            className="dep"
            onSubmit={adddepartment}
            noValidate
            validated={validated}
          >
            <Form.Group className="mb-3" controlId="formBasicTextInput">
              <Form.Label>ชื่อแผนก</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="กรอกชื่อแผนก"
                name="dep_name"
                onChange={(e) => {
                  setDepname(e.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                กรุณากรอกชื่อแผนก
              </Form.Control.Feedback>
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="danger"
                style={{ margin: "10px" }}
                onClick={() => (window.location = "/department")}
              >
                ยกเลิก
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{ margin: "10px" }}
              >
                ยืนยัน
              </Button>
            </div>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default DepartmentManagement;
