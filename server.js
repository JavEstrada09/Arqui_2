const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const schema = buildSchema(`
  type User {
    id: Int
    name: String
    email: String
  }

  type Product {
    id: Int
    name: String
    price: Float
  }

  type Query {
    users: [User]
    products: [Product]
  }

  type Mutation {
    createUser(name: String, email: String): User
    createProduct(name: String, price: Float): Product
  }
`);

const root = {
  users: async () => await prisma.user.findMany(),
  products: async () => await prisma.product.findMany(),
  createUser: async ({ name, email }) =>
    await prisma.user.create({ data: { name, email } }),
  createProduct: async ({ name, price }) =>
    await prisma.product.create({ data: { name, price } }),
};

const app = express();

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
  })
);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>GraphQL API</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          background: #0f172a;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
        }
        .container {
          text-align: center;
          background: #1e293b;
          padding: 40px;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.5);
        }
        h1 {
          margin-bottom: 10px;
        }
        a {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          background: #22c55e;
          color: black;
          text-decoration: none;
          border-radius: 8px;
          font-weight: bold;
        }
        a:hover {
          background: #16a34a;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1> GraphQL API</h1>
        <p>Assignment 06 funcionando correctamente</p>
        <p>Usa el endpoint:</p>
        <a href="/graphql">Ir a GraphQL</a>
      </div>
    </body>
    </html>
  `);
});
app.use((err, req, res, next) => {
  console.error("ERROR REAL:", err);
  res.status(500).send(err.message);
});