import React from "react";
import { Box, Flex, Img, Stack } from "@chakra-ui/react";
import Login from "./Login";
import Register from "./Register";
import { useUserContext } from "../context/UserContext";

const AuthPage = () => {
  const { clicked } = useUserContext();

  return (
    <Flex
      position="relative"
      h="100%"
      overflow="hidden"
      padding="100px 150px 100px 150px"
      bg="#f26727"
    >
      <Flex width="700px" height="620" bg="skyblue">
        <Stack width="100%" bg="white" mx="auto" zIndex={10}>
          <Box>
            <Box ml={5} mt={5}>
              {clicked === false ? <Login /> : <Register />}
            </Box>
          </Box>
        </Stack>
      </Flex>
      <Flex width="700px" height="620">
        <Img
          objectFit="cover"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAV7sUUAcqHV6b-oUgs7VXSj-kTeqjXA8OFg&usqp=CAU"
        />
      </Flex>
    </Flex>
  );
};

export default AuthPage;
