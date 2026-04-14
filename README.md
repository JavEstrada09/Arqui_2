# Assignment 06 - GraphQL API 🚀

## 📌 Descripción
Este proyecto implementa una API utilizando GraphQL con Node.js, Express y Prisma ORM, conectada a una base de datos PostgreSQL desplegada en la nube.

---

## 🌐 Endpoint público

👉 https://arqui-2.onrender.com/graphql

---

## 🌐 Despliegue en Render

👉 https://arqui-2.onrender.com/

---

## 🧠 Tecnologías utilizadas

- Node.js
- Express
- GraphQL
- Prisma ORM
- PostgreSQL
- Render (deployment)

---

## 🗂️ Modelos

### User
- id: Int
- name: String
- email: String

### Product
- id: Int
- name: String
- price: Float

---
## ✏️ Mutations
Crear usuario
mutation {
  createUser(name: "Javier", email: "javier@test.com") {
    id
    name
    email
  }
}

Crear producto
mutation {
  createProduct(name: "Leche", price: 10.5) {
    id
    name
    price
  }
}

## 🔍 Queries

### Obtener producto
query {
  products {
    id
    name
    price
  }
}

### Obtener usuarios
```graphql
query {
  users {
    id
    name
    email
  }
}

Instalación local
npm install
npx prisma migrate dev
node server.js