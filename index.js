const mySQLService = require('./mysql-service');
const prompts = require('prompts');
const locationService = require('./location-service');
const reportService = require('./report-service');
const promptService = require('./prompt-service');

const exitHandler = () => {
    console.log('exit process');
    mySQLService.endConnection();
    process.exit();
}

async function login() {
    promptService.getPassword((prompt, password) => {
        mySQLService.login(password)
        getAction();
    })
}

async function getAction() {
    const onSubmit = async (prompt, answer) => {
        switch(answer) {
            case 1:
                const results = await reportService.viewAllReports();
                console.log(results);
                break;
            case 2:
                const locResults = await addLocation();
                console.log(locResults);
                break;
            default:
                break;
        }
        getAction();
    };
    return promptService.getAction(onSubmit);
}

async function addLocation() {
    const locationAnswers = await promptService.getLocation();
    return locationService.addLocation(locationAnswers.name, locationAnswers.googleLink)
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

