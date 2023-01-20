import { useContext, useState } from "react";
import Layout from "../../components/layout/Layout";
import "./CompanyListPage.scss";
import { GlobalContext } from "../../context/GlobalState";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination/Pagination";

const CompanyListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { parentCompanies } = useContext(GlobalContext);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(parentCompanies.length / itemsPerPage);
  const currentData = parentCompanies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
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
          {currentData.map((company, index) => {
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
    </Layout>
  );
};

export default CompanyListPage;
