// MyForm.js
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as yup from "yup";
import {
  Box,
  Input,
  Button,
  FormControl,
  Spinner,
  Center,
} from "@chakra-ui/react";
import { useUserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  confirmCode: yup.string().required("confirm code is required"),
});

const ConfirmCodePage = () => {
  const [isLoading, setIsloading] = useState(false);
  const { setUserData, setClicked } = useUserContext();
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data, e) => {
    e.preventDefault();

    try {
      setIsloading(true);
      const email = { email: localStorage.getItem("registeremail") };
      const dto = { ...email, ...data };
      const response = axios.post(
        "http://37.27.23.25:8090/api/v1/auth/confirm",
        dto,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("response --- " + response.dto);
      toast.success("confirm code successful!", {
        autoClose: 2000,
      });

      setTimeout(() => {
        setIsloading(false);
        setUserData("");
        setClicked(false);
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("confirm code:", error.message);
      toast.error("confirm code. Please try again.", {
        autoClose: 3000,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <Center mx="auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box
          width="300px"
          p={4}
          borderWidth="1px"
          borderRadius="md"
          boxShadow="lg"
        >
          <FormControl isInvalid={errors.name}>
            <Controller
              name="confirmCode"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Input {...field} placeholder="Enter Confirm Code" />
              )}
            />
            {/* <FormError>{errors.confirmcode?.message}</FormError> */}
          </FormControl>

          <Button type="submit" colorScheme="teal" mt={4}>
            {isLoading ? <Spinner /> : "Confirm code"}
          </Button>
        </Box>
      </form>
      <ToastContainer />
    </Center>
  );
};

export default ConfirmCodePage;
