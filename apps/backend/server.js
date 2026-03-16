const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Super List API",
      version: "1.0.0",
      description: "API for supermarket list"
    },
    servers: [
      {
        url: "http://localhost:4000"
      }
    ]
  },
  apis: ["./server.js"]
};

const specs = swaggerJsdoc(options);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/items", async (req, res) => {
  const items = await prisma.item.findMany();
  res.json(items);
});

app.post("/items", async (req, res) => {
  const { name } = req.body;

  const item = await prisma.item.create({
    data: { name }
  });

  res.json(item);
});

app.listen(4000, () => {
  console.log("Backend running on port 4000");
});