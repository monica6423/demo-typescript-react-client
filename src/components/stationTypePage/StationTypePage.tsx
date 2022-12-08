import React, { useContext, useEffect, useState, ChangeEvent } from "react";
import "./StationTypePage.scss";
import { GlobalContext } from "../../context/GlobalState";
import { useParams, useNavigate } from "react-router-dom";

const StationTypePage = ({}) => {
  const params = useParams();
  const navigate = useNavigate();
  const { getStationTypeById, stationType, editStationType } =
    useContext(GlobalContext);
  const [stationData, setStationData] = useState(stationType) as any;

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.name", e.target.name);
    setStationData({
      ...stationData,
      [e.target.name]: e.target.value,
    });
  };
  useEffect(() => {
    params.id && getStationTypeById(params.id);
  }, [params]);

  useEffect(() => {
    setStationData(stationType);
  }, [stationType]);

  const onSave = async (e: any) => {
    e.preventDefault();
    stationData && (await editStationType(stationData));
    navigate("/");
    window.location.reload();
  };
  return stationData ? (
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
            <div>MaxPower</div>
          </td>
        </tr>
        <tr className="list" key={stationData.id}>
          <td>
            <div id={`${stationData.id}`}>{stationData.id}</div>
          </td>
          <td>
            <input
              type="text"
              name="name"
              value={stationData.name}
              onChange={(e) => onChangeInput(e)}
            ></input>
          </td>
          <td>
            <input
              type="text"
              name="maxPower"
              value={stationData.maxPower}
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

export default StationTypePage;
