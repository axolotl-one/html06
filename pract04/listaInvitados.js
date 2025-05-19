const invitados = ["Ana", "Carlos", "Cecilia", "Daniel", "Diana", "Eduardo"];
console.log("Lista de Invitados Inicial:\n", invitados)

document.getElementById("listaInvitados").innerHTML = "Lista de Invitados: " + invitados;

document.getElementById("btnPrimeraPareja").addEventListener("click", () => {
    const primeraPareja = document.getElementById("primeraPareja");
    arrPareja1 = encontrarPareja(invitados);
    console.log("Primera Pareja Consecutiva Encontrada:\n", arrPareja1);
    primeraPareja.innerHTML = "Primera pareja consecutiva encontrada: " + arrPareja1;
    // Resultado: ["Carlos", "Cecilia"]
});

function encontrarPareja(arr) {
    let inicio = 0, siguiente = 1;
    while (siguiente < arr.length) {
        if(arr[inicio].charAt(0) === arr[siguiente].charAt(0))
            return [arr[inicio], arr[siguiente]];
        siguiente++;
        inicio++;
    }
    return null; // Si no se encuentra ningún par
}