import { Choice } from 'prompts';
import { PromptService } from '../prompt-service';

export class ReportPrompt extends PromptService {

    createReport(locationOptions: Choice[]) {
        return this.sendPrompt([
            {
                type: 'select',
                name: 'locationId',
                message: 'Where did you go?',
                choices: locationOptions,
            },
            {
                type: 'date',
                name: 'date',
                message: 'When did you go?',
                initial: new Date(),
            },
            {
                type: 'number',
                name: 'catchCount',
                message: 'How many fish did you catch?'
            },
        ]);
    }
}