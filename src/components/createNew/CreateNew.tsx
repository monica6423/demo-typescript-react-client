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
    setFormType(type);
  };

  const debounce = (fn: any, delay = 300) => {
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

  const debounceHandler = useMemo(() => debounce(fetchData, 1000), []);

  const onSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    debounceHandler(e.target.value);
  };

  return (
    <div>
      <div className="button-cell ">
        <button className="button main" onClick={(e) => setOpen(!open)}>
          <b>Create new</b>
        </button>
        <td className="search-box">
          <input
            type="text"
            name={"inputField.key"}
            value={searchTerm}
            onChange={(e) => onSearch(e)}
            placeholder={"Search with station, company & type"}
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
