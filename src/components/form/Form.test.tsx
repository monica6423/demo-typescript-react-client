import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Form from "./Form";

afterEach(cleanup);

const setup = (formType: string) => {
  const createData = jest.fn();
  const utils = render(<Form formType={formType} />);
  return { ...utils, createData };
};

it("should render the component", () => {
  const { asFragment } = setup("restaurant");
  expect(asFragment()).toMatchSnapshot();
});

it("should handle change of text input fields", () => {
  const { getByPlaceholderText } = setup("restaurant");
  fireEvent.change(getByPlaceholderText("Restaurant Name"), {
    target: { value: "test name" },
  });
  expect(getByPlaceholderText("Restaurant Name")).toHaveValue("test name");
});

it("should handle radio buttons", () => {
  const { getByLabelText } = setup("restaurant");
  fireEvent.click(getByLabelText("TemporaryClose"));
  expect(getByLabelText("TemporaryClose")).toBeChecked();
});
