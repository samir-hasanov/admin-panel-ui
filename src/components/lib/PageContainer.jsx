import { Box } from "@chakra-ui/react";
import React from "react";

const PageContainer = ({ children }) => {
  return (
    <Box w="90%" mx="auto">
      {children}
    </Box>
  );
};

export default PageContainer;
