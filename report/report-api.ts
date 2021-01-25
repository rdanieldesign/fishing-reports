import { INewReport, IReport } from "./report-interface";
import { jsDateToString } from '../utils';
import axios, { AxiosResponse } from 'axios';

export class ReportAPI {

    private reportsURL = 'reports';

    getAllReports(): Promise<IReport[]> {
        return this.getRequestData(axios.get(this.reportsURL));
    }

    getReportsByLocation(locationId: number): Promise<IReport[]> {
        return this.getRequestData(axios.get(`${this.reportsURL}?locationId=${locationId}`));
    }

    addReport(newReport: INewReport) {
        return this.getRequestData(axios.post(this.reportsURL, {
            ...newReport,
            date: jsDateToString(newReport.date)
        }));
    }

    updateReport(reportId: number, newReport: INewReport) {
        return this.getRequestData(axios.put(`${this.reportsURL}/${reportId}`, {
            ...newReport,
            date: jsDateToString(newReport.date)
        }));
    }

    deleteReport(reportId: number) {
        return this.getRequestData(axios.delete(`${this.reportsURL}/${reportId}`));
    }

    private getRequestData<T>(request: Promise<AxiosResponse<T>>): Promise<T> {
        return request
            .then((res) => res.data);
    }
}