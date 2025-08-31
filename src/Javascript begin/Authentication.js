// const express = require("express");
// const bcrypt = require("bcryptjs");
// const session = require("express-session");
// const sql = require("mssql");
// const cokkie_parser=require("cookie-parser")
// const csurf=require("csurf")
// const app = express();

// // ✅ Middlewares
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.set("view engine", "ejs"); // ✅ Correct way to set view engine
// app.use(cokkie_parser("kunal-das"))
// const csrfProtection=doubleCsrf({cookie:true})
// app.use(
//   session({
//     secret: "kunal-form",
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//       maxAge: 60000 * 50,
//       secure: false,
//       sameSite: "lax",
//       path: "/",
//     },
//   })
// );
// let checkLogin = (req, res, next) => {
//   if (req.session.user) {
//     next();
//   } else {
//     res.redirect("/login");
//   }
// };
// // ✅ Database connection config
// const Dbconnection = {
//   user: "sa",
//   password: "@Kunal143",
//   database: "SalesDB",
//   server: "localhost",
//   port: 1433,
//   options: {
//     encrypt: false,
//     trustServerCertificate: true,
//   },
// };

// let pool;

// // ✅ Connection function
// const connection = async () => {
//   try {
//     if (!pool) {
//       pool = await sql.connect(Dbconnection);
//       console.log("✅ Connected to SQL Server");
//     }
//     return pool;
//   } catch (error) {
//     console.error("❌ DB connection error:", error);
//   }
// };

// // ✅ Routes
// app.get("/", checkLogin,csrfProtection, (req, res) => {
//   res.cookie("kunal-das", "testing", {
//     sameSite: "lax",
//     expires: new Date(Date.now() + 3600000),
//     secure: false,
//     httpOnly: true,
//   });
//   res
//     .status(200)
//     .send(
//       `<h1>Home Page</h1>  <p> hello ${req.session.user}</p> <a href="/logout">Logout</a>`
//     );
// });
// app.get("/profile", checkLogin,csrfProtection, (req, res) => {
//   res.status(200).send(
//     `<h1>Profile Page</h1>
//      <p>Hello ${req.session.user}</p>
//      <a href="/logout">Logout</a>`
//   );
// });
// app.get("/login",csrfProtection, (req, res) => {
//   if (req.session.user) {
//     res.redirect("/");
//   } else {
//     res.render("login",{csrToken:req.csrfToken()});
//   }
// });
// app.post("/login",csrfProtection, async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     if (!username || !password) {
//       return res.status(403).send("⚠️ Please fill in the details");
//     }

//     const pool = await connection();

//     // Fetch user by username
//     const result = await pool
//       .request()
//       .input("username", sql.VarChar, username)
//       .query(
//         "SELECT username, password FROM dbo.Auth WHERE username = @username"
//       );

//     if (result.recordset.length === 0) {
//       return res.status(400).send("❌ User not found");
//     }

//     const user = result.recordset[0];

//     // Compare password with bcrypt
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).send("❌ Invalid username or password");
//     }

//     // Success
//     req.session.user = username;
//     res.status(200).redirect("/");
//   } catch (error) {
//     console.error(`❌ Something went wrong: ${error}`);
//     res.status(500).send("Server Error");
//   }
// });
// app.get("/logout",csrfProtection, (req, res) => {
//   res.clearCookie("kunal-das");
//   req.session.destroy(() => {
//     res.redirect("/login");
//   });
// });
// app.get("/register",csrfProtection, (req, res) => {
//   res.render("register",{csrToken:req.csrfToken()});
// });

// // ✅ Register API
// app.post("/register",csrfProtection, async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     if (!username || !password) {
//       return res.status(403).send("Please fill in the details");
//     }

//     // ✅ Hash password
//     const hashpassword = await bcrypt.hash(password, 10);

//     // ✅ Connect to DB
//     const pool = await connection();

//     await pool
//       .request()
//       .input("username", sql.VarChar(50), username) // adjust size as per your schema
//       .input("password", sql.VarChar(100), hashpassword) // make sure it's 100
//       .query(
//         "INSERT INTO dbo.Auth (username, password) VALUES (@username, @password)"
//       );

//     console.log("✅ User registered successfully");

//     res.redirect("/login");
//   } catch (error) {
//     console.error(`❌ Something went wrong: ${error}`);
//     res.status(500).send("Server Error");
//   }
// });

// // ✅ Start server
// app.listen(4000, () => {
//   console.log("🚀 Server is running on port 4000");
// });
//////////////////////////////////////////////
// const express = require("express");
// const bcrypt = require("bcryptjs");
// const session = require("express-session");
// const sql = require("mssql");
// const cookieParser = require("cookie-parser");
// const { doubleCsrf } = require("csrf-csrf");

// const app = express();

// // ✅ Middleware

// app.set("view engine", "ejs");

// app.use(cookieParser("kunal-das"));
// app.use(
//   session({
//     secret: "kunal-form",
//     saveUninitialized: false,
//     resave: false,
//     cookie: {
//       maxAge: 1000 * 60 * 30, // 30 min
//       secure: false,
//       sameSite: "lax",
//       path: "/",
//     },
//   })
// );
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// const {
//   invalidCsrfTokenError,
//   generateCsrfToken,
//   doubleCsrfProtection,
// } = doubleCsrf({
//   getSecret: () => "kunal-secret",
//   getSessionIdentifier: (req) => req.session.id,
//   cookieName: "__Host-psifi.x-csrf-token", // cookie name
//   cookieOptions: { sameSite: "strict", secure: false } 
// });
// app.use(doubleCsrfProtection);


// // ✅ SQL Server connection config
// const Dbconnection = {
//   user: "sa",
//   password: "@Kunal143",
//   database: "SalesDB",
//   server: "localhost",
//   port: 1433,
//   options: {
//     encrypt: false,
//     trustServerCertificate: true,
//   },
// };

// let pool;

// // ✅ Connection function (with pool)
// const connection = async () => {
//   try {
//     if (!pool) {
//       pool = await sql.connect(Dbconnection);
//       console.log("✅ Connected to SQL Server");
//     }
//     return pool;
//   } catch (error) {
//     console.error("❌ DB connection error:", error);
//   }
// };

// // ✅ Auth middleware
// let checkLogin = (req, res, next) => {
//   if (req.session.user) {
//     next();
//   } else {
//     res.redirect("/login");
//   }
// };

// // ✅ Routes
// app.get("/", checkLogin, (req, res) => {
//   res
//     .status(200)
//     .send(
//       `<h1>Home Page</h1><p>Welcome ${req.session.user}</p><a href="/profile">Profile</a> | <a href="/logout">Logout</a>`
//     );
// });

// app.get("/profile", checkLogin, (req, res) => {
//   res
//     .status(200)
//     .send(
//       `<h1>Profile Page</h1><p>Hello ${req.session.user}</p><a href="/">Home</a> | <a href="/logout">Logout</a>`
//     );
// });

// app.get("/login", (req, res) => {
//   if (req.session.user) return res.redirect("/");
//   const csrfToken = generateCsrfToken(req, res);
//   res.render("login", { csrfToken });
// });

// app.post("/login", doubleCsrfProtection, async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     if (!username || !password) {
//       return res.status(403).send("⚠️ Please fill in the details");
//     }

//     const pool = await connection();

//     // Fetch user
//     const result = await pool
//       .request()
//       .input("username", sql.VarChar, username)
//       .query(
//         "SELECT username, password FROM dbo.Auth WHERE username = @username"
//       );

//     if (result.recordset.length === 0) {
//       return res.status(400).send("❌ User not found");
//     }

//     const user = result.recordset[0];

//     // Compare password
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).send("❌ Invalid username or password");
//     }

//     req.session.user = username;
//     res.redirect("/");
//   } catch (error) {
//     console.error(`❌ Login error: ${error}`);
//     res.status(500).send("Server Error");
//   }
// });

// app.get("/logout", (req, res) => {
//   req.session.destroy(() => {
//     res.redirect("/login");
//   });
// });

// app.get("/register", (req, res) => {
//   const csrfToken = generateCsrfToken(req, res);
//   res.render("register", { csrfToken });
// });

// app.post("/register", doubleCsrfProtection, async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     if (!username || !password) {
//       return res.status(403).send("⚠️ Please fill in the details");
//     }

//     const hashpassword = await bcrypt.hash(password, 10);
//     const pool = await connection();

//     await pool
//       .request()
//       .input("username", sql.VarChar(50), username)
//       .input("password", sql.VarChar(100), hashpassword)
//       .query(
//         "INSERT INTO dbo.Auth (username, password) VALUES (@username, @password)"
//       );

//     console.log("✅ User registered successfully");
//     res.redirect("/login");
//   } catch (error) {
//     console.error(`❌ Register error: ${error}`);
//     res.status(500).send("Server Error");
//   }
// });
// app.use((err, req, res, next) => {
//   if (err === invalidCsrfTokenError) {
//     return res.status(403).json({ error: "Invalid CSRF token" });
//   }
//   next(err);
// });
// // ✅ Start server
// app.listen(4000, () => {
//   console.log("🚀 Server is running on port 4000");
// });


/////////////////////////////////////////////////////////////
const express = require("express");
const bcrypt = require("bcryptjs");
const session = require("express-session");
const sql = require("mssql");
const cookieParser = require("cookie-parser");
const csrf = require("csurf"); // ✅ using csurf
const json_web_token=require("jsonwebtoken")
const app = express();
const jwtverify=require("./AddUpadteRoute/Route")
const connection=require("./AddUpadteRoute/Database")
// ✅ Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.use(cookieParser("kunal-das"));
let secret_key="kunal_das"
app.use(
  session({
    secret: "kunal-form",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 60000 * 50,
      secure: false,
      sameSite: "lax",
      path: "/",
    },
  })
);

// ✅ Setup CSRF middleware (using cookies)
const csrfProtection = csrf({ cookie: true });

let checkLogin = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};
app.use(jwtverify)
app.use(connection)

// ✅ Database connection config
// ✅ Routes
app.get("/", checkLogin, csrfProtection,jwtverify, (req, res) => {
  res.cookie("kunal-das", "testing", {
    sameSite: "lax",
    expires: new Date(Date.now() + 3600000),
    secure: false,
    httpOnly: true,
  });
  res.status(200).send(
    `<h1>Home Page</h1>  
     <p>Hello ${req.session.user}</p> 
     <a href="/logout">Logout</a>`
  );
});

app.get("/profile", checkLogin, csrfProtection,jwtverify, (req, res) => {
  res.status(200).send(
    `<h1>Profile Page</h1>
     <p>Hello ${req.session.user}</p>
     <a href="/logout">Logout</a>`
  );
});

app.get("/login", csrfProtection, (req, res) => {
  if (req.session.user) {
    res.redirect("/");
  } else {

  res.render("login", { csrfToken: req.csrfToken() });
 
  }
});

app.post("/login", csrfProtection, async (req, res) => {
  const { username, password } = req.body;

  try {
    const pool = await connection();
    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .query("SELECT username, password FROM dbo.Auth WHERE username = @username");

    if (result.recordset.length === 0) {
      return res.status(400).send("❌ User not found");
    }

    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("❌ Invalid username or password");
    }

    // ✅ Generate JWT only here
    const token = json_web_token.sign({ username }, secret_key, { expiresIn: "2d" });
    res.cookie("auth_token", token, { httpOnly: true, sameSite: "lax" });

    // ✅ Store only username in session
    req.session.user = username;

    res.redirect("/");
  } catch (error) {
    console.error(`❌ Something went wrong: ${error}`);
    res.status(500).send("Server Error");
  }
});



app.get("/logout", csrfProtection,(req, res) => {
  res.clearCookie("auth_token"); // ✅ clear JWT cookie
  req.session.destroy(() => {
    res.redirect("/login");
  });
});


app.get("/register", csrfProtection, (req, res) => {
  res.render("register", { csrfToken: req.csrfToken() });
});

app.post("/register", csrfProtection, async (req, res) => {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(403).send("⚠️ Please fill in the details");
    }

    // hash password for DB
    const hashpassword = await bcrypt.hash(password, 10);
    const pool = await connection();

    // insert in DB
    await pool
      .request()
      .input("username", sql.VarChar(50), username)
      .input("password", sql.VarChar(100), hashpassword)
      .query("INSERT INTO dbo.Auth (username, password) VALUES (@username, @password)");

    console.log("✅ User registered successfully");

    

    res.redirect("/login");
  } catch (error) {
    console.error(`❌ Something went wrong: ${error}`);
    res.status(500).send("Server Error");
  }
});


// ✅ Start server
app.listen(4000, () => {
  console.log("🚀 Server is running on port 4000");
});
