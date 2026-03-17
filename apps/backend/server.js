const express = require("express");
const cors = require("cors");
const { PrismaClient } = require("@prisma/client");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const prisma = new PrismaClient();
const app = express();

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PATCH', 'DELETE'], allowedHeaders: ['Content-Type'] }));
app.use(express.json());

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Super List API", version: "1.0.0", description: "API para lista del supermercado" },
    servers: [{ url: process.env.RAILWAY_PUBLIC_DOMAIN ? `https://${process.env.RAILWAY_PUBLIC_DOMAIN}` : "http://localhost:4000" }]
  },
  apis: ["./server.js"]
};

const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Verificar estado del servidor
 *     responses:
 *       200:
 *         description: Servidor funcionando
 */
app.get("/", (req, res) => res.json({ message: "Super List API", docs: "/docs", health: "/health" }));

app.get("/health", (req, res) => res.json({ status: "ok" }));

/**
 * @swagger
 * /items:
 *   get:
 *     summary: Obtener todos los productos
 *     responses:
 *       200:
 *         description: Lista de productos
 */
app.get("/items", async (req, res) => {
  try {
    const items = await prisma.item.findMany();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /items:
 *   post:
 *     summary: Agregar un producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Leche
 *     responses:
 *       200:
 *         description: Producto creado
 */
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

/**
 * @swagger
 * /items/{id}:
 *   patch:
 *     summary: Marcar producto como comprado
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bought:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Producto actualizado
 */
app.patch("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { bought } = req.body;
    const item = await prisma.item.update({
      where: { id: parseInt(id) },
      data: { bought }
    });
    res.json(item);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

/**
 * @swagger
 * /items/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Producto eliminado
 */
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
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

process.on('uncaughtException', (err) => { console.error('Uncaught Exception:', err); });
process.on('unhandledRejection', (err) => { console.error('Unhandled Rejection:', err); });