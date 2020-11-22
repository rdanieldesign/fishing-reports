import { MysqlError } from "mysql";
import { INewReport } from "./report-interface";
import { MySQLService } from '../mysql-service';
const mySQLService = new MySQLService();
import { jsDateToString } from '../utils';

interface IReport {
    id: number;
    locationId: number;
    catchCount: number;
    date: Date;
}

export class ReportSQL {

    viewAllReports(): Promise<IReport[]> {
        return this.queryToPromise<IReport[]>('SELECT * FROM reports');
    }

    addReport(newReport: INewReport) {
        return this.queryToPromise(
            `INSERT INTO reports(locationId, date, catchCount) VALUES
                (
                    ${newReport.locationId},
                    STR_TO_DATE("${jsDateToString(newReport.date)}",'%Y-%m-%d'),
                    ${newReport.catchCount}
                );`
        );
    }

    queryToPromise<T>(query: string): Promise<T> {
        return new Promise((resolve, reject) => {
            mySQLService.mySQLConnection.query(query, function (error: MysqlError, results: T) {
                if (error) {
                    reject(error);
                };
                resolve(results);
            });
        });
    }
}