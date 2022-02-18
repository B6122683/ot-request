import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import { Row, Col, Button } from "react-bootstrap";
import Axios from "axios";
import "../App.css";
import Navbar from "../Components/Navbar";
import NavbarAdmin from "../Components/NavbarAdmin";
import PieChart from "../Components/PieCharts";
import ColumnChart from "../Components/ColumnChart";
import LineChart from "../Components/LineChart";
import Image from "react-bootstrap/Image";

function Home() {
  const [role_id, setRole] = useState("");
  const [emp_name, setEmpName] = useState("");
  const [emp_id, setEmpId] = useState("");
  const [allemp, setAllEmp] = useState("");
  const [allot, setAllOt] = useState("");
  const [allleave, setAllLeave] = useState("");
  const [otrequestcountList, setOtrequestcountList] = useState([]);
  const [leaveworkcountList, setLeaveWorkcountList] = useState([]);
  const [attencountList, setAttcountList] = useState([]);

  //Axios.defaults.withCredentials = true;
  const getAuth = () => {
    const token = localStorage.getItem("token");

    Axios.get("/authen", {
      headers: {
        Authorization: "Bearer " + token,
      },
    }).then((response) => {
      console.log(response);
      if (response.data.status == "ok") {
        setEmpId(response.data.decoded.user.emp_id);
        setRole(response.data.decoded.user.role_id);
        setEmpName(
          response.data.decoded.user.emp_firstname +
            " " +
            response.data.decoded.user.emp_surname
        );
      } else {
        window.location = "/login";
      }
    });
  };

  const allempListCount = () => {
    Axios.get("http://localhost:3333/allemployeescount").then((response) => {
      setAllEmp(response.data[0].no_emp);
    });
  };

  const allOtCount = () => {
    Axios.get("http://localhost:3333/otrequestcountperweek").then(
      (response) => {
        setAllOt(response.data[0].no_otrequest);
      }
    );
  };

  const allLeaveCount = () => {
    Axios.get("http://localhost:3333/leaveworkcountperweek").then(
      (response) => {
        setAllLeave(response.data[0].no_leavework);
      }
    );
  };

  const otrequestcount = () => {
    Axios.post("http://localhost:3333/otrequestcount").then((response) => {
      setOtrequestcountList(response.data);
      console.log(response.data);
    });
  };

  const leaveworkcount = (e) => {
    Axios.post("http://localhost:3333/leaveworkcount").then((response) => {
      setLeaveWorkcountList(response.data);
    });
  };

  const attendancecountperweek = (e) => {
    Axios.post("http://localhost:3333/attendancecount2").then(
      (response) => {
        setAttcountList(response.data);
      }
    );
  };

  useEffect(() => {
    getAuth();
    allempListCount();
    allOtCount();
    allLeaveCount();
    otrequestcount();
    leaveworkcount();
    attendancecountperweek();
  }, []);

  return (
    <>
      {/* {role_id === 1 ? <NavbarAdmin /> : <Navbar />} */}
      <Container className="mb-5">
        <h1 className="home">สวัสดี คุณ {emp_name}</h1>
        {role_id == 1 && (
          <DashboardAdmin allemp={allemp} allot={allot} allleave={allleave} />
        )}
        {role_id == 2 && (
          <DashboardUser
            empid={emp_id}
            otcount={otrequestcountList}
            leavecount={leaveworkcountList}
            attcount={attencountList}
          />
        )}
      </Container>
    </>
  );
}

const DashboardAdmin = (props) => (
  <Container className="mb-3">
    <Row>
      <Col className="col-md-4 col-12">
        <Col className="p-2 my-3 addash bottom-one">
          จำนวนพนักงานทั้งหมด
          <Col className="col-md-6 col-6">
            <h2>{props.allemp}</h2>
          </Col>
          <Col className="imgicon col-md-6 col-6">
            <Image
              style={{
                width: "50px",
                display: "flex",
                justifyContent: "right",
              }}
              src="https://cdn-user-icons.flaticon.com/62088/62088061/1644870019958.svg?token=exp=1644870920~hmac=5540668af72f53211e30e209922b18da"
            />
          </Col>
        </Col>
      </Col>
      {/* <Col className="col-md-4 col-12 adminhome"><>ทำงานล่วงเวลาต่อเดือน</></Col> */}
      <Col className="col-md-4 col-12">
        <Col className="p-2 my-3 addash bottom-two">
          คำขออนุมัติการขอโอที
          <Col className="col-md-6 col-6">
            <h2>{props.allot}</h2>
          </Col>
          <Col className="imgicon col-md-6 col-6">
            <Image
              style={{
                width: "50px",
                display: "flex",
                justifyContent: "right",
              }}
              src="https://cdn-user-icons.flaticon.com/62088/62088061/1644869239427.svg?token=exp=1644870140~hmac=1d2dd4bfd27510ee971a40588404ace8"
            />
          </Col>
        </Col>
      </Col>
      <Col className="col-md-4 col-12">
        <Col className="p-2 my-3 addash bottom-three">
          คำขออนุมัติการลางาน
          <Col className="col-md-6 col-6">
            <h2>{props.allleave}</h2>
          </Col>
          <Col className="imgicon col-md-6 col-6">
            <Image
              style={{
                width: "50px",
                display: "flex",
                justifyContent: "right",
              }}
              src="https://cdn-user-icons.flaticon.com/62088/62088061/1644867770404.svg?token=exp=1644868674~hmac=39d17f7223b422922b55d0f0bca49952"
            />
          </Col>
        </Col>
      </Col>
    </Row>
    <Row>
      <Col className="col-md-6 col-12 my-2">
        <PieChart />
      </Col>
      <Col className="col-md-6 col-12 my-2">
        <ColumnChart />
      </Col>
      <Col className="col-md-12 col-12 my-2">
        <LineChart />
      </Col>
    </Row>
  </Container>
);

const DashboardUser = (props) => (
  <Container className="mb-3">
    <Row>
      <Col className="col-md-4 col-12">
        <Col className="p-2 my-3 addash bottom-one">
          คำขอโอที
          {props.otcount.map((val) => {
            return (
              <>
                {val.emp_id == props.empid && (
                  <Col className="col-md-6 col-6">
                    <h2>{val.waiting}</h2>
                  </Col>
                )}
              </>
            );
          })}
          <Col className="imgicon col-md-6 col-6">
            <Image
              style={{
                width: "50px",
                display: "flex",
                justifyContent: "right",
              }}
              src="https://cdn-user-icons.flaticon.com/62088/62088061/1644870019958.svg?token=exp=1644870920~hmac=5540668af72f53211e30e209922b18da"
            />
          </Col>
        </Col>
      </Col>
      <Col className="col-md-4 col-12">
        <Col className="p-2 my-3 addash bottom-two">
          คำขอการลา
          {props.leavecount.map((v) => {
            return (
              <>
                {v.emp_id == props.empid && (
                  <Col className="col-md-6 col-6">
                    <h2>{v.waiting}</h2>
                  </Col>
                )}
              </>
            );
          })}
          <Col className="imgicon col-md-6 col-6">
            <Image
              style={{
                width: "50px",
                display: "flex",
                justifyContent: "right",
              }}
              src="https://cdn-user-icons.flaticon.com/62088/62088061/1644869239427.svg?token=exp=1644870140~hmac=1d2dd4bfd27510ee971a40588404ace8"
            />
          </Col>
        </Col>
      </Col>
      <Col className="col-md-4 col-12">
        <Col className="p-2 my-3 addash bottom-three">
          จำนวนวันเข้างาน
          {props.attcount.map((v) => {
            return (
              <>
                {v.emp_id == props.empid && (
                  <Col className="col-md-6 col-6">
                    <h2>{v.checkin}</h2>
                  </Col>
                )}
              </>
            );
          })}
          <Col className="imgicon col-md-6 col-6">
            <Image
              style={{
                width: "50px",
                display: "flex",
                justifyContent: "right",
              }}
              src="https://cdn-user-icons.flaticon.com/62088/62088061/1644867770404.svg?token=exp=1644868674~hmac=39d17f7223b422922b55d0f0bca49952"
            />
          </Col>
        </Col>
      </Col>
    </Row>
    {/* <Row>
      <Col className="col-md-6 col-12 my-2">
        <PieChart />
      </Col>
      <Col className="col-md-6 col-12 my-2">
        <ChartUser />
      </Col>
      <Col className="col-md-12 col-12 my-2">
        <LineChart />
      </Col>
    </Row> */}
  </Container>
);

export default Home;
