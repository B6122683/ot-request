var express = require("express");
var mysql = require("mysql2");
var cors = require("cors");

var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();
const cookieParser = require("cookie-parser");
const session = require("express-session");

const bcrypt = require("bcrypt");
const saltRounds = 10;

var jwt = require("jsonwebtoken");
const secret = "ot-request";

const fileUpload = require("express-fileupload");

const multer = require("multer");
const path = require("path");

var app = express();
//app.use(cors());

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use("/images", express.static("./src/images"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.use(fileUpload());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "ot_request",
  dateStrings: true,
});

//--------------------------EMPLOYEE API------------------------------
//GET EMPLOYEES DATA FORM DB
app.get("/employee", jsonParser, function (req, res) {
  db.execute("SELECT * FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/employee/:emp_id", jsonParser, function (req, res) {
  db.execute(
    "SELECT * FROM employees WHERE emp_id = ?",
    [req.params.emp_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//Add Employees (Register) AND PHOTO
app.post("/register", jsonParser, function (req, res) {
  bcrypt.hash(req.body.emp_password, saltRounds, function (err, hash) {
    db.execute(
      "INSERT INTO employees (emp_firstname, emp_surname, emp_address, emp_tel, emp_email, emp_username, emp_password, dep_id, role_id, create_at, update_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
      [
        req.body.emp_firstname,
        req.body.emp_surname,
        req.body.emp_address,
        req.body.emp_tel,
        req.body.emp_email,
        req.body.emp_username,
        hash,
        req.body.dep_id,
        req.body.role_id,
      ],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        res.json({ status: "ok" });
      }
    );
  });
});
//--------------------------EMPLOYEE API------------------------------

//--------------------------LOGIN API------------------------------
//LOGIN
app.get("/login", jsonParser, (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/login", jsonParser, function (req, res, next) {
  const emp_username = req.body.emp_username;
  const emp_password = req.body.emp_password;

  db.execute(
    "SELECT e.emp_id, e.emp_firstname, e.emp_surname, e.emp_address, e.emp_tel, e.emp_email, e.emp_username, e.emp_password, e.dep_id, d.dep_name, e.position_id, p.position_name, e.emp_card_id, e.emp_dob, e.emp_images, e.emp_gender, e.role_id FROM employees AS e LEFT JOIN positions AS p ON e.position_id = p.position_id LEFT JOIN department AS d ON e.dep_id = d.dep_id WHERE e.emp_username = ?",
    [emp_username],
    (err, users) => {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      // if (users.length == 0) {
      //   res.json({ status: "error", message: "no user found" });
      //   return;
      // }
      if (users.length > 0) {
        bcrypt.compare(
          emp_password,
          users[0].emp_password,
          function (err, result) {
            if (result) {
              var token = jwt.sign({ user: users[0] }, secret, {
                expiresIn: "1h",
              });
              res.json({ status: "ok", message: "login success", token });
              return;
            } else {
              res.json({ status: "error", message: "login failed" });
            }
            // if (result) {
            //   var token = jwt.sign({ user: users[0] }, secret);
            //   req.session.user = users;
            //   res.send(users,token);
            // } else {
            //   res.send({ message: "Username or Password Incorrect!" });
            // }
          }
        );
      } else {
        res.send({ status: "usernotfound", message: "User Not Found!" });
      }
    }
  );
});

app.get("/authen", jsonParser, function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, secret);
    //console.log(decoded.users);
    res.json({ status: "ok", decoded });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

//--------------------------LOGIN API------------------------------

// app.post("/login", jsonParser, (req, res) => {
//   const email = req.body.email;
//   const password = req.body.password;
//   db.execute(
//     "SELECT * FROM users WHERE email = ? && password = ?",
//     [email, password],
//     (err, result) => {
//       if (err) {
//         res.status(500).send(err);
//       } else {
//         if (result.length > 0) {
//           res.status(200).send({
//             email: result[0].email,
//             fname: result[0].fname,
//           });
//         } else {
//           res.status(400).send("user no existe");
//         }
//       }
//     }
//   );
// });

//--------------------------DEPARTMENT API--------------------------

//GET DEPARTMENT DATA FORM DB
app.get("/department", jsonParser, function (req, res) {
  db.execute("SELECT * FROM department", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//GET DEPARTMENT DATA BY ID FORM DB
app.get("/department/:dep_id", jsonParser, function (req, res) {
  db.execute(
    "SELECT * FROM department WHERE dep_id = ?",
    [req.params.dep_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//ADD DEPARTMENT
app.post("/department", jsonParser, function (req, res) {
  db.execute(
    "INSERT INTO department (dep_name, create_at, update_at) VALUES (?, NOW(), NOW())",
    [req.body.dep_name],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok" });
    }
  );
});

//UPDATE DEPARTMENT DATA FORM DB
app.put("/department", jsonParser, function (req, res) {
  db.execute(
    "UPDATE department SET dep_name = ?, update_at = NOW() WHERE dep_id = ?",
    [req.body.dep_name, req.body.dep_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//DELETE DEPARTMENT DATA FORM DB
app.delete("/department/:dep_id", jsonParser, function (req, res) {
  db.execute(
    "DELETE FROM department WHERE dep_id = ?",
    [req.params.dep_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//--------------------------DEPARTMENT API--------------------------

//--------------------------ACTIVITY API--------------------------
//ADD ACTIVITY
app.post("/activity", jsonParser, function (req, res) {
  db.execute(
    "INSERT INTO activity (act_name, act_place,act_date, act_time, act_image, act_desc, create_at, update_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())",
    [
      req.body.act_name,
      req.body.act_place,
      req.body.act_date,
      req.body.act_time,
      req.body.act_place,
      req.body.act_desc,
    ],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok" });
    }
  );
});

//GET ACTIVITY
app.get("/activity", jsonParser, function (req, res) {
  db.execute("SELECT * FROM activity", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//Add Activity with Photo
app.post("/addactivity", jsonParser, function (req, res) {
  db.execute(
    "INSERT INTO activity (act_name, act_place, act_date, act_time, act_image, act_desc, create_at, update_at) VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())",
    [
      req.body.act_name,
      req.body.act_place,
      req.body.act_date,
      req.body.act_time,
      req.body.act_image,
      req.body.act_desc,
    ],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok" });
    }
  );
});

//GET ACT BY ID
app.get("/activity/:act_id", jsonParser, function (req, res) {
  db.execute(
    "SELECT activity.act_id,activity.act_name,activity.act_desc,activity.act_image,activity.act_date,activity.act_time,activity.act_place FROM activity WHERE act_id = ?",
    [req.params.act_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//DELETE ACTIVITY DATA FORM DB
app.delete("/activity/:act_id", jsonParser, function (req, res) {
  db.execute(
    "DELETE FROM activity WHERE act_id = ?",
    [req.params.act_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//UPDATE ACTIVITY DATA FORM DB
app.put("/activity", jsonParser, function (req, res) {
  db.execute(
    "UPDATE activity SET act_name = ?, act_image = ?, act_place = ?, act_date = ?, act_time = ?,act_desc = ?, update_at = NOW() WHERE act_id = ?",
    [
      req.body.act_name,
      req.body.act_image,
      req.body.act_place,
      req.body.act_date,
      req.body.act_time,
      req.body.act_desc,
      req.body.act_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//--------------------------ACTIVITY API--------------------------

//--------------------------EMPLOYEE API--------------------------
//ADD EMPLOYEES WITH PHOTO
app.post("/employees", jsonParser, function (req, res) {
  bcrypt.hash(req.body.emp_password, saltRounds, function (err, hash) {
    db.execute(
      "INSERT INTO employees (emp_firstname, emp_surname, emp_address, emp_tel, emp_email, emp_username, emp_password, dep_id, role_id, emp_card_id, emp_dob, emp_images, position_id, create_at, update_at, record_status, emp_gender) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW(), '1', ?)",
      [
        req.body.emp_firstname,
        req.body.emp_surname,
        req.body.emp_address,
        req.body.emp_tel,
        req.body.emp_email,
        req.body.emp_username,
        hash,
        req.body.dep_id,
        req.body.role_id,
        req.body.emp_card_id,
        req.body.emp_dob,
        req.body.emp_images,
        req.body.position_id,
        req.body.emp_gender,
      ],
      function (err, results, fields) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        res.json({ status: "ok" });
      }
    );
  });
});

//DELETE EMPLOYEE DATA FORM DB
app.delete("/employees/:emp_id", jsonParser, function (req, res) {
  db.execute(
    "DELETE FROM employees WHERE emp_id = ?",
    [req.params.emp_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//SELECT DATA IN EMPLOYEES
app.get("/employeesview", jsonParser, function (req, res) {
  db.execute(
    "SELECT employees.emp_id,employees.emp_firstname,employees.emp_surname,employees.dep_id,department.dep_name,employees.position_id,positions.position_name,employees.emp_images FROM employees LEFT JOIN department ON employees.dep_id = department.dep_id LEFT JOIN positions ON employees.position_id = positions.position_id WHERE employees.role_id != 3",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//GET EMPLOYEE BY ID
app.get("/employees/:emp_id", jsonParser, function (req, res) {
  db.execute(
    "SELECT employees.emp_id,employees.emp_firstname,employees.emp_surname,employees.emp_images,employees.emp_address,employees.emp_tel,employees.emp_email,employees.emp_username,employees.emp_card_id,employees.dep_id,department.dep_name,employees.role_id,role.role_name,employees.position_id,positions.position_name,employees.emp_dob,employees.emp_gender FROM employees LEFT JOIN department ON employees.dep_id = department.dep_id LEFT JOIN positions ON employees.position_id = positions.position_id LEFT JOIN role ON employees.role_id = role.role_id WHERE employees.emp_id = ?",
    [req.params.emp_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//SELECT DATA IN EMPLOYEES
app.get("/allemployeescount", jsonParser, function (req, res) {
  db.execute("SELECT COUNT(*) AS no_emp FROM employees", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//SELECT DATA IN EMPLOYEES
app.get("/emppositioncount", jsonParser, function (req, res) {
  db.execute("SELECT employees.dep_id, department.dep_name, employees.position_id, positions.position_name, COUNT(*) AS no_position FROM employees LEFT JOIN department ON employees.dep_id = department.dep_id LEFT JOIN positions ON employees.position_id = positions.position_id GROUP BY positions.position_id", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//SELECT DATA IN EMPLOYEES
app.get("/employeescount", jsonParser, function (req, res) {
  db.execute(
    "SELECT department.dep_name AS department_name, COUNT(*) AS no_emp FROM department INNER JOIN employees ON employees.dep_id = department.dep_id GROUP BY department.dep_id, dep_name ORDER BY dep_name",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//SELECT DATA IN EMPLOYEES
app.get("/employeescountbyrole", jsonParser, function (req, res) {
  db.execute(
    "SELECT role.role_name AS role_name, COUNT(*) AS no_role FROM role INNER JOIN employees ON employees.role_id = role.role_id GROUP BY role.role_id, role_name ORDER BY role_name",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//UPDATE OT_ASSIGNMENT DATA FORM DB
app.put("/employees", jsonParser, function (req, res) {
  db.execute(
    "UPDATE employees SET emp_firstname = ?, emp_surname = ?, emp_address = ?, emp_tel = ?, emp_email = ?, dep_id = ?, role_id = ?, emp_card_id = ?, emp_dob = ?, emp_images = ?, position_id = ?, emp_gender = ?, update_at = NOW() WHERE emp_id = ?",
    [
      req.body.emp_firstname,
      req.body.emp_surname,
      req.body.emp_address,
      req.body.emp_tel,
      req.body.emp_email,
      req.body.dep_id,
      req.body.role_id,
      req.body.emp_card_id,
      req.body.emp_dob,
      req.body.emp_images,
      req.body.position_id,
      req.body.emp_gender,
      req.body.emp_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//--------------------------EMPLOYEE API--------------------------

//--------------------------OT_ASSIGNMENT API--------------------------
//GET OT_ASSIGNMENT DATA FORM DB
app.get("/otassignment", jsonParser, function (req, res) {
  db.execute("SELECT * FROM ot_assignment", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//GET OT BY ID
app.get("/otassignment/:ot_id", jsonParser, function (req, res) {
  db.execute(
    "SELECT ot_assignment.ot_id,ot_assignment.ot_name,ot_assignment.dep_id,department.dep_name,ot_assignment.ot_desc,ot_assignment.ot_starttime,ot_assignment.ot_finishtime,ot_assignment.ot_apply,ot_assignment.ot_request,ot_assignment.ot_stump,ot_assignment.ot_status,ot_assignment.ot_rate,TIMEDIFF(ot_assignment.ot_finishtime,ot_assignment.ot_starttime) AS summary FROM ot_assignment LEFT JOIN department ON ot_assignment.dep_id = department.dep_id WHERE ot_assignment.ot_id = ?",
    [req.params.ot_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//ADD OT_ASSIGNMENT
app.post("/otassignment", jsonParser, function (req, res) {
  db.execute(
    "INSERT INTO ot_assignment ( ot_name, ot_rate, dep_id, ot_desc, ot_starttime, ot_finishtime, ot_apply, ot_request, ot_stump, ot_status, create_at, update_at, record_status) VALUES ( ?, ?, ?, ?, ?, ?, ?, 0, ?, 1, NOW(), NOW(), 1)",
    [
      req.body.ot_name,
      req.body.ot_rate,
      req.body.dep_id,
      req.body.ot_desc,
      req.body.ot_starttime,
      req.body.ot_finishtime,
      req.body.ot_apply,
      req.body.ot_stump,
    ],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok" });
    }
  );
});

//SELECT DATA IN OT_ASSIGNMENT
app.get("/otassignview", jsonParser, function (req, res) {
  db.execute(
    "SELECT ot_assignment.ot_id,ot_assignment.ot_name,ot_assignment.dep_id,department.dep_name,ot_assignment.ot_desc,ot_assignment.ot_starttime,ot_assignment.ot_finishtime,ot_assignment.ot_apply,ot_assignment.ot_request,ot_assignment.ot_stump,ot_assignment.ot_status,ot_assignment.ot_rate,TIMEDIFF(ot_assignment.ot_finishtime,ot_assignment.ot_starttime) AS summary FROM ot_assignment LEFT JOIN department ON ot_assignment.dep_id = department.dep_id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//UPDATE OT_ASSIGNMENT DATA FORM DB
app.put("/otassignment", jsonParser, function (req, res) {
  db.execute(
    "UPDATE ot_assignment SET ot_name = ?, ot_rate = ?, dep_id = ?, ot_desc = ?, ot_starttime = ?, ot_finishtime = ?, ot_apply = ?, update_at = NOW() WHERE ot_id = ?",
    [
      req.body.ot_name,
      req.body.ot_rate,
      req.body.dep_id,
      req.body.ot_desc,
      req.body.ot_starttime,
      req.body.ot_finishtime,
      req.body.ot_apply,
      req.body.ot_id,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//UPDATE OT_REQUEST DATA FORM DB
app.put("/otrequestsetbystatus", jsonParser, function (req, res) {
  db.execute(
    "UPDATE ot_assignment SET ot_request = ot_request + 1, ot_stump = ot_stump - 1 , update_at = NOW() WHERE ot_id = ?",
    [req.body.ot_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//DELETE OT_ASSIGNMENT DATA FORM DB
app.delete("/otassignment/:ot_id", jsonParser, function (req, res) {
  db.execute(
    "DELETE FROM ot_assignment WHERE ot_id = ?",
    [req.params.ot_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//--------------------------OT_ASSIGNMENT API--------------------------

//--------------------------OT_REQUEST API--------------------------
//POST OT_REQUEST DATA FORM DB
app.post("/otrequest", jsonParser, function (req, res) {
  db.execute(
    "SELECT * FROM ot_request WHERE emp_id = ? AND ot_id = ?",
    [req.body.emp_id, req.body.ot_id],
    (err, otdata) => {
      if (err) {
        console.log(err);
      } else {
        if (otdata.length > 0) {
          res.send({
            status: "exist",
            message: "Employee has send OT Already",
          });
        } else {
          db.execute(
            "INSERT INTO ot_request (emp_id, dep_id, ot_id, otr_status, otr_date, create_at, update_at) VALUES (?, ?, ?, 0,NOW(), NOW(), NOW())",
            [req.body.emp_id, req.body.dep_id, req.body.ot_id],
            (err, result) => {
              if (err) {
                console.log(err);
              } else {
                db.execute(
                  "UPDATE ot_assignment SET ot_request = ot_request + 1, ot_stump = ot_stump - 1 , update_at = NOW() WHERE ot_id = ?",
                  [req.body.ot_id],
                  (err, result) => {
                    if (err) {
                      console.log(err);
                    }
                  }
                );
                res.send(result);
              }
            }
          );
        }
      }
    }
  );
  // db.execute(
  //   "update ot_assignment SET ot_request =ot_request +1 where ot_id=?",
  //   [req.body.ot_id],
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.send(result);
  //     }
  //   }
  // );
  // db.execute(
  //   "update ot_assignment SET ot_stump =ot_stump -1 where ot_id=?",
  //   [req.body.ot_id],
  //   (err, result) => {
  //     if (err) {
  //       console.log(err);
  //     } else {
  //       res.send(result);
  //     }
  //   }
  // );
});

//SELECT DATA IN OT_REQUEST
app.get("/otrequestcountperweek", jsonParser, function (req, res) {
  db.execute(
    "SELECT COUNT(*) AS no_otrequest FROM ot_request WHERE otr_status = 0 AND DATE(otr_date) > NOW() - interval 7 day",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//SELECT DATA IN OT_ASSIGNMENT
app.get("/otrequestview", jsonParser, function (req, res) {
  db.execute(
    "SELECT otr.otr_id, otr.emp_id, e.emp_firstname, e.emp_surname, otr.dep_id, d.dep_name, otr.ot_id, ota.ot_name, otr.otr_status, otr.otr_date FROM ot_request AS otr LEFT JOIN employees AS e ON otr.emp_id = e.emp_id LEFT JOIN department AS d ON otr.dep_id = d.dep_id LEFT JOIN ot_assignment AS ota ON otr.ot_id = ota.ot_id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//UPDATE OT_ASSIGNMENT DATA FORM DB
app.put("/approveotrequest", jsonParser, function (req, res) {
  db.execute(
    "UPDATE ot_request SET otr_status = ?, update_at = NOW() WHERE otr_id = ?",
    [req.body.otr_status, req.body.otr_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/otrequest/:otr_id", jsonParser, function (req, res) {
  db.execute(
    "SELECT * FROM ot_request WHERE otr_id = ?",
    [req.params.otr_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//COUNT
app.post("/otrequestcount", jsonParser, function (req, res) {
  db.execute(
    "SELECT e.emp_id, COUNT( CASE WHEN r.otr_status = 0 THEN 1 END ) AS waiting, COUNT( CASE WHEN r.otr_status = 1 THEN 1 END ) AS accept, COUNT( CASE WHEN r.otr_status = 2 THEN 1 END ) AS reject FROM ot_request AS r RIGHT JOIN employees AS e ON r.emp_id = e.emp_id GROUP BY e.emp_id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//COUNT
app.get("/otrequestcountbystatus", jsonParser, function (req, res) {
  db.execute(
    "SELECT department.dep_name AS dep_name, COUNT( CASE WHEN ot_request.otr_status = 0 THEN 1 END ) AS waiting, COUNT( CASE WHEN ot_request.otr_status = 1 THEN 1 END ) AS accept, COUNT( CASE WHEN ot_request.otr_status = 2 THEN 1 END ) AS reject FROM ot_request INNER JOIN department ON department.dep_id = ot_request.dep_id GROUP BY dep_name",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//COUNT
// app.get("/otrequestcount/:emp_id", jsonParser, function (req, res) {
//   db.execute(
//     "SELECT emp_id, COUNT( CASE WHEN otr_status = 0 THEN 1 END ) AS waiting, COUNT( CASE WHEN otr_status = 1 THEN 1 END ) AS accept, COUNT( CASE WHEN otr_status = 2 THEN 1 END ) AS reject FROM ot_request WHERE emp_id = ?",[req.params.emp_id],
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     }
//   );
// });

//GET OTR FROM ID
app.get("/otrequestId/:otr_id", jsonParser, function (req, res) {
  db.execute(
    "SELECT ot_request.otr_id,employees.emp_firstname,employees.emp_surname,department.dep_name,ot_assignment.ot_name,ot_request.otr_status,ot_request.otr_date FROM ot_request LEFT JOIN department ON ot_request.dep_id = department.dep_id LEFT JOIN employees ON ot_request.emp_id = employees.emp_id LEFT JOIN ot_assignment ON ot_request.ot_id = ot_assignment.ot_id WHERE ot_request.otr_id = ?",
    [req.params.otr_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//--------------------------OT_REQUEST API--------------------------

//-----------------------------ROLE------------------------------
//GET ROLE DATA FORM DB
app.get("/role", jsonParser, function (req, res) {
  db.execute("SELECT * FROM role", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//ADD ROLE
app.post("/role", jsonParser, function (req, res) {
  db.execute(
    "INSERT INTO role (role_name, create_at, update_at) VALUES (?, NOW(), NOW())",
    [req.body.role_name],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok" });
    }
  );
});

//DELETE ROLE DATA FORM DB
app.delete("/role/:role_id", jsonParser, function (req, res) {
  db.execute(
    "DELETE FROM role WHERE role_id = ?",
    [req.params.role_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//-----------------------------ROLE------------------------------

//-----------------------------POSITION------------------------------
//GET POSITION DATA FORM DB
app.get("/positions", jsonParser, function (req, res) {
  db.execute("SELECT * FROM positions", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//ADD POSITION
app.post("/positions", jsonParser, function (req, res) {
  db.execute(
    "INSERT INTO positions (position_name, dep_id, create_at, update_at) VALUES (?, ?, NOW(), NOW())",
    [req.body.position_name, req.body.dep_id],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok" });
    }
  );
});

//DELETE POSITION DATA FORM DB
app.delete("/positions/:position_id", jsonParser, function (req, res) {
  db.execute(
    "DELETE FROM positions WHERE position_id = ?",
    [req.params.position_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//SELECT DATA IN POSITIONS
app.get("/positionsview", jsonParser, function (req, res) {
  db.execute(
    "SELECT positions.position_id,positions.position_name,department.dep_name FROM positions LEFT JOIN department ON positions.dep_id = department.dep_id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//SELECT DATA BY ID IN POSITIONS
app.get("/positions/:position_id", jsonParser, function (req, res) {
  db.execute(
    "SELECT positions.position_id,positions.position_name,department.dep_id,department.dep_name FROM positions LEFT JOIN department ON positions.dep_id = department.dep_id WHERE positions.position_id = ?",
    [req.params.position_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//UPDATE POSITION DATA FORM DB
app.put("/positions", jsonParser, function (req, res) {
  db.execute(
    "UPDATE positions SET position_name = ?, dep_id = ?, update_at = NOW() WHERE position_id = ?",
    [req.body.position_name, req.body.dep_id, req.body.position_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});
//-----------------------------POSITION------------------------------

//ADD LEAVE WORK
app.post("/leavework", jsonParser, function (req, res) {
  db.execute(
    "INSERT INTO leavework (emp_id, dep_id, leave_type, leave_desc,leave_date, start_leave, end_leave, leave_accept, create_at, update_at) VALUES (?, ?, ?, ?, NOW(), ?, ?, 0, NOW(), NOW())",
    [
      req.body.emp_id,
      req.body.dep_id,
      req.body.leave_type,
      req.body.leave_desc,
      req.body.start_leave,
      req.body.end_leave,
    ],
    function (err, results, fields) {
      if (err) {
        res.json({ status: "error", message: err });
        return;
      }
      res.json({ status: "ok" });
    }
  );
});

//SELECT DATA IN LEAVE WORK
app.get("/leaveworkview", jsonParser, function (req, res) {
  db.execute(
    "SELECT leavework.leave_id,leavework.emp_id,employees.emp_firstname, employees.emp_surname ,leavework.dep_id,department.dep_name,leave_type.ltype_name, leavework.leave_desc,leavework.leave_date, leavework.start_leave, leavework.end_leave,leavework.leave_accept	 FROM leavework LEFT JOIN leave_type ON leavework.leave_type = leave_type.ltype_id LEFT JOIN employees ON leavework.emp_id = employees.emp_id LEFT JOIN department ON leavework.dep_id = department.dep_id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//SELECT DATA IN OT_REQUEST
app.get("/leaveworkcountperweek", jsonParser, function (req, res) {
  db.execute(
    "SELECT COUNT(*) AS no_leavework FROM leavework WHERE leave_accept = 0 AND DATE(leave_date) > NOW() - interval 7 day",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//SELECT DATA IN LEAVEWORK
app.get("/leavecountbyname", jsonParser, function (req, res) {
  db.execute(
    "SELECT leave_type.ltype_name AS leavetype_name, COUNT(*) AS no_emp FROM leavework INNER JOIN leave_type ON leavework.leave_type = leave_type.ltype_id WHERE leavework.leave_accept = 1 GROUP BY leave_type.ltype_id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//GET LEAVE_TYPE DATA FORM DB
app.get("/leave_type", jsonParser, function (req, res) {
  db.execute("SELECT * FROM leave_type", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//UPDATE LEAVE WORK DATA FORM DB
app.put("/approveleavework", jsonParser, function (req, res) {
  db.execute(
    "UPDATE leavework SET leave_accept = ?, update_at = NOW() WHERE leave_id = ?",
    [req.body.leave_accept, req.body.leave_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.get("/leavework/:leave_id", jsonParser, function (req, res) {
  db.execute(
    "SELECT * FROM leavework WHERE leave_id = ?",
    [req.params.leave_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//GET LEAVEWORK FROM ID
app.get("/leaveworkId/:leave_id", jsonParser, function (req, res) {
  db.execute(
    "SELECT leavework.leave_id,employees.emp_firstname,employees.emp_surname, department.dep_name, leave_type.ltype_name, leavework.leave_desc,leavework.leave_date, leavework.start_leave, leavework.end_leave, leavework.leave_accept FROM leavework LEFT JOIN employees ON leavework.emp_id = employees.emp_id LEFT JOIN department ON leavework.dep_id = department.dep_id LEFT JOIN leave_type ON leavework.leave_type = leave_type.ltype_id WHERE leavework.leave_id = ?",
    [req.params.leave_id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//LEAVE WORK COUNT
app.post("/leaveworkcount", jsonParser, function (req, res) {
  db.execute(
    "SELECT e.emp_id, COUNT( CASE WHEN l.leave_accept = 0 THEN 1 END ) AS waiting, COUNT( CASE WHEN l.leave_accept = 1 THEN 1 END ) AS accept, COUNT( CASE WHEN l.leave_accept = 2 THEN 1 END ) AS reject FROM leavework AS l RIGHT JOIN employees AS e ON l.emp_id = e.emp_id GROUP BY e.emp_id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//----------------------------ATTENDANCE-----------------------------

//ADD ATTENDANCE
app.post("/attendance", jsonParser, function (req, res) {
  db.execute(
    "INSERT INTO attendance (emp_id, work_date, work_address, work_status, work_lat, work_lng, create_at, update_at) VALUES (?, NOW(), ?, ?, ?, ?, NOW(), NOW())",
    [
      req.body.emp_id,
      req.body.work_address,
      req.body.work_status,
      req.body.work_lat,
      req.body.work_lng,
    ],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//GET ATTENDANCE DATA FORM DB
app.get("/attendance", jsonParser, function (req, res) {
  db.execute("SELECT * FROM attendance", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//ATTENDANCE WORK COUNT
app.post("/attendancecount", jsonParser, function (req, res) {
  db.execute(
    "SELECT emp_id, CONVERT(DATE(work_date), CHAR) AS working, MIN(CASE WHEN work_status = 0 THEN TIME(work_date) END) AS checkin, MAX(CASE WHEN work_status = 1 THEN TIME(work_date) END) AS checkout FROM attendance GROUP BY emp_id, DATE(work_date)",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//ATTENDANCE WORK COUNT
app.post("/attendancecountperweek", jsonParser, function (req, res) {
  db.execute(
    "SELECT emp_id, COUNT( CASE WHEN work_status = 0 THEN 1 END ) AS checkin, COUNT( CASE WHEN work_status = 1 THEN 1 END ) AS checkout FROM attendance WHERE DATE(work_date) > NOW() - interval 7 day",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//ATTENDANCE WORK COUNT
app.post("/attendancecount2", jsonParser, function (req, res) {
  db.execute(
    "SELECT e.emp_id, COUNT( CASE WHEN a.work_status = 0 THEN 1 END ) AS checkin, COUNT( CASE WHEN a.work_status = 1 THEN 1 END ) AS checkout FROM attendance AS a RIGHT JOIN employees AS e ON a.emp_id = e.emp_id GROUP BY e.emp_id",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

//-----------------------------POSITION------------------------------

//-----------------------------test------------------------------
app.get("/logintest", (req, res) => {
  if (req.session.user) {
    res.send({ loggedIn: true, user: req.session.user });
  } else {
    res.send({ loggedIn: false });
  }
});

app.post("/logintest", (req, res) => {
  const emp_username = req.body.emp_username;
  const emp_password = req.body.emp_password;

  db.query(
    "SELECT * FROM employees WHERE emp_username = ?",
    emp_username,
    (err, result) => {
      if (err) {
        res.send({ err: err });
      }

      if (result.length > 0) {
        bcrypt.compare(
          emp_password,
          result[0].emp_password,
          (error, response) => {
            if (response) {
              //var token = jwt.sign({ user: response.data[0] }, privateKey, { algorithm: 'RS256'});
              req.session.user = result;
              console.log(req.session.user);
              res.send(result);
            } else {
              res.send({ message: "Wrong username/password combination!" });
            }
          }
        );
      } else {
        res.send({ message: "User doesn't exist" });
      }
    }
  );
});
//-----------------------------test------------------------------

//------------------UPLOAD IMAGES-------------------------
app.post("/upload", (req, res) => {
  if (req.files == null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/src/images/${file.name}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/images/${file.name}` });
  });
});
//------------------UPLOAD IMAGES-------------------------

//------------------MULTER UPLOAD IMAGES-------------------------
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "./public/uploads");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const uploads = multer({
//   storage: storage,
//   limits: { fileSize: "1000000" },
//   fileFilter: (req, file, cb) => {
//     const fileTypes = /jpeg|jpg|png|gif/;
//     const mimeType = fileTypes.test(file.mimetype);
//     const extname = fileTypes.test(path.extname(file.originalname));

//     if (mimeType && extname) {
//       return cb(null, true);
//     }
//     cb("Give proper files format to upload");
//   },
// });
//------------------MULTER UPLOAD IMAGES-------------------------

app.listen(3333, () => {
  console.log("running server port 3333");
});
