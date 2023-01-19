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

////////
export interface Restaurant extends Record<string, any> {
  company: string;
  restaurant: string;
  restaurantType: string;
  id: string;
}

export interface Company {
  createdAt: string;
  id: string;
  name: string;
  parentCompanyId: string;
  updatedAt: string;
}

export enum RestaurantStatus {
  Available,
  TemporaryClose,
}

export interface RestaurantType {
  id: string;
  franchiseFee: number;
  name: string;
}

export interface RestaurantByCompany extends Record<string, any> {
  company: string;
  restaurant: string;
  restaurantType: RestaurantType;
  id: string;
}
