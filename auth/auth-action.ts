import { Connection } from 'mysql';
import { MySQLService } from '../mysql-service';
const mySQLService = new MySQLService();

export async function login(): Promise<Connection> {
  return mySQLService.login();
};