import "./Header.scss";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <h1>Station List for User A</h1>
        <h3 style={{ marginLeft: "auto", marginRight: "1rem" }}>
          <Link to="/company-list">Go to parent company list page ➜ </Link>
        </h3>
      </div>
    </div>
  );
};

export default Header;
