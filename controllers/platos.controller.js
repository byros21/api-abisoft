
const { request, response } = require('express');
const mysql = require("mysql");
const conexion = mysql.createConnection(JSON.parse(process.env.CONEXION));

//  LIST PlatoS
const getPlatos = (req, res = response) => {
    //const aspirante = req.body;
    sqlGetPlato(conexion, -1, (result) => {
        //console.log(result)
        res.send({ success: true, platos: result || [] });
    })
}
const getPlato = (req, res = response) => {
    const platoId = req.params.id;
    if (platoId > 0) {
        sqlGetPlato(conexion, platoId, (result) => {
            res.send({ success: true, plato: result || [] });
        })
    } else {
        res.send({ success: false, plato: [] });
    }
}
const sqlGetPlato = (conexion, platoId, callback) => {
    let strSqlValUpd = "SELECT * FROM platos WHERE fecha_inicio >= NOW();";
    strSqlValUpd = (platoId > 0) ? strSqlValUpd + " WHERE id=" + platoId : strSqlValUpd + ";";
    conexion.query(strSqlValUpd, (err, result) => {
        if (err)
            throw err;
        callback(result)
    });
}

const setPlato = (req, res = response) => {
    const plato = req.body;
    sqlSetPlato(conexion, plato, (result) => {
        res.send({ success: true, plato: result || [] });
    })
}
const sqlSetPlato = (conexion, plato, callback) => {
    let strSql = '';
    if (!!plato['id']) {
        strSql =`REPLACE INTO platos SET ? `;
    } else {
        strSql =`INSERT INTO platos SET ? `;
    }
    conexion.query(strSql,[plato], (err, result) => {
        if (err)
            throw err;
        callback("OK");
    });
}

const delPlato = (req = request, res = response) => {
    const id = req.params.id;
    sqlDelPlato(conexion, id, (result) => {
        res.send({success:true,result});
    })

}
const sqlDelPlato = (conexion, id, callback) => {
    let strSql = `DELETE FROM platos  WHERE id = ${id} `;
    conexion.query(strSql, (err, result) => {
        if (err)
            throw err;
        callback(result);
    });
}


//  LIST Colores
const getColores = (req, res = response) => {
    //const aspirante = req.body;
    sqlGetColores(conexion, (result) => {
        res.send({ success: true, colores: result || [] });
    })
}
const sqlGetColores = (conexion, callback) => {
    let strSqlValUpd = "SELECT * FROM colores; ";
    conexion.query(strSqlValUpd, (err, result) => {
        if (err)
            throw err;
        callback(result)
    });
}

module.exports = {
    getPlato,
    getPlatos,
    setPlato,
    delPlato,
    getColores
}