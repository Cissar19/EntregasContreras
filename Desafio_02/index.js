import {promises as fs} from "fs";

class ProductManager {
    constructor(){
        this.path = "./productos.txt"
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
        await fs.writeFile(this.path, JSON.stringify(this.products))
    }

    getProducts = async() =>{
        let respuesta = await fs.readFile(this.path, "utf-8")
        console.log(JSON.parse(respuesta))
    }
}

const productos = new ProductManager()
productos.addProduct("titulo1", "a1",100, "img1", "123", 5)
productos.addProduct("titulo2", "a2",200, "img2", "222", 2)
productos.addProduct("titulo3", "a3",200, "img3", "333", 3)

productos.getProducts()
