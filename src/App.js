import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import "./App.css";
import { useSelector } from "react-redux";
import MenuList from "./components/MenuList";
import { MenuProvider } from "./context/useMenu";
import styled from "styled-components";
import Header from "./components/Header";
import { AuthorizationProvider } from "./context/useGetToken.jsx";
import { AdminProvider } from "./context/AdminContext.jsx";
import { ErrorProvider } from "./context/ErrorContext";

import { RenderRoutes } from "./utils/Routes.jsx";

function App() {
  const theme = useSelector((state) => state.theme);

  const [isMenuOpen, toggleMenu] = useState(false);

  const handleToggleMenu = () => {
    toggleMenu(!isMenuOpen);
  };

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <MenuProvider>
          <AdminProvider>
            <AuthorizationProvider>
              <ErrorProvider>
                <VerticalContainer>
                  <Header />
                  <RenderRoutes />
                  <MenuList
                    isMenuOpen={isMenuOpen}
                    handleToggleMenu={handleToggleMenu}
                  />
                </VerticalContainer>
              </ErrorProvider>
            </AuthorizationProvider>
          </AdminProvider>
        </MenuProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}



const VerticalContainer = styled.div`
  flex: 1;
  display: flex;
  max-width: 100vw;
  flex-direction: column;
  min-height: 100svh;
  overflow: hidden;
`;

export default App;
