import { MySQLService } from '../mysql-service';
import { ILocation, INewLocation } from './location-interface';

const mySQLService = new MySQLService();

export class LocationSQL {
    
    addLocation(newLocation: INewLocation): Promise<ILocation> {
        return mySQLService.queryToPromise<ILocation>(
            `INSERT INTO locations(name, googleMapsLink) VALUES
                (
                    "${newLocation.name}",
                    "${newLocation.googleMapsLink}"
                );`
        );
    }

    removeLocation(locationId: string): Promise<void> {
        return mySQLService.queryToPromise<void>(
            `DELETE FROM locations
                WHERE ID = ${locationId};`
        );
    }

    editLocation(locationId: string, locationUpdate: ILocation): Promise<ILocation> {
        return mySQLService.queryToPromise<ILocation>(
            `UPDATE locations
                SET
                    name = "${locationUpdate.name}",
                    googleMapsLink = "${locationUpdate.googleMapsLink}"
                WHERE ID = ${locationId};`
        );
    }

    getLocations(): Promise<ILocation[]> {
        return mySQLService.queryToPromise<ILocation[]>(`SELECT * FROM locations`);
    }
}