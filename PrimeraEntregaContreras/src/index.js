import express, { urlencoded } from "express";
import ProductManager from "./controllers/ProductManager.js";

const app = express();
const PORT = 8080;
const product = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/products", async (req, res) => {
  res.send(await product.getProducts());
});

app.get("/products/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await product.getProductsById(id));
});

app.post("/products", async (req, res) => {
  let newProduct = req.body;
  res.send(await product.addProducts(newProduct));
});

app.delete("/products/:id", async (req, res) => {
  let id = req.params.id;
  res.send(await product.deleteProducts(id));
});

app.put("/products/:id", async (req, res) => {
  let id = req.params.id;
  let updateProduct = req.body;
  res.send(await product.updateProduct(id, updateProduct));
});

app.listen(PORT, () => {
  console.log("Estamos arriba papu");
});
