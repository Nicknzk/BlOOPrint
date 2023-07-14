/*
import { render, screen } from "@testing-library/react";
import { IdTokenResult, User } from "firebase/auth";
import AuthDetails from "../Component/Auth/AuthDetails";
import React from "react";
//import faker from '@faker-js/faker';

describe("#AuthDetails", () => {
  it("should render email verification alert for unverified user", () => {
    const onAuthStatusChange = jest.fn();
    render(<AuthDetails onAuthStatusChange={onAuthStatusChange} />);

    // Simulate an unverified user
    const user: User = {
      //mocked user object 
      emailVerified: false,
      isAnonymous: false,
      metadata: {
        creationTime: "2022-01-01T00:00:00Z",
        lastSignInTime: "2022-02-01T00:00:00Z",
      },
      providerData: [],
      refreshToken: "",
      tenantId: null,
      delete: function (): Promise<void> {
        throw new Error("Function not implemented.");
      },
      getIdToken: function (
        _forceRefresh?: boolean | undefined
      ): Promise<string> {
        throw new Error("Function not implemented.");
      },
      getIdTokenResult: function (
        _forceRefresh?: boolean | undefined
      ): Promise<IdTokenResult> {
        throw new Error("Function not implemented.");
      },
      reload: function (): Promise<void> {
        throw new Error("Function not implemented.");
      },
      toJSON: function (): object {
        throw new Error("Function not implemented.");
      },
      displayName: null,
      email: null,
      phoneNumber: null,
      photoURL: null,
      providerId: "",
      uid: "",
    };

    console.log(user);

    // Trigger the useEffect hook to update the component
    jest.spyOn(React, "useEffect").mockImplementationOnce((effect) => effect());

    // Assert that the email verification alert is rendered
    const emailVerificationAlert = screen.getByRole("alert");
    expect(emailVerificationAlert).toBeInTheDocument();
    expect(emailVerificationAlert).toHaveTextContent(
      "Email Verification is not complete."
    );
  });
});
*/
