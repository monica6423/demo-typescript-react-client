import React, { useContext, useEffect, useState, ChangeEvent } from "react";
import "./RestaurantPage.scss";
import { GlobalContext } from "../../context/GlobalState";
import { useParams, useNavigate } from "react-router-dom";
import { Radio } from "antd";
import type { RadioChangeEvent } from "antd";

const RestaurantPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { getRestaurantById, restaurant, editRestaurant, getRestaurant } =
    useContext(GlobalContext);
  const [restaurantData, setRestaurantData] = useState(restaurant) as any;

  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement> | RadioChangeEvent
  ) => {
    e.target.name &&
      setRestaurantData({
        ...restaurantData,
        [e.target.name]: e.target.value,
      });
  };

  useEffect(() => {
    params.id && getRestaurantById(params.id);
  }, [params, getRestaurantById]);

  useEffect(() => {
    setRestaurantData(restaurant);
  }, [restaurant]);

  const onSave = async (e: any) => {
    e.preventDefault();
    console.log("e.tartget,");
    restaurantData && (await editRestaurant(restaurantData));
    getRestaurant();
    navigate("/");
  };
  return restaurantData ? (
    <div>
      <tbody className="editPage">
        <tr className="list">
          <td>
            <div>Id</div>
          </td>
          <td>
            <div>Name</div>
          </td>
          <td>
            <div>CompanyId</div>
          </td>
          <td>
            <div>RestaurantTypeId</div>
          </td>
          <td>
            <div>Status</div>
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
            <div>{restaurantData.companyId}</div>
          </td>
          <td>
            <input
              type="text"
              name="restaurantTypeId"
              value={restaurantData!.restaurantTypeId}
              onChange={(e) => onChangeInput(e)}
            ></input>
          </td>
          <td>
            <Radio.Group
              onChange={onChangeInput}
              value={restaurantData!.status}
              name="status"
            >
              <Radio value={"Available"}>Available</Radio>
              <Radio value={"TemporaryClose"}>TemporaryClose</Radio>
            </Radio.Group>
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

export default RestaurantPage;
