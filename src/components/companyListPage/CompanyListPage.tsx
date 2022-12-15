import React, { useContext } from "react";
import "./CompanyListPage.scss";
import { GlobalContext } from "../../context/GlobalState";
import { Link } from "react-router-dom";

const CompanyListPage = () => {
  const { parentCompanies } = useContext(GlobalContext);

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
        {parentCompanies.map((company, index) => {
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
