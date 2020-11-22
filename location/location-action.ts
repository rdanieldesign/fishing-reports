import { Choice } from "prompts";
import { LocationPrompts } from './location-prompt';
import { LocationSQL } from './location-sql';
const locationPrompts = new LocationPrompts();
const locationSQL = new LocationSQL();
import  { locationsToPromptOptions } from './location-util';

export async function addLocation() {
    const locationAnswers = await locationPrompts.createLocation();
    return locationSQL.addLocation(locationAnswers.name, locationAnswers.googleLink)
}

export async function removeLocation() {
    const locations = await locationSQL.getLocations();
    const { locationId } = await locationPrompts.removeLocation(locationsToPromptOptions(locations));
    return locationSQL.removeLocation(locationId)
}

export async function getLocationOptions(): Promise<Choice[]> {
    const locations = await locationSQL.getLocations();
    return locationsToPromptOptions(locations)
}