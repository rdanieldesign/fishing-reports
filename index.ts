import { addLocation, removeLocation } from './location/location-action';
import { addReport, viewAllReports } from './report/report-action';
import { login } from './auth/auth-action';
import { PromptService } from './prompt-service';
import { ACTIONS } from './constants';
import { PromptObject } from 'prompts';
import { MySQLService } from './mysql-service';
const mySQLService = new MySQLService();

const promptService = new PromptService();

const exitHandler = () => {
    console.log('exit process');
    mySQLService.endConnection();
    process.exit();
};

async function getAction() {
    const onSubmit = async (prompt: PromptObject, answer: any) => {
        switch(answer) {
            case ACTIONS.VIEW_CATCHES: {
                const results = await viewAllReports();
                console.log(results);
                break;
            }
            case ACTIONS.ADD_LOCATION: {
                const locResults = await addLocation();
                console.log(locResults);
                break;
            }
            case ACTIONS.REMOVE_LOCATION: {
                const locResults = await removeLocation();
                console.log(locResults);
                break;
            }
            case ACTIONS.ADD_REPORT: {
                const report = await addReport();
                console.log(report);
                break;
            }
            default:
                break;
        }
        getAction();
    };
    return promptService.getAction(onSubmit);
}

// Start process
login().then(() => {
    getAction();
});

//catches ctrl+c event
process.on('SIGINT', exitHandler);

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);

//catches uncaught exceptions
process.on('uncaughtException', exitHandler);

