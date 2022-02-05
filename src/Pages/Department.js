import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import * as GrIcons from "react-icons/gr";
import "../App.css";
import Image from "react-bootstrap/Image";
import images1 from "../images/edit.png";
import images2 from "../images/visible.png";
import images3 from "../images/delete.png";
import Axios from "axios";
import { Link } from "react-router-dom";

function Department() {
  const [depname, setDepname] = useState("");
  const [departmentList, setDepartmentList] = useState([]);

  const dataepartment = () => {
    Axios.get("http://localhost:3333/department").then((response) => {
      setDepartmentList(response.data);
    });
  };

  const deleteDepartment = (id) => {
    Axios.delete(`http://localhost:3333/department/${id}`).then((response) => {
      setDepartmentList(
        departmentList.filter((val) => {
          return val.dep_id != id;
        })
      );
    });
  };

  useEffect(() => {
    dataepartment();
  }, []);

  return (
    <Container>
      <h1 className="attendance">ข้อมูลแผนก</h1>
      <div style={{ display: "flex", justifyContent: "center" }}></div>
      <Row>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Button variant="secondary" style={{ margin: "0px" }} onClick={() => (window.location = "/departmentmanagement")}>
            {" "}
            เพิ่ม{" "}
          </Button>{" "}
        </div>
        <Table striped bordered hover>
          <thead>
            <tr className="trAdmin">
              <th>รหัสแผนก</th>
              <th>ชื่อแผนก</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          {departmentList.map((val) => {
            return (
              <tbody>
                <tr className="tbody">
                  <td>{val.dep_id}</td>
                  <td>{val.dep_name}</td>
                  <td>
                  <Link to={`/departmentmanagement/${val.dep_id}`}>
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
                    </Link>
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
                        deleteDepartment(val.dep_id);
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

export default Department;
