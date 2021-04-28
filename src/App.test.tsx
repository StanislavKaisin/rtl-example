import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders a component", () => {
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
  // screen.debug();
  const { asFragment } = render(<App />);
  expect(asFragment(<App />)).toMatchSnapshot();
});
