const express=require("express")
const cors=require("cors")
const cookie=require("cookie-parser")
const jwt=require("jsonwebtoken")
const fs=require("fs")
const app=express()
app.use(express.json())
app.use(cookie())
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin:"http://localhost:3000",
    methods:["GET","POST","PUT","DELETE","PATCH"],
    credentials:true
}))

app.post("/auth/signup",(req,res)=>{

})
app.post("/auth/login",(req,res)=>{

})
app.get("/auth/me",(req,res)=>{

})
app.post("/resume",(req,res)=>{

})
app.get("/resume",(req,res)=>{

})
app.put("/resume/:{id}",(req,res)=>{

})
app.delete("/resume/:{id}",(req,res)=>{

})
app.use("/download-file",(req,res)=>{
fs.writeFile()

})
app.listen(4000,()=>{
    console.log("your port is running on :4000")
})