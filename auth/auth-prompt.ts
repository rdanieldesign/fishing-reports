import { PromptService } from "../prompt-service";

export class AuthPrompt extends PromptService {

  getPassword() {
    return this.sendPrompt({
      type: 'password',
      name: 'password',
      message: 'Enter your mySQL password'
    });
  }

}