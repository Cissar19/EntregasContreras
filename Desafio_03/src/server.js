import express from "express";
import ProductManager from "./components/ProductManager.js";

const app = express();
// Permite que el endpoint pueda ser complejo o exgtenso
app.use(express.urlencoded({ extended: true }));

const productos = new ProductManager();

const readProducts = productos.readProducts();

app.get("/products", async (req, res) => {
  let limit = parseInt(req.query.limit);
  if (!limit) return res.send(await readProducts);
  let allProducts = await readProducts;
  let productLimit = allProducts.slice(0, limit);
  res.send(productLimit);
});

app.get("/products/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let allProducts = await readProducts;
  let productById = allProducts.find((product) => product.id === id);
  res.send(productById);
});

const PORT = 8080;
const server = app.listen(PORT, () => {
  console.log(`Estamos corriendo en el puerto ${PORT} guachin`);
});

server.on("error", () => console.log("error en el server "));
