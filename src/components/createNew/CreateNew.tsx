import React, { useState, ChangeEvent, useContext, useMemo } from "react";
import { GlobalContext } from "../../context/GlobalState";
import "./CreateNew.scss";

interface setState {
  setFormType: React.Dispatch<React.SetStateAction<string | null>>;
}

const CreateNew = ({ setFormType }: setState) => {
  const { dispatch } = useContext(GlobalContext);
  const [open, setOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const renderForm = (type: string) => {
    console.log("type", type);
    setFormType(type);
  };

  const debounce2 = (fn: any, delay = 300) => {
    console.log("trigger");
    let timer: any;

    return (...args: string[]) => {
      console.log(timer);
      console.log("fetchData2 inside return");

      if (timer) {
        console.log("clear");
        clearTimeout(timer);
      }
      console.log("timer", timer);
      timer = setTimeout(() => {
        console.log("settimeout");
        timer = null;
        fn(...args);
      }, delay);
    };
  };

  const fetchData = async (value: any) => {
    const res = await fetch(
      `http://localhost:3000/dev/api/get-stations?searchValue=${value}`
    );
    const data = await res.json();
    const stations = data.map((station: any) => ({
      station: station.name,
      company: station.company.name,
      stationType: station.stationType.name,
      stationTypeId: station.stationType.id,
      id: station.id,
      companyId: station.company.id,
    }));
    dispatch({
      type: "FETCH_STATIONS",
      payload: stations,
    });
  };

  const debounceHandler = useMemo(() => debounce2(fetchData, 1000), []);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.value", e.target.value);
    setSearchTerm(e.target.value);
    // debounce2(fetchData2, 2000)(e.target.value);
    debounceHandler(e.target.value);
  };

  return (
    <div>
      <div className="button-cell ">
        <button className="button main" onClick={(e) => setOpen(!open)}>
          Create new
        </button>
        <td className="search-box">
          <input
            type="text"
            name={"inputField.key"}
            value={searchTerm}
            onChange={(e) => onSearch(e)}
            placeholder={"Search with station or company name"}
          ></input>
        </td>
      </div>
      {open && (
        <div className="flex button-cell">
          <button className="button " onClick={(e) => renderForm("station")}>
            Station
          </button>
          <button
            className="button "
            onClick={(e) => renderForm("stationType")}
          >
            Station Type
          </button>
          <button className="button " onClick={(e) => renderForm("company")}>
            Company
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateNew;
