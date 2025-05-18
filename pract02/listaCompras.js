const listaDeCompras = [];
let idProducto = 0;

document.getElementById("formProducto").addEventListener("submit", function(e){
    e.preventDefault();
    agregarProducto();
});

document.getElementById("listaCompras").addEventListener("click", function(event) {
    // Verifica si el elemento clickeado es un input de tipo submit con la clase "inputBorrar"
    if (event.target.type === "submit" && event.target.classList.contains("inputBorrar")) {
        const botonId = event.target.id; // Obtiene el ID del botón clickeado (ej: "borrar1")
        eliminarProducto(botonId); // Llama a tu función con el ID del botón
    }
});

function agregarProducto(){
    productoAgregado = document.getElementById("inputProducto").value;
    for(let i = 0; i<listaDeCompras.length; i++)
        if(listaDeCompras[i]===productoAgregado) return;
    listaDeCompras.push(productoAgregado);
    mostrarProducto();
    idProducto++;
}

function mostrarProducto(){
    const banner = document.getElementById("listaCompras")
    const nuevoProducto = document.createElement("li");
    const btnBorrar = document.createElement("input");
    nuevoProducto.innerHTML = listaDeCompras[idProducto];
    btnBorrar.id = "btnBorrar"+idProducto;
    btnBorrar.type = "submit";
    btnBorrar.classList.add("inputBorrar");
    btnBorrar.value = "Borrar";
    nuevoProducto.id = "liProducto"+idProducto;
    nuevoProducto.appendChild(btnBorrar);
    banner.appendChild(nuevoProducto);
}

function eliminarProducto(idBoton){
    const soloNumero = /(\d+)/g;
    const eliminarBanner = document.getElementById("liProducto" + idBoton.match(soloNumero));
    eliminarBanner.innerHTML = "Borrando Producto"
    setTimeout(() => {
        eliminarBanner.remove();
    }, 2000);
}