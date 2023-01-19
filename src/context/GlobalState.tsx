import React, {
  createContext,
  useReducer,
  ReactElement,
  useEffect,
  useCallback,
} from "react";
import AppReducer, { Action } from "./AppReducer";
import {
  Restaurant,
  Company,
  RestaurantByCompany,
  RestaurantType,
} from "../interfaces/";
import {
  createCompany,
  createRestaurant,
  createRestaurantType,
  fetchRestaurant,
  fetchRestaurantById,
} from "./apiCalls";

const apiHost = process.env.REACT_APP_API_HOST;

interface InitialState {
  restaurants: Restaurant[] | [];
  restaurant: Restaurant | null;
  createData: (
    type: string,
    data: Company | Restaurant | RestaurantType
  ) => void;
  getRestaurant: () => void;
  getRestaurantById: (id: string) => void;
  editRestaurant: (restaurant: Restaurant) => void;
  getRestaurantTypeById: (id: string) => void;
  restaurantType: string | null;
  editRestaurantType: (data: RestaurantType) => void;
  companies: Company[];
  parentCompanies: Company[];
  getRestaurantsByCompanyId: (id: string) => void;
  restaurantById: RestaurantByCompany[];
  restaurantTypes: RestaurantType[] | [];
  getCompanies: (value: boolean) => Promise<void>;
  dispatch: React.Dispatch<Action>;
  getCompanyById: (id: string) => void;
  companyById: Company[];
  editCompany: (data: Company) => void;
}
// Initial state
const initialState: InitialState = {
  restaurants: [],
  restaurant: null,
  createData: () => {},
  getRestaurant: () => {},
  getRestaurantById: () => {},
  editRestaurant: () => {},
  getRestaurantTypeById: () => {},
  restaurantType: null,
  editRestaurantType: () => {},
  companies: [],
  parentCompanies: [],
  getRestaurantsByCompanyId: () => {},
  restaurantById: [],
  restaurantTypes: [],
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
interface GlobalProviderProps {
  children?: ReactElement[] | ReactElement;
}
export const GlobalProvider = ({ children }: GlobalProviderProps) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  useEffect(() => {
    getRestaurant();
    getCompanies(true);
    getCompanies();
    getRestaurantTypes();
  }, []);

  // Actions
  const createData = async (
    type: string,
    data: Company | Restaurant | RestaurantType
  ) => {
    switch (type) {
      case "company":
        const company = await createCompany(data as Company);
        dispatch({
          type: "ADD_COMPANY",
          payload: company,
        });
        break;
      case "restaurant":
        const restaurant = await createRestaurant(data as Restaurant);
        const newRestaurant = {
          restaurant: restaurant.name,
          company: restaurant.company.name,
          restaurantType: restaurant.restaurantType.name,
          restaurantTypeId: restaurant.restaurantType.id,
          id: restaurant.id,
          companyId: restaurant.company.id,
        };
        dispatch({
          type: "ADD_RESTAURANT",
          payload: newRestaurant,
        });
        break;
      case "restaurantType":
        const restaurantType = await createRestaurantType(
          data as RestaurantType
        );
        dispatch({
          type: "ADD_RESTAURANT_TYPES",
          payload: restaurantType,
        });
        break;
      default:
        break;
    }
  };

  const getRestaurant = async () => {
    const data = await fetchRestaurant();
    const restaurants = data.map((restaurant: any) => ({
      restaurant: restaurant.name,
      company: restaurant.company.name,
      restaurantType: restaurant.restaurantType.name,
      restaurantTypeId: restaurant.restaurantType.id,
      id: restaurant.id,
      companyId: restaurant.company.id,
    }));
    dispatch({
      type: "FETCH_RESTAURANTS",
      payload: restaurants,
    });
  };

  const getRestaurantById = useCallback(async (id: string) => {
    const data = await fetchRestaurantById(id);
    dispatch({
      type: "FETCH_STATION_BY_ID",
      payload: data,
    });
  }, []);

  const getRestaurantTypes = async () => {
    const res = await fetch(`${apiHost}get-restaurant-type`);
    const data = await res.json();
    dispatch({
      type: "FETCH_RESTAURANT_TYPES",
      payload: data,
    });
  };

  const getRestaurantTypeById = useCallback(async (id: string) => {
    const res = await fetch(`${apiHost}get-restaurant-type?id=${id}`);
    const data = await res.json();
    dispatch({
      type: "FETCH_RESTAURANT_TYPE_BY_ID",
      payload: data,
    });
  }, []);

  const editRestaurant = async (restaurant: Restaurant) => {
    await fetch(`${apiHost}create-restaurant`, {
      method: "post",
      body: JSON.stringify(restaurant),
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    });
  };

  const editRestaurantType = async (data: any) => {
    await fetch(`${apiHost}create-restaurant-type`, {
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

  const getRestaurantsByCompanyId = useCallback(async (id: string) => {
    const res = await fetch(`${apiHost}get-restaurants-by-companyId?id=${id}`);
    const data = await res.json();
    dispatch({
      type: "FETCH_RESTAURANTS_BY_COMPANY_ID",
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
        restaurants: state.restaurants,
        restaurant: state.restaurant,
        createData,
        getRestaurant,
        getRestaurantById,
        editRestaurant,
        getRestaurantTypeById,
        restaurantType: state.restaurantType,
        editRestaurantType,
        companies: state.companies,
        parentCompanies: state.parentCompanies,
        getRestaurantsByCompanyId,
        restaurantById: state.restaurantById,
        restaurantTypes: state.restaurantTypes,
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
