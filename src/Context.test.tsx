import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React, { Context, createContext, useContext, useState } from "react";

interface IAuthProvider extends Context {
  isLoggedIn: boolean;
  toggleLogin: () => {};
}

const AuthContext = createContext();

const AuthProvider = ({ children }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  return (
    <AuthContext.Provider value={{ toggleLogin, isLoggedIn }}>
      <div>Message: {children}</div>
    </AuthContext.Provider>
  );
};

const ConsumerComponent = () => {
  const { isLoggedIn, toggleLogin } = useContext(AuthContext);
  return (
    <>
      <input type="button" value="login" onClick={toggleLogin} />
      {isLoggedIn ? "Welcome!" : "Please, log in"}
    </>
  );
};

describe("Context", () => {
  it("ConsumerContext shows default value", () => {
    const { getByText } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );
    expect(getByText(/^Message:/)).toHaveTextContent("Message: Please, log in");
  });

  it("ConsumerContext toggle value", () => {
    const { getByText, getByRole } = render(
      <AuthProvider>
        <ConsumerComponent />
      </AuthProvider>
    );
    expect(getByText(/^Message:/)).toHaveTextContent("Message: Please, log in");
    userEvent.click(getByRole("button"));
    expect(getByText(/^Message:/)).toHaveTextContent("Message: Welcome!");
  });
});
