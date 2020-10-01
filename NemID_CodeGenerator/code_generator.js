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
  db.get("select * from user where user.NemID = ?", [nemId], (err, row) => {
    console.log("row:", row);
    if (err || row === undefined) {
      res.status(403).send({ error: err });
    } else {
      // Will generate array
      let randomDigits = [];
      for (var i = 0; i < 6; i++) {
        randomDigits.push(Math.floor(Math.random() * 9) + 1);
      }
      randomDigits = randomDigits.join("");

      let query = "INSERT INTO auth_log(UserId, Code) VALUES(?,?)";
      db.run(query, [row.Id, randomDigits], (err) => {
        if (err) {
          console.log(err);
        }
      });
      res.status(200).send({ generatedCode: randomDigits });
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
