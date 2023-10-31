const contadorCarrito = document.querySelector("#contador-carrito");
const carritoSeleccionado = document.querySelector("#carrito-seleccionado");
const listaSeleccionados = document.querySelector("#lista-seleccionados");
const totalElement = document.querySelector("#total");
const formularioPagoOverlay = document.querySelector("#formulario-pago-overlay");
const formularioPago = document.querySelector("#formulario-pago");
let cantidadProductosEnCarrito = 0;
const productosSeleccionados = [];
let totalPrecio = 0;
let carritoVisible = false;

function agregarProductoAlCarrito(nombreProducto, precioProducto) {
    cantidadProductosEnCarrito++;
    contadorCarrito.textContent = cantidadProductosEnCarrito;
    productosSeleccionados.push({nombre: nombreProducto, precio: precioProducto});
    totalPrecio += precioProducto;
    actualizarCarritoSeleccionado();
}

function eliminarProductoDelCarrito(index) {
    const productoEliminado = productosSeleccionados[index];
    totalPrecio -= productoEliminado.precio;
    productosSeleccionados.splice(index, 1);
    cantidadProductosEnCarrito--;
    contadorCarrito.textContent = cantidadProductosEnCarrito;
    actualizarCarritoSeleccionado();
}

function actualizarCarritoSeleccionado() {
    listaSeleccionados.innerHTML = "";
    if (productosSeleccionados.length > 0) {
        productosSeleccionados.forEach((producto, index) => {
            const li = document.createElement("li");
            const imagen = document.createElement("img");
            imagen.src = `imagen${index + 1}.jpg`;
            imagen.alt = `Producto ${index + 1}`;
            const nombre = document.createElement("span");
            nombre.className = "nombre-producto";
            nombre.textContent = producto.nombre;
            const precio = document.createElement("span");
            precio.className = "precio-producto";
            precio.textContent = `$${producto.precio.toFixed(2)}`;
            const eliminarBtn = document.createElement("button");
            eliminarBtn.textContent = "Eliminar";
            eliminarBtn.addEventListener("click", () => eliminarProductoDelCarrito(index));
            li.appendChild(imagen);
            li.appendChild(nombre);
            li.appendChild(precio);
            li.appendChild(eliminarBtn);
            listaSeleccionados.appendChild(li);
        });
        totalElement.textContent = `Total: $${totalPrecio.toFixed(2)}`;
        carritoVisible = true;
    } else {
        totalElement.textContent = "Total: $0.00";
        carritoVisible = false;
    }
}

function alternarCarritoSeleccionado() {
    if (productosSeleccionados.length > 0) {
        carritoVisible = !carritoVisible;
        carritoSeleccionado.style.display = carritoVisible ? "block" : "none";
    }
}

function mostrarFormularioPago() {
    formularioPagoOverlay.style.display = "block";
    formularioPago.style.display = "block";
}

function cerrarFormularioPago() {
    formularioPagoOverlay.style.display = "none";
    formularioPago.style.display = "none";
}

function realizarPago() {
    const nombre = document.querySelector("#nombre").value;
    const tarjeta = document.querySelector("#tarjeta").value;

    if (nombre && tarjeta) {
        alert(`Pago realizado correctamente. Nombre: ${nombre}, Tarjeta: ${tarjeta}`);
        reiniciarCarrito();
        carritoSeleccionado.style.display = "none";
        formularioPagoOverlay.style.display = "none";
    } else {
        alert("Por favor complete todos los campos del formulario de pago.");
    }
}

function reiniciarCarrito() {
    cantidadProductosEnCarrito = 0;
    productosSeleccionados.length = 0;
    totalPrecio = 0;
    contadorCarrito.textContent = "0";
    actualizarCarritoSeleccionado();
}
