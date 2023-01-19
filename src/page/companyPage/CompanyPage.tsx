import React, { useContext, useEffect, useState } from "react";
import "./CompanyPage.scss";
import { GlobalContext } from "../../context/GlobalState";
import { useParams } from "react-router-dom";
import { StationByCompany } from "../../interfaces";

const CompanyPage = () => {
  const params = useParams();
  const [currentPage, setCurrentPage] = useState(1);

  const { getStationsByCompanyId, stationById } = useContext(GlobalContext);
  const [stationData, setStationData] =
    useState<StationByCompany[]>(stationById);

  useEffect(() => {
    params.id && getStationsByCompanyId(params.id);
  }, [params, getStationsByCompanyId]);

  useEffect(() => {
    setStationData(stationById);
  }, [stationById]);

  const parent = stationData.find(
    (stationData: StationByCompany) => stationData.companyId === params.id
  );

  const sum = (array: any) => {
    return array.reduce(
      (accumulator: any, currentValue: any) =>
        accumulator + currentValue.stationType.maxPower,
      0
    );
  };

  return stationData ? (
    <div style={{ marginLeft: "3rem" }}>
      <h2>{parent ? parent.name : ""}</h2>
      <thead>
        <tr>
          <td>Station Name (incl. child company's station)</td>
          <td>Power</td>
          <td>State</td>
        </tr>
      </thead>
      {stationData.map((station: StationByCompany) => {
        return (
          <>
            <tbody>
              <tr>
                <td>{station.name}</td>
                <td>{station.stationType.maxPower}</td>
                <td>{station.status}</td>
              </tr>
            </tbody>
          </>
        );
      })}
      <div>Total Power: {sum(stationData)}</div>
    </div>
  ) : (
    <>loading</>
  );
};

export default CompanyPage;
