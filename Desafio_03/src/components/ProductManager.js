import { promises as fs } from "fs";

export default class ProductManager {
  constructor() {
    this.path = "./productos.json";
    this.products = [];
  }
  static id = 0;

  addProduct = async (title, description, price, imagen, code, stock) => {
    ProductManager.id++;
    let newProduct = {
      title,
      description,
      price,
      imagen,
      code,
      stock,
      id: ProductManager.id,
    };
    this.products.push(newProduct);
    await fs.writeFile(this.path, JSON.stringify(this.products));
  };
  readProducts = async () => {
    let products = await fs.readFile(this.path, "utf-8");
    return JSON.parse(products);
  };

  getProducts = async () => {
    let products = await this.readProducts();
    console.log(products);
  };
  getProductsById = async (id) => {
    let products = await this.readProducts();
    if (!products.find((product) => product.id === id)) {
      console.log("producto no encontrado");
    } else {
      console.log(products.find((product) => product.id === id));
    }
  };

  deleteProductById = async (id) => {
    let products = await this.readProducts();
    let productFilter = products.filter((products) => products.id != id);
    await fs.writeFile(this.path, JSON.stringify(productFilter));
  };
  updateProducts = async ({ id, ...producto }) => {
    await this.deleteProductById(id);
    let produtOld = await this.readProducts();
    let prodcutsModif = [{ ...producto, id }, ...produtOld];
    await fs.writeFile(this.path, JSON.stringify(prodcutsModif));
  };
}
// const productos = new ProductManager();
// productos.addProduct("titulo1", "a1", 100, "img1", "123", 5);
// productos.addProduct("titulo2", "a3", 200, "img2", "222", 2);

// productos.getProducts();

// productos.getProductsById(4);

// // productos.deleteProductById(1)

// productos.updateProducts({
//   title: "titulo55",
//   description: "a1",
//   price: 2200,
//   imagen: "img1",
//   code: "123",
//   stock: 5,
//   id: 1,
// });

// productos.getProductsById(1);
