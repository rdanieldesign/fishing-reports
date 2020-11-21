const mySQLService = require('./mysql-service');

class LocationService {
    
    addLocation(name, googleLink) {
        return this.queryToPromise(
            `INSERT INTO locations(name, googleMapsLink) VALUES
                (
                    "${name}",
                    "${googleLink}"
                );`
        );
    }

    removeLocation(locationId) {
        return this.queryToPromise(
            `DELETE FROM locations
                WHERE ID = ${locationId};`
        );
    }

    getLocations() {
        return this.queryToPromise(`SELECT * FROM locations`);
    }

    queryToPromise(query) {
        return new Promise((resolve, reject) => {
            mySQLService.mySQLConnection.query(query, function (error, results) {
                if (error) {
                    reject(error);
                };
                resolve(results);
            });
        });
    }
}

module.exports = new LocationService();