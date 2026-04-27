function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    console.log(carrito);
}

cargarCarrito();