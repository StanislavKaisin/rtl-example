import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

// test("renders a component", () => {
//   // const linkElement = screen.getByText(/learn react/i);
//   // expect(linkElement).toBeInTheDocument();
//   // screen.debug();
//   const { asFragment } = render(<App />);
//   expect(asFragment(<App />)).toMatchSnapshot();
// });

describe("App", () => {
  it("shouldrender app component", () => {
    render(<App />);
    screen.debug();
    // example: test by text
    // expect(screen.queryByText(/Searches for React:/i)).toBeNull();
    // expect(screen.getByText(/Searches for React:/i)).toBeInTheDocument();

    // // example:test by role INPUT ELEMENT
    // expect(screen.getByRole("textbox")).toBeInTheDocument();
    // // example:test by label
    // expect(screen.getByLabelText(/Search/i)).toBeInTheDocument();
    // // example:test by placeholder
    // expect(screen.getByPlaceholderText("search text...")).toBeInTheDocument();
    // // example:test by alt text
    // expect(screen.getByAltText("search image")).toBeInTheDocument();
    // // example:test by display value
    // expect(screen.getByDisplayValue("")).toBeInTheDocument();
  });
  // for testing async code
  it("should render App component with async query", async () => {
    render(<App />);
    expect(screen.queryByText(/Logged in as/i)).toBeNull();
    screen.debug();
    expect(await screen.findByText(/Logged in as/i)).toBeInTheDocument();
    screen.debug();
    //search tested component with className
    expect(screen.getByAltText(/search image/i)).toHaveClass("image");
    // search tested component with required attribute
    expect(screen.getByLabelText(/search/i)).not.toBeRequired();
    expect(screen.getByLabelText(/search/i)).toBeEmptyDOMElement();
    // search tested component with  attribute
    expect(screen.getByLabelText(/search/i)).toHaveAttribute("id");
  });
});
