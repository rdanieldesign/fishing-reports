import { Choice } from 'prompts';
import { PromptService } from '../prompt-service';
import { ReportActions } from './report-enum';
import { IReport } from './report-interface';

export class ReportPrompt extends PromptService {

    getActions() {
        return this.sendPrompt({
            type: 'select',
            name: 'action',
            message: '(Reports) => What do you want to do?',
            choices: [
                { title: 'View all reports', value: ReportActions.ViewAllReports },
                { title: 'View reports by location', value: ReportActions.GetReportsByLocation },
                { title: 'Add new report', value: ReportActions.AddReport },
                { title: 'Edit a report', value: ReportActions.EditReport },
                { title: 'Delete report', value: ReportActions.DeleteReport },
                { title: '< Back', value: null },
            ],
        });
    }

    createReport(locationOptions: Choice[], report?: IReport) {
        return this.sendPrompt([
            {
                type: 'select',
                name: 'locationId',
                message: 'Where did you go?',
                choices: locationOptions,
                initial: report?.locationId
                    ? locationOptions.findIndex((location) => location.value === report?.locationId)
                    : undefined,
            },
            {
                type: 'date',
                name: 'date',
                message: 'When did you go?',
                initial: report ? report.date : new Date(),
            },
            {
                type: 'number',
                name: 'catchCount',
                message: 'How many fish did you catch?',
                initial: report?.catchCount,
            },
            {
                type: 'text',
                name: 'notes',
                message: 'Add notes for the report.',
                initial: report?.notes,
            },
        ]);
    }

    deleteReport(reportOptions: Choice[]) {
        return this.sendPrompt({
            type: 'select',
            name: 'reportId',
            message: 'Which report do you want to delete?',
            choices: reportOptions,
        });
    }

    getReport(reportOptions: Choice[], message: string = 'Select a report.') {
        return this.sendPrompt({
            type: 'select',
            name: 'reportId',
            message,
            choices: reportOptions,
        });
    }
}