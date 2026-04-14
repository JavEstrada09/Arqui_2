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
  res.send("API funcionando 🚀 usa /graphql");
});
app.use((err, req, res, next) => {
  console.error("ERROR REAL:", err);
  res.status(500).send(err.message);
});