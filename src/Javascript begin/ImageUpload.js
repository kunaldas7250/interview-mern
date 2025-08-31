

const express = require("express");
const multer = require("multer");
const fs = require("fs");
const sql = require("mssql");
const path = require("path");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
// Multer setup (save in uploads folder)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "upload/"); // folder where files will be stored
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique filename
  },
});
const upload = multer({ storage,
     limits: { fileSize: 2 * 1024 * 1024 }
 });

// SQL Server config
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
      console.log("✅ Connected to SQL Server");
    }
    return pool;
  } catch (error) {
    console.error("❌ DB connection error:", error);
  }
};

// Serve upload form
app.get("/", (req, res) => {
  res.render("upload");
});

// Handle upload
app.post("/upload", (req, res) => {
  upload.single("fileImage")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).send("❌ File too large! Max size is 2 MB");
      }
      return res.status(400).send(`❌ Multer error: ${err.message}`);
    } else if (err) {
      return res.status(400).send(`❌ Error: ${err.message}`);
    }

    try {
      console.log("📥 Body:", req.body);
      console.log("📷 File:", req.file);

      const { urlimage, lastname, current_location, phone_number } = req.body;
      const filename = req.file.filename; 
      const fileData = fs.readFileSync(req.file.path); 

      const pool = await connection();
      await pool
        .request()
        .input("firstname", sql.VarChar(100), req.body.profileImage)
        .input("lastname", sql.VarChar(50), lastname)
        .input("current_location", sql.VarChar(100), current_location)
        .input("phone_number", sql.BigInt, phone_number)
        .input("image", sql.NVarChar(500), filename)
        .input("ProfileImagePath", sql.NVarChar(500), urlimage)
        .input("ProfileImage", sql.VarBinary(sql.MAX), fileData)
        .query(
          "INSERT INTO EmployeeDetails (firstname,lastname,current_location,phone_number,image, ProfileImagePath, ProfileImage) VALUES (@firstname,@lastname,@current_location,@phone_number,@image, @ProfileImagePath, @ProfileImage)"
        );

      res.status(201).send("✅ Employee image inserted successfully!");
    } catch (error) {
      console.error("❌ Upload error:", error);
      res.status(500).send("Something went wrong");
    }
  });
});


app.listen(4000, () => {
  console.log("🚀 Server running on http://localhost:4000");
});
