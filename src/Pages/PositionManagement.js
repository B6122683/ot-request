import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Position.css";
import Axios from "axios";

function PositionManagement() {
  const [dep_id, setDep_id] = useState("");
  const [position_name, setPosition_name] = useState("");

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

  const Addposition = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() == false) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (dep_id == "" || position_name == "") {
      setValidated(true);
    } else {
      e.preventDefault();
      const formData = new FormData();
      formData.append("dep_id", dep_id);
      formData.append("position_name", position_name);
      try {
        await Axios.post("/positions", formData);
        window.location = "/position";
      } catch (err) {
        if (err.response.status == 500) {
          setMessage("There was a problem with the server");
        } else {
          setMessage(err.response.data.msg);
        }
      }
    }
  };

  const dataepartment = () => {
    Axios.get("http://localhost:3333/department").then((response) => {
      setDepartmentList(response.data);
    });
  };

  useEffect(() => {
    getAuth();
    dataepartment();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <h1 className="addpos">เพิ่มข้อมูลตำแหน่ง</h1>
        </Row>
        <Row>
          <Form
            className="position"
            onSubmit={Addposition}
            noValidate
            validated={validated}
          >
            <Form.Group className="mb-3">
              <Form.Label>ชื่อแผนก</Form.Label>
              <Form.Select
                value={dep_id}
                required
                onChange={(e) => {
                  setDep_id(e.target.value);
                }}
              >
                <option value="">กรุณาเลือก</option>
                {departmentList.map((department) => (
                  <option value={department.dep_id}>
                    {department.dep_name}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                กรุณากรอกชื่อแผนก
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTextInput">
              <Form.Label>ชื่อตำแหน่ง</Form.Label>
              <Form.Control
                type="text"
                required
                placeholder="กรอกชื่อตำแหน่ง"
                name="position_name"
                onChange={(e) => {
                  setPosition_name(e.target.value);
                }}
              />
              <Form.Control.Feedback type="invalid">
                กรุณากรอกชื่อตำแหน่ง
              </Form.Control.Feedback>
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button
                variant="danger"
                style={{ margin: "10px" }}
                onClick={() => (window.location = "/position")}
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

export default PositionManagement;
