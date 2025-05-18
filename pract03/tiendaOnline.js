class Producto{
    constructor(nombre, precio, categoria){
        this.nombre = nombre;
        this.precio = precio;
        this.categoria = categoria;
    }
}

const listaProductos = [
    new Producto("Camiseta", 15, "Ropa"),
    new Producto("Laptop", 800, "Electrónica"),
    new Producto("Libro", 12, "Educación"),
    new Producto("Zapatos", 50, "Ropa"),
    new Producto("Celular", 600, "Electrónica")
];

const tablaProductos = document.getElementById("tablaProductos");
const filaHeader = document.createElement("tr");
const columnaNombre = document.createElement("th");
const columnaPrecio = document.createElement("th");
const columnaCategoria = document.createElement("th");
columnaNombre.innerHTML = "NOMBRE";
columnaPrecio.innerHTML = "PRECIO";
columnaCategoria.innerHTML = "CATEGORIA";

console.log("MOSTRAR LISTA DE PRODUCTOS ORIGINAL:\n", listaProductos);

document.getElementById("formPrecioMinimo").addEventListener("submit", function(e){
    e.preventDefault();
    const arrMayores = listaProductos.filter(producto => producto.precio >= document.getElementById("inputPrecioMin").value);
    console.log("MOSTRAR LISTA DE PRODUCTOS MAYORES A " + document.getElementById("inputPrecioMin").value + ":\n", arrMayores);
    MostrarTabla(arrMayores);
});

document.getElementById("formOrdenarPor").addEventListener("submit", function(e){
    e.preventDefault();
    //const arrIndexOrdenar = listaProductos.map(idProducto => {});
    listaProductos.sort(compararPorCampo);
    console.log("MOSTRAR LISTA DE PRODUCTOS ORDENADOS:\n", listaProductos);
    MostrarTabla();
});

document.getElementById("formListaDe").addEventListener("submit", function(e){
    e.preventDefault();
    const campoSelect = document.getElementById("selectCampoMostrar").value
    const arrCampo = listaProductos.map(obtenerCampo);
    console.log("MOSTRAR REGISTROS DEL CAMPO " + campoSelect + ":\n", arrCampo);
    tablaProductos.innerHTML = "";
    campoSelect === "nombre" ? tablaProductos.appendChild(columnaNombre)
    : campoSelect === "precio" ? tablaProductos.appendChild(columnaPrecio)
    : tablaProductos.appendChild(columnaCategoria);
    arrCampo.forEach(campo => {
        const filaRegistro = document.createElement("tr")
        const registro = document.createElement("td");
        registro.innerHTML = campo;
        filaRegistro.appendChild(registro)
        tablaProductos.appendChild(filaRegistro);
    });
});

function casoCampo(opSelect, regAB) {
    if(opSelect === "nombre") return regAB.nombre.toUpperCase();
    else if(opSelect === "precio") return regAB.precio;
    else if(opSelect === "categoria") return regAB.categoria.toUpperCase();
    else return regAB;
}

function compararPorCampo(a, b) {
    const op = document.getElementById("selectCampoOrdenar").value;
    const nombreA = casoCampo(op, a);
    const nombreB = casoCampo(op, b);
    if (nombreA < nombreB) return -1; // a debe ir antes que b
    if (nombreA > nombreB) return 1;  // a debe ir después que b
    return 0;   // a y b son iguales
}

function obtenerCampo(a) {
    const op = document.getElementById("selectCampoMostrar").value;
    return casoCampo(op, a);
}

function MostrarTabla(listaObtenida = listaProductos){
    tablaProductos.textContent = "";
    filaHeader.appendChild(columnaNombre);
    filaHeader.appendChild(columnaPrecio);
    filaHeader.appendChild(columnaCategoria);
    tablaProductos.appendChild(filaHeader);
    listaObtenida.forEach(producto => {
        const filaRegistro = document.createElement("tr");
        for(campo in producto){
            const registro = document.createElement("td");
            registro.innerHTML = producto[campo]; // p.e: producto[cafetera] = cafetera  # acceso por clave #
            filaRegistro.appendChild(registro);
        }
        tablaProductos.appendChild(filaRegistro);
    });
}