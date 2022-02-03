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
      "INSERT INTO employees (emp_firstname, emp_surname, emp_address, emp_tel, emp_email, emp_username, emp_password, dep_id, role_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
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

//ADD DEPARTMENT
app.post("/department", jsonParser, function (req, res) {
  db.execute(
    "INSERT INTO department (dep_name) VALUES (?)",
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
    "UPDATE department SET dep_name = ? WHERE dep_id = ?",
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
    "INSERT INTO activity (act_name, act_place,act_date, act_time, act_image, act_desc) VALUES (?, ?, ?, ?, ?, ?)",
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
    "INSERT INTO activity (act_name, act_place, act_date, act_time, act_image, act_desc) VALUES (?, ?, ?, ?, ?, ?)",
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
    "SELECT employees.emp_id,employees.emp_firstname,employees.emp_surname,department.dep_name,positions.position_name,employees.emp_images FROM employees LEFT JOIN department ON employees.dep_id = department.dep_id LEFT JOIN positions ON employees.position_id = positions.position_id",
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
    "SELECT ot_assignment.ot_id,ot_assignment.ot_name,department.dep_name,ot_assignment.ot_desc,ot_assignment.ot_starttime,ot_assignment.ot_finishtime,ot_assignment.ot_apply,ot_assignment.ot_request,ot_assignment.ot_stump,ot_assignment.ot_status,ot_assignment.ot_rate,TIMEDIFF(ot_assignment.ot_finishtime,ot_assignment.ot_starttime) AS summary FROM ot_assignment LEFT JOIN department ON ot_assignment.dep_id = department.dep_id WHERE ot_assignment.ot_id = ?",
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
    "INSERT INTO ot_assignment ( ot_name, ot_rate, dep_id, ot_desc, ot_starttime, ot_finishtime, ot_apply, ot_request, ot_stump, ot_status, create_at, update_at, record_status) VALUES ( ?, ?, ?, ?, ?, ?, ?, 0, 0, 1, NOW(), NOW(), 1)",
    [
      req.body.ot_name,
      req.body.ot_rate,
      req.body.dep_id,
      req.body.ot_desc,
      req.body.ot_starttime,
      req.body.ot_finishtime,
      req.body.ot_apply,
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
    "SELECT ot_assignment.ot_id,ot_assignment.ot_name,department.dep_name,ot_assignment.ot_desc,ot_assignment.ot_starttime,ot_assignment.ot_finishtime,ot_assignment.ot_apply,ot_assignment.ot_request,ot_assignment.ot_stump,ot_assignment.ot_status,ot_assignment.ot_rate,TIMEDIFF(ot_assignment.ot_finishtime,ot_assignment.ot_starttime) AS summary FROM ot_assignment LEFT JOIN department ON ot_assignment.dep_id = department.dep_id",
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
//GET OT_REQUEST DATA FORM DB
app.post("/otrequest", jsonParser, function (req, res) {
  db.execute("INSERT INTO ot_request (emp_id, dep_id, ot_id, otr_status, otr_date) VALUES (?, ?, ?, 0,NOW())",[
    req.body.emp_id,
    req.body.dep_id,
    req.body.ot_id,
  ], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
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
    "INSERT INTO role (role_name) VALUES (?)",
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
    "INSERT INTO positions (position_name, dep_id, create_at, update_at ) VALUES (?, ?, NOW(), NOW())",
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

//ADD LEAVE WORK
app.post("/leavework", jsonParser, function (req, res) {
  db.execute(
    "INSERT INTO leavework (emp_id, dep_id, type_leave, leave_desc, start_leave, end_leave, summary, leave_accept) VALUES (?, ?, ?, ?, ?, ?, 2, 1)",
    [
      req.body.emp_id, 
      req.body.dep_id, 
      req.body.type_leave,
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

///GET LEAVE WORK FROM DB
app.get("/leavework", jsonParser, function (req, res) {
  db.execute("SELECT * FROM leavework", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
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
  if (req.files === null) {
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
