import {promises as fs} from "fs";

class ProductManager {
    constructor(){
        this.patch = "./productos.txt"
        this.products = []
    }
    static id = 0

    addProduct = async (title,description,price,imagen,code,stock) => {
        ProductManager.id++
        let newProduct = {
                title,
                description,
                price,
                imagen,
                code,
                stock,
                id: ProductManager.id
            }
        this.products.push(newProduct)
        await fs.writeFile(this.patch, JSON.stringify(this.products))
    }
    readProducts = async() => {
        let respuesta = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(respuesta)
    }

    getProducts = async() =>{
        let respuesta2 = await this.readProducts()
        console.log(respuesta2)
    }
    getProductsById = async (id) =>{
        let respuesta3 = await this.readProducts()
        let filtro = respuesta3.find(product => product.id === id)
        console.log(filtro)
    }
    deleteProductById = async (id) =>{
        let respuesta3 = await this.readProducts()
        let productFilter = respuesta3.filter(products => products.id != id)
        console.log(productFilter)

    }

}

const productos = new ProductManager()
 productos.addProduct("titulo1", "a1",100, "img1", "123", 5)
 productos.addProduct("titulo2", "a3",200, "img2", "222", 2)
 productos.addProduct("titulo3", "a4",200, "img2", "222", 2)
 productos.addProduct("titulo4", "a4",200, "img2", "222", 2)
 productos.addProduct("titulo5", "a5",200, "img2", "222", 2)


productos.getProductsById(1)

productos.deleteProductById(1)