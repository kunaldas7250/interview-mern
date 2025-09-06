const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const multer=require("multer")
const sql = require("mssql");
const bcrypt = require("bcryptjs");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cookie());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
const Dbconnection = {
  user: "sa",
  password: "@Kunal143",
  database: "SalesDB",
  server: "localhost",
  port: 1433,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

let pool;

const connection = async () => {
  try {
    if (!pool) {
      pool = await sql.connect(Dbconnection);
      console.log("✅ Database connected successfully");
    }
    return pool;
  } catch (error) {
    console.error("❌ Something went wrong in connection:", error);
  }
};
const secret_key = "internshala_test";

let jwtverify = async (req, res, next) => {
  try {
    const token = req.cookies.auth_token; // ✅ correct way
    if (!token) {
      return res.status(401).json({ message: "❌ Token required" });
    }
    const decode = jwt.verify(token, secret_key);
    req.user = decode;
    next();
  } catch (error) {
    return res.status(403).json({ message: "❌ Invalid or expired token" });
  }
};
const storage=multer.diskStorage({
    destination:((req,file,cb)=>cb(null,"upload")),
    filename:((req,file,cb)=>cb(null,Date.now()+ "-" + file.originalname))
})
const upload = multer({ storage });


//   const { username, password, email } = req.body;

//   try {
//     if (!username || !password || !email) {
//       return res.status(403).send("Sorry, please fill all the details");
//     }

//     const hashpassword = await bcrypt.hash(password, 10);
//     const pool = await connection();
//     await pool
//       .request()
//       .input("username", sql.VarChar, username)
//       .input("password", sql.VarChar, hashpassword)
//       .input("email", sql.VarChar, email)
//       .query(
//         `INSERT INTO dbo.intershal_test(username,password,email) VALUES(@username,@password,@email)`
//       );

//     console.log("✅ User registered successfully");
//     res.status(201).json({ message: "User registered successfully" });
//   } catch (error) {
//     console.error("❌ Register error:", error);
//     res.status(500).json({ error: "Something went wrong" });
//   }
// });
app.post("/auth/signup", async (req, res) => {
  const { username, password, email } = req.body;

  try {
    if (!username || !password || !email) {
      return res.status(400).json({ error: "Please fill all fields" });
    }

    const pool = await connection();

    
    const existingUser = await pool
      .request()
      .input("username", sql.VarChar, username)
      .query("SELECT username FROM dbo.intershal_test WHERE username=@username");

    if (existingUser.recordset.length > 0) {
      return res.status(409).json({ error: "Username already exists" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await pool
      .request()
      .input("username", sql.VarChar, username)
      .input("password", sql.VarChar, hashPassword)
      .input("email", sql.VarChar, email)
      .query(
        `INSERT INTO dbo.intershal_test(username,password,email) VALUES(@username,@password,@email)`
      );

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("❌ Signup error:", error); // <- important
    res.status(500).json({ error: "Something went wrong on server" });
  }
});

app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    if (!username || !password) {
      res.status(403).send("sorry please fill the details");
    }
    const pool = await connection();
    const result = await pool
      .request()
      .input("username", sql.VarChar, username)
      .query(
        `select username,password from dbo.intershal_test where username=@username`
      );
    if (result.recordset.length === 0) {
      return res.status(400).send("❌ User not found");
    }
    const user = result.recordset[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send("❌ Invalid username or password");
    }
    const token = jwt.sign({ username }, secret_key, { expiresIn: "2d" });
    res.cookie("auth_token", token, { httpOnly: true, sameSite: "lax" });
    res.status(200).json({ message: "Login successful", token });

  } catch (error) {
    console.error(`something went wrong ${error}`);
  }
});
app.get("/auth/me", jwtverify, async (req, res) => {
  try {
    const pool = await connection();
    const result = await pool
      .request()
      .input("username", sql.VarChar, req.user.username)
      .query(`SELECT username, email,password FROM dbo.intershal_test WHERE username=@username`);
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(result.recordset[0]);
  } catch (error) {
    console.error("❌ /auth/me error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/resume", upload.single("photo"), async (req, res) => {
  try {
    const { firstname, lastname, phonenumber, experience } = req.body;
    const educations = JSON.parse(req.body.educations);
    const skills = JSON.parse(req.body.skills);

    if (!firstname || !lastname || !phonenumber || !experience) {
      return res.status(403).send("please fill the details");
    }

    const pool = await connection();

    const result = await pool
      .request()
      .input("photo", sql.VarChar, req.file ? req.file.filename : null)
      .input("firstname", sql.VarChar, firstname)
      .input("lastname", sql.VarChar, lastname)
      .input("phonenumber", sql.VarChar, phonenumber)
      .input("educations", sql.VarChar, JSON.stringify(educations))
      .input("experience", sql.VarChar, experience)
      .input("skills", sql.VarChar, JSON.stringify(skills))
      .query(`
        INSERT INTO dbo.resume (photo, firstname, lastname, phonenumber, educations, experience, skills)
        OUTPUT INSERTED.id
        VALUES (@photo, @firstname, @lastname, @phonenumber, @educations, @experience, @skills)
      `);

    // ✅ Return the inserted row ID + data
    res.status(201).json({
      id: result.recordset[0].id,
      firstname,
      lastname,
      phonenumber,
      educations,
      experience,
      skills,
      photo: req.file ? req.file.filename : null,
    });
  } catch (error) {
    console.error("❌ Resume insert error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});


app.get("/resume", async (req, res) => {
  try {
    const pool = await connection();
    const result = await pool.request().query(`select * from dbo.resume`);
    res.status(200).json(result.recordset);

  } catch (error) {
    console.error(`something went wrong ${error}`);
  }
});
app.put("/resume/:id", async (req, res) => {
  const { id } = req.params;
  let { firstname, lastname, phonenumber, educations, experience, skills } = req.body;

  try {
    
    if (typeof educations === "string") {
      educations = JSON.parse(educations);
    }
    if (typeof skills === "string") {
      skills = JSON.parse(skills);
    }

    const pool = await connection();
    await pool.request()
      .input("id", sql.Int, id)
      .input("firstname", sql.VarChar, firstname)
      .input("lastname", sql.VarChar, lastname)
      .input("phonenumber", sql.VarChar, phonenumber)
      .input("educations", sql.VarChar, JSON.stringify(educations || [])) 
      .input("experience", sql.VarChar, experience)
      .input("skills", sql.VarChar, JSON.stringify(skills || []))
      .query(`
        UPDATE dbo.resume
        SET firstname=@firstname, 
            lastname=@lastname, 
            phonenumber=@phonenumber,
            educations=@educations, 
            experience=@experience, 
            skills=@skills
        WHERE id=@id
      `);

    
    res.status(200).json({
      id,
      firstname,
      lastname,
      phonenumber,
      experience,
      educations: educations || [],
      skills: skills || [],
    });
  } catch (error) {
    console.error("❌ Resume update error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});




app.delete("/resume/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await connection();
    await pool
      .request()
      .input("id", sql.VarChar, id)
      .query(`DELETE FROM dbo.resume WHERE id=@id`);
    res.json({ message: "✅ Resume deleted successfully" });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

//     const filepath=path.join("D:","interview mern","mern-interview","src","Javascript begin","internshala resume","resume.pdf")
//     const {
//     photo,
//     id,
//     firstname,
//     lastname,
//     phonenumber,
//     educations,
//     experience,
//     skills,
//   } = req.body;
//   try {
//       if (
//       !photo ||
//       !id ||
//       !firstname ||
//       !lastname ||
//       !phonenumber ||
//       !educations ||
//       !experience ||
//       !skills
//     ) {
//       res.status(403).send("please fill the details");
//     }
//     fs.writeFile(filepath,photo,
//     id,
//     firstname,
//     lastname,
//     phonenumber,
//     educations,
//     experience,
//     skills,(err)=>{
//         if (err){
//             return res.status(500).send("failed to create a file");
//         }
//         res.header("contentype":"application/pdf")
//         res.sendFile(filepath,(err)=>{
//             console.error("Error sending file:", err);
//       res.status(500).send("File not found!");
//         })
        
//     })
//   } catch (error) {}
// });

app.get("/download-file", (req, res) => {
  const filepath = path.join(
    "D:",
    "interview mern",
    "mern-interview",
    "src",
    "Javascript begin",
    "internshala resume",
    "resume.pdf"
  );

  res.setHeader("Content-Type", "application/pdf");
  res.download(filepath, "resume.pdf", (err) => {
    if (err) {
      console.error("Download error:", err);
      res.status(500).send("File not found!");
    }
  });
});

app.listen(4000, () => {
  console.log("your port is running on :4000");
});
