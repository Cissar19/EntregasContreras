import { promises as fs } from "fs";
import { nanoid } from "nanoid";

export default class ProductManager {
  constructor() {
    this.path = "./src/models/products.json";
  }

  readProducts = async () => {
    let products = await fs.readFile(this.path, "utf-8");
    return JSON.parse(products);
  };

  exist = async (id) => {
    let products = await this.readProducts();
    return products.find((products) => products.id === id);
  };

  writeProducts = async (product) => {
    await fs.writeFile(this.path, JSON.stringify(product));
  };

  addProducts = async (product) => {
    let productsOld = await this.readProducts();
    product.id = nanoid(10);
    let productAll = [...productsOld, product];
    await this.writeProducts(productAll);
    return "Producto agregado con Exito";
  };

  getProducts = async () => {
    return await this.readProducts();
  };

  getProductsById = async (id) => {
    let productById = await this.exist(id);
    if (!productById) return "Producto no encontrado, verifica tu id";
    return productById;
  };

  updateProduct = async (id, updateProduct) => {
    let productById = await this.exist(id);
    if (!productById) return;
    await this.deleteProducts(id);
    let productAll = await this.readProducts();
    let products = [{ ...updateProduct, id: id }, productAll];
    await this.writeProducts(products);
  };

  deleteProducts = async (id) => {
    let products = await this.readProducts();
    let existProducts = products.some((products) => products.id === id);
    if (existProducts) {
      let filterProducts = products.filter((products) => products.id != id);
      await this.writeProducts(filterProducts);
      return "Producto eliminado";
    } else {
      return "El producto que quieres eliminar no existe";
    }
  };
}
