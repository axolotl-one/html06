// Lista de regalos
const regalos = ["MUÑECA", "CARRO DE JUGUETE", "ROMPECABEZAS", "LEGO", "PELOTA", "TERMINATOR"];

document.getElementById("formRegalo").addEventListener("submit", function(e){
    e.preventDefault();
    const sectResults = document.getElementById("seccRespt");
    const contRespt = document.createElement("p");
    contRespt.innerHTML = EncontrarRegalos(regalos, document.getElementById("inputRegalo").value.toUpperCase());
    sectResults.textContent = "";
    sectResults.appendChild(contRespt);
});

function EncontrarRegalos(regalos, nombre, index = 0) {
    if (index === regalos.length) return nombre + " no está en la lista.";   // Caso base 1: fin de la lista
    if (regalos[index] === nombre) return nombre + " está en la posición " + index;   //Caso base 2: regalo encontrado
    const retorno = EncontrarRegalos(regalos, nombre, index + 1);  // recursión
    console.log(nombre + " no estaba en la posición " + index)
    // Backtracking (solo si se requiere llamar de nuevo a la recursion con parametros diferentes);
    return retorno;
}

console.log("Ejemplo de regalo encontrado:")
console.log(EncontrarRegalos(regalos, "LEGO"));
// Salida esperada:
// "Lego está en la posición 3."
console.log("Ejemplo de regalo no encontrado:");
console.log(EncontrarRegalos(regalos, "Camión"));
// Salida esperada:
// "Camión no está en la lista."