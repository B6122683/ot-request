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
import { Link } from "react-router-dom";
import Axios from "axios";
import Swal from "sweetalert2";
import Form from "react-bootstrap/Form";

function Position() {
  const [positionList, setPositionList] = useState([]);
  const [posname, setPosName] = useState("");

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

  const position = () => {
    Axios.get("http://localhost:3333/positionsview").then((response) => {
      setPositionList(response.data);
    });
  };

  const deletePosition = (id) => {
    Swal.fire({
      title: "ต้องการลบข้อมูล?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "ยืนยัน!",
      cancelButtonText: "ยกเลิก",
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3333/positions/${id}`).then(
          (response) => {
            setPositionList(
              positionList.filter((val) => {
                return val.position_id != id;
              })
            );
          }
        );
        Swal.fire("ลบแล้ว!", "ลบไฟล์เรียบร้อย", "success");
      }
    });
  };

  useEffect(() => {
    getAuth();
    position();
  }, []);

  return (
    <Container>
      <h1 className="attendance">ข้อมูลตำแหน่ง</h1>
      <div style={{ justifyContent: "center" }}>
        <Row className="col-md-12 col-12">
          <Col className="col-md-4"></Col>
          <Col className="col-md-4 col-12">
            <Form.Group className="mb-3">
              <Form.Label>ค้นหาจาก ชื่อตำแหน่ง</Form.Label>
              <Form.Control
                type="text"
                placeholder="ค้นหา..."
                name="posname"
                onChange={(e) => setPosName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col className="col-md-4"></Col>
        </Row>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}></div>
      <Row>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Button
            variant="secondary"
            style={{ margin: "0px" }}
            onClick={() => (window.location = "/positionmanagement")}
          >
            เพิ่ม{" "}
          </Button>{" "}
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr className="trAdmin">
              <th>รหัสตำแหน่ง</th>
              <th>ชื่อแผนก</th>
              <th>ชื่อตำแหน่ง</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          {positionList
            .filter((val) => {
              if (posname == "") {
                return val;
              } else {
                return val.position_name
                  .toLowerCase()
                  .includes(posname.toLowerCase());
              }
            })
            .map((val) => {
              return (
                <tbody>
                  <tr className="tbody">
                    <td>{val.position_id}</td>
                    <td>{val.dep_name}</td>
                    <td>{val.position_name}</td>
                    <td>
                      <Link to={`/positionmanagement/${val.position_id}`}>
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
                          deletePosition(val.position_id);
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

export default Position;
