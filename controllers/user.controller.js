
const { request, response } = require('express');
const mysql = require("mysql");
const conexion = mysql.createConnection(JSON.parse(process.env.CONEXION));

//  LIST USERS
const getUsers = (req, res = response) => {
    //const aspirante = req.body;
    sqlGetUser(conexion, -1, (result) => {
        //console.log(result)
        res.send({ success: true, users: result || [] });
    })
}
const getUser = (req, res = response) => {
    const userId = req.params.id;
    if (userId > 0) {
        sqlGetUser(conexion, userId, (result) => {
            res.send({ success: true, user: result || [] });
        })
    } else {
        res.send({ success: false, user: [] });
    }
}
const sqlGetUser = (conexion, userId, callback) => {
    let strSqlValUpd = "SELECT * FROM users ";
    strSqlValUpd = (userId > 0) ? strSqlValUpd + " WHERE id=" + userId : strSqlValUpd + ";";
    conexion.query(strSqlValUpd, (err, result) => {
        if (err)
            throw err;
        callback(result)
    });
}

const setUser = (req, res = response) => {
    const user = req.body;
    console.log(user)
    sqlSetUser(conexion, user, (result) => {
        res.send({ success: true, user: result || [] });
    })
}
const sqlSetUser = (conexion, user, callback) => {
    let strSql = '';
    if (!!user['id']) {
        strSql =`REPLACE INTO users SET ? `;
    } else {
        strSql =`INSERT INTO users SET ? `;
    }
    conexion.query(strSql,[user], (err, result) => {
        if (err)
            throw err;
        callback("OK");
    });
}

const delUser = (req = request, res = response) => {
    const id = req.params.id;
    sqlDelUser(conexion, id, (result) => {
        res.send(result);
    })

}
const sqlDelUser = (conexion, id, callback) => {
    let strSql = `DELETE FROM users  WHERE id = ${id} `;
    conexion.query(strSql, (err, result) => {
        if (err)
            throw err;
        callback("OK");
    });
}

module.exports = {
    getUser,
    getUsers,
    setUser,
    delUser
}