const express = require("express");
const app = express();
const cors = require("cors");
// const { rateLimit } = require("express-rate-limit");
const axios = require("axios");
// const limiter = rateLimit({
//   windowMs: 60 * 1000 * 60,
//   limit: 50,
//   message: "Too many requests",
// });
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  })
);
// app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const RECAPTCHA_SECRET = "6LcI77srAAAAAMT1B8mOcwFCbqYTAyIJUnr4ltcK";
app.get("/", (req, res) => {
  res.redirect("/submit");
});
// app.post("/submit", async (req, res) => {
//   const { username, password, recaptcha } = req.body;
//   try {
//     if (!username || !password || !recaptcha) {
//       res.status(403).send("sorry we dont have required field");
//     }
//     if (!recaptcha) {
//       return res
//         .status(400)
//         .json({ success: false, message: "reCAPTCHA token is missing" });
//     }

//     const responce = await axios.post(
//       `https://www.google.com/recaptcha/api/siteverify`,
//       null,
//       {
//         params: {
//           secret: RECAPTCHA_SECRET,
//           responce: recaptcha,
//         },
//       }
//     );
//     const data=responce.data
//     if(data.success){
//         console.log("user verified",{username,password})
//         return res.json({ success: true, message: "reCAPTCHA verified. Form submitted." });
//     }else{
//         return res.status(400).json({ success: false, message: "reCAPTCHA failed", error: data["error-codes"] });
//     }
//   } catch (error) {
//     console.error(`something went wrong ${error}`)
//     res.status(500).json({ success: false, message: "Server error verifying reCAPTCHA" });
//   }
// });
app.post("/submit", async (req, res) => {
  const { username, password, recaptcha } = req.body;

  if (!username || !password || !recaptcha) {
    return res.status(403).send("sorry we dont have required field");
  }

  try {
    const response = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      null,
      {
        params: {
          secret: RECAPTCHA_SECRET,
          response: recaptcha, // ✅ correct spelling
        },
      }
    );

    const data = response.data;

    if (data.success) {
      console.log("user verified", { username, password });
      return res.json({
        success: true,
        message: "reCAPTCHA verified. Form submitted.",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "reCAPTCHA failed",
        error: data["error-codes"],
      });
    }
  } catch (error) {
    console.error("something went wrong", error.message);
    res
      .status(500)
      .json({ success: false, message: "Server error verifying reCAPTCHA" });
  }
});


app.listen(4000,()=>{
    console.log("your port is :4000")
})
