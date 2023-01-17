export interface Station extends Record<string, any> {
  company: string;
  station: string;
  stationType: string;
  id: string;
}

export interface Company {
  createdAt: string;
  id: string;
  name: string;
  parentCompanyId: string;
  updatedAt: string;
}

export enum ChargingStatus {
  Available,
  Charging,
}

export interface StationType {
  id: string;
  maxPower: number;
  name: string;
}

export interface StationByCompany extends Record<string, any> {
  company: string;
  station: string;
  stationType: StationType;
  id: string;
}
