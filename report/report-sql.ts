import { INewReport, IReport } from "./report-interface";
import { MySQLService } from '../mysql-service';
import { jsDateToString } from '../utils';
const mySQLService = new MySQLService();

export class ReportSQL {

    getAllReports(): Promise<IReport[]> {
        return mySQLService.queryToPromise<IReport[]>('SELECT * FROM reports');
    }

    getReportsByLocation(locationId: number): Promise<IReport[]> {
        return mySQLService.queryToPromise<IReport[]>(`
            SELECT * FROM reports
                WHERE locationId = ${locationId};
        `);
    }

    addReport(newReport: INewReport) {
        return mySQLService.queryToPromise<IReport>(
            `INSERT INTO reports(locationId, date, catchCount, notes) VALUES
                (
                    ${newReport.locationId},
                    STR_TO_DATE("${jsDateToString(newReport.date)}",'%Y-%m-%d'),
                    ${newReport.catchCount},
                    "${newReport.notes}"
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