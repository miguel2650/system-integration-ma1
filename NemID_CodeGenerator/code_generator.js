const express = require("express");
const sqlite3 = require("sqlite3");

var db = new sqlite3.Database("../NemID_ESB/nem_id_database.sqlite");
var app = express();

app.use(express.json());

app.get("/nemid-auth", (req, res) => {
  res.status(200).send("OK");
});

app.post("/nemid-auth", (req, res) => {
  let nemIdCode = req.body.nemIdCode;
  let nemId = req.body.nemId;
  console.log("nemIdCode", nemIdCode);
  console.log("nemId", nemId);
  db.run("select * from User", (err) => {
    if (err) {
      console.log(err);
    } else {
      // Will generate array
      let randomDigits = [];
      for (var i = 0; i < 6; i++) {
        randomDigits.push(Math.floor(Math.random() * 9) + 1);
      }
      return res.status(200).send({ generatedCode: randonmDigits.join("") });
    }
  });
});

app.listen(8090, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening on port 8090");
  }
});
