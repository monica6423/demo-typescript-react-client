import React, { useState, ChangeEvent, useContext, useMemo } from "react";
import { debounce } from "../../utilities/utilities";
import Form from "../../components/form/Form";
import { GlobalContext } from "../../context/GlobalState";
import "./CreateNew.scss";

const CreateNew = () => {
  const { dispatch } = useContext(GlobalContext);
  const [open, setOpen] = useState<boolean>(false);
  const [formType, setFormType] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const renderForm = (type: string) => {
    setFormType(type);
  };

  const fetchData = async (value: string) => {
    const res = await fetch(
      `http://localhost:3000/dev/api/get-restaurants?searchValue=${value}`
    );
    const data = await res.json();
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

  //Use useMemo to create a debounced version of the fetchData function and store it in a variable debounceHandler.
  //This will ensure that a new debounced function is not created on every render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceHandler = useMemo(() => debounce(fetchData, 1000), []);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debounceHandler(e.target.value);
  };

  return (
    <div>
      <div>
        <div className="button-cell ">
          <button className="button main" onClick={() => setOpen(!open)}>
            <b>Create new</b>
          </button>
          <td className="search-box">
            <input
              type="text"
              name={"inputField.key"}
              value={searchTerm}
              onChange={(e) => onSearch(e)}
              placeholder={"Search by restaurant, company & type"}
            ></input>
          </td>
        </div>
        {open && (
          <div className="flex button-cell create-new">
            <button
              className="button "
              onClick={(e) => renderForm("restaurant")}
            >
              Restaurant
            </button>
            <button
              className="button "
              onClick={(e) => renderForm("restaurantType")}
            >
              Restaurant Type
            </button>
            <button className="button " onClick={() => renderForm("company")}>
              Company
            </button>
          </div>
        )}
      </div>
      {open && formType && (
        <table>
          <tbody>
            <Form formType={formType} />
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CreateNew;
