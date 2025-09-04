const express=require("express")
const app=express()
const axios=require("axios")
const cors=require("cors")
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
    methods:["GET","POST","DELETE","PATCH"]
}))
const RECAPTCHA_SECRET = "6LcI77srAAAAAMT1B8mOcwFCbqYTAyIJUnr4ltcK";
app.get("/", (req, res) => {
  res.redirect("/submit");
});

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
    console.log("your port:4000")
})