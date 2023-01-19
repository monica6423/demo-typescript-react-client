import { ReactElement } from "react";
import { Link } from "react-router-dom";
import "./Layout.scss";

export interface LayoutProps {
  children?: ReactElement[] | ReactElement;
  title: string;
  link: string;
  linkTitle: string;
}

const Layout = ({ children, title, link, linkTitle }: LayoutProps) => {
  return (
    <div className="page">
      <div>
        <div className="header">
          <div className="logo">
            <h1>{title}</h1>
            <h3 style={{ marginLeft: "auto", marginRight: "1rem" }}>
              <Link to={link}>Go to {linkTitle} page ➜ </Link>
            </h3>
          </div>
        </div>
        <div className="container">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
