import React, { SetStateAction, Dispatch } from "react";
import { Restaurant } from "../../interfaces";
import "./RestaurantRow.scss";
import { Link } from "react-router-dom";

interface RestaurantRowProps {
  restaurant?: Restaurant;
}
const RestaurantRow = ({
  restaurant = {
    company: "",
    restaurant: "",
    restaurantType: "",
    id: "",
    companyId: "",
  },
}: RestaurantRowProps) => {
  return (
    <tr key={restaurant.id} className="list">
      <td>
        <div>
          <Link to={`/restaurant/${restaurant.id}`}>
            {restaurant.restaurant}
          </Link>
        </div>
      </td>
      <td>
        <div>
          <Link to={`/restaurant-type/${restaurant.restaurantTypeId}`}>
            {restaurant.restaurantType}
          </Link>
        </div>
      </td>
      <td>
        <Link to={`/company/${restaurant.companyId}`}>
          {restaurant.company}
        </Link>
      </td>
    </tr>
  );
};

export default RestaurantRow;
