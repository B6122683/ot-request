import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "./Activity.css";
import Axios from "axios";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment/min/moment-with-locales";
import addimage from "../images/addimage.png";

function EditActivity() {
  // const [images, setImages] = useState([]);
  const { act_id } = useParams();
  const [act_name, setAct_name] = useState("");
  const [act_place, setAct_place] = useState("");
  const [act_time, setAct_time] = useState("");
  const [act_image, setAct_image] = useState("");
  const [act_date, setAct_date] = useState("");
  const [act_desc, setAct_desc] = useState("");
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [previewImg, setPreviewImg] = useState(null);
  const [displayImg, setDisplaayImg] = useState(null);
  const [activity, setActivity] = useState("");
  const [ActivityList, setActivityList] = useState([]);
  const [message, setMessage] = useState("");

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

  const activityById = () => {
    Axios.get(`http://localhost:3333/activity/${act_id}`).then((response) => {
      setActivityList(response.data[0]);
      setAct_name(response.data[0].act_name);
      setAct_image(response.data[0].act_image);
      setAct_date(response.data[0].act_date);
      setAct_time(response.data[0].act_time);
      setAct_place(response.data[0].act_place);
      setAct_desc(response.data[0].act_desc);
      console.log(response.data[0]);
    });
  };

  const onChange = (e) => {
    e.preventDefault();
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
    setAct_image(e.target.files[0].name);
    setPreviewImg(URL.createObjectURL(e.target.files[0]));
  };

  const Editactivity = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (file != "") {
      formData.append("file", file);
      formData.append("act_image", "images\\" + act_image);
    } else {
      formData.append("act_image", act_image);
    }
    formData.append("act_id", act_id);
    formData.append("act_name", act_name);
    formData.append("act_place", act_place);
    formData.append("act_date", act_date);
    formData.append("act_time", act_time);
    formData.append("act_desc", act_desc);

    try {
      if (file != "") {
        await Axios.post("/upload", formData);
      }
      await Axios.put("/activity", formData);
      window.location = "/adminactivity";
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };

  useEffect(() => {
    activityById();
    getAuth();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <h1 className="addact">เพิ่มกิจกรรม</h1>
        </Row>
        <Container>
          <Row className="activity">
            <Form encType="multipart/form-data" onSubmit={Editactivity}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "20px",
                }}
              >
                {" "}
                {act_image && !previewImg ? (
                  <Image
                    style={{
                      height: 150,
                      objectFit: "cover",
                      marginBlock: "13px",
                    }}
                    alt=""
                    src={`http://localhost:3333/${act_image}`}
                  />
                ) : (
                  <Image
                    style={{
                      height: 150,
                      objectFit: "cover",
                      marginBlock: "13px",
                    }}
                    alt=""
                    src={previewImg}
                  />
                )}
              </div>

              <Row className="col-mb-12 ">
                <Form.Group controlId="fileName" className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    type="file"
                    name="act_image"
                    onChange={onChange}
                  />
                </Form.Group>
              </Row>

              <Row className="col-mb-12 ">
                <Form.Group
                  className="col-mb-12"
                  controlId="formBasicTextInput"
                >
                  <Form.Label>ชื่อกิจกรรม</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกชื่อกิจกรรม"
                    name="act_name"
                    value={act_name}
                    onChange={(e) => {
                      setAct_name(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>

              <Row className="col-mb-12 ">
                <Form.Group className="col-md-6">
                  <Form.Label>วันที่</Form.Label>
                  <Form.Control
                    type="date"
                    placeholder="เลือกวันที่"
                    name="act_date"
                    value={moment(act_date).locale("th").format("yyyy-MM-DD")}
                    onChange={(e) => {
                      setAct_date(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group className="col-md-6">
                  <Form.Label>เวลา</Form.Label>
                  <Form.Control
                    type="time"
                    placeholder="เลือกเวลา"
                    name="act_time"
                    value={act_time}
                    onChange={(e) => {
                      setAct_time(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>

              <Row className="col-mb-12 ">
                <Form.Group
                  className="col-mb-12"
                  controlId="formBasicTextInput"
                >
                  <Form.Label>สถานที่</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกสถานที่"
                    name="act_place"
                    value={act_place}
                    onChange={(e) => {
                      setAct_place(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>

              <Row className="col-mb-12 ">
                <Form.Group
                  className="col-mb-12"
                  controlId="formBasicTextInput"
                >
                  <Form.Label>รายละเอียด</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="กรอกรายละเอียด"
                    name="act_desc"
                    value={act_desc}
                    onChange={(e) => {
                      setAct_desc(e.target.value);
                    }}
                  />
                </Form.Group>
              </Row>

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
                  onClick={() => (window.location.href = "/adminactivity")}
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
      </Container>
    </>
  );
}

export default EditActivity;
