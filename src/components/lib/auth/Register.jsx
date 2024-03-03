import { Button, Input, Stack, Box, Spinner } from "@chakra-ui/react";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import FormError from "../../lib/FormError.jsx";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PageContainer from "../PageContainer.jsx";
import { useUserContext } from "../context/UserContext.jsx";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../routes/Routes.js";

const schema = yup.object().shape({
  firstname: yup.string().required("Username is required"),
  lastname: yup.string().required("Username is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Register = () => {
  const { setClicked } = useUserContext();
  const [isLoading, setIsloading] = React.useState(false);
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const response = axios.post(
        "http://37.27.23.25:8090/api/v1/auth/register",
        data
      );
      console.log("response : " + response);
      localStorage.setItem("registeremail", data.email);
      toast.success("Register successful!", {
        autoClose: 3000,
      });
      setTimeout(() => {
        setIsloading(false);
        navigate(ROUTES.CONFIRMCODEPAGE);
        setIsloading(false);
      }, 3000);
    } catch (error) {
      toast.error("Error registering. Please try again.", {
        autoClose: 3000,
      });
      console.log("Error registering:", error);
    }
  };

  return (
    <PageContainer>
      <Box marginBottom={5}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={10} mx="auto" marginTop={10}>
            <Box>
              <FormError error={errors?.username?.message} lable="Firstname" />
              <Controller
                name="firstname"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter your firstname"
                  />
                )}
              />
            </Box>
            <Box>
              <FormError error={errors?.username?.message} lable="Lastname" />
              <Controller
                name="lastname"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="text"
                    placeholder="Enter your lastname"
                  />
                )}
              />
            </Box>
            <Box>
              <FormError error={errors?.username?.message} lable="Email" />
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="email"
                    placeholder="Enter your email"
                  />
                )}
              />
            </Box>
            <Box>
              <FormError error={errors?.password?.message} lable="Password" />
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    type="password"
                    placeholder="Enter your password"
                  />
                )}
              />
            </Box>
            <Box>
              <Button type="submit" _hover={{ bg: "skyblue" }} bg="#f26727">
                {isLoading ? <Spinner /> : "Register"}
              </Button>
              <Button
                _hover={{ bg: "skyblue" }}
                onClick={() => setClicked(false)}
                ml={10}
                bg="#f26727"
              >
                login
              </Button>
            </Box>
          </Stack>
        </form>
        <ToastContainer />
      </Box>
    </PageContainer>
  );
};

export default Register;
