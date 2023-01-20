import React from "react";
import { render, cleanup } from "@testing-library/react";
import Layout from "./Layout";
import { BrowserRouter as Router } from "react-router-dom";

afterEach(cleanup);

it("should render the component", () => {
  const { asFragment } = render(
    <Router>
      <Layout title="Test Title" link="/test" linkTitle="Test" />
    </Router>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("should render the correct title", () => {
  const { getByText } = render(
    <Router>
      <Layout title="Test Title" link="/test" linkTitle="Test" />
    </Router>
  );
  expect(getByText("Test Title")).toBeInTheDocument();
});

it("should render the correct link", () => {
  const { getByText } = render(
    <Router>
      <Layout title="Test Title" link="/test" linkTitle="Test" />
    </Router>
  );
  const link = getByText(/Visit Test ➜/i);
  expect(link.getAttribute("href")).toBe("/test");
});

it("should render the children", () => {
  const { getByText } = render(
    <Router>
      <Layout title="Test Title" link="/test" linkTitle="Test">
        <p>test</p>
      </Layout>
    </Router>
  );
  expect(getByText("test")).toBeInTheDocument();
});
