import { Flex, Icon, Link, Menu, MenuButton, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import React from "react";
// import NavHoverBox from "./NavHoverBox";

const NavItem = ({ navSize, icon, title, active, url }) => {
  return (
    <Flex
      mt={30}
      flexDir="column"
      w="100%"
      alignItems={navSize === "small" ? "center" : "flex-start"}
    >
      <Menu placement="right">
        <Link
          as={NavLink}
          to={url}
          backgroundColor={active && "#FFEBE2"}
          p={3}
          borderRadius={8}
          _hover={{ textDecor: "none", backgroundColor: "#FFEBE2" }}
          w={navSize === "large" && "100%"}
        >
          <MenuButton width="100%">
            <Flex alignItems="center">
              <Icon
                as={icon}
                fontSize="xl"
                color={active ? "#82AAD" : "gray.500"}
              />
              <Text
                ml={3}
                display={navSize === "small" ? "none" : "flex"}
                fontSize="18px"
                fontWeight="400"
              >
                {title}
              </Text>
            </Flex>
          </MenuButton>
        </Link>
        {/* <MenuList py={0} border="none" w={200} h={200} ml={5}>
          <NavHoverBox title={title} icon={icon} description={description} />
        </MenuList> */}
      </Menu>
    </Flex>
  );
};

export default NavItem;
