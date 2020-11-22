import { ReportPrompt } from './report-prompt';
const reportPrompt = new ReportPrompt();

import { getLocationOptions } from '../location/location-action';
import { ReportSQL } from './report-sql';
import { INewReport } from './report-interface';
const reportSQL = new ReportSQL();

export async function addReport() {
    const locationOptions = await getLocationOptions();
    const newReport = await reportPrompt.createReport(locationOptions);
    return reportSQL.addReport(newReport as INewReport);
}

export function viewAllReports() {
    return reportSQL.viewAllReports();
}