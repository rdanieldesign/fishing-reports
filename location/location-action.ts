import { Choice } from "prompts";
import { LocationActions } from "./location-enum";
import { ILocation, INewLocation } from "./location-interface";
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
                    case LocationActions.EditLocation: {
                        const results = await this.editLocation();
                        console.log(results);
                        break;
                    }
                    default:
                        break;
                }
            });
    }
    
    async addLocation() {
        const newLocation = await locationPrompt.createLocation() as INewLocation;
        return locationSQL.addLocation(newLocation)
    }

    async editLocation() {
        const locationOptions = await locationSQL.getLocations();
        const { locationId } = await locationPrompt.selectLocation(locationsToPromptOptions(locationOptions));
        const location = locationOptions.find((loc: ILocation) => loc.id === locationId);
        if (location) {
            const locationUpdate = await locationPrompt.createLocation(location) as ILocation;
            console.log(locationUpdate);
            return locationSQL.editLocation(locationId, locationUpdate);
        }
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
