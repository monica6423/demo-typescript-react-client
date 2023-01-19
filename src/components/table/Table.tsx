import { useContext, useState, useEffect } from "react";
import "./Table.scss";
import { GlobalContext } from "../../context/GlobalState";
import { Station } from "../../interfaces";
import StationtRow from "../stationRow/StationRow";
import { FieldConfig } from "../fieldConfig/FieldConfig";
import Pagination from "../pagination/Pagination";

const Table = () => {
  const { stations } = useContext(GlobalContext) as {
    stations: Station[];
  };
  const [stationArray, setStationArray] = useState<Station[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(stationArray.length / itemsPerPage);
  const currentData = stationArray.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
        {currentData.map((station: Station) => {
          return <StationtRow station={station} />;
        })}
        <tr>
          <td colSpan={3}>
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default Table;
