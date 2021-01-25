import { ReportPrompt } from './report-prompt';
import { LocationAction } from '../location/location-action';
import { INewReport } from './report-interface';
import { ReportActions } from './report-enum';
import { reportsToPromptOptions, sortReportsByDate } from './report-util';
import { ReportAPI } from './report-api';

const locationAction = new LocationAction();
const reportPrompt = new ReportPrompt();
const reportAPI = new ReportAPI();

export class ReportAction {

    async getActions() {
        return reportPrompt.getActions()
            .then(async ({ action }) => {
                let results = null;
                switch (action) {
                    case ReportActions.ViewAllReports: {
                        results = await this.viewAllReports();
                        break;
                    }
                    case ReportActions.GetReportsByLocation: {
                        results = await this.getReportByLocation();
                        break;
                    }
                    case ReportActions.AddReport: {
                        results = await this.addReport();
                        break;
                    }
                    case ReportActions.EditReport: {
                        results = await this.editReport();
                        break;
                    }
                    case ReportActions.DeleteReport: {
                        await this.deleteReport();
                        break;
                    }
                    default:
                        break;
                }
                console.log(results);
            });
    }

    async addReport() {
        const locationOptions = await locationAction.getLocationOptions();
        const newReport = await reportPrompt.createReport(locationOptions);
        return reportAPI.addReport(newReport as INewReport);
    }

    async editReport() {
        const reportToEdit = await this.selectReport();
        if (!reportToEdit) return;
        const locationOptions = await locationAction.getLocationOptions();
        const newReport = await reportPrompt.createReport(locationOptions, reportToEdit);
        return reportAPI.updateReport(reportToEdit?.id, newReport as INewReport);
    }
    
    async viewAllReports() {
        const locationOptions = await locationAction.getLocationOptions();
        const reports = await reportAPI.getAllReports();
        return reports
            .map((report) => {
                return {
                    date: report.date,
                    location: locationOptions
                        .find(location => location.value === report.locationId)?.title,
                    catchCount: report.catchCount,
                    notes: report.notes,
                }
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    async getReportByLocation() {
        const location = await locationAction.selectLocation();
        if (!location) return;
        let reports = await reportAPI.getReportsByLocation(location.id);
        return sortReportsByDate(reports);
    }

    async deleteReport() {
        const reportToDelete = await this.selectReport('Which report do you want to delete?');
        if (!reportToDelete) return;
        return reportAPI.deleteReport(reportToDelete?.id);
    }

    private async selectReport(message: string = '') {
        const locations = await locationAction.getLocations();
        const reports = await reportAPI.getAllReports();
        const reportOptions = reportsToPromptOptions(reports, locations);
        const { reportId } = await reportPrompt.getReport(reportOptions, message);
        return reports.find((report) => report.id === reportId);
    }
}
