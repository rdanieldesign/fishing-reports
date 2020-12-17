import { INewReport, IReport } from "./report-interface";
import { MySQLService } from '../mysql-service';
import { jsDateToString } from '../utils';
const mySQLService = new MySQLService();

export class ReportSQL {

    viewAllReports(): Promise<IReport[]> {
        return mySQLService.queryToPromise<IReport[]>('SELECT * FROM reports');
    }

    addReport(newReport: INewReport) {
        return mySQLService.queryToPromise<IReport>(
            `INSERT INTO reports(locationId, date, catchCount) VALUES
                (
                    ${newReport.locationId},
                    STR_TO_DATE("${jsDateToString(newReport.date)}",'%Y-%m-%d'),
                    ${newReport.catchCount}
                );`
        );
    }

    deleteReport(reportId: number) {
        return mySQLService.queryToPromise<void>(
            `DELETE FROM reports
                WHERE ID = ${reportId};`
        );
    }
}