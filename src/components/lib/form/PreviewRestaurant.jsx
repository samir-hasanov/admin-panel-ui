import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useUserContext } from "../context/UserContext";

const PreviewRestaurant = () => {
  const { formData, images } = useUserContext();
  console.log("aue : " + formData.number);
  return (
    <Box>
      <Flex width="70%" mx="auto" justifyContent="space-between">
        <VStack width="320px" bg="yellow" height="400px" spacing={5}>
          <Box width="100%" height="300px">
            <Image src={images[0]} height="100%" w="100%" borderRadius="15px" />
          </Box>
          <Box>
            <Text>{formData.engDesc}</Text>
          </Box>
          <Flex>
            {" "}
            <Text>{formData.name}</Text>
            <Text>{formData.number}</Text>
          </Flex>
        </VStack>
        <Box>Jzn</Box>
      </Flex>
    </Box>
  );
};

export default PreviewRestaurant;
