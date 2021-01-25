import { LocationAction } from './location/location-action';
import { ReportAction } from './report/report-action';
import { MenuAction } from './menu/menu-action';
import { MenuItems } from './menu/menu-enum';
import axios from 'axios';
import { API_ROOT } from './constants';

const menuAction = new MenuAction();
const locationAction = new LocationAction();
const reportAction = new ReportAction();

const exitHandler = () => {
    console.log('exit process');
    process.exit();
};

async function getMenu() {
    return menuAction.getMenuSelection()
        .then(async ({ selection }) => {
            switch (selection) {
                case MenuItems.locations: {
                    await locationAction.getActions();
                    break;
                }
                case MenuItems.reports: {
                    await reportAction.getActions();
                    break;
                }
                default:
                    break;
            }
            getMenu();
        });
}

// Start process
axios.defaults.baseURL = API_ROOT;
axios.defaults.headers.common['Content-Type'] = 'application/json';
getMenu();

//catches ctrl+c event
process.on('SIGINT', exitHandler);

// catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);

//catches uncaught exceptions
process.on('uncaughtException', exitHandler);

