document.getElementById("formMaximo").addEventListener("submit", function(e){
    e.preventDefault();
    const seccRespt = document.getElementById("seccRespt");
    const pArr = document.getElementById("pArreglo");
    const pNMax = document.getElementById("pMaximo");
    const arr = generateArray(document.getElementById("outputLongitud").value);
    pArr.textContent = "Arreglo Generado: " + arr;
    pNMax.textContent = "El Número Máximo del Arreglo es de: " + EncontrarMaximo(arr);
    seccRespt.appendChild(pArr);
    seccRespt.appendChild(pNMax);
});

function generateArray(n){
    const arr = [];
    for(let i = 0; i < n; i++)
        arr.push(parseInt(Math.floor(Math.random() * 99)));
    return arr;
}

function EncontrarMaximo(arr) {
    // Condición del caso base
    if (arr.length === 1)
        return arr[0];

    // Dividir el arreglo en dos mitades
    const mitad = Math.floor(arr.length / 2);
    const left = arr.slice(0, mitad);
    const right = arr.slice(mitad);

    // Llamar recursivamente a la función para ambas mitades
    const leftMax = EncontrarMaximo(left);
    const rightMax = EncontrarMaximo(right);

    // Combinar las soluciones comparando los máximos
    return Math.max(leftMax, rightMax);
}

console.log("Ejemplo de entrada:");
const numbers = [3, 8, 2, 10, 5, 7];
console.log(numbers);
console.log("Número Máximo: " + EncontrarMaximo(numbers));