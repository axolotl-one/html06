class Contador{ //Encapsula un valor primitivo para simular el "paso por referencia"
    constructor() { this.index = 0 }
    incremento() { this.index++ }
}

document.getElementById("formString").addEventListener("submit",function(e){
    e.preventDefault();
    console.log("retorno por referencia: " + findAllCombinations(document.getElementById("inputString").value));
})

function generateCombinations(letters, current, index, results, contador, sectResults) {
    contador.incremento();
    const contLocal = contador.index;
    capturarRegistro(index, "backtracking " + contLocal + " iniciado:", sectResults);
    results.push(current); // Agregar la combinación actual al resultado
    capturarRegistro(index, "Combinación capturada: " + current, sectResults);
    console.log(tabulador(index, contLocal));
    console.log(tabulador(index, contLocal) + "(Inicial) Letra Actual: " + letters[index]);
    console.log(tabulador(index, contLocal) + "(Inicial) Estado current: ", current);


    // Iterar a partir del índice actual
    for (let i = index; i < letters.length; i++) {
        // Llamar recursivamente añadiendo la letra actual
        // *** Si index >= letters.length, deja de llamarse y continua con la función anterior.
        generateCombinations(letters, current + letters[i], i + 1, results, contador, sectResults);
        console.log(tabulador(index, contLocal) + "(FOR: " + i + ") Retorno a backtracking ", contLocal);
        capturarRegistro(index, "retorno a backtracking " + contLocal, sectResults);
    }
    console.log(tabulador(index, contLocal) + "(FINAL) Backtracking " + contLocal + " finalizado");
    capturarRegistro(index, "backtracking " + contLocal + " completado.", sectResults);
}

function tabulador(nivel, caso){
    let espacios = "";
    for(let i = 0; i < nivel; i++)
        espacios += "   ";
    return espacios + "Caso " + caso + ": ";
}

function capturarRegistro(nivel, mensaje, seccRespt){
    const registro = document.createElement("p")
    registro.style.paddingLeft = "" + (nivel*30) + "px";
    registro.innerHTML = mensaje;
    seccRespt.appendChild(registro);
}

function findAllCombinations(letters) {
    const contador = new Contador();
    const results = [];
    const contResult = document.getElementById("seccRespt");
    const contH3 = document.createElement("h3");
    const contComb = document.createElement("p");
    contResult.textContent = "";
    contH3.innerHTML = "PROCEDIMIENTO DEL BACKTRACKING:";
    contResult.appendChild(contH3);
    generateCombinations(letters, '', 0, results, contador, contResult);
    contComb.innerHTML = "Lista de Combinaciones: " + results;
    contResult.appendChild(contComb);
    return results;
}

/* // Ejemplo de uso
const letters = ['a', 'b', 'c'];
console.log(findAllCombinations(letters));

// Salida esperada:[ '',  'a',  'ab', 'abc',  'ac',  'b',   'bc',   'c' ]
*/