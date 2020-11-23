export interface INewReport {
  locationId: number;
  catchCount: number;
  date: Date;
}

export interface IReport extends INewReport {
  id: number;
}