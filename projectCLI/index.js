console.log("Inicial");
const fs = require("node:fs");
// Ruta del archivo de notas
const filePath = './notas.json';
const separo = "~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~";

const readline = require("node:readline").createInterface({
    input: process.stdin,
    output: process.stdout
});

iniciarPrograma();

readline.on('close', () => {
    console.log("...Fin del Programa.\n" + separo);
    process.exit(0); // Asegura que el proceso Node.js se cierre completamente
});

function mostrarMenu(){
    console.log(separo + "\nAplicación de Notas");
    console.log("Menu Principal:");
    console.log("1. Ver Notas");
    console.log("2. Agregar Nota");
    console.log("3. Eliminar Nota");
    console.log("4. Salir")
}

function pedirEntrada(prompt) {
    return new Promise((resolve) => {
        readline.question(prompt, (respuesta) => {
            resolve(respuesta.trim()); // .trim() para quitar espacios extra
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

    while (continuar) {
        mostrarMenu();
        const opcion = parseInt(await pedirEntrada("Selecciona una opción (1-4): "));
        if (isNaN(opcion)) {
            console.log(separo + "\nOpción inválida. Por favor, ingresa un NÚMERO.");
        } else { continuar = await menuPrincipal(opcion); }
    }
}

/*
function menuPrincipal(){
    // Simulador del ciclo do-while || while(true) para menú de opciones
    // const listaNotas = [];
    imprimirMenuPrincipal();
    readline.question("Selecciona una Opción (1-4): ", (respuesta) =>{
        const opcion = parseInt(respuesta);
        if(isNaN(opcion) || opcion < 1 || opcion > 4)
        console.log("Opción inválida. Vuelve a Intertarlo.");
        else if(opcion === 1){ enlistarNotas(); }
        else if(opcion === 2){ agregarNota(); }
        else if(opcion === 3){}
        else if(opcion === 4){
            console.log("Cerrando programa...");
            readline.close();
            return;
        }
    principal();
    });
}*/

function leerNotasJSON(){
    if(!fs.existsSync(filePath)){
        console.log("No se encontró el archivo");
        return null;
    }
    try {
        const datosRaw = fs.readFileSync(filePath, 'utf-8'); // Lee el archivo como string
        const listaNotas = JSON.parse(datosRaw); // Parsea el string JSON a un arreglo de objetos JavaScript
        return listaNotas;
    } catch (error) {
        console.error('Error al leer el archivo de forma síncrona:', error.message);
        return null;
    }

    /* Asincronica
    fs.readFile(filePath, 'utf-8', (err, datosRaw) => {
        if (err) {
            console.error('Error al leer el archivo de forma asíncrona:', err.message);
            return;
        }

        try {
            const listaNotas = JSON.parse(datosRaw);
            console.log('--- Lista de Notas ---');
            console.log('Primera Nota:', listaNotas[0].titulo);
            console.log('Todos las Notas:', listaNotas);
        } catch (parseError) {
            console.error('Error al parsear el JSON:', parseError.message);
        }
    });
    */
}

async function agregarNota() {
    const listaNotas = leerNotasJSON();
    if(listaNotas === null)
        return;
    console.log(separo + "\nAgregar Nueva Nota:")
    const titulo = await pedirEntrada("Titulo: ");
    const contenido = await pedirEntrada("Contenido: ");
    const nuevaNota = {titulo, contenido};
    console.log(nuevaNota);
    listaNotas.push(nuevaNota);
    fs.writeFileSync(filePath, JSON.stringify(listaNotas))
    console.log('Nota agregada con éxito.');
    // iniciarPrograma();
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
                for(let i = indice; i < listaNotas.length - 1; i++)
                    listaNotas[i] = listaNotas[i + 1];
                listaNotas.pop();
                fs.writeFileSync(filePath, JSON.stringify(listaNotas))
                console.log("La Nota se eliminó correctamente.");
            }else{
                console.log(separo + "\n" + listaNotas[indice].titulo);
                console.log(listaNotas[indice].contenido);
            }
        } else { console.log(separo + "\nOpcion inválida. Vuelve a intentarlo."); }
    }
}