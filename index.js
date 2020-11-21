const mySQLService = require('./mysql-service');
const { addLocation, removeLocation } = require('./locations/location-actions');
const reportService = require('./report-service');
const { promptService } = require('./prompt-service');
const { ACTIONS } = require('./constants');
const locationActions = require('./locations/location-actions');


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
    const onSubmit = async (prompt, answer) => {
        switch(answer) {
            case ACTIONS.VIEW_CATCHES: {
                const results = await reportService.viewAllReports();
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

async function addReport() {
    const locationOptions = await locationActions.getLocationOptions();
    const newReport = await promptService.createReport(locationOptions);
    return reportService.addReport(newReport);
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

