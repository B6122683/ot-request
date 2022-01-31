import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import { SidebarAdminData } from "./SidebarDataAdmin";
import "./Navbar.css";
import { IconContext } from "react-icons";
import Axios from "axios";

function NavbarUser() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  const [emp_id, setEmpId] = useState("");
  const [emp_name, setEmpName] = useState("");
  const [emp_role, setEmpRole] = useState("");

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
        setEmpName(
          response.data.decoded.user.emp_firstname +
            " " +
            response.data.decoded.user.emp_surname
        );
        setEmpRole(response.data.decoded.user.role_id);
      }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/login";
  };

  useEffect(() => {
    getAuth();
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar" style={{ justifyContent: "space-between" }}>
          <div style={{ justifyContent: "space-between" }}>
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
          </div>
          <div className="d-flex" style={{ justifyContent: "flex-end" }}>
            {emp_id != "" ? (
              <>
                <p
                  style={{
                    color: "white",
                    margin: "auto 30px",
                    fontSize: "18px",
                  }}
                >
                  {emp_name}
                </p>
                <Button
                  className="btn btn-danger"
                  style={{ marginRight: "50px" }}
                  type="submit"
                  onClick={handleLogout}
                >
                  ออกจากระบบ
                </Button>
              </>
            ) : (
              <Button
                className="btn btn-default"
                style={{ marginRight: "50px" }}
                type="submit"
                onClick={() => (window.location = "/login")}
              >
                เข้าสู่ระบบ
              </Button>
            )}
          </div>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {emp_role == 1 && (
              <>
                {SidebarAdminData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span className="spantitle">{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </>
            )}
            {emp_role == 2 && (
              <>
                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <Link to={item.path}>
                        {item.icon}
                        <span className="spantitle">{item.title}</span>
                      </Link>
                    </li>
                  );
                })}
              </>
            )}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default NavbarUser;
