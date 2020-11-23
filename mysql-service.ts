import { Connection, createConnection, MysqlError } from 'mysql';

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

    queryToPromise<T>(query: string): Promise<T> {
        return new Promise((resolve, reject) => {
            this.mySQLConnection.query(query, function (error: MysqlError, results: T) {
                if (error) {
                    reject(error);
                };
                resolve(results);
            });
        });
    }
}