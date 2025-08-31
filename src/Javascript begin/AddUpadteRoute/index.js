// const express = require("express");
// const cors = require("cors");
// const Route=require("./Route")
// const app = express();


// const cookie = require("cookie-parser");

// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(
//   cors({
//     origin: "http://localhost:3000", // allow frontend
//     methods: ["GET", "POST", "PATCH", "DELETE"],
//     credentials: true, // allow cookies/headers
//   })
// );

// app.use(cookie());
// app.use(Route)











// app.get("/time", (req, res) => {
//   // Request headers (from client, read-only)
//   console.log("Request headers:", req.headers);

//   // Add custom headers to response
//   res.setHeader("kunal-das", "testing-purpose");
//   res.setHeader("new-test", "new-purpose");

//   const time = new Date().toLocaleTimeString(); // Local time
//   const serverTime = new Date().toISOString(); // UTC ISO time

//   res.status(200).json({
//     localTime: time,
//     serverTime: serverTime,
//   });
// });


// app.listen(4000, () => {
//   console.log("🚀 Your server is running on :4000");
// });


const express = require("express");
const cors = require("cors");
const cookie = require("cookie-parser");
const Route = require("./Route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);
app.use(cookie());
app.use(Route);

app.get("/time", (req, res) => {
  res.setHeader("kunal-das", "testing-purpose");
  res.setHeader("new-test", "new-purpose");

  res.status(200).json({
    localTime: new Date().toLocaleTimeString(),
    serverTime: new Date().toISOString(),
  });
});

app.listen(4000, () => {
  console.log("🚀 Your server is running on :4000");
});
