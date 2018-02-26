const express = require("express");
const expressjwt = require("express-jwt");
const jwt = require('jsonwebtoken');

const app = express();


app.use(expressjwt({secret: "jwt-auth"}).unless({path: ["/auth"]}));

app.get("/auth", (req, res)  => {
  
  // this should be post request in a real scenario. Also nedd to vaidate the user from database.
  const user = {username: "ajantha", password: "password"};

  jwt.sign({ username: user.username,role: "admin" }, "jwt-auth", (err, token) => {
    if (!err) {
      return res.json({ error: false, token });
    } else {
      return res.json({ error: true, message: "Token generation field. Try again" });
    }
  });
})

app.get("/users", (req, res) => {
  const users = [{ "name": "Ajanha" }];
  const user = req.user;
  
  if (user && user.role === "admin") { // this is not the correct way to protect the route according to the role based.
    res.json(users);
  } else {
    res.status(401).json({ message: "you canot access this end route"});
  }
});

app.listen(5000, (err) => {
  if (err) {
      console.log("Error: ", err);
  } else {
      console.log(" Server is running on http://localhost:5000");
  }
});