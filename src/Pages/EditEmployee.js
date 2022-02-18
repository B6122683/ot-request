import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import "./Employee.css";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import account from "../images/account.png";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment/min/moment-with-locales";
import Axios from "axios";

function EditEmployee() {
  const { emp_id } = useParams();
  const [emp_firstname, setEmp_firstname] = useState("");
  const [emp_surname, setEmp_surname] = useState("");
  const [emp_address, setEmp_address] = useState("");
  const [emp_tel, setEmp_tel] = useState("");
  const [emp_email, setEmp_email] = useState("");
  const [dep_id, setDep_id] = useState(0);
  const [role_id, setRole_id] = useState(0);
  const [emp_dob, setEmp_dob] = useState("");
  const [emp_images, setEmp_images] = useState("");
  const [emp_card_id, setEmp_card_id] = useState("");
  const [position_id, setPosition_id] = useState(0);
  const [dep_emp, setDepEmp] = useState("");
  const [emp_gender, setEmp_gender] = useState("");

  const [EmployeesList, setEmployeesList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [positionsList, setPositionsList] = useState([]);

  const [previewImg, setPreviewImg] = useState(null);
  const [file, setFile] = useState("");
  const [message, setMessage] = useState("");

  const [validated, setValidated] = useState(false);

  const onChange = (e) => {
    setFile(e.target.files[0]);
    //setFilename(e.target.files[0].name);
    setEmp_images(e.target.files[0].name);
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
  };

  const getAuth = () => {
    const token = localStorage.getItem("token");
    if (token) {
      Axios.get("http://localhost:3333/authen", {
        headers: {
          Authorization: "Bearer " + token,
        },
      }).then((response) => {
        if (response.data.decoded.user.role_id != 1) {
          localStorage.removeItem("token");
          window.location = "/login";
        } else {
          setDepEmp(response.data.decoded.user.dep_id);
        }
      });
    } else {
      window.location = "/login";
    }
  };


  const employeeById = () => {
    Axios.get(`http://localhost:3333/employees/${emp_id}`).then((response) => {
      setEmployeesList(response.data[0]);
      setEmp_firstname(response.data[0].emp_firstname);
      setEmp_surname(response.data[0].emp_surname);
      setEmp_images(response.data[0].emp_images);
      setEmp_address(response.data[0].emp_address);
      setEmp_card_id(response.data[0].emp_card_id);
      setEmp_email(response.data[0].emp_email);
      setEmp_tel(response.data[0].emp_tel);
      setEmp_dob(response.data[0].emp_dob);
      setRole_id(response.data[0].role_id);
      setDep_id(response.data[0].dep_id);
      setPosition_id(response.data[0].position_id);
      setEmp_gender(response.data[0].emp_gender);
      console.log(response.data[0]);
    });
  };

  const dataepartment = () => {
    Axios.get("http://localhost:3333/department").then((response) => {
      setDepartmentList(response.data);
    });
  };

  const role = () => {
    Axios.get("http://localhost:3333/role").then((response) => {
      setRoleList(response.data);
    });
  };

  const positions = () => {
    Axios.get("http://localhost:3333/positions").then((response) => {
      setPositionsList(response.data);
      console.log(response.data);
    });
  };

  useEffect(() => {
    getAuth();
    dataepartment();
    role();
    positions();
    employeeById();
  }, []);

  const editemployees = async (e) => {
    const form = e.currentTarget;
    if (form.checkValidity() == false) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (
      emp_firstname == "" ||
      emp_surname == "" ||
      emp_tel == "" ||
      emp_address == "" ||
      emp_email == "" ||
      dep_id == "" ||
      role_id == "" ||
      emp_card_id == "" ||
      emp_dob == "" ||
      position_id == "" ||
      emp_gender == ""
    ) {
      setValidated(true);
    } else {
      e.preventDefault();
      const formData = new FormData();
      if (file != "") {
        formData.append("file", file);
        formData.append("emp_images", "images\\" + emp_images);
      } else {
        formData.append("emp_images", emp_images);
      }

      if (emp_images == "") {
        formData.append("emp_images", "");
      }

      formData.append("emp_id", emp_id);
      formData.append("emp_firstname", emp_firstname);
      formData.append("emp_surname", emp_surname);
      formData.append("emp_tel", emp_tel);
      formData.append("emp_address", emp_address);
      formData.append("emp_email", emp_email);
      formData.append("dep_id", dep_id);
      formData.append("role_id", role_id);
      formData.append("emp_card_id", emp_card_id);
      formData.append("emp_dob", emp_dob);
      formData.append("position_id", position_id);
      formData.append("emp_gender", emp_gender);

      try {
        if (file != "") {
          await Axios.post("/upload", formData);
        }
        await Axios.put("/employees", formData);
        window.location = "/employee";
      } catch (err) {
        if (err.response.status == 500) {
          setMessage("There was a problem with the server");
        } else {
          setMessage(err.response.data.msg);
        }
      }
    }
  };

  return (
    <>
      <Container>
        <Row>
          <h1 className="addemp">แก้ไขข้อมูลพนักงาน</h1>
        </Row>
        <Row>
          <Form
            className="employee"
            encType="multipart/form-data"
            onSubmit={editemployees}
            noValidate
            validated={validated}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px",
              }}
            >
              {emp_images && !previewImg ? (
                <Image
                  style={{
                    height: 150,
                    width: 150,
                    objectFit: "cover",
                    marginBlock: "13px",
                    borderRadius: "50%",
                  }}
                  alt=""
                  src={`http://localhost:3333/${emp_images}`}
                />
              ) : (
                <Image
                  style={{
                    height: 150,
                    width: 150,
                    objectFit: "cover",
                    marginBlock: "13px",
                    borderRadius: "50%",
                  }}
                  alt=""
                  src={previewImg}
                />
              )}
            </div>
            <Row className="col-md-12 ">
              <Col className="col-md-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Group controlId="fileName" className="mb-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                      type="file"
                      name="emp_images"
                      onChange={onChange}
                    />
                  </Form.Group>
                </Form.Group>
              </Col>
            </Row>

            <Row className="col-md-12 ">
              <Col className="col-md-6 col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>ชื่อ</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกชื่อ"
                    name="emp_firstname"
                    value={emp_firstname}
                    onChange={(e) => {
                      setEmp_firstname(e.target.value);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    กรุณากรอกชื่อ
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col className="col-md-6 col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>นามสกุล</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกนามสกุล"
                    name="emp_surname"
                    value={emp_surname}
                    onChange={(e) => {
                      setEmp_surname(e.target.value);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    กรุณากรอกนามสกุล
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="col-md-12 ">
              <Col className="col-md-6 col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>เลขบัตรประจำตัวประชาชน</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกเลขบัตรประจำตัวประชาชน"
                    name="emp_card_id"
                    value={emp_card_id}
                    onChange={(e) => {
                      setEmp_card_id(e.target.value);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    กรุณากรอกเลขบัตรประจำตัวประชาชน
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col className="col-md-6 col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>วัน/เดือน/ปีเกิด</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="เลือกวัน/เดือน/ปีเกิด"
                    name="emp_dob"
                    value={moment(emp_dob).locale("th").format("yyyy-MM-DD")}
                    onChange={(e) => {
                      setEmp_dob(e.target.value);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    กรุณาเลือกวัน/เดือน/ปีเกิด
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="col-md-12 ">
              <Col className="col-md-6 col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>เพศ</Form.Label>
                  <Form.Select
                    value={emp_gender}
                    onChange={(e) => {
                      setEmp_gender(e.target.value);
                    }}
                    required
                  >
                    <option value="">กรุณาเลือก</option>
                    <option value="1">ชาย</option>
                    <option value="2">หญิง</option>
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    กรุณาเลือกเพศ
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="col-md-12 ">
              <Col className="col-md-6 col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>อีเมล</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกอีเมล"
                    name="emp_email"
                    value={emp_email}
                    onChange={(e) => {
                      setEmp_email(e.target.value);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    กรุณากรอกอีเมล
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col className="col-md-6 col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>เบอร์โทร</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกเบอร์โทร"
                    name="emp_tel"
                    value={emp_tel}
                    onChange={(e) => {
                      setEmp_tel(e.target.value);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    กรุณากรอกเบอร์โทร
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="col-md-12 ">
              <Col className="col-md-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>ที่อยู่</Form.Label>
                  <Form.Control
                    type="textarea"
                    placeholder="กรอกที่อยู่"
                    name="emp_address"
                    value={emp_address}
                    onChange={(e) => {
                      setEmp_address(e.target.value);
                    }}
                    required
                  />
                  <Form.Control.Feedback type="invalid">
                    กรุณากรอกที่อยู่
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="col-md-12 ">
              <Col className="col-md-6 col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>ประเภทพนักงาน</Form.Label>
                  <Form.Select
                    value={role_id}
                    onChange={(e) => {
                      setRole_id(e.target.value);
                    }}
                    required
                    disabled
                  >
                    {" "}
                    <option value="">กรุณาเลือก</option>
                    {roleList.map((role) => (
                      <option value={role.role_id}>{role.role_name}</option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col className="col-md-6 col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>ตำแหน่ง</Form.Label>
                  <Form.Select
                    value={position_id}
                    onChange={(e) => {
                      setPosition_id(e.target.value);
                    }}
                    required
                  >
                    <option value="">กรุณาเลือก</option>
                    {positionsList.map((positions) => (
                      <option value={positions.position_id}>
                        {positions.position_name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    กรุณาเลือกตำแหน่ง
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="col-md-12 ">
              <Col className="col-md-6 col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>แผนก</Form.Label>
                  <Form.Select
                    value={dep_id}
                    onChange={(e) => {
                      setDep_id(e.target.value);
                    }}
                    disabled
                  >
                    <option value="">กรุณาเลือก</option>
                    {departmentList.map((department) => (
                      <option value={department.dep_id}>
                        {department.dep_name}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="col-md-12 ">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                <Button
                  variant="danger"
                  style={{ margin: "10px" }}
                  onClick={() => (window.location = "/employee")}
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
            </Row>
          </Form>
        </Row>
      </Container>
    </>
  );
}

export default EditEmployee;
