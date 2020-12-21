import { Connection, createConnection, MysqlError } from 'mysql';
import { Client } from 'ssh2';
import { DB_CONFIG, PRIVATE_KEY_PATH, SSH_CONFIG } from './credentials';

export class MySQLService {

    mySQLConnection!: Connection;
    private static _instance: MySQLService;

    constructor() {
        if (!MySQLService._instance) {
            MySQLService._instance = this;
        }
        return MySQLService._instance;
    }

    async login(): Promise<Connection> {
        const sshClient = new Client();
        const tunnelConfig = {
            ...SSH_CONFIG,
            privateKey: require('fs').readFileSync(PRIVATE_KEY_PATH),
        };
        const forwardConfig = {
            srcHost: '127.0.0.1',
            srcPort: 3306,
        };
        this.mySQLConnection = await new Promise((resolve, reject) => {
            sshClient.on('ready', () => {
                sshClient.forwardOut(
                    forwardConfig.srcHost,
                    forwardConfig.srcPort,
                    DB_CONFIG.host,
                    DB_CONFIG.port,
                    (err, stream) => {
                        if (err) reject(err);
                        const updatedDbServer = {
                            ...DB_CONFIG,
                            stream
                        };
                        const connection = createConnection(updatedDbServer);
                        connection.connect((error) => {
                            if (error) {
                                reject(error);
                            }
                            resolve(connection);
                        });
                    });
            }).connect(tunnelConfig);
        });
        return this.mySQLConnection;
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