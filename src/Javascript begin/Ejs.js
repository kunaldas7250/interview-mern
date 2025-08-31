const express = require("express");
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))
app.use(express.static("style.css"))
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.send(`<h2>Home Page</h2>`);
});
app.get("/about", (req, res) => {
  const user = [
    { id: 1, name: "kunal das", college: "tiu" },
    { id: 2, name: "subhonil das", college: "tiu" },
    { id: 3, name: "kowstav biswass", college: "tiu" },
  ];
  res.render("intro", {
    titile: "welcome to about page",
    message: req.query.name,
    user,
  });
});
app.get("/form",(req,res)=>{
    res.render("form",{message:null})
})
app.post("/submit",(req,res,next)=>{
const name=req.body.myname
const number=req.body.number
const message= `hello ${name} you sussefully submitted the form and your number is ${number}`
// res.send(message,number)
res.render("form",{message:message})
})
app.listen(3000, () => {
  console.log("your port starting at :3000");
});
