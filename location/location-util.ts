import { Choice } from "prompts";
import { ILocation } from "./location-interface";

export function locationsToPromptOptions(locations: ILocation[]): Choice[] {
    return locations.map(option => {
        return {
            title:  option.name,
            value: option.id
        };
    });
}

export function getLocationById(locationId: number, locations: ILocation[]): ILocation | undefined {
    return locations.find(location => location.id === locationId);
}