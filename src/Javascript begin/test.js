// const express = require("express");
// const express_session=require("express-session")
// const passport=require("passport")
// require('./Auth/Google')

// const app = express();
// app.use(express.urlencoded({ extended: true }));
// app.use(express_session({
//     resave:false,
//     secret:"kunal-das",
//     saveUninitialized:true,
//     cookie: {
//       maxAge: 60000 * 50,
//       secure: false,
//       sameSite: "lax",
//       path: "/",
//     },
// }))
// app.use(passport.initialize())
// app.use(passport.session())


// // Serve form with token
// app.get("/", (req, res) => {
//   res.send(`<a href="/auth/google>Logon WITH google</a>`)
// });

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile','email'] }));
 
// app.get('/auth/google/callback', 
//   passport.authenticate('google',
//      { failureRedirect: '/', 
//         successRedirect:'/profile',
        
//      }

//     ),
//   );
//   app.get("/profile",(req,res)=>{
//     if(!req.isAuthenticated()){
//         res.redirect("/")
//     }
//     console.log(res.user)
//     res.send(`<p> welcome ${res.user.displayName}</p>
//         <a href="/logout">Logout</a>`)
//   })
//   app.get("/logout",(req,res)=>{
//     req.logout(()=>{
//         res.redirect("/")
//     })
//   })
// app.listen(3000, () => console.log("Server running on http://localhost:3000"));



const express = require("express");
const session = require("express-session");
const passport = require("passport");
require("./Auth/Google"); // your passport Google strategy

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "kunal-das",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 60000 * 50,
      secure: false, // true if using https
      sameSite: "lax",
      path: "/",
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Home page
app.get("/", (req, res) => {
  res.send(`<a href="/auth/google">Login with Google</a>`);
});

// Google OAuth login
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback   http://localhost:3000/auth/google/callback
app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/profile",
  })
);

// Profile page (protected)
app.get("/profile", (req, res) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/");
  }
  console.log(req.user);
  res.send(`
    <p>Welcome ${req.user.displayName}</p>
    <p>Surname: ${req.user.name.familyName}</p>
    <p>Email: ${req.user.emails[0].value}</p>
    <img src="${req.user.photos[0].value}" alt="pic not found"/>
    <a href="/logout">Logout</a>
  `);
});


// Logout
app.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
