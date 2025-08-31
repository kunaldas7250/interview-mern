const express = require("express");
const app = express();
const connection =require("./Database")
const sql = require("mssql");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const csurf = require("csurf");

let secret_key = "kunal_das";

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

const csrfProtection = csurf({
  cookie: {
    httpOnly: true,   // prevents JS from reading it
    secure: false,    // true if using HTTPS
    sameSite: "lax"   // must match frontend behavior
  },
  value: (req) => req.headers['x-csrf-token'] // read token from header
});
app.get("/csrf-token", csrfProtection, (req, res) => {
  // CSRF cookie is automatically set by csurf
  res.json({ csrfToken: req.csrfToken() });
});
app.get("/", jwtverify, (req, res) => {
  res.status(200).redirect("/Register");
});

app.post("/Register", csrfProtection, async (req, res) => {
  const { firstname, lastname, email, password, department } = req.body;

  if (!firstname || !lastname || !email || !password || !department) {
    return res.status(403).json({ message: "⚠️ Please fill in the details" });
  }

  try {
    const pool = await connection();

    // Check if email already exists
    const existing = await pool.request()
      .input("email", sql.VarChar, email)
      .query("SELECT email FROM dbo.Register WHERE email = @email");

    if (existing.recordset.length > 0) {
      return res.status(400).json({ message: "❌ Email already registered" });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    // Insert new user
    await pool.request()
      .input("firstname", sql.VarChar, firstname)
      .input("lastname", sql.VarChar, lastname)
      .input("email", sql.VarChar, email)
      .input("password", sql.VarChar, hashpassword)
      .input("department", sql.VarChar, department)
      .query(`INSERT INTO dbo.Register (firstname, lastname, email, password, department)
              VALUES (@firstname, @lastname, @email, @password, @department)`);

    res.status(201).json({ 
      message: "✅ User Registered Successfully!", 
      csrfToken: req.csrfToken() 
    });

  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ message: "❌ Something went wrong!" });
  }
});

app.post("/login", csrfProtection, async (req, res) => {
  const { email, password, department } = req.body;

  if (!email || !password || !department) {
    return res.status(403).json({ message: "⚠️ Please fill in the details" });
  }

  const pool = await connection();
  const result = await pool.request()
    .input("email", sql.VarChar, email)
    .query(`SELECT email, department, password FROM dbo.Register WHERE email=@email`);

  if (result.recordset.length === 0) {
    return res.status(400).json({ message: "❌ User not found" });
  }

  const user = result.recordset[0];
  const ismatch = await bcrypt.compare(password, user.password);
  if (!ismatch) return res.status(400).json({ message: "❌ Invalid username or password" });

  const token = jwt.sign({ email: user.email, department: user.department }, secret_key, { expiresIn: "2d" });
  res.cookie("auth_token", token, { httpOnly: true, sameSite: "lax" });
  res.status(200).json({
    message: "Login successful",
    user: { email: user.email, department: user.department },
    csrfToken: req.csrfToken()
  });
});

app.get("/logout", (req, res) => {
  try {
    res.clearCookie("auth_token", {
      httpOnly: true,
      secure: false, // set true if using https
      sameSite: "lax", // must match cookie settings you used in login
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (err) {
    res.status(500).json({ error: "Logout failed" });
  }
});

app.get("/employee", async (req, res) => {
  try {
    const pool = await connection(); // reuse connection
    const result = await pool
      .request()
      .query("select * from dbo.EmployeeDetails");
    res.json(result.recordset);
  } catch (error) {
    console.error("❌ Error fetching employees:", error);
    res.status(500).send(error.message);
  }
});


app.post("/Addemployee", async (req, res) => {
  const { firstname, lastname, current_location, phone_number } = req.body;

  try {
    // Validate inputs
    if (!firstname || !lastname || !current_location || !phone_number) {
      return res.status(400).send("❌ Missing required fields");
    }

    const pool = await connection(); // ✅ reuses the connection pool

    await pool
      .request()
      .input("firstname", sql.VarChar(50), firstname)
      .input("lastname", sql.VarChar(50), lastname)
      .input("current_location", sql.VarChar(100), current_location)
      .input("phone_number", sql.BigInt, phone_number).query(`
        INSERT INTO EmployeeDetails (firstname, lastname, current_location, phone_number)
        VALUES (@firstname, @lastname, @current_location, @phone_number)
      `);

    res.status(201).send("✅ Employee added successfully");
  } catch (error) {
    console.error("❌ Error inserting employee:", error);
    res.status(500).send("Database insert failed");
  }
});


app.get("/EmployeeDetails/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10); // ✅ convert string to integer

    if (isNaN(id)) {
      return res.status(400).send("❌ Invalid ID format");
    }

    const pool = await connection();
    const result = await pool
      .request()
      .input("id", sql.Int, id) // ✅ correct usage
      .query("SELECT * FROM dbo.EmployeeDetails WHERE id = @id");

    if (result.recordset.length === 0) {
      return res.status(404).send("❌ Employee not found");
    }

    res.status(200).json(result.recordset[0]); // return single employee
  } catch (error) {
    console.error("❌ Error fetching employee by id:", error);
    res.status(500).send("Database fetch failed");
  }
});


app.patch("/UpdateEmployee/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, current_location, phone_number } = req.body;

  try {
    if (!id) {
      return res.status(403).send("❌ ID is missing");
    }
    if (!firstname || !lastname || !current_location || !phone_number) {
      return res.status(400).send("❌ Missing required fields");
    }

    const pool = await connection();
    const result = await pool
      .request()
      .input("id", sql.Int, id) // ✅ FIXED
      .input("firstname", sql.VarChar(50), firstname)
      .input("lastname", sql.VarChar(50), lastname)
      .input("current_location", sql.VarChar(100), current_location)
      .input("phone_number", sql.BigInt, phone_number).query(`
        UPDATE dbo.EmployeeDetails
        SET firstname = @firstname,
            lastname = @lastname,
            current_location = @current_location,
            phone_number = @phone_number
        WHERE id = @id
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("❌ Employee not found");
    }

    res.status(200).send("✅ Employee updated successfully");
  } catch (error) {
    console.error("❌ Error updating employee:", error);
    res.status(500).send("Database update failed");
  }
});


app.delete("/DeleteEmployee/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10);

  try {
    if (isNaN(id)) {
      return res.status(400).send("❌ Invalid ID");
    }

    const pool = await connection();
    const result = await pool.request().input("id", sql.Int, id).query(`
        DELETE FROM EmployeeDetails
        WHERE id = @id
      `);

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("❌ Employee not found");
    }

    res.status(200).json({
      message: "✅ Employee deleted successfully",
      rowsAffected: result.rowsAffected,
    });
  } catch (error) {
    console.error("❌ Error deleting employee:", error);
    res.status(500).send("Database delete failed");
  }
});

module.exports=app
