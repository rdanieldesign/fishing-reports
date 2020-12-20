import { AuthPrompt } from './auth-prompt';
import { MySQLService } from '../mysql-service';
import { MYSQL_PASSWORD } from '../credentials';
const mySQLService = new MySQLService();

export async function login(): Promise<void> {
  mySQLService.login(MYSQL_PASSWORD);
};