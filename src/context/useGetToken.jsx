import React, { createContext } from "react";

export const AuthContext = createContext();

export const AuthorizationProvider = ({ children }) => {
  const signIn = async () => {
    try {
      const response = await fetch("http://appointment-back-qd2z.onrender.com/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "demouser4@gmail.com",
          password: "987687765",
        }),
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error(
          `http error! Status: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      if (data.success === "success") {
        return "success";
      } else {
        return "failed";
      }
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ signIn }}>{children}</AuthContext.Provider>
  );
};
