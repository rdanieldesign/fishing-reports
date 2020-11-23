import { AuthPrompt } from './auth-prompt';
import { MySQLService } from '../mysql-service';
const mySQLService = new MySQLService();
const authPrompt = new AuthPrompt();

export async function login(): Promise<void> {
  const answer = await authPrompt.getPassword();
  mySQLService.login(answer.password);
};