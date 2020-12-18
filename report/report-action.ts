import { ReportPrompt } from './report-prompt';
import { LocationAction } from '../location/location-action';
import { ReportSQL } from './report-sql';
import { INewReport } from './report-interface';
import { ReportActions } from './report-enum';
import { reportsToPromptOptions, sortReportsByDate } from './report-util';

const reportSQL = new ReportSQL();
const locationAction = new LocationAction();
const reportPrompt = new ReportPrompt();

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
        return reportSQL.addReport(newReport as INewReport);
    }

    async editReport() {
        const reportToEdit = await this.selectReport();
        if (!reportToEdit) return;
        const locationOptions = await locationAction.getLocationOptions();
        console.log(locationOptions);
        const newReport = await reportPrompt.createReport(locationOptions, reportToEdit);
        return reportSQL.updateReport(reportToEdit?.id, newReport as INewReport);
    }
    
    async viewAllReports() {
        const locationOptions = await locationAction.getLocationOptions();
        const reports = await reportSQL.getAllReports();
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
        let reports = await reportSQL.getReportsByLocation(location.id);
        return sortReportsByDate(reports);
    }

    async deleteReport() {
        const reportToDelete = await this.selectReport('Which report do you want to delete?');
        if (!reportToDelete) return;
        return reportSQL.deleteReport(reportToDelete?.id);
    }

    private async selectReport(message: string = '') {
        const locations = await locationAction.getLocations();
        const reports = await reportSQL.getAllReports();
        const reportOptions = reportsToPromptOptions(reports, locations);
        const { reportId } = await reportPrompt.getReport(reportOptions, message);
        return reports.find((report) => report.id === reportId);
    }
}
