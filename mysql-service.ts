import { Connection, createConnection } from 'mysql';

export class MySQLService {

    mySQLConnection!: Connection;
    private static _instance: MySQLService;

    constructor() {
        if (!MySQLService._instance) {
            MySQLService._instance = this;
        }
        return MySQLService._instance;
    }

    login(password: string) {
        this.mySQLConnection = createConnection({
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