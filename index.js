const express = require("express");

var bodyParser = require("body-parser");
var app = express();

const port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Aqui va todito
app.get('/', (request, response) =>{
    response.sendFile(`${__dirname}/public/home.html`);
});


app.listen(port, () => {
    console.log(`Servidor iniciado en el puerto ${port}`);
});