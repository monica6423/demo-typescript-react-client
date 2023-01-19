import React, { useContext, useEffect, useState, ChangeEvent } from "react";
import "./CompanyPage.scss";
import { GlobalContext } from "../../context/GlobalState";
import { useParams, useNavigate } from "react-router-dom";

const CompanyPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { getCompanyById, companyById, editCompany } =
    useContext(GlobalContext);
  const [companyData, setCompanyData] = useState(companyById) as any;
  useEffect(() => {
    params.id && getCompanyById(params.id);
  }, [params, getCompanyById]);

  useEffect(() => {
    setCompanyData(companyById);
  }, [companyById]);

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setCompanyData({
      ...companyData,
      [e.target.name]: e.target.value,
    });
  };

  const onSave = async (e: any) => {
    e.preventDefault();
    companyData && (await editCompany(companyData));
    navigate("/");
  };

  return companyData ? (
    <div>
      <tbody className="editPage">
        <tr className="list">
          <td>
            <div>Id</div>
          </td>
          <td>
            <div>Name</div>
          </td>
          <td>
            <div>Parent Company Id</div>
          </td>
        </tr>
        <tr className="list" key={companyData.id}>
          <td>
            <div id={`${companyData.id}`}>{companyData.id}</div>
          </td>
          <td>
            <input
              type="text"
              name="name"
              value={companyData.name}
              onChange={(e) => onChangeInput(e)}
            ></input>
          </td>
          <td>
            <div>{companyData.parentCompanyId}</div>
          </td>
        </tr>
      </tbody>
      <div className="button-cell" style={{ margin: "auto" }}>
        <button className="button cancel-button" onClick={() => navigate("/")}>
          Cancel
        </button>
        <button className="button save-button" onClick={(e) => onSave(e)}>
          Save
        </button>
      </div>
    </div>
  ) : (
    <>loading</>
  );
};

export default CompanyPage;
