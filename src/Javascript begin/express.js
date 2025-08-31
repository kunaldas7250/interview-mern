const express = require("express");
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({extended:true}))
const port = 3000; // use const and consistent name
const user = [
  { id: 1, name: "kunal" },
  { id: 2, name: "riku" },
  { id: 3, name: "das" },
];
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  const user = [
    { id: 1, name: "kunal" },
    { id: 2, name: "riku" },
    { id: 3, name: "Das" },
  ];
  // res.status(200).send("<h2>hello world</h2>");
  // res.status(200).json({
  //     name:"kunal das",
  //     college:"tiu",
  //     home:"dhanbad"
  // })
  res.status(200).send(user);
});
app.get("/user/:id", (req, res) => {
  console.log(req.params);
  // {id}=req.params
  const { id } = req.params;
  if (!id) {
    res.status(403).send("forbidden");
  }
  const result = user.find((prev) => prev.id == id);
  if (!result) {
    res.status(404).send("not found");
  }
  res.status(200).send(result);
});

app.get("/search", (req, res) => {
  console.log("i am query", req.query);
const { name }=req.query;
if(!name){
    res.status(403).send("you are forbiden")
}
const dinduser=name.toLowerCase()
const result=user.find((prev)=>prev.name==dinduser)
if(!result){
     res.status(404).send("not found");
}
  res.status(200).send(result);
});

app.post("/login",(req,res)=>{
   const {username,password}=req.body;
    if(!username&&!password) return res.status(403)

    res.status(200).send(req.body)
})
app.get("/check",(req,res)=>{
    console.log(res.headersSent)
    res.send("hello")
    console.log(res.headersSent)
})
app.get("/getset",(req,res)=>{
    res.set("kunal_das","nothing")
    console.log(res.get("kunal_das"))
    res.status(200).send("header set")
})
app.get("/host",(req,res)=>{
    // res.send(req.hostname)
    // res.send(req.ip)
    // res.send(req.ips)
    // res.send(req.method)
    // res.send(req.originalUrl)
    // res.send(req.path)
    // res.send(req.protocol)
    // res.send(req.secure)
    // res.send(req.route)
//      if (req.accepts("html")) {
//     return res.send("<h2>html</h2>");
//   }
//   if (req.accepts("json")) {
//     return res.json({ success: "success" });
//   }
//   if (req.accepts("xml")) {
//     return res.type("xml").send("<note><status>success</status></note>");
//   }

//   // fallback if none match
//   res.status(404).send("sorry");
// res.send(req.headers["content-type"])
// res.send(req.headers["connection"])
res.send(req.get("host"))
})
app.post("/add",(req,res)=>{
    console.log(req.body)
})
app.get("/user", (req, res) => {
  res.redirect(302, "/about");
});
app.get("/about", (req, res) => {
  // res.send("<h1>About page</h1>")
  res.render("about");
});
app.get("/download", (req, res) => {
  res.download("./Files/Bpo_job.pdf", "Document.pdf");
});
app.get("/send", (req, res) => {
  res.sendFile(__dirname + "/Files/Bpo_job.pdf");
});
app.get("/end", (req, res) => {
  res.write("this is testing purpose");
  res.end();
});
app.get("/error", (req, res) => {
  res.sendStatus(404);
});
app.listen(port, () => {
  console.log("Your port is", port);
});
