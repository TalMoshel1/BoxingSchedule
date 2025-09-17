import React, { createContext, useEffect, useState } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [isVerified, setIsVerified] = useState(null);

  const verify = async () => {
    try {
      const response = await fetch(
        "http://appointment-back-qd2z.onrender.com/api/auth/verify-token-admin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      if (!response.ok) {
        setIsVerified(false);
      }
      const data = await response.json();
      if (data.message !== "Token is valid") {
        return setIsVerified(false);
      }
      setIsVerified(true);
      return data.message;
    } catch (error) {
      console.error("Error sending POST request:", error);
      setIsVerified(false);
    }
  };

  // useEffect(() => {
  //   verify();
  // }, []);

  return (
    <AdminContext.Provider value={{ isVerified, verify, setIsVerified }}>
      {children}
    </AdminContext.Provider>
  );
};
