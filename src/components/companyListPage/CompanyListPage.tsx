import React, { useContext } from "react";
import "./CompanyListPage.scss";
import { GlobalContext } from "../../context/GlobalState";
import { Link } from "react-router-dom";

const CompanyListPage = () => {
  const { companies } = useContext(GlobalContext);

  console.log("comtext companies", companies);
  return (
    <div className="page">
      <thead>
        <tr className="list">
          <td>
            <div>Company Id</div>
          </td>
          <td>
            <div>Company name</div>
          </td>
        </tr>
      </thead>
      <tbody>
        {companies.map((company, index) => {
          return (
            <tr className="list">
              <td>
                <div>
                  <Link to={`/company-list/${company.id}`}>{company.id}</Link>
                </div>
              </td>
              <td>
                <div>{company.name}</div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </div>
  );
};

export default CompanyListPage;
