module.exports = {
    jsDateToString: (date) => {
        return date
            .toISOString()
            .split('T')
            [0];
    }
}