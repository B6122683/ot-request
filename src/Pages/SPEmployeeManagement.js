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
import Axios from "axios";

// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import * as yup from 'yup';

// const schema = yup.object().shape({
//   file: yup.string().required(),
//   emp_firstname: yup.string().required("Firstname is require"),
//   emp_surname: yup.string().required(),
//   emp_surname: yup.string().required(),
//   emp_card_id: yup.string().required().max(13),
//   emp_dob: yup.date().required(),
//   emp_gender: yup.string().required(),
//   emp_email: yup.string().required(),
//   emp_tel: yup.string().required().max(10),
//   emp_address: yup.string().required(),
//   role_name: yup.string().required(),
//   position_name: yup.string().required(),
//   dep_name: yup.string().required(),
//   emp_username: yup.string().required(),
//   emp_password: yup.string().required(),
// });

function SPEmployeeManagement() {
  const [emp_firstname, setEmp_firstname] = useState("");
  const [emp_surname, setEmp_surname] = useState("");
  const [emp_address, setEmp_address] = useState("");
  const [emp_tel, setEmp_tel] = useState("");
  const [emp_email, setEmp_email] = useState("");
  const [emp_username, setEmp_username] = useState("");
  const [emp_password, setEmp_password] = useState("");
  const [dep_id, setDep_id] = useState(0);
  const [role_id, setRole_id] = useState(0);
  const [emp_dob, setEmp_dob] = useState("");
  const [emp_images, setEmp_images] = useState("");
  const [emp_card_id, setEmp_card_id] = useState("");
  const [position_id, setPosition_id] = useState(0);
  const [emp_gender, setEmp_gender] = useState("");

  const [departmentList, setDepartmentList] = useState([]);
  const [roleList, setRoleList] = useState([]);
  const [positionsList, setPositionsList] = useState([]);

  const [previewImg, setPreviewImg] = useState(null);
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [message, setMessage] = useState("");

  const onChange = (e) => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
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
        if (response.data.decoded.user.role_id != 3) {
          localStorage.removeItem("token");
          window.location = "/login";
        }
      });
    } else {
      window.location = "/login";
    }
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

  const [validated, setValidated] = useState(false);

  const Addemployees = async (e) => {
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
      emp_card_id == "" ||
      emp_dob == "" ||
      position_id == "" ||
      emp_gender == "" ||
      emp_username == "" ||
      emp_password == "" ||
      emp_images == "" ||
      role_id == "" ||
      dep_id == "" ||
      file == ""
    ) {
      setValidated(true);
    } else {

    setValidated(true);

    e.preventDefault();
    const formData = new FormData();
    formData.append("file", file);
    formData.append("emp_firstname", emp_firstname);
    formData.append("emp_surname", emp_surname);
    formData.append("emp_tel", emp_tel);
    formData.append("emp_address", emp_address);
    formData.append("emp_email", emp_email);
    formData.append("emp_images", "images\\" + emp_images);
    formData.append("emp_username", emp_username);
    formData.append("emp_password", emp_password);
    formData.append("dep_id", dep_id);
    formData.append("role_id", role_id);
    formData.append("emp_card_id", emp_card_id);
    formData.append("emp_dob", emp_dob);
    formData.append("position_id", position_id);
    formData.append("emp_gender", emp_gender);

    try {
      await Axios.post("/upload", formData);
      await Axios.post("/employees", formData);
      window.location = "/spemployee";
    } catch (err) {
      if (err.response.status == 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  }
  };

  useEffect(() => {
    getAuth();
    dataepartment();
    role();
    positions();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <h1 className="addemp">เพิ่มข้อมูลพนักงาน</h1>
        </Row>
        <Row>
          <Form
            className="employee"
            encType="multipart/form-data"
            onSubmit={Addemployees}
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
              <Image
                style={{
                  height: 150,
                  width: 150,
                  objectFit: "cover",
                  marginBlock: "13px",
                  borderRadius: "50%",
                }}
                alt=""
                src={emp_images == "" ? account : previewImg}
              />
            </div>
            <Row className="col-md-12 ">
              <Col className="col-md-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Group controlId="fileName" className="mb-3">
                    <Form.Label>Upload Image</Form.Label>
                    <Form.Control
                      required
                      type="file"
                      name="emp_images"
                      onChange={onChange}
                    />
                    <Form.Control.Feedback type="invalid">
                      กรุณาเลือกรูปภาพ
                    </Form.Control.Feedback>
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
                    required
                    placeholder="กรอกชื่อ"
                    name="emp_firstname"
                    onChange={(e) => {
                      setEmp_firstname(e.target.value);
                    }}
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
                    required
                    placeholder="กรอกนามสกุล"
                    name="emp_surname"
                    onChange={(e) => {
                      setEmp_surname(e.target.value);
                    }}
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
                    pattern="^[0-9]*$"
                    maxLength={13}
                    required
                    placeholder="กรอกเลขบัตรประจำตัวประชาชน"
                    name="emp_card_id"
                    onChange={(e) => {
                      setEmp_card_id(e.target.value);
                    }}
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
                    required
                    placeholder="เลือกวัน/เดือน/ปีเกิด"
                    name="emp_dob"
                    onChange={(e) => {
                      setEmp_dob(e.target.value);
                    }}
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
                    required
                    value={emp_gender}
                    onChange={(e) => {
                      setEmp_gender(e.target.value);
                    }}
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
                    type="email"
                    required
                    placeholder="กรอกอีเมล"
                    name="emp_email"
                    onChange={(e) => {
                      setEmp_email(e.target.value);
                    }}
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
                    pattern="^[0-9]*$"
                    maxLength={10}
                    required
                    placeholder="กรอกเบอร์โทร"
                    name="emp_tel"
                    onChange={(e) => {
                      setEmp_tel(e.target.value);
                    }}
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
                    required
                    placeholder="กรอกที่อยู่"
                    name="emp_address"
                    onChange={(e) => {
                      setEmp_address(e.target.value);
                    }}
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
                    required
                    value={role_id}
                    onChange={(e) => {
                      setRole_id(e.target.value);
                    }}
                  >
                    <option value="">กรุณาเลือก</option>
                    {roleList.map((role) => (
                      <option value={role.role_id}>{role.role_name}</option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    กรุณาเลือกประเภทพนักงาน
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>

              <Col className="col-md-6 col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>ตำแหน่ง</Form.Label>
                  <Form.Select
                    required
                    value={position_id}
                    onChange={(e) => {
                      setPosition_id(e.target.value);
                    }}
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
                    required
                    value={dep_id}
                    onChange={(e) => {
                      setDep_id(e.target.value);
                    }}
                  >
                    <option value="">กรุณาเลือก</option>
                    {departmentList.map((department) => (
                      <option value={department.dep_id}>
                        {department.dep_name}
                      </option>
                    ))}
                  </Form.Select>
                  <Form.Control.Feedback type="invalid">
                    กรุณาเลือกแผนก
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
            </Row>

            <Row className="col-md-12 ">
              <Col className="col-md-6 col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>ชื่อผู้ใช้</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    pattern="^[A-Za-z]*$"
                    placeholder="กรอกชื่อผู้ใช้"
                    name="emp_username"
                    onChange={(e) => {
                      setEmp_username(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    กรุณากรอกชื่อผู้ใช้
                  </Form.Control.Feedback>
                </Form.Group>
              </Col>
              <Col className="col-md-6 col-12">
                <Form.Group controlId="formBasicTextInput">
                  <Form.Label>รหัสผ่าน</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    placeholder="กรอกรหัสผ่าน"
                    name="emp_password	"
                    onChange={(e) => {
                      setEmp_password(e.target.value);
                    }}
                  />
                  <Form.Control.Feedback type="invalid">
                    กรุณากรอกรหัสผ่าน
                  </Form.Control.Feedback>
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

export default SPEmployeeManagement;
