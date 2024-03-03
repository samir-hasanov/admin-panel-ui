import { FormLabel, Stack, Text } from "@chakra-ui/react";
import React from "react";

const FormError = ({ lable, error, children }) => {
  return (
    <Stack ml="40px">
      {lable && <FormLabel mb={0}>{lable}</FormLabel>}
      {children}
      {error && (
        <Text mt={2} color="red">
          {error}
        </Text>
      )}
    </Stack>
  );
};

export default FormError;
