const mysql = require('mysql');
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'maa_bhawani_steel_works'
});

conn.connect(function (error) {
    if (error) throw error;

    console.log('Connection Created');
});
module.exports = conn;