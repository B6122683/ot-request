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

function Position() {

  const [positionList, setPositionList] = useState([]);

  const position = () => {
    Axios.get("http://localhost:3333/positionsview").then((response) => {
      setPositionList(response.data);
    });
  };

  const deletePosition = (id) => {
    Axios.delete(`http://localhost:3333/positions/${id}`).then((response) => {
      setPositionList(
        positionList.filter((val) => {
          return val.position_id != id;
        })
      );
    });
  };

  useEffect(() => {
    position();
  }, []);

  return (
    <Container>
      <h1 className="attendance">ข้อมูลตำแหน่ง</h1>
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
        <Table striped bordered hover>
          <thead>
            <tr className="trAdmin">
              <th>รหัสตำแหน่ง</th>
              <th>ชื่อแผนก</th>
              <th>ชื่อตำแหน่ง</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          {positionList.map((val) => {
            return (
          <tbody>
            <tr className="tbody">
              <td>{val.position_id}</td>
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
