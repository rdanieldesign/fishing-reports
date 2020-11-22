import { MySQLService } from './mysql-service';
const mySQLService = new MySQLService();
import { addLocation, removeLocation } from './location/location-action';
import { addReport, viewAllReports } from './report/report-action';
import { PromptService } from './prompt-service';
const promptService = new PromptService();
import { ACTIONS } from './constants';
import { PromptObject } from 'prompts';

const exitHandler = () => {
    console.log('exit process');
    mySQLService.endConnection();
    process.exit();
};

async function login() {
    promptService.getPassword((prompt, password) => {
        mySQLService.login(password)
        getAction();
    })
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
login();

//catches ctrl+c event
process.on('SIGINT', exitHandler);

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);

//catches uncaught exceptions
process.on('uncaughtException', exitHandler);

