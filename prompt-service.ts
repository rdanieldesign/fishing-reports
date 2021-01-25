import * as prompts from 'prompts';
import { PromptObject } from 'prompts';

export class PromptService {

    sendPrompt(questions: PromptObject<string> | Array<PromptObject<string>>, onSubmit?: (prompt: PromptObject, answer: any, answers: any[]) => void) {
        return prompts(questions, { onCancel: this.onCancel, onSubmit });
    }

    private onCancel(): boolean {
        console.log('on cancel');
        return false;
    }
}