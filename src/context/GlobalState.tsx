import React, {
  createContext,
  useReducer,
  ReactElement,
  useEffect,
  useCallback,
} from "react";
import AppReducer, { Action } from "./AppReducer";
import { Station, Company } from "../interfaces/";

const apiHost = process.env.REACT_APP_API_HOST;

interface InitialState {
  stations: Station[] | [];
  station: Station | null;
  createData: (type: string, data: any) => void;
  getStation: () => void;
  getStationById: (id: string) => void;
  editStation: (station: Station) => void;
  getStationTypeById: (id: string) => void;
  stationType: string | null;
  editStationType: (data: any) => void;
  companies: Company[];
  parentCompanies: Company[];
  getStationsByCompanyId: (id: string) => void;
  stationById: Station[] | [];
  stationTypes: any[] | [];
  getCompanies: (value: boolean) => Promise<void>;
  dispatch: React.Dispatch<Action>;
  getCompanyById: (id: string) => void;
  companyById: Company[];
  editCompany: (data: any) => void;
}
interface GlobalProviderProps {
  children?: ReactElement[] | ReactElement;
}

// Initial state
const initialState: InitialState = {
  stations: [],
  station: null,
  createData: () => {},
  getStation: () => {},
  getStationById: () => {},
  editStation: () => {},
  getStationTypeById: () => {},
  stationType: null,
  editStationType: () => {},
  companies: [],
  parentCompanies: [],
  getStationsByCompanyId: () => {},
  stationById: [],
  stationTypes: [],
  getCompanies: () => {
    return Promise.resolve();
  },
  dispatch: () => {},
  getCompanyById: () => {},
  companyById: [],
  editCompany: () => {},
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    getStation();
    getCompanies(true);
    getCompanies();
    getStationTypes();
  }, []);

  // Actions

  const createData = async (type: string, data: any) => {
    if (type === "company") {
      const res = await fetch(`${apiHost}create-company`, {
        method: "post",
        body: JSON.stringify(data),
      });
      const company = await res.json();
      dispatch({
        type: "ADD_COMPANY",
        payload: company,
      });
    }
    if (type === "station") {
      const res = await fetch(`${apiHost}create-station`, {
        method: "post",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      const station = await res.json();
      const newStation = {
        station: station.name,
        company: station.company.name,
        stationType: station.stationType.name,
        stationTypeId: station.stationType.id,
        id: station.id,
        companyId: station.company.id,
      };
      dispatch({
        type: "ADD_STATION",
        payload: newStation,
      });
    }
    if (type === "stationType") {
      await fetch(`${apiHost}create-station-type`, {
        method: "post",
        body: JSON.stringify(data),
      });
    }
  };

  const getStation = async () => {
    const res = await fetch(`${apiHost}get-stations`);
    const data = await res.json();
    const stations = data.map((station: any) => ({
      station: station.name,
      company: station.company.name,
      stationType: station.stationType.name,
      stationTypeId: station.stationType.id,
      id: station.id,
      companyId: station.company.id,
    }));
    dispatch({
      type: "FETCH_STATIONS",
      payload: stations,
    });
  };

  const getStationById = useCallback(async (id: string) => {
    const res = await fetch(`${apiHost}get-station?id=${id}`);
    const data = await res.json();

    dispatch({
      type: "FETCH_STATION_BY_ID",
      payload: data,
    });
  }, []);

  const getStationTypes = async () => {
    const res = await fetch(`${apiHost}get-station-type`);
    const data = await res.json();
    dispatch({
      type: "FETCH_STATION_TYPES",
      payload: data,
    });
  };

  const getStationTypeById = useCallback(async (id: string) => {
    const res = await fetch(`${apiHost}get-station-type?id=${id}`);
    const data = await res.json();
    dispatch({
      type: "FETCH_STATION_TYPE_BY_ID",
      payload: data,
    });
  }, []);

  const editStation = async (station: Station) => {
    await fetch(`${apiHost}create-station`, {
      method: "post",
      body: JSON.stringify(station),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  };

  const editStationType = async (data: any) => {
    await fetch(`${apiHost}create-station-type`, {
      method: "post",
      body: JSON.stringify(data),
    });
  };

  const editCompany = async (data: any) => {
    await fetch(`${apiHost}create-company`, {
      method: "post",
      body: JSON.stringify(data),
    });
  };

  const getCompanies = async (value = false) => {
    const res = await fetch(`${apiHost}get-companies?parent=${value}`);
    const data = await res.json();
    console.log("data", data);
    if (value) {
      dispatch({
        type: "FETCH_PARENT_COMPANIES",
        payload: data,
      });
    }
    dispatch({
      type: "FETCH_COMPANIES",
      payload: data,
    });
  };

  const getStationsByCompanyId = useCallback(async (id: string) => {
    const res = await fetch(`${apiHost}get-stations-by-companyId?id=${id}`);
    const data = await res.json();
    dispatch({
      type: "FETCH_STATIONS_BY_COMPANY_ID",
      payload: data,
    });
  }, []);

  const getCompanyById = useCallback(async (id: string) => {
    const res = await fetch(`${apiHost}get-company-by-id?id=${id}`);
    const data = await res.json();
    dispatch({
      type: "FETCH_COMPANY_BY_ID",
      payload: data[0],
    });
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        stations: state.stations,
        station: state.station,
        createData,
        getStation,
        getStationById,
        editStation,
        getStationTypeById,
        stationType: state.stationType,
        editStationType,
        companies: state.companies,
        parentCompanies: state.parentCompanies,
        getStationsByCompanyId,
        stationById: state.stationById,
        stationTypes: state.stationTypes,
        getCompanies,
        getCompanyById,
        companyById: state.companyById,
        editCompany,
        dispatch,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
