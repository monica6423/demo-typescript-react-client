import "./App.css";
import { GlobalProvider } from "./context/GlobalState";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import StationPage from "./page/stationPage/StationPage";
import StationTypePage from "./page/stationTypePage/StationTypePage";
import CompanyListPage from "./page/companyListPage/CompanyListPage";
import CompanyPage from "./page/companyPage/CompanyPage";
import CompanyEditPage from "./page/companyPage/CompanyEditPage";
import HomePage from "./page/home/Home";

const AppRoute = () => {
  let routes = useRoutes([
    { path: "/", element: <HomePage /> },
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
