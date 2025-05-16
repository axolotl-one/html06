// Código Final: Cambio for a foreach, var a const/let, objeto literal a clase, consola a dom

// Array para guardar los destinos
const destinos = [];

// Clase que crea objetos destino
class Destino{
    constructor(destino, fecha, transporte){
        this.destino = destino;
        this.fecha = fecha;
        this.transporte = transporte;
        this.costo = this.calcularCosto();
    }
    
    // Método para calcular el costo del viaje
    calcularCosto() {
        let costoBase = 0;
        // Costo base por destino
        if (this.destino === "Paris") {
            costoBase = 500;
       } else if (this.destino === "Londres") {
            costoBase = 400;
        } else if (this.destino === "New York") {
            costoBase = 600;
        }

        // Costo adicional por tipo de transporte
        if (this.transporte === "Avión") {
            costoBase += 200;
        } else if (this.transporte === "Tren") {
            costoBase += 100;
        }

        return costoBase;
    }
}

// Función para mostrar el itinerario de los viajes registrados
function mostrarItinerario() {
    // Recorrer el arreglo de destinos y mostrar la información de cada uno
    destinos.forEach(viaje => {
        const contenedorViaje = document.createElement("ul");
        const liDestino = document.createElement("li");
        const liFecha = document.createElement("li");
        const liTansport = document.createElement("li");
        const liCosto = document.createElement("li");
        liDestino.innerText = "Destino: " + viaje.destino;
        liFecha.innerText = "Fecha: " + viaje.fecha;
        liTansport.innerText = "Transporte: " + viaje.transporte;
        liCosto.innerText = "Costo: $ " + viaje.costo;
        contenedorViaje.appendChild(liDestino);
        contenedorViaje.appendChild(liFecha);
        contenedorViaje.appendChild(liTansport);
        contenedorViaje.appendChild(liCosto);
        document.getElementById("main").appendChild(contenedorViaje);
    });
}

// Iniciar la aplicación
function iniciarApp() {
    // Ejemplo de cómo registrar destinos
    destinos.push(new Destino("Paris", "2024-06-15", "Avión"))
    destinos.push(new Destino("Londres", "2024-07-01", "Tren"))
    destinos.push(new Destino("New York", "2024-05-19", "Avión"))

    // Mostrar el itinerario de los viajes
    mostrarItinerario();
}

// Ejecutar la aplicación
iniciarApp();