import { Choice } from "prompts";
import { LocationActions } from "./location-enum";
import { LocationPrompts } from './location-prompt';
import { LocationSQL } from './location-sql';
import { locationsToPromptOptions } from './location-util';

const locationPrompt = new LocationPrompts();
const locationSQL = new LocationSQL();

export class LocationAction {

    async getActions() {
        return locationPrompt.getActions()
            .then(async ({ action }) => {
                switch (action) {
                    case LocationActions.AddLocation: {
                        const results = await this.addLocation();
                        console.log(results);
                        break;
                    }
                    case LocationActions.RemoveLocation: {
                        const results = await this.removeLocation();
                        console.log(results);
                        break;
                    }
                    default:
                        break;
                }
            });
    }
    
    async addLocation() {
        const locationAnswers = await locationPrompt.createLocation();
        console.log(locationSQL);
        return locationSQL.addLocation(locationAnswers.name, locationAnswers.googleLink)
    }
    
    async removeLocation() {
        const locations = await locationSQL.getLocations();
        const { locationId } = await locationPrompt.removeLocation(locationsToPromptOptions(locations));
        return locationSQL.removeLocation(locationId)
    }
    
    async getLocationOptions(): Promise<Choice[]> {
        const locations = await locationSQL.getLocations();
        return locationsToPromptOptions(locations)
    }
}
