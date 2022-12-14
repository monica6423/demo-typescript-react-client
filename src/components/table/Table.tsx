import { useContext, useState, useEffect } from "react";
import "./Table.scss";
import { GlobalContext } from "../../context/GlobalState";
import { Station } from "../../interfaces";
import StationtRow from "../stationRow/StationRow";
import { FieldConfig } from "../fieldConfig/FieldConfig";

const Table = () => {
  const { stations } = useContext(GlobalContext) as {
    stations: Station[];
  };
  const [stationArray, setStationArray] = useState<Station[]>([]);
  const [editMode, setEditMode] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    setStationArray(stations);
  }, [stations]);

  return (
    <table>
      <thead>
        <tr>
          {Object.keys(FieldConfig).map((key, id) => {
            return (
              <th key={id}>
                <div>{FieldConfig[key].label}</div>
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {stationArray.map((station: Station) => {
          return (
            <StationtRow
              setEditMode={setEditMode}
              editMode={editMode}
              station={station}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
