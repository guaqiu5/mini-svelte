// parse => ast => generate


const fs = require("fs");
const generate = require("../generator");
const code = fs.readFileSync('./demo.svelte');

fs.writeFileSync("./genCode.js", generate(code.toString()));