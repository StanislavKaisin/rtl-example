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
    expect(screen.getByText(/Search:/i)).toBeInTheDocument();
    // example:test by role INPUT ELEMENT
    expect(screen.getByRole("textbox")).toBeInTheDocument();
    // example:test by label
    expect(screen.getByLabelText(/Search/i)).toBeInTheDocument();
    // example:test by placeholder
    expect(screen.getByPlaceholderText("search text...")).toBeInTheDocument();
    // example:test by alt text
    expect(screen.getByAltText("search image")).toBeInTheDocument();
    // example:test by display value
    expect(screen.getByDisplayValue("")).toBeInTheDocument();
  });
});
