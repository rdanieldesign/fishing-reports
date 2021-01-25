import { Choice } from "prompts";
import { LocationAPI } from './location-api';
import { LocationActions } from "./location-enum";
import { ILocation, INewLocation } from "./location-interface";
import { LocationPrompts } from './location-prompt';
import { locationsToPromptOptions } from './location-util';

const locationPrompt = new LocationPrompts();
const locationAPI = new LocationAPI();

export class LocationAction {

    async getActions() {
        return locationPrompt.getActions()
            .then(async ({ action }) => {
                let results = null;
                switch (action) {
                    case LocationActions.AddLocation: {
                        results = await this.addLocation();
                        break;
                    }
                    case LocationActions.RemoveLocation: {
                        results = await this.removeLocation();
                        break;
                    }
                    case LocationActions.EditLocation: {
                        results = await this.editLocation();
                        break;
                    }
                    default:
                        break;
                }
                console.log(results);
            });
    }
    
    async addLocation() {
        const newLocation = await locationPrompt.createLocation() as INewLocation;
        return locationAPI.addLocation(newLocation)
    }

    async editLocation() {
        const location = await this.selectLocation();
        if (location) {
            const locationUpdate = await locationPrompt.createLocation(location) as ILocation;
            return locationAPI.editLocation(location.id, locationUpdate);
        }
    }
    
    async removeLocation() {
        const locations = await this.getLocations();
        const { locationId } = await locationPrompt.selectLocation(
            locationsToPromptOptions(locations),
            'Which location do you want to remove?'
        );
        return locationAPI.removeLocation(locationId)
    }
    
    async getLocationOptions(): Promise<Choice[]> {
        const locations = await this.getLocations();
        return locationsToPromptOptions(locations)
    }

    async getLocations(): Promise<ILocation[]> {
        return locationAPI.getLocations();
    }

    async selectLocation(): Promise<ILocation | undefined> {
        const locations = await this.getLocations();
        const { locationId } = await locationPrompt.selectLocation(locationsToPromptOptions(locations));
        return locations.find((loc: ILocation) => loc.id === locationId);
    } 
}
