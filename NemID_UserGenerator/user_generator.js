const express = require("express");

var app = express();

app.use(express.json());

app.get("/generate-nemId", (req, res) => {
  res.status(200).send("OK");
});

app.post("/generate-nemId", (req, res) => {
  let cpr = req.body.cpr;
  let email = req.body.email;

  // Will generate a list of random int between 0 and 9.
  let randomDigits = [];
  for (var i = 0; i < 5; i++) {
    randomDigits.push(Math.floor(Math.random() * 9) + 1);
  }
  res.status(201).send({
    nemId: randomDigits.join("") + "-" + cpr.substring(cpr.length - 4),
  });
});

app.listen(8088, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Listening on port 8088");
  }
});
