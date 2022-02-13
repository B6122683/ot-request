import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import "./Department.css";

function EditDepartment() {
  const [depname, setDepname] = useState("");
  const { dep_id } = useParams();
  const [departmentList, setDepartmentList] = useState([]);
  const [validated, setValidated] = useState(false);
  const [message, setMessage] = useState("");

  const departmentById = () => {
    Axios.get(`http://localhost:3333/department/${dep_id}`).then((response) => {
      setDepartmentList(response.data[0]);
      setDepname(response.data[0].dep_name);
      console.log(response.data[0]);
    });
  };

  const editdepartment = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (depname == "") {
      setValidated(true);
    } else {
      Axios.put("http://localhost:3333/department", {
        dep_name: depname,
        dep_id: dep_id,
      });
    }
  };

  const getAuth = () => {
    const token = localStorage.getItem("token");

    Axios.get("/authen", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      console.log(response);
      if (response.data.decoded.user.role_id != 1) {
        window.location = "/";
      }
    });
  };

  useEffect(() => {
    departmentById();
    getAuth();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <h1 className="adddep">แก้ไขข้อมูลแผนก</h1>
        </Row>
        <Row>
          <Form
            className="dep"
            onSubmit={editdepartment}
            noValidate
            validated={validated}
          >
            <Form.Group className="mb-3" controlId="formBasicTextInput">
              <Form.Label>ชื่อแผนก</Form.Label>
              <Form.Control
                type="text"
                placeholder="กรอกชื่อแผนก"
                name="dep_name"
                value={depname}
                required
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

export default EditDepartment;
