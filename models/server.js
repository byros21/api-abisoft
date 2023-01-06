
const express = require("express");
const cors = require("cors");

const dirPlato = '/platos';
const dirUser = '/user';

const mysql = require("mysql");
const { env } = require("process");


class Server {
    
    constructor() {
        
        this.app = express();
        this.port = process.env.PORT;
        
        this.conexion = mysql.createConnection(JSON.parse(process.env.CONEXION));
        
        this.middlewares();
        this.routes();

    }

    getConexion(){
        return this.conexion;
    }

    middlewares() {
        //Directorio publico
        this.app.use(cors());
        this.app.use(express.static('public'));
        this.app.use(express.json());
    }

    routes() {

        this.app.get("/api", (req, res) => {
            res.send("API Node.JS Backend Abisoft");
        });

        this.app.use(dirPlato, require('../routes/platos'))
        this.app.use(dirUser, require('../routes/user'))

    }

    iniciar() {

        this.app.listen(this.port, () => {
            console.log("## server OK : ", this.port," ##");
        });

    }
}

module.exports = Server;