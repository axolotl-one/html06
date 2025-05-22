class NReinas{
    constructor(nReinas, cajaTableros){
        this.nReinas = nReinas; //nReinas = nLongitud de matriz cuadrada
        this.tablero = new Array(nReinas).fill(null).map(() => new Array(nReinas).fill(0))
        this.seccTableros = cajaTableros;
        this.seccTableros.textContent = "";
        this.nResultados = 0;
    }

    backtracking(counti, count){
        for(let i = counti; i < this.nReinas; i++){
            for(let j = 0; j < this.nReinas; j++){
                if(this.posicionValida(i, j)){ //Caso Base 1
                    this.tablero[i][j] = 1;
                    count++;
                    if(count === this.nReinas){  //Caso Base 2
                        this.imprimirMatriz();
                        this.armarTableroHTML();
                        this.nResultados++;
                    }else{
                        this.backtracking(i, count);
                    }
                    if(this.tablero[i][j] === 1){
                        this.tablero[i][j] = 0;
                        count--;
                    }
                }else{
                    // console.log("posicion no valdia")
                }
            }
        }
    }

    posicionValida(i, j){
        for(let k = 0; k < this.nReinas; k++){
            if(this.tablero[k][j] === 1 || this.tablero[i][k] === 1){
                return false;  //Evalúa las filas y columnas ocupadas
            }
            if((i-k) >= 0 && (j-k)>=0){
                let aux01 = this.tablero[i-k][j-k] === 0;
                if(!aux01){
                    return false;  //Evalúa la diagonal sup-izq ocupada
                }
            }
            if((i+k) < this.nReinas && (j+k)<this.nReinas){
                let aux02 = this.tablero[i+k][j+k] === 0;
                if(!aux02){
                    return false;  //Evalúa la diagonal inf-der ocupada
                }
            }
            if((i-k) >= 0 && (j+k)<this.nReinas){
                let aux03 = this.tablero[i-k][j+k] === 0;
                if(!aux03){
                    return false;  //Evalúa la diagonal sup-der ocupada
                }
            }
            if((i+k) < this.nReinas && (j-k)>=0){
                let aux04 = this.tablero[i+k][j-k] === 0;
                if(!aux04){
                    return false;   //Evalúa la diagonal inf-izq ocupada
                }
            }
        }
        return true;
    }

    armarTableroHTML(){
        const tableroHTML5 = document.createElement("table");
        tableroHTML5.style.display = "inline";
        tableroHTML5.style.padding = "10px";
        for(let i = 0; i<this.nReinas; i++){
            const fila = document.createElement("tr");
            for(let j = 0; j<this.nReinas; j++){
                const celdaHTML = document.createElement("td");
                if((i % 2 === 0) === (j % 2 === 0)) celdaHTML.style.backgroundColor = "#eee";
                else celdaHTML.style.backgroundColor = "#888";
                celdaHTML.innerHTML = "" + this.tablero[i][j];
                fila.appendChild(celdaHTML);
            }
            tableroHTML5.appendChild(fila);
        }
        this.seccTableros.appendChild(tableroHTML5);
    }

    imprimirMatriz(){
        for(let i = 0; i<this.nReinas; i++){
            let fila = "";
            for(let j = 0; j<this.nReinas; j++){
                fila += this.tablero[i][j] + "   "
            }
            console.log(fila);
        }
        console.log("~~~~~~~~~~~~")
    }


}

document.getElementById("formNReinas").addEventListener("submit", function(e){
    e.preventDefault();
    soluncion(parseInt(document.getElementById("inputNReinas").value));
});

function soluncion(numReinas){
    const solucion = new NReinas(numReinas, document.getElementById("seccTableros"));
    solucion.backtracking(0,0);
    console.log("Soluciones totales: " + solucion.nResultados);
    document.getElementById("solucionesTotales").textContent = "Soluciones totales: " + solucion.nResultados;
}

/*
nReinas.js:95 0   1   0   0   
nReinas.js:95 0   0   0   1   
nReinas.js:95 1   0   0   0   
nReinas.js:95 0   0   1   0   
nReinas.js:97 ~~~~~~~~~~~~
nReinas.js:95 0   0   1   0   
nReinas.js:95 1   0   0   0   
nReinas.js:95 0   0   0   1   
nReinas.js:95 0   1   0   0   
nReinas.js:97 ~~~~~~~~~~~~
nReinas.js:111 Soluciones totales: 2
nReinas.js:95 0   1   0   0   0   0   
nReinas.js:95 0   0   0   1   0   0   
nReinas.js:95 0   0   0   0   0   1   
nReinas.js:95 1   0   0   0   0   0   
nReinas.js:95 0   0   1   0   0   0   
nReinas.js:95 0   0   0   0   1   0   
nReinas.js:97 ~~~~~~~~~~~~
nReinas.js:95 0   0   1   0   0   0   
nReinas.js:95 0   0   0   0   0   1   
nReinas.js:95 0   1   0   0   0   0   
nReinas.js:95 0   0   0   0   1   0   
nReinas.js:95 1   0   0   0   0   0   
nReinas.js:95 0   0   0   1   0   0   
nReinas.js:97 ~~~~~~~~~~~~
nReinas.js:95 0   0   0   1   0   0   
nReinas.js:95 1   0   0   0   0   0   
nReinas.js:95 0   0   0   0   1   0   
nReinas.js:95 0   1   0   0   0   0   
nReinas.js:95 0   0   0   0   0   1   
nReinas.js:95 0   0   1   0   0   0   
nReinas.js:97 ~~~~~~~~~~~~
nReinas.js:95 0   0   0   0   1   0   
nReinas.js:95 0   0   1   0   0   0   
nReinas.js:95 1   0   0   0   0   0   
nReinas.js:95 0   0   0   0   0   1   
nReinas.js:95 0   0   0   1   0   0   
nReinas.js:95 0   1   0   0   0   0   
nReinas.js:97 ~~~~~~~~~~~~
nReinas.js:111 Soluciones totales: 4
*/