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
        if(!respuesta3.find(product => product.id === id)){
            console.log("producto no encontrado")
        }else{
            console.log(respuesta3.find(product => product.id === id))
        }
    }

    deleteProductById = async (id) =>{
        let respuesta3 = await this.readProducts()
        let productFilter = respuesta3.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productFilter))

    }
    updateProducts = async({id, ...producto})=>{
        await this.deleteProductById(id)
        let produtOld = await this.readProducts();
        let prodcutsModif = [{ ...producto, id }, ...produtOld];
        await fs.writeFile(this.patch, JSON.stringify(prodcutsModif));
    }

}
const productos = new ProductManager()
productos.addProduct("titulo1", "a1",100, "img1", "123", 5)
productos.addProduct("titulo2", "a3",200, "img2", "222", 2)


productos.getProducts()


productos.getProductsById(4)


// productos.deleteProductById(1)

productos.updateProducts({
    title: 'titulo55',
    description: 'a1',
    price: 2200,
    imagen: 'img1',
    code: '123',
    stock: 5,
    id: 1
})

productos.getProductsById(1)