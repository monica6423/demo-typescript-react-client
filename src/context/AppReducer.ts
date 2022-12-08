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
    default:
      return state;
  }
};

export default appReducer;
