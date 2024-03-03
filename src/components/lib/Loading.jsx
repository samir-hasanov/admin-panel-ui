import React from "react";
import { Container, Flex, Center, Spinner } from "@chakra-ui/react";

const Loading = () => {
  return (
    <Container m={5}>
      <Center>
        <Flex width="full" justifyContent="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      </Center>
    </Container>
  );
};

export default Loading;
