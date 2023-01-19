import React, { SetStateAction, Dispatch } from "react";
import { Station } from "../../interfaces";
import "./StationRow.scss";
import { Link } from "react-router-dom";

interface StationRowProps {
  station?: Station;
}
const StationRow = ({
  station = {
    company: "",
    station: "",
    stationType: "",
    id: "",
    companyId: "",
  },
}: StationRowProps) => {
  return (
    <tr key={station.id} className="list">
      <td>
        <div>
          <Link to={`/station/${station.id}`}>{station.station}</Link>
        </div>
      </td>
      <td>
        <div>
          <Link to={`/station-type/${station.stationTypeId}`}>
            {station.stationType}
          </Link>
        </div>
      </td>
      <td>
        <Link to={`/company/${station.companyId}`}>{station.company}</Link>
      </td>
    </tr>
  );
};

export default StationRow;
