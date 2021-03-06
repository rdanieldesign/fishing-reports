const mySQLService = require('./mysql-service');
const prompts = require('prompts');
const { ACTIONS } = require('./constants');

class PromptService {

    getPassword(onSubmit) {
        return this.sendPrompt({
            type: 'password',
            name: 'password',
            message: 'Enter your mySQL password'
        }, onSubmit );
    }

    getAction(onSubmit) {
        return this.sendPrompt({
            type: 'select',
            name: 'action',
            message: 'What do you want to do?',
            choices: [
                { title: 'View all catches', value: ACTIONS.VIEW_CATCHES },
                { title: 'Add new location', value: ACTIONS.ADD_LOCATION },
                { title: 'Remove location', value: ACTIONS.REMOVE_LOCATION },
                { title: 'Add new report', value: ACTIONS.ADD_REPORT },
            ],
        }, onSubmit);
    }

    createLocation() {
        return this.sendPrompt([
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
        ]);
    }

    removeLocation(locationOptions) {
        return this.sendPrompt({
                type: 'select',
                name: 'locationId',
                message: 'Which location do you want to remove?',
                choices: locationOptions,
            });
    }

    createReport(locationOptions) {
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

    sendPrompt(questions, onSubmit) {
        return prompts(questions, { onCancel: this.onCancel, onSubmit });
    }

    onCancel() {
        console.log('on cancel');
        mySQLService.endConnection();
        return false;
    }
}

module.exports = new PromptService();