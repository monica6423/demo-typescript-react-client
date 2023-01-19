import React, { useContext, useEffect, useState } from "react";
import "./CompanyPage.scss";
import { GlobalContext } from "../../context/GlobalState";
import { useParams } from "react-router-dom";
import { RestaurantByCompany } from "../../interfaces";

const CompanyPage = () => {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { getRestaurantsByCompanyId, restaurantById } =
    useContext(GlobalContext);
  const [restaurantData, setRestaurantData] =
    useState<RestaurantByCompany[]>(restaurantById);

  useEffect(() => {
    params.id && getRestaurantsByCompanyId(params.id);
  }, [params, getRestaurantsByCompanyId]);

  useEffect(() => {
    setRestaurantData(restaurantById);
  }, [restaurantById]);

  const parent = restaurantData.find(
    (restaurantData: RestaurantByCompany) =>
      restaurantData.companyId === params.id
  );

  const sum = (array: any) => {
    return array.reduce(
      (accumulator: any, currentValue: any) =>
        accumulator + currentValue.restaurantType.franchiseFee,
      0
    );
  };

  return restaurantData ? (
    <div style={{ marginLeft: "3rem" }}>
      <h2>{parent ? parent.name : ""}</h2>
      <thead>
        <tr>
          <td>Restaurant Name (incl. child company's restaurant)</td>
          <td>Franchise Fee</td>
          <td>State</td>
        </tr>
      </thead>
      {restaurantData.map((restaurant: RestaurantByCompany) => {
        return (
          <>
            <tbody>
              <tr>
                <td>{restaurant.name}</td>
                <td>{restaurant.restaurantType.franchiseFee}</td>
                <td>{restaurant.status}</td>
              </tr>
            </tbody>
          </>
        );
      })}
      <div>Total Franchise Fee: {sum(restaurantData)}</div>
    </div>
  ) : (
    <>loading</>
  );
};

export default CompanyPage;
