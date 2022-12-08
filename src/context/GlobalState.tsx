import React, {
  createContext,
  useReducer,
  ReactElement,
  useEffect,
} from "react";
import AppReducer from "./AppReducer";
import { Station } from "../interfaces/";

interface InitialState {
  stations: Station[] | [];
  station: Station | null;
  createData: (type: string, data: any) => void;
  getStationById: (id: string) => void;
  editStation: (station: Station) => void;
  getStationTypeById: (id: string) => void;
  stationType: string | null;
  editStationType: (data: any) => void;
  companies: any[];
  getStationsByCompanyId: (id: string) => void;
  stationById: any[] | [];
  stationTypes: any[] | [];
}
interface GlobalProviderProps {
  children?: ReactElement[] | ReactElement;
}

// Initial state
const initialState: InitialState = {
  stations: [],
  station: null,
  createData: () => {},
  getStationById: () => {},
  editStation: () => {},
  getStationTypeById: () => {},
  stationType: null,
  editStationType: () => {},
  companies: [],
  getStationsByCompanyId: () => {},
  stationById: [],
  stationTypes: [],
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    getStation();
    getCompanies();
    getStationTypes();
  }, []);

  // Actions

  const createData = async (type: string, data: any) => {
    if (type === "company") {
      await fetch("http://localhost:3000/dev/api/create-company", {
        method: "post",
        body: JSON.stringify(data),
      });
    }
    if (type === "station") {
      await fetch("http://localhost:3000/dev/api/create-station", {
        method: "post",
        body: JSON.stringify(data),
      });
    }
    if (type === "stationType") {
      await fetch("http://localhost:3000/dev/api/create-station-type", {
        method: "post",
        body: JSON.stringify(data),
      });
    }
  };

  const getStation = async () => {
    const res = await fetch("http://localhost:3000/dev/api/get-stations");
    const data = await res.json();
    const stations = data.map((station: any) => ({
      station: station.name,
      company: station.company.name,
      stationType: station.stationType.name,
      stationTypeId: station.stationType.id,
      id: station.id,
    }));
    dispatch({
      type: "FETCH_STATIONS",
      payload: stations,
    });
  };

  const getStationById = async (id: string) => {
    const res = await fetch(
      `http://localhost:3000/dev/api/get-station?id=${id}`
    );
    const data = await res.json();

    dispatch({
      type: "FETCH_STATION_BY_ID",
      payload: data,
    });
  };

  const getStationTypes = async () => {
    const res = await fetch("http://localhost:3000/dev/api/get-station-type");
    const data = await res.json();
    console.log("getStationTypes", data);
    dispatch({
      type: "FETCH_STATION_TYPES",
      payload: data,
    });
  };

  const getStationTypeById = async (id: string) => {
    const res = await fetch(
      `http://localhost:3000/dev/api/get-station-type?id=${id}`
    );
    const data = await res.json();
    dispatch({
      type: "FETCH_STATION_TYPE_BY_ID",
      payload: data,
    });
  };

  const editStation = async (station: Station) => {
    await fetch("http://localhost:3000/dev/api/create-station", {
      method: "post",
      body: JSON.stringify(station),
    });
  };

  const editStationType = async (data: any) => {
    await fetch("http://localhost:3000/dev/api/create-station-type", {
      method: "post",
      body: JSON.stringify(data),
    });
  };

  const getCompanies = async () => {
    const res = await fetch("http://localhost:3000/dev/api/get-companies");
    const data = await res.json();
    dispatch({
      type: "FETCH_COMPANIES",
      payload: data,
    });
  };

  const getStationsByCompanyId = async (id: string) => {
    console.log("getStationsByCompanyId", id);
    const res = await fetch(
      `http://localhost:3000/dev/api/get-stations-by-companyId?id=${id}`
    );
    const data = await res.json();
    console.log("dataaaa", data);
    dispatch({
      type: "FETCH_STATIONS_BY_COMPANY_ID",
      payload: data,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        stations: state.stations,
        station: state.station,
        createData,
        getStationById,
        editStation,
        getStationTypeById,
        stationType: state.stationType,
        editStationType,
        companies: state.companies,
        getStationsByCompanyId,
        stationById: state.stationById,
        stationTypes: state.stationTypes,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
