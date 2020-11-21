const reportPrompt = require('./report-prompt');
const locationActions = require('../location/location-action');
const reportSQL = require('./report-sql');

async function addReport() {
    const locationOptions = await locationActions.getLocationOptions();
    const newReport = await reportPrompt.createReport(locationOptions);
    return reportSQL.addReport(newReport);
}

function viewAllReports() {
    return reportSQL.viewAllReports();
}

module.exports = {
    addReport, viewAllReports
}