import { Choice } from 'prompts';
import { PromptService } from '../prompt-service';
import { LocationActions } from './location-enum';

export class LocationPrompts extends PromptService {

    getActions() {
        return this.sendPrompt({
            type: 'select',
            name: 'action',
            message: '(Locations) => What do you want to do?',
            choices: [
                { title: 'Add new location', value: LocationActions.AddLocation },
                { title: 'Remove location', value: LocationActions.RemoveLocation },
            ],
        });
    }

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