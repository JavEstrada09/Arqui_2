const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

let items = [];

app.get("/items", (req, res) => {
  res.json(items);
});

app.post("/items", (req, res) => {
  const item = {
    id: Date.now(),
    name: req.body.name,
    bought: false
  };

  items.push(item);
  res.json(item);
});

app.listen(3000, () => {
  console.log("API running on port 3000");
});