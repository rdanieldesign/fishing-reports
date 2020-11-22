import { MySQLService } from './mysql-service';
const mySQLService = new MySQLService();
import * as prompts from 'prompts';
import { PromptObject } from 'prompts';
import { ACTIONS } from './constants';

export class PromptService {

    getPassword(onSubmit: (prompt: PromptObject, answer: any, answers: any[]) => void) {
        return this.sendPrompt({
            type: 'password',
            name: 'password',
            message: 'Enter your mySQL password'
        }, onSubmit );
    }

    getAction(onSubmit: (prompt: PromptObject, answer: any, answers: any[]) => void) {
        return this.sendPrompt({
            type: 'select',
            name: 'action',
            message: 'What do you want to do?',
            choices: [
                { title: 'View all catches', value: ACTIONS.VIEW_CATCHES },
                { title: 'Add new location', value: ACTIONS.ADD_LOCATION },
                { title: 'Remove location', value: ACTIONS.REMOVE_LOCATION },
                { title: 'Add new report', value: ACTIONS.ADD_REPORT },
            ],
        }, onSubmit);
    }

    sendPrompt(questions: PromptObject<string> | Array<PromptObject<string>>, onSubmit?: (prompt: PromptObject, answer: any, answers: any[]) => void) {
        return prompts(questions, { onCancel: this.onCancel, onSubmit });
    }

    onCancel(): boolean {
        console.log('on cancel');
        mySQLService.endConnection();
        return false;
    }
}