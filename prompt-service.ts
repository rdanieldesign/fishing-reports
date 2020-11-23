import * as prompts from 'prompts';
import { PromptObject } from 'prompts';
import { MySQLService } from './mysql-service';
const mySQLService = new MySQLService();

export class PromptService {

    sendPrompt(questions: PromptObject<string> | Array<PromptObject<string>>, onSubmit?: (prompt: PromptObject, answer: any, answers: any[]) => void) {
        return prompts(questions, { onCancel: this.onCancel, onSubmit });
    }

    private onCancel(): boolean {
        console.log('on cancel');
        mySQLService.endConnection();
        return false;
    }
}