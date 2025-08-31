const express = require("express");
const sql=require("mssql")
const cors=require("cors")

const app = express();
app.use(cors({
  origin: "http://localhost:3000",  // frontend URL
  credentials: true,                // allow cookies
}));
app.use(express.json())
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

app.get("/api/students", async (req, res) => {
  try {
    const pool = await connection();
    const request = await pool.request().query(`SELECT * FROM dbo.Students`);
    if (request.recordset.length === 0) {
      return res.status(404).send("No students found");
    }
    res.status(200).json(request.recordset);
  } catch (error) {
    console.error(`something went wrong ${error}`);
    res.status(500).send("Internal server error");
  }
});

// app.post("/api/students/:page", async (req, res) => {
//   const { page } = req.body;
//   try {
//     const pool = await connection();
//     const result = await pool.request().query(`SELECT * 
// FROM dbo.Students
// ORDER BY id 
// OFFSET ${page} ROWS FETCH NEXT 10 ROWS ONLY;`);
// if(result.recordset.length===0){
//    res.status(403).send("sorry"); 
// }
// res.status(200).send(result)
//   } catch (error) {
//     console.error(`something went wrong ${error}`)
//   }
// });

app.get("/api/students/page/:page", async (req, res) => {
  const page = parseInt(req.params.page) || 0;
  const limit = 10;  // records per page
  const offset = page * limit;

  try {
    const pool = await connection();
    const result = await pool.request().query(`
      SELECT * 
      FROM dbo.Students
      ORDER BY id 
      OFFSET ${offset} ROWS 
      FETCH NEXT ${limit} ROWS ONLY;
    `);

    if (result.recordset.length === 0) {
      return res.status(404).send("No more students");
    }
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(`something went wrong ${error}`);
    res.status(500).send("Internal server error");
  }
});

app.get("/api/students/firstname", async (req, res) => {
  const { name } = req.query;
  try {
    if (!name) {
      return res.status(400).send("Please provide a firstname");
    }

    const pool = await connection();
    const result = await pool
      .request()
      .input("name", sql.VarChar, name)
      .query(`SELECT * FROM dbo.Students WHERE firstname = @name`);

    if (result.recordset.length === 0) {
      return res.status(404).send("No student found with that firstname");
    }

    res.status(200).json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
});
app.get("/", (req, res) => {
  res.send("🚀 Server is running");
});
app.listen(5000, () => {
  console.log(`your pagination  port:4000`);
});
