import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import store from "./services/store";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import AuthPage from "./components/lib/auth/AuthPage";
import Register from "./components/lib/auth/Register";
import ConfirmCodePage from "./components/lib/auth/ConfirmCodePage";
import { ROUTES } from "./routes/Routes";
import { UserContext } from "./components/lib/context/UserContext";
const client = new QueryClient();
const root = ReactDOM.createRoot(document.getElementById("root"));
const theme = extendTheme({
  styles: {
    global: {
      ".responsive-flex-container": {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "4",
        // Responsive styles
        "@media (min-width: 48em)": {
          flexDirection: "row",
        },
        "@media (min-width: 62em)": {
          flexDirection: "column",
        },
      },
    },
  },
});

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={client}>
        <BrowserRouter>
          <UserContext>
            <ChakraProvider theme={theme}>
              <Routes>
                <Route path="/" element={<AuthPage />} />
                <Route path={ROUTES.REGISTER} element={<Register />} />
                <Route
                  path={ROUTES.CONFIRMCODEPAGE}
                  element={<ConfirmCodePage />}
                />
                <Route path="*" element={<App />} />
              </Routes>
            </ChakraProvider>
          </UserContext>
        </BrowserRouter>
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
