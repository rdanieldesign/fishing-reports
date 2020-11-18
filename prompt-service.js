const mySQLService = require('./mysql-service');
const prompts = require('prompts');

class PromptService {

    getPassword(onSubmit) {
        return prompts({
            type: 'password',
            name: 'password',
            message: 'Enter your mySQL password'
        }, { onCancel: this.onCancel, onSubmit });
    }

    getAction(onSubmit) {
        return prompts({
            type: 'select',
            name: 'action',
            message: 'What do you want to do?',
            choices: [
                { title: 'View all catches', value: 1 },
                { title: 'Add new location', value: 2 },
            ],
        }, { onCancel: this.onCancel, onSubmit });
    }

    getLocation() {
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
        return prompts(questions, { onCancel: this.onCancel });
    }

    onCancel() {
        console.log('on cancel');
        mySQLService.endConnection();
        return false;
    }
}

module.exports = new PromptService();