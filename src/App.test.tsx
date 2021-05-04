import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import userEvent from "@testing-library/user-event";

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

  it("should render App component", async () => {
    render(<App />);
    await screen.findAllByText(/Logged in as/i);
    expect(screen.queryByText(/Searches for React/)).toBeNull();
    screen.debug();
    // fireEvent.change(screen.getByRole("textbox"), {
    //   target: { value: "React" },
    // });
    userEvent.type(screen.getByRole("textbox"), "React");
    expect(screen.queryByText(/Searches for React/)).toBeInTheDocument();
  });
});

describe("events", () => {
  it("checkbox click", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <input type="checkbox" onChange={handleChange} />
    );
    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();
    // fireEvent.click(checkbox!);
    userEvent.click(checkbox!);
    // userEvent.click(checkbox, { ctrlKey: true, shiftKey: true });
    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(checkbox).toBeChecked();
  });

  it("checkbox double click", () => {
    const onChange = jest.fn();
    const { container } = render(<input type="checkbox" onChange={onChange} />);
    const checkbox = container.firstChild;
    expect(checkbox).not.toBeChecked();
    userEvent.dblClick(checkbox!);
    expect(onChange).toHaveBeenCalledTimes(2);
  });

  it("input focus", () => {
    const { getByTestId } = render(
      <input type="text" data-testid="simple-input" />
    );
    const input = getByTestId("simple-input");
    expect(input).not.toHaveFocus();
    input.focus();
    expect(input).toHaveFocus();
  });

  it("focus on tab key", () => {
    const { getAllByTestId } = render(
      <div>
        <input data-testid="element" type="checkbox" />
        <input data-testid="element" type="radio" />
        <input data-testid="element" type="number" />
      </div>
    );
    const [checkbox, radio, number] = getAllByTestId("element");
    userEvent.tab();
    expect(checkbox).toHaveFocus();
    userEvent.tab();
    expect(radio).toHaveFocus();
    userEvent.tab();
    expect(number).toHaveFocus();
  });

  it("select option", () => {
    const { selectOptions, getByRole, getByText } = render(
      <select>
        <option value="1">A</option>
        <option value="2">B</option>
        <option value="3">C</option>
      </select>
    );
    userEvent.selectOptions(getByRole("combobox"), "1");
    expect(getByText("A").selected).toBeTruthy();
    userEvent.selectOptions(getByRole("combobox"), "2");
    expect(getByText("B").selected).toBeTruthy();
    expect(getByText("A").selected).toBeFalsy();
  });
});
