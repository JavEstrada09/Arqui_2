const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const prisma = new PrismaClient();
const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Super List API",
      version: "1.0.0",
    },
    servers: [{ url: process.env.RAILWAY_PUBLIC_DOMAIN 
      ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` 
      : "http://localhost:4000" 
    }]
  },
  apis: ["./server.js"]
};

const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.get("/items", async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.post("/items", async (req, res) => {
  try {
    const { name } = req.body;
    const item = await prisma.item.create({ data: { name } });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.patch("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { checked } = req.body;
    const item = await prisma.item.update({
      where: { id: parseInt(id) },
      data: { checked }
    });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.delete("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.item.delete({ where: { id: parseInt(id) } });
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, '0.0.0.0', (err) => {
  if (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
  console.log(`Server running on port ${PORT}`);
});

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
});