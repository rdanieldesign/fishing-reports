import { ReportPrompt } from './report-prompt';
import { LocationAction } from '../location/location-action';
import { ReportSQL } from './report-sql';
import { INewReport } from './report-interface';
import { ReportActions } from './report-enum';

const reportSQL = new ReportSQL();
const locationAction = new LocationAction();
const reportPrompt = new ReportPrompt();

export class ReportAction {

    async getActions() {
        return reportPrompt.getActions()
            .then(async ({ action }) => {
                switch (action) {
                    case ReportActions.ViewAllReports: {
                        const results = await this.viewAllReports();
                        console.log(results);
                        break;
                    }
                    case ReportActions.AddReport: {
                        const results = await this.addReport();
                        console.log(results);
                        break;
                    }
                    default:
                        break;
                }
            });
    }

    async addReport() {
        const locationOptions = await locationAction.getLocationOptions();
        const newReport = await reportPrompt.createReport(locationOptions);
        return reportSQL.addReport(newReport as INewReport);
    }
    
    async viewAllReports() {
        const locationOptions = await locationAction.getLocationOptions();
        const reports = await reportSQL.viewAllReports();
        return reports
            .map((report) => {
                return {
                    date: report.date,
                    location: locationOptions
                        .find(location => location.value === report.locationId)?.title,
                    catchCount: report.catchCount,
                }
            })
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
}
