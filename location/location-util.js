function locationsToPromptOptions(locations) {
    return locations.map(option => {
        return {
            title:  option.name,
            value: option.id
        };
    });
}

module.exports = {
    locationsToPromptOptions
}