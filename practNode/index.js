console.log("hola mundo");

// fs => File System
// 1. Llamado al modulo fs y guardarlo en una variable
const fs = require("fs");

//Leer archivos
const archivo1 = fs.readFileSync("./archivos/archivo01.txt", "utf-8");
console.log(archivo1);

const json1 = fs.readFileSync("./archivos/mascota.json", "utf-8");
console.log(json1);
console.log(JSON.parse(json1));

/*//Escribir archivos
const textoAEscribir = "Soy un texto que fui generado desde index.js";
if(fs.existsSync("./archivos/archivoGenerado.txt")) console.log("Ya existe el archivo");
else fs.writeFileSync("./archivos/archivoGenerado.txt", textoAEscribir);

const recetaCocina = {
    nombre: "Quesadillas",
    ingredientes: ["Queso", "Tortillas", "Aceite", "Relleno al Gusto"],
    preparacion: ["1. Calentar Tortillas", "2. Agregar Queso y Rellano"]
}

const recetaCocinaJSON = JSON.stringify(recetaCocina);

fs.writeFileSync("./archivos/receta1.json", recetaCocinaJSON);
*/

if(!fs.existsSync("./archivos/logs")) fs.mkdirSync("./archivos/logs");

if(!fs.existsSync("./archivos/logs/log.txt")) fs.writeFileSync("./archivos/logs/log.txt", "");

function agregarAlLog(rutaArchivo, hora, nombreUsuario)
{
    const rr = hora + " | " + nombreUsuario + " ingreso al sistema.\n";
    fs.appendFileSync(rutaArchivo, rr, "utf-8")
}

const ruta = "./archivos/logs/log.txt";
agregarAlLog(ruta, "hoy", "localhost");
agregarAlLog(ruta, "mañana", "localhostB");