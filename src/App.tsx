import { useState } from "react";
import "./App.css";
import Layout from "./components/layout/Layout";
import Form from "./components/form/Form";
import CreateNew from "./components/createNew/CreateNew";
import Table from "./components/table/Table";
import { GlobalProvider } from "./context/GlobalState";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import StationPage from "../src/components/stationPage/StationPage";
import StationTypePage from "../src/components/stationTypePage/StationTypePage";
import CompanyListPage from "../src/components/companyListPage/CompanyListPage";
import CompanyPage from "../src/components/companyPage/CompanyPage";
import CompanyEditPage from "../src/components/companyPage/CompanyEditPage";

const Component1 = () => {
  const [formType, setFormType] = useState<string | null>(null);
  return (
    <div className="page">
      <Layout>
        <CreateNew setFormType={setFormType} />
        {formType ? (
          <table>
            <tbody>
              <Form formType={formType} />
            </tbody>
          </table>
        ) : (
          <></>
        )}
        <Table />
      </Layout>
    </div>
  );
};

const AppRoute = () => {
  let routes = useRoutes([
    { path: "/", element: <Component1 /> },
    { path: "station/:id", element: <StationPage /> },
    { path: "station-type/:id", element: <StationTypePage /> },
    { path: "company-list", element: <CompanyListPage /> },
    { path: "company-list/:id", element: <CompanyPage /> },
    { path: "company/:id", element: <CompanyEditPage /> },
  ]);
  return routes;
};

const App = () => {
  return (
    <Router>
      <GlobalProvider>
        <AppRoute />
      </GlobalProvider>
    </Router>
  );
};

export default App;
