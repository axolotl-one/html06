

document.getElementById("formPalabras").addEventListener("submit", function(e){
    e.preventDefault();
    const resp = document.getElementById("panelRespuesta");
    const texto = document.getElementById("inputTexto").value;
    const palabras = texto.split(' ');
    console.log("Palabras capturadas:\n", palabras);
    const palabrasMasLargas = [palabras[0]]
    for(let palabraActual in palabras){
        if(palabras[palabraActual].length > palabrasMasLargas[0].length)
            palabrasMasLargas[0] = palabras[palabraActual];
    }
    for(let palabraActual in palabras){
        if(palabras[palabraActual].length === palabrasMasLargas[0].length)
            palabrasMasLargas.push(palabras[palabraActual]);
    }
    palabrasMasLargas.shift();
    console.log(palabrasMasLargas)
    resp.textContent = "Palabras más extensas encontradas: " + palabrasMasLargas;
});