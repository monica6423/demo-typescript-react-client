import React, { SetStateAction, Dispatch } from "react";
import { Station } from "../../interfaces";
import "./StationRow.scss";
import { Link } from "react-router-dom";

interface StationRowProps {
  station?: Station;
  setEditMode?: Dispatch<SetStateAction<{ [key: string]: boolean }>>;
  editMode?: { [key: string]: boolean };
}
const StationRow = ({
  station = { company: "", station: "", stationType: "", id: "" },
  setEditMode,
  editMode,
}: StationRowProps) => {
  return (
    <tr className="list" key={station.id}>
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
        <div id={`${station.id}`}>{station.company}</div>
      </td>
    </tr>
  );
};

export default StationRow;
