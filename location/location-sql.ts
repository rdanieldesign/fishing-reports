import { MySQLService } from '../mysql-service';
import { ILocation } from './location-interface';
const mySQLService = new MySQLService();

export class LocationSQL {
    
    addLocation(name: string, googleLink: string): Promise<ILocation> {
        return this.queryToPromise<ILocation>(
            `INSERT INTO locations(name, googleMapsLink) VALUES
                (
                    "${name}",
                    "${googleLink}"
                );`
        );
    }

    removeLocation(locationId: string): Promise<void> {
        return this.queryToPromise<void>(
            `DELETE FROM locations
                WHERE ID = ${locationId};`
        );
    }

    getLocations(): Promise<ILocation[]> {
        return this.queryToPromise<ILocation[]>(`SELECT * FROM locations`);
    }

    queryToPromise<T>(query: string): Promise<T> {
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