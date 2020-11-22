import { Choice } from 'prompts';
import { PromptService } from '../prompt-service';

export class LocationPrompts extends PromptService {
    createLocation() {
        return this.sendPrompt([
            {
                type: 'text',
                name: 'name',
                message: 'What do you want to call this location?'
            },
            {
                type: 'text',
                name: 'googleLink',
                message: 'Provide a link to a google maps pin.'
            },
        ]);
    }
    
    removeLocation(locationOptions: Choice[]) {
        return this.sendPrompt({
                type: 'select',
                name: 'locationId',
                message: 'Which location do you want to remove?',
                choices: locationOptions,
            });
    }
}