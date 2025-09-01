// const express=require("express")
// const app=express()
// const csruf=require("csurf")
// const cookie=require("cookie-parser")
// const cors=require("cors")
// const connection=require("./AddUpadteRoute/Database")
// const multer=require("multer")
// const sql=require("mssql")
// const { rateLimit } =require('express-rate-limit')
// const helmet=require("helmet")
// const { GoogleGenAI } =require( "@google/genai");



// app.use(express.json())
// app.use(express.urlencoded({extended:false}))
// const limiter=rateLimit({
//     windowMs:60*1000*60,
//     limit:50,
//     standardHeaders:'draft-8',
//     legacyHeaders:false,
//     message:"too many request"
// })
// app.use(limiter)
// app.use(helmet())
// app.use(cors({
//     origin:"http://localhost:3000",
//     methods:["get","post","delete"],
//     credentials:false
// }))
// app.use(cookie())
// const csrufProtection=csruf({cookie:true})
// const gemeni_api_key="AIzaSyAIX922Ae_f2SqjUymU00JwAT6s1fJBBpk"

// app.get("/api/question/:quetsion",csrufProtection,async(req,res)=>{
//     const {question}=req.body
// try {
//     if(!question){
//         res.status(403).send("sorry your message")
//     }
//     const pool=await connection()
//      const result=await pool
//      .request()
//      .input("question",sql.varchar,question)
//     .query(`insert into  dbo.chatbot where question=@question`)
//     if(result.recordset.length===0){
//         res.status(404).send("you have empty recored")
//     }
//     res.send(result.recordset)
// } catch (error) {
//     console.error(`something went wrong ${error}`)
// }
// })
// app.get("/api/answer",csrufProtection,async(req,res)=>{
//     const {question}=req.params
//     try {
//         const ai = new GoogleGenAI({});
//         const response=await ai.models.generateContent({
//             model: "gemini-2.5-flash",
//             contents:question,
//             config:{
//                 thinkingConfig:{
//                     thinkingBudget:0
//                 }
//             }
//         })
//         const pool =await connection()
//         await pool.request()
//         .query(`insert into dbo.chatbot where answer=@answer`)
//         res.send(response)
//     } catch (error) {
//         console.error(`something went wrong ${error}`)
//     }
// })
// app.get("api/getallmessage",csrufProtection,async(req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }
// })
// app.get("/api/getallmessage/:id",csrufProtection,async(req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }
// })
// app.post("/api/message",csrufProtection,async(req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }
// })
// app.delete("/api/getallmessage/:id",csrufProtection,async(req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }
// })
// app.patch("/api/updatemess/:id",csrufProtection,async(req,res)=>{
//     try {
        
//     } catch (error) {
        
//     }
// })
// app.listen(6000,()=>{
//     console.log("your port:6000")
// })



const express = require("express");
const app = express();
const csruf = require("csurf");
const cookie = require("cookie-parser");
const cors = require("cors");
const connection = require("./AddUpadteRoute/Database");
const sql = require("mssql");
const { rateLimit } = require("express-rate-limit");
const helmet = require("helmet");
const { GoogleGenAI } = require("@google/genai");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// 🔹 Rate limiter
const limiter = rateLimit({
  windowMs: 60 * 1000 * 60,
  limit: 50,
  message: "Too many requests",
});
app.use(limiter);
app.use(helmet());

// 🔹 CORS (allow cookies for CSRF)

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true,
  })
);


app.use(cookie());


// 🔹 Gemini API Key
const gemeni_api_key = "AIzaSyAIX922Ae_f2SqjUymU00JwAT6s1fJBBpk";

// ================= CRUD ROUTES ================= //

// ✅ 1. Save Question
app.post("/api/question",  async (req, res) => {
  const { question } = req.body;
  try {
    if (!question) return res.status(400).send("❌ Question is required");

    const pool = await connection();
    await pool
      .request()
      .input("question", sql.VarChar, question)
      .query("INSERT INTO dbo.chatbot(question) VALUES(@question)");

    res.send({ message: "✅ Question saved" });
  } catch (error) {
    console.error("❌ Error inserting question:", error);
    res.status(500).send("Internal server error");
  }
});

// ✅ 2. Generate Answer with AI + Save
app.post("/api/answer",  async (req, res) => {
  const { question } = req.body;
  try {
    if (!question) return res.status(400).send("❌ Question is required");

    const ai = new GoogleGenAI({ apiKey: gemeni_api_key });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: question }] }],
    });

    const answer = response.candidates[0].content.parts[0].text;

    const pool = await connection();
    await pool
      .request()
      .input("answer", sql.VarChar, answer)
      .query("INSERT INTO dbo.chatbot(answer) VALUES(@answer)");

    res.send({ answer });
  } catch (error) {
    console.error("❌ Error generating answer:", error);
    res.status(500).send("Internal server error");
  }
});

// ✅ 3. Get All Messages
app.get("/api/getallmessage", async (req, res) => {
  try {
    const pool = await connection();
    const result = await pool.request().query("SELECT * FROM dbo.chatbot");
    res.send(result.recordset);
  } catch (error) {
    console.error("❌ Error fetching messages:", error);
    res.status(500).send("Internal server error");
  }
});

// ✅ 4. Get Single Message
// Get single message by question
app.get("/api/getmessage/:question", async (req, res) => {
  try {
    const pool = await connection();
    const result = await pool
      .request()
      .input("question", sql.VarChar, req.params.question)
      .query("SELECT * FROM dbo.chatbot WHERE question=@question");

    if (result.recordset.length === 0) {
      return res.status(404).send("Message not found");
    }
    res.send(result.recordset[0]);
  } catch (error) {
    console.error("❌ Error fetching message:", error);
    res.status(500).send("Internal server error");
  }
});


// ✅ 5. Save New Message
app.post("/api/message", async (req, res) => {
  const { question, answer } = req.body;
  try {
    const pool = await connection();
    await pool
      .request()
      .input("question", sql.VarChar, question || null)
      .input("answer", sql.VarChar, answer || null)
      .query("INSERT INTO dbo.chatbot(question, answer) VALUES(@question, @answer)");

    res.send({ message: "✅ Message saved" });
  } catch (error) {
    console.error("❌ Error saving message:", error);
    res.status(500).send("Internal server error");
  }
});

// ✅ 6. Delete Message
app.delete("/api/getallmessage/:id", async (req, res) => {
  try {
    const pool = await connection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query("DELETE FROM dbo.chatbot WHERE id=@id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("Message not found");
    }
    res.send({ message: "✅ Message deleted" });
  } catch (error) {
    console.error("❌ Error deleting message:", error);
    res.status(500).send("Internal server error");
  }
});

// ✅ 7. Update Message
app.patch("/api/updatemess/:id", async (req, res) => {
  const { question, answer } = req.body;
  try {
    const pool = await connection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .input("question", sql.VarChar, question || null)
      .input("answer", sql.VarChar, answer || null)
      .query("UPDATE dbo.chatbot SET question=@question, answer=@answer WHERE id=@id");

    if (result.rowsAffected[0] === 0) {
      return res.status(404).send("Message not found");
    }
    res.send({ message: "✅ Message updated" });
  } catch (error) {
    console.error("❌ Error updating message:", error);
    res.status(500).send("Internal server error");
  }
});

// ✅ Start server
app.listen(4000, () => {
  console.log("🚀 Server running on port 4000");
});
