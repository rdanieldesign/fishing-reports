import { Choice } from "prompts";
import { ILocation } from "../location/location-interface";
import { IReport } from "./report-interface";
import { getLocationById } from '../location/location-util';

export function reportsToPromptOptions(reports: IReport[], locations: ILocation[]): Choice[] {
    return sortReportsByDate(reports)
        .map(option => {
        return {
            title: `date: ${option.date}, location: ${getLocationById(option.locationId, locations)?.name}`,
            value: option.id,
        };
    });
}

export function sortReportsByDate(reports: IReport[]) {
    return reports
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}