import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Home from "./modules/Home";
import SideBar from "./components/sidebarui/SideBar";
import { Box, Flex } from "@chakra-ui/react";
import { ROUTES } from "./routes/Routes";
import RestaurantBooking from "./modules/RestaurantBooking";
import Restaurants from "./modules/Restaurants";
import Cars from "./modules/Cars";
import CarBooking from "./modules/CarBooking";
import ErrorPage from "./components/lib/ErrorPage";
import ToursBooking from "./modules/ToursBooking";
import Tours from "./modules/Tours";
import RestaurantForm from "./components/lib/form/RestaurantForm";
import PreviewRestaurant from "./components/lib/form/PreviewRestaurant";
import RestaurantUpdate from "./components/lib/form/RestaurantUpdate";
const PrivateRoute = ({ children }) => {
  return localStorage.getItem("email") != null ? (
    <> {children}</>
  ) : (
    <Navigate to="/" />
  );
};

function App() {
  return (
    <>
      <Flex height="100vh">
        <Box position="sticky" overflowY="auto">
          <SideBar />
        </Box>

        <Flex flex="1" direction="column" overflow="hidden" position="relative">
          <Box position="sticky">
            <Header />
          </Box>
          <Box overflowY="auto">
            <Routes>
              <Route
                path={ROUTES.RESTAURANTS}
                element={
                  <PrivateRoute>
                    <Restaurants />
                  </PrivateRoute>
                }
              />
              <Route
                path={ROUTES.PREVIEWRESTAURANT}
                element={
                  <PrivateRoute>
                    <PreviewRestaurant />
                  </PrivateRoute>
                }
              />
              <Route path={ROUTES.ERRORPAGE} element={<ErrorPage />} />
              <Route
                path={ROUTES.RESTAURANTSBOOKING}
                element={
                  <PrivateRoute>
                    <RestaurantBooking />
                  </PrivateRoute>
                }
              />
              <Route path={ROUTES.CARS} element={<Cars />} />
              <Route
                path={ROUTES.CARBOOKING}
                element={
                  <PrivateRoute>
                    <CarBooking />
                  </PrivateRoute>
                }
              />
              <Route
                path={ROUTES.TOURSBOOKING}
                element={
                  <PrivateRoute>
                    <ToursBooking />
                  </PrivateRoute>
                }
              />
              <Route
                path={ROUTES.TOURS}
                element={
                  <PrivateRoute>
                    <Tours />
                  </PrivateRoute>
                }
              />
              <Route
                path={ROUTES.RESTAURANTSFORM}
                element={
                  <PrivateRoute>
                    <RestaurantForm />
                  </PrivateRoute>
                }
              />
              <Route
                path={ROUTES.RESTAURANTSFORMID}
                element={
                  <PrivateRoute>
                    <RestaurantUpdate />
                  </PrivateRoute>
                }
              />
              <Route
                path={ROUTES.HOME}
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Box>
        </Flex>
      </Flex>
    </>
  );
}

export default App;
