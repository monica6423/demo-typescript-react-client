import "./App.css";
import { GlobalProvider } from "./context/GlobalState";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";
import RestaurantPage from "./page/restaurantPage/RestaurantPage";
import RestaurantTypePage from "./page/restaurantTypePage/RestaurantTypePage";
import CompanyListPage from "./page/companyListPage/CompanyListPage";
import CompanyPage from "./page/companyPage/CompanyPage";
import CompanyEditPage from "./page/companyPage/CompanyEditPage";
import HomePage from "./page/home/Home";

const AppRoute = () => {
  let routes = useRoutes([
    { path: "/", element: <HomePage /> },
    { path: "restaurant/:id", element: <RestaurantPage /> },
    { path: "restaurant-type/:id", element: <RestaurantTypePage /> },
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
