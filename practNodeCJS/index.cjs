// Exportación e Importación de Módulos con CommonJS (.cjs)
const {suma} = require("./modulos.cjs");
const {resta} = require("./modulos.cjs");
const {mult} = require("./modulos.cjs");

console.log("Importación de Módulos con CommonJS (.cjs)");
console.log(suma(-4, 11));
console.log(resta(-4, 11));
console.log(mult(-4, 11));