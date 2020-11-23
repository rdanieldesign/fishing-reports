import { MySQLService } from '../mysql-service';
import { ILocation } from './location-interface';

export class LocationSQL extends MySQLService {
    
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
}