const mysql = require('mysql');

class MySQLService {

    mySQLConnection;
    _instance;

    constructor() {
        if (!MySQLService._instance) {
            MySQLService._instance = this;
        }
        return MySQLService._instance;
    }

    login(password) {
        this.mySQLConnection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password,
            database: 'fishing_reports'
        });
        this.mySQLConnection.connect();
    }

    endConnection() {
        if (this.mySQLConnection) {
            this.mySQLConnection.end();
        }
    }
}

module.exports = new MySQLService();