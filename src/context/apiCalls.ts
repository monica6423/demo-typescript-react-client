import { Restaurant, Company, RestaurantType } from "../interfaces/";
const apiHost = process.env.REACT_APP_API_HOST;

export const createCompany = async (data: Company) => {
  try {
    const res = await fetch(`${apiHost}create-company`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createRestaurant = async (data: Restaurant) => {
  try {
    const res = await fetch(`${apiHost}create-restaurant`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createRestaurantType = async (data: RestaurantType) => {
  try {
    const res = await fetch(`${apiHost}create-restaurant-type`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    return res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchRestaurant = async () => {
  try {
    const res = await fetch(`${apiHost}get-restaurants`);
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchRestaurantById = async (id: string) => {
  try {
    const res = await fetch(`${apiHost}get-restaurant?id=${id}`);
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
