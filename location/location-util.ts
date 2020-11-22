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