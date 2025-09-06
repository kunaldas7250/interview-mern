

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
