import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import "./CompanyListPage.scss";
import { GlobalContext } from "../../context/GlobalState";
import { Link } from "react-router-dom";

const CompanyListPage = () => {
  const { parentCompanies } = useContext(GlobalContext);

  return (
    <Layout title="Company List" link="/" linkTitle="home">
      <table>
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
      </table>
    </Layout>
  );
};

export default CompanyListPage;
