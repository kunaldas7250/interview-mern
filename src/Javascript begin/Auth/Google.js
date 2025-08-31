
const passport = require("passport");
const sql = require("mssql");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config();

// ----------------------
// Passport Google OAuth
// ----------------------
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.CALLBACKURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Here you can save/find user in your SQL DB
        // Example:
        const pool = await getDBConnection();
        await pool.request()
           .input("googleid", sql.VarChar, profile.id)
          .input("displayName", sql.VarChar, profile.displayName)
          .input("email",sql.VarChar,profile.emails[0].value)
          .query("insert into dbo.GoogleAuth(googleid,displayName,email) values(@googleid,@displayName,@email)");

        return done(null, profile);
      } catch (err) {
        console.error("Error saving user to DB:", err);
        return done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// ----------------------
// SQL Server Connection
// ----------------------
const Dbconnection = {
  user: "sa",
  password: "@Kunal143",
  database: "SalesDB",
  server: "localhost",
  port: 1433,
  options: {
    encrypt: false, // true if using Azure
    trustServerCertificate: true,
  },
};

let pool = null;

// Function to get or reuse the connection
async function getDBConnection() {
  try {
    if (!pool) {
      pool = await sql.connect(Dbconnection);
      console.log("Connected to SQL Server");
    }
    return pool;
  } catch (error) {
    console.error("Something went wrong in database:", error);
    throw error;
  }
}

// Export the DB connection function if needed
module.exports = { getDBConnection };
