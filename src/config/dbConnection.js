const mysql = require('mysql');

let connection;

function createConnection() {
    return mysql.createConnection({
        host: 'localhost',
        port: '3306',
        user: 'root',
        password: '',
        database: 'greengo2',
    });
}

function getConnection() {
    if (!connection) {
        connection = createConnection();
        connection.connect((err) => {
            if (err) {
                console.error('Error de conexión:', err);
            } else {
                console.log('Conexión a la base de datos establecida');
            }
        });
    }
    return connection;
}

module.exports = getConnection;