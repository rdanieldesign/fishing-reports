import axios, { AxiosResponse } from 'axios';
import { ILocation, INewLocation } from './location-interface';

export class LocationAPI {

  private locationsURL = 'locations';

  addLocation(newLocation: INewLocation): Promise<ILocation> {
    return this.getRequestData(axios.post(this.locationsURL, newLocation));
  }

  removeLocation(locationId: number): Promise<void> {
    return this.getRequestData(axios.delete(`${this.locationsURL}/${locationId}`));
  }

  editLocation(locationId: number, locationUpdate: ILocation): Promise<ILocation> {
    return this.getRequestData(axios.put(`${this.locationsURL}/${locationId}`, locationUpdate));
  }

  getLocations(): Promise<ILocation[]> {
    return this.getRequestData(axios.get(this.locationsURL));
  }

  private getRequestData<T>(request: Promise<AxiosResponse<T>>): Promise<T> {
    return request
      .then((res) => res.data);
  }
}