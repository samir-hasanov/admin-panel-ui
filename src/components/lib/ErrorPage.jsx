import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

const ErrorPage = ({ error }) => {
  const { errorCode } = useParams();
  return (
    <Box>
      <Center mx="auto" mt={300}>
        <Text fontSize="25px" fontWeight="700">
          Error fetching data. Please try again later,
        </Text>
        <Text fontSize="25px" fontWeight="700" color="red" ml={5}>
          Status Code : {errorCode}
        </Text>
      </Center>
    </Box>
  );
};

export default ErrorPage;
