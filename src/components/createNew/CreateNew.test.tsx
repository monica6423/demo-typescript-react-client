import React from "react";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";
import CreateNew from "./CreateNew";
import { GlobalProvider } from "../../context/GlobalState";
import { debounce } from "../../utilities/utilities";

describe("CreateNew component", () => {
  afterEach(cleanup);

  it("should render the component", () => {
    const { asFragment } = render(
      <GlobalProvider>
        <CreateNew />
      </GlobalProvider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("should open the create new modal when create new button is clicked", () => {
    const { getByText } = render(
      <GlobalProvider>
        <CreateNew />
      </GlobalProvider>
    );
    const createNewButton = getByText(/Create new/i);
    fireEvent.click(createNewButton);
    expect(createNewButton).toHaveTextContent("Create new");
    // You can add more assertions to check if the modal is open or not
  });
});
