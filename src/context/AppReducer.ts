import { Restaurant, Company, RestaurantStatus } from "../interfaces/";

// Exports a default function called "appReducer" which takes in a "state" and an "action" as arguments.
// The function uses a switch statement to handle different action types, updating the state accordingly and returning the new state.
export type Action =
  | {
      type: "FETCH_RESTAURANTS";
      payload: Restaurant[];
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
      payload: Restaurant;
    }
  | {
      type: "FETCH_RESTAURANTS_BY_COMPANY_ID";
      payload: Restaurant[];
    }
  | {
      type: "FETCH_RESTAURANT_TYPE_BY_ID";
      payload: Restaurant;
    }
  | {
      type: "FETCH_RESTAURANT_TYPES";
      payload: RestaurantStatus[];
    }
  | {
      type: "FETCH_COMPANY_BY_ID";
      payload: Company;
    }
  | {
      type: "ADD_RESTAURANT";
      payload: Restaurant;
    }
  | {
      type: "ADD_COMPANY";
      payload: Company;
    };

const appReducer = (state: any, action: any) => {
  switch (action.type) {
    case "FETCH_RESTAURANTS":
      return {
        ...state,
        restaurants: [...action.payload],
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
        restaurant: action.payload,
      };
    case "FETCH_RESTAURANTS_BY_COMPANY_ID":
      return {
        ...state,
        restaurantById: action.payload,
      };
    case "FETCH_RESTAURANT_TYPE_BY_ID":
      return {
        ...state,
        restaurantType: action.payload,
      };
    case "FETCH_RESTAURANT_TYPES":
      return {
        ...state,
        restaurantTypes: action.payload,
      };
    case "FETCH_COMPANY_BY_ID":
      return {
        ...state,
        companyById: action.payload,
      };
    case "ADD_RESTAURANT":
      return {
        ...state,
        restaurants: [action.payload, ...state.restaurants],
      };
    case "ADD_COMPANY":
      return {
        ...state,
        companies: [action.payload, ...state.companies],
      };
    case "ADD_RESTAURANT_TYPES":
      return {
        ...state,
        restaurantTypes: [action.payload, ...state.restaurantTypes],
      };
    default:
      return state;
  }
};

export default appReducer;
