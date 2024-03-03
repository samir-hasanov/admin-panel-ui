import { Flex, Heading, Icon, Text } from "@chakra-ui/react";
import React from "react";

const NavHoverBox = ({ description, title, icon }) => {
  return (
    <>
      <Flex
        position="absolute"
        mt="calc(100px - 7.5px)"
        ml="-10px"
        w={0}
        h={0}
        borderTop="10px solid transparent"
        borderRight="10px solid #82AAAD"
      />
      <Flex
        h={200}
        w={200}
        flexDir="column"
        alignItems="center"
        justify="center"
        textAlign="center"
        color="#fff"
        backgroundColor="#82AAAD"
        borderRadius="10px"
      >
        <Icon as={icon} fontSize="3xl" mb={4} />
        <Heading size="md" fontWeight="normal">
          {title}
        </Heading>
        <Text>{description}</Text>
      </Flex>
    </>
  );
};

export default NavHoverBox;
