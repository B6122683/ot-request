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

function Employee() {
  const [employeeList, setEmployeeList] = useState([]);

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

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };

  useEffect(() => {
    empList();
    getAuth();
  }, []);

  return (
    <Container>
      <h1 className="attendance">ข้อมูลพนักงาน</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <form>
          <label style={{ margin: "10px" }}>
            ค้นหาจาก แผนก
            <input
              style={{ margin: "10px", borderRadius: "5px" }}
              type="text"
              name="department"
            />
          </label>
          <label style={{ margin: "10px" }}>
            ตำแหน่ง
            <input
              style={{ margin: "10px", borderRadius: "5px" }}
              type="text"
              name="position"
            />
          </label>
        </form>
      </div>
      <Row>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="danger"
            style={{ margin: "0px" }}
            onClick={handleLogout}
          >
            {" "}
            ออกจากระบบ{" "}
          </Button>{" "}
        </div>
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
                  <td></td>
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
