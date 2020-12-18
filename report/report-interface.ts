export interface INewReport {
  locationId: number;
  catchCount: number;
  date: Date;
  notes: string;
}

export interface IReport extends INewReport {
  id: number;
}