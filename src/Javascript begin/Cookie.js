const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const mockUsers=require("./mockUsers")
const app = express();
app.use(express.json());
app.use(cookieParser("kunal-das"));
app.use(express.urlencoded({ extended: false }));

// ✅ Session middleware
app.use(session({
  secret: "kunal-das-testing",
  saveUninitialized: false, // don’t create session until data is stored
  resave: false,            // don’t save if not modified
  cookie: {
    maxAge: 1000 * 60 * 25, // 25 minutes
    secure: false,          // false because you're on http://localhost
    sameSite: "lax",        // works fine for localhost
    httpOnly: true,         // JS in browser can't access
    path: "/"               // available on all routes
  }
}));

// ✅ Set cookie + session
app.get("/set-cookie", (req, res) => {
  res.cookie("kunal-das", "testing", {
    secure: false,
    sameSite: "lax",
    expires: new Date(Date.now() + 3600000), // 1 hour expiry
    httpOnly: true,
  });

  req.session.user = "Kunal Das"; // save to session
  console.log("Session ID:", req.sessionID);
  console.log("Session Data:", req.session);

  res.send("✅ Cookie and session have been set");
});

// ✅ Get cookies + session
app.get("/get-cookie", (req, res) => {
  console.log("Cookies:", req.cookies);
  console.log("Session:", req.session);
  console.log("Session ID:", req.sessionID);

  if (req.cookies["kunal-das"] === "testing" && req.session.user) {
    return res.send(`🎉 Cookie OK. Session user: ${req.session.user}`);
  }

  res.json({
    message: "Here are your cookies and session",
    cookies: req.cookies,
    session: req.session,
  });
});

// ✅ Clear both cookie + session
app.get("/clear-cookie", (req, res) => {
  res.clearCookie("kunal-das");
  req.session.destroy(() => {
    res.clearCookie("connect.sid");
    res.send("❌ Cookie and session cleared");
  });
});

app.post("/api/user", (req, res) => {
  const { username, password } = req.body;
  console.log("Login attempt:", username, password);

  // find user
  const finduser = mockUsers.find(user => user.username === username);

  if (!finduser) {
    return res.status(403).json({ message: "Bad credentials: user not found" });
  }

  // check password
  if (finduser.password !== password) {
    return res.status(401).json({ message: "Bad credentials: wrong password" });
  }

  // save session
  req.session.user = {
    id: finduser.id,
    username: finduser.username,
    displayName: finduser.displayName,
  };

  console.log("✅ User logged in, session:", req.session);

  return res.status(200).json({
    message: "User successfully authenticated",
    user: req.session.user,
  });
});

app.get("/api/status", (req, res) => {
  if (req.session.user) {
    return res.status(200).json({
      message: "User successfully authenticated",
      user: req.session.user,
    });
  }

  return res.status(401).json({ message: "Unauthorized access" });
});
app.post("/api/item", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const { item } = req.body;
  console.log(item)
  if (!item) {
    return res.status(400).json({ message: "No item provided" });
  }

  // if carts not exist, create it
  if (!req.session.user.carts) {
    req.session.user.carts = [];
  }

  req.session.user.carts.push(item);

  return res.status(200).json({
    message: "Item added to cart",
    carts: req.session.user.carts,
  });
});

app.get("/api/status",(req,res)=>{
     if(!req.session.user) return res.status(401).send("message:unauthorized")
        return res.send(req.session.carts??[])
})
app.listen(4000, () => {
  console.log("🚀 Server running at http://localhost:4000");
});


