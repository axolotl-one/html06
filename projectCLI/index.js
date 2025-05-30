const fs = require("node:fs");
const rutaJSON = './notas.json';
const separo = "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";

const readline = require("node:readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

iniciarPrograma();

function regConsoleLog(log){
    const hora = new Date();
    fs.appendFileSync("./logs.txt","\t" + hora.toLocaleDateString() + " a las " + hora.toLocaleTimeString() + "\t| " + log + "\n", "utf-8");
}

readline.on('close', () => {
    console.log("...Fin del Programa.\n" + separo);
    regConsoleLog("La aplicación fue finalizada.");
    process.exit(0); // Asegura finalización de Node.js
});

function mostrarMenu(){
    regConsoleLog("Esperando Nueva Solicitud...");
    console.log(separo + "\nAplicación de Notas");
    console.log("Menu Principal:");
    console.log("1. Ver Notas");
    console.log("2. Agregar Nota");
    console.log("3. Eliminar Nota");
    console.log("4. Salir");
}

function pedirEntrada(prompt) {
    return new Promise((resolve) => {
        readline.question(prompt, (respuesta) => {
            resolve(respuesta.trim());
        });
    });
}

async function menuPrincipal(opcion){
    if(opcion === 1){ await opcionNota(false, "Mostrar") }
    else if(opcion === 2){ await agregarNota(); }
    else if(opcion === 3){ await opcionNota(true, "Eliminar"); }
    else if(opcion === 4){
        console.log(separo + "\nCerrando programa...");
        readline.close();
        return false;
    } else { console.log(separo + "\nOpción inválida. Vuelve a Intentarlo");}
    return true;
}

async function iniciarPrograma() {
    let continuar = true;
    regConsoleLog("La aplicación fue inicializada.")
    while (continuar) {
        mostrarMenu();
        const opcion = parseInt(await pedirEntrada("Selecciona una opción (1-4): "));
        if (isNaN(opcion)) {
            console.log(separo + "\nOpción inválida. Por favor, ingresa un NÚMERO.");
        } else { continuar = await menuPrincipal(opcion); }
    }
}

function leerNotasJSON(){
    if(!fs.existsSync(rutaJSON)){
        console.log("No se encontró el archivo");
        return null;
    }
    try {
        const datosRaw = fs.readFileSync(rutaJSON, 'utf-8');
        const listaNotas = JSON.parse(datosRaw); // JSON a Arreglo
        return listaNotas;
    } catch (error) {
        console.error('Error al leer el archivo de forma síncrona:', error.message);
        return null;
    }
}

async function agregarNota() {
    const listaNotas = leerNotasJSON();
    if(listaNotas === null)
        return;
    regConsoleLog("Solicitud: Agregar Nueva Nota");
    console.log(separo + "\nAgregar Nueva Nota:");
    const titulo = await pedirEntrada("Titulo: ");
    const contenido = await pedirEntrada("Contenido: ");
    const nuevaNota = {titulo, contenido};
    console.log(nuevaNota);
    listaNotas.push(nuevaNota);
    fs.writeFileSync(rutaJSON, JSON.stringify(listaNotas));
    regConsoleLog("Nueva Nota Registrada: { titulo: " + nuevaNota.titulo + " ~ contenido: " + nuevaNota.contenido + "}");
    console.log('Nota agregada con éxito.');
}

// Enlistar todas las notas guardadas.
function enlistarNotas(listaNotas) {
    console.log("Lista de Notas:");
    for(let i = 0; i < listaNotas.length; i++){
        console.log((i + 1) + ". " + listaNotas[i].titulo);
    }
}

// Mostrar / Eliminar Nota:
async function opcionNota(seElimina, accion) {
    const listaNotas = leerNotasJSON();
    if(listaNotas === null)
        return;

    let continuar = true;
    while(continuar){
        console.log(separo + "\nMenú para " + accion + " Nota:");
        enlistarNotas(listaNotas);
        console.log((listaNotas.length + 1) + ". Salir de este Menú");
        const indice = parseInt(await pedirEntrada("Selecciona el ID de la Nota para " + accion + ": ")) - 1;
        if(!isNaN(indice) && indice >= 0 && indice <= listaNotas.length){
            continuar = false;
            if(indice === listaNotas.length){
                console.log("Saliendo de este Menú");
            }else if(seElimina){
                regConsoleLog("Solicitud: Eliminar Nota de la Lista");
                for(let i = indice; i < listaNotas.length - 1; i++)
                    listaNotas[i] = listaNotas[i + 1];
                listaNotas.pop();
                fs.writeFileSync(rutaJSON, JSON.stringify(listaNotas));
                console.log("La Nota se eliminó correctamente.");
                regConsoleLog("La Nota seleccionada fue eliminada.");
            }else{
                regConsoleLog("Solicitud: Mostrar Lista.");
                console.log(separo + "\n" + listaNotas[indice].titulo);
                console.log(listaNotas[indice].contenido);
                regConsoleLog("Nota " + listaNotas[indice].titulo + " fue mostrada.");
            }
        } else { console.log(separo + "\nOpcion inválida. Vuelve a intentarlo."); }
    }
}