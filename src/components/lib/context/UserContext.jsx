import React, { createContext } from "react";
import { useState } from "react";

const UserContextData = createContext({});

export function useUserContext() {
  return React.useContext(UserContextData);
}

export const UserContext = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [loginData, setLoginData] = useState({});
  const [formData, setFormData] = useState({});
  const [images, setImages] = useState({});
  const [clicked, setClicked] = useState(false);

  return (
    <UserContextData.Provider
      value={{
        userData,
        setUserData,
        loginData,
        setLoginData,
        clicked,
        setClicked,
        formData,
        setFormData,
        images,
        setImages,
      }}
    >
      {children}
    </UserContextData.Provider>
  );
};
