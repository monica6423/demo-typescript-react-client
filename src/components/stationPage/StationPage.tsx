import React, { useContext, useEffect, useState, ChangeEvent } from "react";
import "./StationPage.scss";
import { GlobalContext } from "../../context/GlobalState";
import { useParams, useNavigate } from "react-router-dom";

const StationPage = ({}) => {
  const params = useParams();
  const navigate = useNavigate();
  const { getStationById, station, editStation } = useContext(GlobalContext);
  const [stationData, setStationData] = useState(station) as any;

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("e.target.name", e.target.name);
    setStationData({
      ...stationData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    params.id && getStationById(params.id);
  }, [params]);

  useEffect(() => {
    setStationData(station);
  }, [station]);

  const onSave = async (e: any) => {
    e.preventDefault();
    console.log("e.tartget,");
    stationData && (await editStation(stationData));
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
            <div>CompanyId</div>
          </td>
          <td>
            <div>StationTypeId</div>
          </td>
          <td>
            <div>Status</div>
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
            <div>{stationData.companyId}</div>
          </td>
          <td>
            <input
              type="text"
              name="stationTypeId"
              value={stationData!.stationTypeId}
              onChange={(e) => onChangeInput(e)}
            ></input>
          </td>
          <td>
            <input
              type="text"
              name="status"
              value={stationData!.status}
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

export default StationPage;
