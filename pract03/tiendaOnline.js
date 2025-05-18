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

console.log("MOSTRAR LISTA DE PRODUCTOS ORIGINAL:\n", listaProductos);

const tablaProductos = document.getElementById("tablaProductos");

document.getElementById("formPrecioMinimo").addEventListener("submit", function(e){
    e.preventDefault();
    const arrMayores = listaProductos.filter(producto => producto.precio >= document.getElementById("inputPrecioMin").value)
    console.log("MOSTRAR LISTA DE PRODUCTOS MAYORES A " + document.getElementById("inputPrecioMin").value + ":\n", arrMayores)
});

document.getElementById("formOrdenarPor").addEventListener("submit", function(e){
    e.preventDefault();
    //const arrIndexOrdenar = listaProductos.map(idProducto => {});
    listaProductos.sort(compararPorCampo);
    console.log("MOSTRAR LISTA DE PRODUCTOS ORDENADOS:\n", listaProductos);
});

document.getElementById("formListaDe").addEventListener("submit", function(e){
    e.preventDefault();
    const arrCampo = listaProductos.map(obtenerCampo);
    console.log("MOSTRAR REGISTROS DEL CAMPO " + document.getElementById("selectCampoMostrar").value + ":\n", arrCampo);
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