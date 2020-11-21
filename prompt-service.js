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

    sendPrompt(questions, onSubmit) {
        return prompts(questions, { onCancel: this.onCancel, onSubmit });
    }

    onCancel() {
        console.log('on cancel');
        mySQLService.endConnection();
        return false;
    }
}

module.exports = { promptService: new PromptService(), PromptService };