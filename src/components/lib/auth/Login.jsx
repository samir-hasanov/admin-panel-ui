import {
  Button,
  Input,
  Stack,
  Box,
  Spinner,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast, ToastContainer } from "react-toastify";
// import { FaSpinner } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import { ROUTES } from "../../../routes/Routes";
import PageContainer from "../PageContainer";
import FormError from "../FormError";
const schema = yup.object().shape({
  email: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const [isLoading, setIsloading] = useState(false);
  const navigate = useNavigate();
  const { setUserData, setLoginData, setClicked } = useUserContext();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data, e) => {
    e?.preventDefault();
    try {
      setIsloading(true);
      const response = await axios.post(
        "http://37.27.23.25:8090/api/v1/auth/authenticate",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        toast.success("Login successful!", {
          autoClose: 1000,
          position: "top-center",
        });
        const accessToken = response.data.access_token;
        const userId = response.data.user_id;
        localStorage.setItem("token", accessToken);
        localStorage.setItem("userId",userId)
        setUserData(data);
        setLoginData(response.data);
        setIsloading(false);
        localStorage.setItem("email", JSON.stringify(data.email));
        navigate("/home");
        console.log("user data " + data.email);
      } else {
        toast.error("username or password wrong...", {
          autoClose: 4000,
          position: "top-right",
        });
        setIsloading(false);
      }
    } catch (error) {
      toast.error("Error posting data. Please try again.", {
        autoClose: 4000,
        position: "top-right",
      });
      setIsloading(false);
      console.log(error);
    }
  };

  return (
    <PageContainer>
      <Box marginBottom={5}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={10} mx="auto">
            <Box>
              <FormError error={errors?.email?.message} lable="Email" />
              <Flex
                justifyContent="space-between"
                alignItems="center"
                alignContent="center"
              >
                <MdEmail size={40} color="blue" />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="email"
                      placeholder="Enter your Email"
                    />
                  )}
                />
              </Flex>
            </Box>
            <Box>
              <FormError error={errors?.password?.message} lable="Password" />
              <Flex
                justifyContent="space-between"
                alignItems="center"
                alignContent="center"
              >
                <RiLockPasswordFill size={40} color="blue" />
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      type="password"
                      placeholder=" Enter your password"
                    />
                  )}
                />
              </Flex>
              {/* <Link as={NavLink} to={ROUTES.REGISTER}>
                <Text fontWeight="400" fontSize="18px" color="blue" mt={3}>
                  Forgot password?
                </Text>
              </Link> */}
            </Box>
            <Box borderRadius={10}>
              <Button
                bg="#f26727"
                width="100%"
                type="submit"
                _hover={{ bg: "#f26727" }}
                disabled={isLoading}
                fontWeight="500"
                fontSize={25}
              >
                {isLoading ? <Spinner /> : "Login"}
              </Button>
              <Flex
                alignItems="center"
                display="flex"
                justifyContent="center"
                columnGap={2}
                mt={3}
              >
                <Text fontWeight="400" fontSize="18px">
                  Don't have an account?
                </Text>
                {/* <Button
                  width="85px"
                  height="30px"
                  color="blue"
                  bg="white"
                  onClick={() => setClicked(true)}
                >
                  Signup now
                </Button> */}
              </Flex>
            </Box>
          </Stack>
        </form>
        <ToastContainer />
      </Box>
    </PageContainer>
  );
};

export default Login;
