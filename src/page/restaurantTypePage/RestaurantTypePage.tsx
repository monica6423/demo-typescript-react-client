import React, { useContext, useEffect, useState, ChangeEvent } from "react";
import "./RestaurantTypePage.scss";
import { GlobalContext } from "../../context/GlobalState";
import { useParams, useNavigate } from "react-router-dom";

const RestaurantTypePage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    getRestaurantTypeById,
    restaurantType,
    editRestaurantType,
    getRestaurant,
  } = useContext(GlobalContext);
  const [restaurantData, setRestaurantData] = useState(restaurantType) as any;

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setRestaurantData({
      ...restaurantData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    params.id && getRestaurantTypeById(params.id);
  }, [params, getRestaurantTypeById]);

  useEffect(() => {
    setRestaurantData(restaurantType);
  }, [restaurantType]);

  const onSave = async (e: any) => {
    e.preventDefault();
    restaurantData && (await editRestaurantType(restaurantData));
    navigate("/");
    getRestaurant();
  };
  return restaurantData ? (
    <div style={{ position: "relative" }}>
      <tbody style={{ width: "100%", display: "table" }}>
        <tr className="list">
          <td>
            <div>Id</div>
          </td>
          <td>
            <div>Name</div>
          </td>
          <td>
            <div>Franchise Fee</div>
          </td>
        </tr>
        <tr className="list" key={restaurantData.id}>
          <td>
            <div id={`${restaurantData.id}`}>{restaurantData.id}</div>
          </td>
          <td>
            <input
              type="text"
              name="name"
              value={restaurantData.name}
              onChange={(e) => onChangeInput(e)}
            ></input>
          </td>
          <td>
            <input
              type="text"
              name="franchiseFee"
              value={restaurantData.franchiseFee}
              onChange={(e) => onChangeInput(e)}
            ></input>
          </td>
        </tr>
      </tbody>
      <div className="button-cell" style={{ margin: "auto" }}>
        <>
          <button
            className="button cancel-button"
            onClick={() => navigate("/")}
          >
            Cancel
          </button>
          <button className="button save-button" onClick={(e) => onSave(e)}>
            Save
          </button>
        </>
      </div>
    </div>
  ) : (
    <>loading</>
  );
};

export default RestaurantTypePage;
