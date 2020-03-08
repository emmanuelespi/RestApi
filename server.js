const express = require("express");
const bodyParser = require("body-parser");

const app = express();

//Parsear los requests de content-type: application/json
app.use(bodyParser.json());

//Parsear los requests de content-type application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

//Ruta simple
app.get("/", (req,res)=>{
    res.json({message: "Bienvenido a la aplicación de eespinest"});
});

require("./app/routes/customer.routes.js")(app);

//Establecer puerto, que escuchará los requests
app.listen(3000,()=>{
    console.log({message : "El servidor está corriendo en el puerto 3000"});
});

