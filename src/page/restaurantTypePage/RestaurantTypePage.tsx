import { useContext, useEffect, useState, ChangeEvent } from "react";
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
  const [restaurantTypeData, setRestaurantData] = useState(restaurantType);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setRestaurantData({
      ...restaurantTypeData,
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
    restaurantTypeData && (await editRestaurantType(restaurantTypeData));
    navigate("/");
    getRestaurant();
  };

  return restaurantTypeData ? (
    <div style={{ position: "relative" }}>
      <tbody className="editPage">
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
        <tr className="list" key={restaurantTypeData.id}>
          <td>
            <div id={`${restaurantTypeData.id}`}>{restaurantTypeData.id}</div>
          </td>
          <td>
            <input
              type="text"
              name="name"
              value={restaurantTypeData.name}
              onChange={(e) => onChangeInput(e)}
            ></input>
          </td>
          <td>
            <input
              type="text"
              name="franchiseFee"
              value={restaurantTypeData.franchiseFee}
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
