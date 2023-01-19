import { useContext, useState, useEffect } from "react";
import "./Table.scss";
import { GlobalContext } from "../../context/GlobalState";
import { Restaurant } from "../../interfaces";
import RestauranttRow from "../restaurantRow/RestaurantRow";
import { FieldConfig } from "../fieldConfig/FieldConfig";
import Pagination from "../pagination/Pagination";

const Table = () => {
  const { restaurants } = useContext(GlobalContext) as {
    restaurants: Restaurant[];
  };
  const [restaurantArray, setRestaurantArray] = useState<Restaurant[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(restaurantArray.length / itemsPerPage);
  const currentData = restaurantArray.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    setRestaurantArray(restaurants);
  }, [restaurants]);

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(FieldConfig).map((key, id) => {
            return (
              <th key={id}>
                <div>{FieldConfig[key].label}</div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {currentData.map((restaurant: Restaurant) => {
          return <RestauranttRow restaurant={restaurant} />;
        })}
        <tr>
          <td colSpan={3}>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
