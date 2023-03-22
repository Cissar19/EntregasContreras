//  Se crea la clase solicitada por la consigna
class ProductManager{
    constructor() {
        this.productos = [];
    }
// Se crea una variable estatica para asi modificarla despues, aumentando su valor
    static id = 0


//     Debe contar con un método “addProduct” el cual agregará un producto al arreglo de productos inicial.
//      -Validar que no se repita el campo “code” y que todos los campos sean obligatorios
//      -Al agregarlo, debe crearse con un id autoincrementable


    addProduct(title, description, price, thumbnail, code, stock) {
        for(let i = 0; i < this.productos.length; i++){
            if(this.productos[i].code === code){
                console.log(`Epa, El codigo esta repetido ${code}`)
                break
            }
        }

        // Se valida que todos los campos sean obligatorios, con la logica "Si dentro del objeto se encuentra undefined dentro de sus values, solicitarlos"
        const nuevoProdcuto = {title, description, price, thumbnail, code, stock}

        if (!Object.values(nuevoProdcuto).includes(undefined)){
            ProductManager.id++
            this.productos.push({
                ...nuevoProdcuto,
                id:ProductManager.id}
                )
        }else{
            console.log("TODOS LOS CAMPOS SON OBLIGATORIOS");
        }

    }
     // Se solicita el array de productos. Se recibira el array con productos ya que se realizo un push anteriormente
     getProducts(){
         return this.productos;
     }
    //  Se realiza otro metodo con .find para encontrar si existe el producto
     isActive(id){
        return this.productos.find((producto)=>producto.id===id)
     }
     //  Se realiza la validacion 
     getProductById(id){
        !this.isActive(id) ? console.log('No se encontro') :console.log("Tu producto si existe:") + console.log( this.isActive(id))
        }
}

//Se crea la instancia
const producto = new ProductManager()
//Se crea la producto
producto.addProduct('Producto de Prueba', 'Este es un producto prueba',120, 'Sin Imagen', "abc123", 25)
//Se hace console log de la funcion get Products
console.log(producto.getProducts())
//Se crea otro producto con el mismo code "abc123"
producto.addProduct('Producto de Pruebaa', 'Este es un producto pruebaa',120, 'Sin Imagen', "abc123", 20)
//Se agrega otro producto con el value de stock sin completar
producto.addProduct('Producto de Pruebaa', 'Este es un producto pruebaa',120, 'Sin Imagen', "abc1233", )

// busca por id que si existe
producto.getProductById(2)
// busca por id que no existe
producto.getProductById(4)
