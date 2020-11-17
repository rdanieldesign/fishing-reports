const mySQLService = require('./mysql-service');
const prompts = require('prompts');
const locationService = require('./location-service');

const onCancel = () => {
    console.log('on cancel');
    mySQLService.endConnection();
    return false;
}

const exitHandler = () => {
    console.log('exit process');
    mySQLService.endConnection();
    process.exit();
}

async function login() {
    const onSubmit = (prompt, password) => {
        mySQLService.login(password)
        getAction();
    };
    prompts({
        type: 'password',
        name: 'password',
        message: 'Enter your mySQL password'
    }, { onCancel, onSubmit });
}

async function getAction() {
    const onSubmit = async (prompt, answer) => {
        console.log(answer);
        switch(answer) {
            case 1:
                console.log(`Logging results...`)
                const results = await viewAllReports();
                console.log(results);
                break;
            case 2:
                console.log(`Adding location`);
                const locResults = await addLocation();
                console.log(locResults);
                break;
            default:
                break;
        }
        getAction();
    };
    return prompts({
        type: 'select',
        name: 'action',
        message: 'What do you want to do?',
        choices: [
            { title: 'View all catches', value: 1 },
            { title: 'Add new location', value: 2 },
        ],
    }, { onCancel, onSubmit });
}

function viewAllReports() {
    return new Promise((resolve, reject) => {
        mySQLService.mySQLConnection.query('SELECT * FROM reports WHERE catchCount > 0', function (error, results, fields) {
            if (error) {
                reject(error);
            };
            resolve(results);
        });
    });
}

async function addLocation() {
    const questions = [
        {
            type: 'text',
            name: 'name',
            message: 'What do you want to call this location?'
        },
        {
            type: 'text',
            name: 'googleLink',
            message: 'Provide a link to a google maps pin.'
        },
    ];
    const locationAnswers = await prompts(questions, { onCancel });
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

