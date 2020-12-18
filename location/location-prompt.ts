import { Choice } from 'prompts';
import { PromptService } from '../prompt-service';
import { LocationActions } from './location-enum';
import { ILocation } from './location-interface';

export class LocationPrompts extends PromptService {

    getActions() {
        return this.sendPrompt({
            type: 'select',
            name: 'action',
            message: '(Locations) => What do you want to do?',
            choices: [
                { title: 'Add new location', value: LocationActions.AddLocation },
                { title: 'Edit location', value: LocationActions.EditLocation },
                { title: 'Remove location', value: LocationActions.RemoveLocation },
                { title: '< Back', value: null },
            ],
        });
    }

    createLocation(location?: ILocation) {
        return this.sendPrompt([
            {
                type: 'text',
                name: 'name',
                message: 'What do you want to call this location?',
                initial: location?.name,
            },
            {
                type: 'text',
                name: 'googleMapsLink',
                message: 'Provide a link to a google maps pin.',
                initial: location?.googleMapsLink,
            },
        ]);
    }

    selectLocation(locationOptions: Choice[], message: string = 'Select a location') {
        return this.sendPrompt({
            type: 'select',
            name: 'locationId',
            message,
            choices: locationOptions,
        });
    }
}