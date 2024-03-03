import { Box, Text } from "@chakra-ui/react";
import React from "react";
import { useParams } from "react-router-dom";

const ErrorGrid = ({ error }) => {
  const { errorCode } = useParams();
  return (
    <Box width="300px" height="30px">
      <Text fontSize="25px" fontWeight="700" color="red" ml={5}>
        Error fetching ... {errorCode} {error}
      </Text>
    </Box>
  );
};

export default ErrorGrid;
