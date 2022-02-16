import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
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
import Swal from "sweetalert2";
import { AgGridReact } from "ag-grid-react";

import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { DataGrid } from "@mui/x-data-grid";
import BasicTable from "../Components/DataTable";
// import DataGridDemo from '../Components/DataGrid';

function Department() {
  const [depname, setDepName] = useState("");
  const [departmentList, setDepartmentList] = useState([]);

  const dataepartment = () => {
    Axios.get("http://localhost:3333/department").then((response) => {
      setDepartmentList(response.data);
    });
  };

  const deleteDepartment = (id) => {
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
        Axios.delete(`http://localhost:3333/department/${id}`).then(
          (response) => {
            setDepartmentList(
              departmentList.filter((val) => {
                return val.dep_id != id;
              })
            );
          }
        );
        Swal.fire("ลบแล้ว!", "ลบไฟล์เรียบร้อย", "success");
      }
    });
  };

  const columns2 = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "dep_name",
      headerName: "ชื่อแผนก",
      width: 150,
      editable: true,
    },
  ];

  const rows = departmentList.map((row) => ({
    id: row.dep_id,
    dep_name: row.dep_name,
  }));

  useEffect(() => {
    dataepartment();
  }, []);

  const columns = [
    {
      headerName: "รหัสแผนก",
      field: "dep_id",
      sortable: true,
      filter: true,
    },
    {
      headerName: "ชื่อแผนก",
      field: "dep_name",
      sortable: true,
      filter: true,
    },
    {
      headerName: "จัดการ",
      field: "",
      sortable: true,
      filter: true,
    },
  ];

  return (
    // <Container>
    //    <h1 className="attendance">ข้อมูลแผนก</h1>
    // <div className="ag-theme-alpine" style={{height: 400, width: 900}}>
    //   <AgGridReact rowData={departmentList} columnDefs={columns}/>
    // </div>
    // </Container>
    <Container>
      <h1 className="attendance">ข้อมูลแผนก</h1>
      <div style={{ justifyContent: "center" }}>
        <Row className="col-md-12 col-12" aria-colspan={2}>
          <Col className="col-md-6 col-12">
            <Form.Group className="mb-3">
              <Form.Label>ค้นหาจาก แผนก</Form.Label>
              <Form.Control
                type="text"
                placeholder="กรอกแผนก"
                name="dep_name"
                onChange={(e) => setDepName(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}></div>
      <Row>
        <div style={{ display: "flex", justifyContent: "right" }}>
          <Button
            variant="secondary"
            style={{ margin: "0px" }}
            onClick={() => (window.location = "/departmentmanagement")}
          >
            {" "}
            เพิ่ม{" "}
          </Button>{" "}
        </div>
        <Table striped bordered hover responsive>
          <thead>
            <tr className="trAdmin">
              <th>ลำดับ</th>
              <th>ชื่อแผนก</th>
              <th>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {departmentList
              .filter((val) => {
                if (depname === "") {
                  return val;
                } else {
                  return val.dep_name
                    .toLowerCase()
                    .includes(depname.toLowerCase());
                }
              })
              .map((val, index) => {
                return (
                  <tr className="tbody">
                    <td>{index + 1}</td>
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
                );
              })}
          </tbody>
        </Table>
      </Row>
      {/* <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns2}
          pageSize={5}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
        />
      </div>
      <BasicTable /> */}
    </Container>
  );
}

export default Department;
