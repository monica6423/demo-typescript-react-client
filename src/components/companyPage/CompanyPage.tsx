import React, { useContext, useEffect, useState } from "react";
import "./CompanyPage.scss";
import { GlobalContext } from "../../context/GlobalState";
import { useParams } from "react-router-dom";

const CompanyPage = ({}) => {
  const params = useParams();
  const { getStationsByCompanyId, stationById } = useContext(GlobalContext);
  const [stationData, setStationData] = useState(stationById) as any;
  console.log("stationById", stationById);
  useEffect(() => {
    params.id && getStationsByCompanyId(params.id);
  }, [params]);

  useEffect(() => {
    setStationData(stationById);
  }, [stationById]);
  const parent = stationData.find(
    (stationData: any) => stationData.companyId === params.id
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
          <td>Comapny Name (incl. child company)</td>
          <td>Power</td>
          <td>State</td>
        </tr>
      </thead>
      {stationData.map((station: any, id: string) => {
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
