const { locationPrompts } = require('./location-prompt');
const locationSQL = require('./location-sql');
const { locationsToPromptOptions } = require('./location-util');

async function addLocation() {
    const locationAnswers = await locationPrompts.createLocation();
    return locationSQL.addLocation(locationAnswers.name, locationAnswers.googleLink)
}

async function removeLocation() {
    const locations = await locationSQL.getLocations();
    const { locationId } = await locationPrompts.removeLocation(locationsToPromptOptions(locations));
    return locationSQL.removeLocation(locationId)
}

async function getLocationOptions() {
    const locations = await locationSQL.getLocations();
    return locationsToPromptOptions(locations)
}

module.exports = {
    addLocation, removeLocation, getLocationOptions
};