import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./Position.css";
import Axios from "axios";

function PositionManagement() {
  const [dep_id, setDep_id] = useState("");
  const [position_name, setPosition_name] = useState("");

  

  const [departmentList, setDepartmentList] = useState([]);
  const [positionList, setPositionList] = useState([]);

  const Addposition = () => {
    Axios.post("http://localhost:3333/positions", {

    dep_id: dep_id,
    position_name: position_name



    }).then(() => {
      setPositionList({
            ...positionList,
            dep_id: dep_id,
            position_name: position_name
            

        });
    });
  };

  const dataepartment = () => {
    Axios.get("http://localhost:3333/department").then((response) => {
      setDepartmentList(response.data);
    });
  };

  useEffect(() => {
    
    dataepartment();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <h1 className="addpos">เพิ่มข้อมูลตำแหน่ง</h1>
        </Row>
        <Row>
          <Form className="position">
            <Form.Group className="mb-3">
                <Form.Label>ชื่อแผนก</Form.Label>
                <Form.Select 
                  value={dep_id}
                  onChange={(e) => {
                    setDep_id(e.target.value); }} >
                     {departmentList.map((department) => (
                      <option value={department.dep_id}>
                        {department.dep_name}
                      </option>
                    ))}
                    </Form.Select>
              </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicTextInput">
              <Form.Label>ชื่อตำแหน่ง</Form.Label>
              <Form.Control
                    type="text"
                    placeholder="กรอกชื่อตำแหน่ง"
                    name="position_name"
                    onChange={(e) => {
                        setPosition_name(e.target.value)
                       }}
                  />
            </Form.Group>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <Button variant="danger" style={{ margin: "10px" }} onClick={() => (window.location = "/position")}>
                ยกเลิก
              </Button>
              <Button
                variant="primary"
                type="submit"
                style={{ margin: "10px" }} onClick={Addposition}
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
