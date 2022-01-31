import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Table,
  Button,
  Image,
  Form,
} from "react-bootstrap";
import * as GrIcons from "react-icons/gr";
import "../App.css";
import images1 from "../images/edit.png";
import images2 from "../images/visible.png";
import images3 from "../images/delete.png";
import Axios from "axios";

function Employee() {
  const [employeeList, setEmployeeList] = useState([]);
  const [dep_name, setDepName] = useState("");
  const [position_name, setPositionName] = useState("");


  const empList = () => {
    Axios.get("http://localhost:3333/employeesview").then((response) => {
      setEmployeeList(response.data);
    });
  };

  const getAuth = () => {
    const token = localStorage.getItem("token");

    Axios.get("http://localhost:3333/authen", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      console.log(response);
      if (response.data.status == "ok") {
        // console.log(response.data.decoded.user);
        // alert("authen success");
      } else {
        window.location = "/login";
      }
    });
  };

  const deleteEmployee = (id) => {
    Axios.delete(`http://localhost:3333/employees/${id}`).then((response) => {
      setEmployeeList(
        employeeList.filter((val) => {
          return val.emp_id != id;
        })
      );
    });
  };

  const searchByDepAndPos = (dep, pos) => {
    // Axios.post(`http://localhost:3333/employees/${id}`).then((response) => {
    //   setEmployeeList(
    //     employeeList.filter((val) => {
    //       return val.emp_id != id;
    //     })
    //   );
    // });
  };

  useEffect(() => {
    empList();
    getAuth();
  }, []);

  return (
    <Container>
      <h1 className="attendance">ข้อมูลพนักงาน</h1>
      <div style={{ justifyContent: "center" }}>
        <Row className="col-md-12 col-12" aria-colspan={2}>
          <Col className="col-md-6 col-12">
            <Form.Group className="mb-3">
              <Form.Label>ค้นหาจาก แผนก</Form.Label>
              <Form.Control
                type="text"
                placeholder="กรอกแผนก"
                name="dep_name"
                onChange={(e) => {
                  setDepName(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-6 col-12">
            <Form.Group className="mb-3">
              <Form.Label>ค้นหาจาก ตำแหน่ง</Form.Label>
              <Form.Control
                type="text"
                placeholder="กรอกตำแหน่ง"
                name="position_name"
                onChange={(e) => {
                  setPositionName(e.target.value);
                }}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-12 col-12" style={{ display: "flex", justifyContent: "center" }}>
            <Button variant="primary" onClick={(dep, pos) => searchByDepAndPos}>
              {" "}
              ค้นหา{" "}
            </Button>{" "}
          </Col>
        </Row>
      </div>
      <Row>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Button
            variant="secondary"
            style={{ margin: "0px" }}
            onClick={() => (window.location = "/employeemanagement")}
          >
            {" "}
            เพิ่ม{" "}
          </Button>{" "}
        </div>
        <Table striped bordered hover>
          <thead>
            <tr className="trAdmin">
              <th>รหัสพนักงาน</th>
              <th>รูปภาพ</th>
              <th>ชื่อ-สกุล</th>
              <th>แผนก</th>
              <th>ตำแหน่ง</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          {employeeList.map((val) => {
            return (
              <tbody>
                <tr className="tbody">
                  <td>{val.emp_id}</td>
                  <td>
                  <Image
                      style={{
                        height: "100px",
                        width: "60%",
                        objectFit: "cover",
                        margin: "5px",
                      }}
                      alt=""
                      src={val.emp_images}
                    /></td>
                  <td>
                    {val.emp_firstname} {val.emp_surname}
                  </td>
                  <td>{val.dep_name}</td>
                  <td>{val.position_name}</td>
                  <td>
                    <Image
                      style={{
                        height: 30,
                        width: 30,
                        objectFit: "cover",
                        margin: "5px",
                      }}
                      alt=""
                      src={images2}
                    />
                    <Image
                      style={{
                        height: 30,
                        width: 30,
                        objectFit: "cover",
                        margin: "5px",
                      }}
                      alt=""
                      src={images1}
                    />
                    <Image
                      style={{
                        height: 30,
                        width: 30,
                        objectFit: "cover",
                        margin: "5px",
                      }}
                      alt=""
                      src={images3}
                      onClick={() => {
                        deleteEmployee(val.emp_id);
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            );
          })}
        </Table>
      </Row>
    </Container>
  );
}

export default Employee;
