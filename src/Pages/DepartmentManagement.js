import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Axios from "axios";
import "./Department.css";

function DepartmentManagement() {
  const [depname, setDepname] = useState("");
  const [departmentList, setDepartmentList] = useState([]);

  const adddepartment = () => {
    Axios.post("http://localhost:3333/department", {
      dep_name: depname,
    }).then(() => {
      setDepartmentList([
        ...departmentList,{
          dep_name: depname
        }
      ])
    });
  };

  return (
    <>
      <Container>
        <Row>
          <h1 className="adddep">เพิ่มข้อมูลแผนก</h1>
        </Row>
        <Row>
          <Form className="dep">
            <Form.Group className="mb-3" controlId="formBasicTextInput">
              <Form.Label>ชื่อแผนก</Form.Label>
              <Form.Control
                type="text"
                placeholder="กรอกชื่อแผนก"
                name="depname"
                onChange={(e) => {
                  setDepname(e.target.value);
                }}
              />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="danger" style={{ margin: "10px" }} onClick={() => (window.location = "/department")}>
                ยกเลิก
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={adddepartment}
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
