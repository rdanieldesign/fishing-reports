const mySQLService = require('./mysql-service');

class LocationService {
    
    addLocation(name, googleLink) {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO locations(name, googleMapsLink) VALUES
                (
                    "${name}",
                    "${googleLink}"
                );`
            mySQLService.mySQLConnection.query(query, function (error, results, fields) {
                if (error) {
                    reject(error);
                };
                resolve(results);
            });
        });
    }
}

module.exports = new LocationService();