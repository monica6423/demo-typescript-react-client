import React from "react";
import { render, cleanup, fireEvent } from "@testing-library/react";
import Pagination from "./Pagination";

afterEach(cleanup);

const setup = (currentPage = 1, totalPages = 10) => {
  const setCurrentPage = jest.fn();
  const utils = render(
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      setCurrentPage={setCurrentPage}
    />
  );
  return { ...utils, setCurrentPage };
};

it("should render the component", () => {
  const { asFragment } = setup();
  expect(asFragment()).toMatchSnapshot();
});

it("should call setCurrentPage with previous page number on previous button click", () => {
  const { getByTestId, setCurrentPage } = setup(2);
  fireEvent.click(getByTestId("previous-button"));
  expect(setCurrentPage).toHaveBeenCalledWith(1);
});

it("should call setCurrentPage with next page number on next button click", () => {
  const { getByTestId, setCurrentPage } = setup();
  fireEvent.click(getByTestId("next-button"));
  expect(setCurrentPage).toHaveBeenCalledWith(2);
});

it("should disable the previous button when currentPage is 1", () => {
  const { getByTestId } = setup();
  expect(getByTestId("previous-button")).toBeDisabled();
});

it("should disable the next button when currentPage is equal to totalPages", () => {
  const { getByTestId } = setup(10, 10);
  expect(getByTestId("next-button")).toBeDisabled();
});

it("should display the correct current page and total pages", () => {
  const { getByTestId } = setup(3, 10);
  expect(getByTestId("current-page")).toHaveTextContent("Page 3 / 10");
});
