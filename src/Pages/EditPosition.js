import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Axios from "axios";
import { useHistory, useParams } from "react-router-dom";
import "./Department.css";

function EditPosition() {
  const [posname, setPosname] = useState("");
  const [depname, setDepname] = useState("");
  const [depid, setDepid] = useState("");
  const { position_id } = useParams();
  const [positionList, setPositionList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);

  const positionById = () => {
    Axios.get(`http://localhost:3333/positions/${position_id}`).then(
      (response) => {
        setPositionList(response.data[0]);
        setPosname(response.data[0].position_name);
        setDepid(response.data[0].dep_id);
        console.log(response.data[0]);
      }
    );
  };

  const editposition = () => {
    Axios.put("http://localhost:3333/positions", {
      position_name: posname,
      dep_id: depid,
      position_id: position_id,
    });
  };

  const datadepartment = () => {
    Axios.get("http://localhost:3333/department").then((response) => {
      setDepartmentList(response.data);
    });
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
    positionById();
    getAuth();
    datadepartment();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <h1 className="adddep">แก้ไขข้อมูลตำแหน่ง</h1>
        </Row>
        <Row>
          <Form className="dep" onSubmit={editposition}>
            <Form.Group className="mb-3">
              <Form.Label>ชื่อแผนก</Form.Label>
              <Form.Select
                value={depid}
                onChange={(e) => {
                  setDepid(e.target.value);
                }}
              >
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
                placeholder="กรอกชื่อแผนก"
                name="position_name"
                value={posname}
                onChange={(e) => {
                  setPosname(e.target.value);
                }}
              />
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

export default EditPosition;
