import { Station, Company, ChargingStatus } from "../interfaces/";

export type Action =
  | {
      type: "FETCH_STATIONS";
      payload: Station[];
    }
  | {
      type: "FETCH_COMPANIES";
      payload: Company[];
    }
  | {
      type: "FETCH_PARENT_COMPANIES";
      payload: Company[];
    }
  | {
      type: "FETCH_STATION_BY_ID";
      payload: Station;
    }
  | {
      type: "FETCH_STATIONS_BY_COMPANY_ID";
      payload: Station[];
    }
  | {
      type: "FETCH_STATION_TYPE_BY_ID";
      payload: Station;
    }
  | {
      type: "FETCH_STATION_TYPES";
      payload: ChargingStatus[];
    }
  | {
      type: "FETCH_COMPANY_BY_ID";
      payload: Company;
    }
  | {
      type: "ADD_STATION";
      payload: Station;
    }
  | {
      type: "ADD_COMPANY";
      payload: Company;
    };

const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case "FETCH_STATIONS":
      return {
        ...state,
        stations: [...action.payload],
      };
    case "FETCH_COMPANIES":
      return {
        ...state,
        companies: [...action.payload],
      };
    case "FETCH_PARENT_COMPANIES":
      return {
        ...state,
        parentCompanies: [...action.payload],
      };
    case "FETCH_STATION_BY_ID":
      return {
        ...state,
        station: action.payload,
      };
    case "FETCH_STATIONS_BY_COMPANY_ID":
      return {
        ...state,
        stationById: action.payload,
      };
    case "FETCH_STATION_TYPE_BY_ID":
      return {
        ...state,
        stationType: action.payload,
      };
    case "FETCH_STATION_TYPES":
      return {
        ...state,
        stationTypes: action.payload,
      };
    case "FETCH_COMPANY_BY_ID":
      return {
        ...state,
        companyById: action.payload,
      };
    case "ADD_STATION":
      return {
        ...state,
        stations: [action.payload, ...state.stations],
      };
    case "ADD_COMPANY":
      return {
        ...state,
        companies: [action.payload, ...state.companies],
      };
    default:
      return state;
  }
};

export default appReducer;
