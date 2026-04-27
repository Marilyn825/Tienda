console.log("Esto es una prueba.")
var carrito = []

function comprar(id){
    console.log("Compraste " + id);

    value_id = "cantidad-" + id;

    const cantidad = document.getElementById(value_id).value

    console.log(cantidad);

    compra = {producto:id, cantidad:cantidad}

    carrito.push(compra);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    const compraStorage = JSON.parse(localStorage.getItem('carrito'));

    console.log(compraStorage);
}