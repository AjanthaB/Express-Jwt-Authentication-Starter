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

  res.json(users);
});

app.listen(5000, (err) => {
  if (err) {
      console.log("Error: ", err);
  } else {
      console.log(" Server is running on http://localhost:5000");
  }
});