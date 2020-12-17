import { Choice } from 'prompts';
import { PromptService } from '../prompt-service';
import { ReportActions } from './report-enum';

export class ReportPrompt extends PromptService {

    getActions() {
        return this.sendPrompt({
            type: 'select',
            name: 'action',
            message: '(Reports) => What do you want to do?',
            choices: [
                { title: 'View all reports', value: ReportActions.ViewAllReports },
                { title: 'Add new report', value: ReportActions.AddReport },
                { title: 'Delete report', value: ReportActions.DeleteReport },
                { title: '< Back', value: null },
            ],
        });
    }

    createReport(locationOptions: Choice[]) {
        return this.sendPrompt([
            {
                type: 'select',
                name: 'locationId',
                message: 'Where did you go?',
                choices: locationOptions,
            },
            {
                type: 'date',
                name: 'date',
                message: 'When did you go?',
                initial: new Date(),
            },
            {
                type: 'number',
                name: 'catchCount',
                message: 'How many fish did you catch?'
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
}