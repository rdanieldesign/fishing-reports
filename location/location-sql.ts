import { MySQLService } from '../mysql-service';
import { ILocation } from './location-interface';

const mySQLService = new MySQLService();

export class LocationSQL {
    
    addLocation(name: string, googleLink: string): Promise<ILocation> {
        return mySQLService.queryToPromise<ILocation>(
            `INSERT INTO locations(name, googleMapsLink) VALUES
                (
                    "${name}",
                    "${googleLink}"
                );`
        );
    }

    removeLocation(locationId: string): Promise<void> {
        return mySQLService.queryToPromise<void>(
            `DELETE FROM locations
                WHERE ID = ${locationId};`
        );
    }

    getLocations(): Promise<ILocation[]> {
        return mySQLService.queryToPromise<ILocation[]>(`SELECT * FROM locations`);
    }
}