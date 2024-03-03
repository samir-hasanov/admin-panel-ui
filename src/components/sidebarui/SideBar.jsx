import {
  Avatar,
  Divider,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  Box,
} from "@chakra-ui/react";
import { FaChevronDown } from "react-icons/fa";
import { FiMenu } from "react-icons/fi";
import React, { useState } from "react";
import { FiBriefcase } from "react-icons/fi";
import { MdOutlineRestaurant } from "react-icons/md";
import { TbBrandBooking } from "react-icons/tb";
import { FaCarSide } from "react-icons/fa";
import NavItem from "./NavItem";

const SideBar = () => {
  const [navSize, changeNavSize] = useState("large");

  const email = JSON.parse(localStorage.getItem("email"));

  return (
    <Flex height="100vh">
      <Flex
        // left="5"
        w={navSize === "small" ? "75px" : "290px"}
        // borderRadius={navSize == "small" ? "15px" : "30px"}
        // mt="1vh"
        boxShadow="0 4px 12px 0 rgba(0,0,0,0.05)"
        flexDir="column"
        justifyContent="space-between"
        position="sticky"
      >
        <Flex
          p="5%"
          flexDir="column"
          alignItems={navSize === "small" ? "center" : "flex-start"}
          as="nav"
        >
          <IconButton
            background="none"
            mt={5}
            _hover={{ background: "#FFEBE2" }}
            icon={<FiMenu />}
            onClick={() => {
              if (navSize === "small") {
                changeNavSize("large");
              } else {
                changeNavSize("small");
              }
            }}
          />
          <NavItem
            navSize={navSize}
            icon={MdOutlineRestaurant}
            title="Restaurants"
            url="restaurants"
          />
          <NavItem
            navSize={navSize}
            icon={TbBrandBooking}
            title="Booking"
            url="/resbooking"
          />
          {/* <NavItem
            navSize={navSize}
            icon={FaCarSide}
            title="Cars"
            url="/cars"
          />
          <NavItem
            navSize={navSize}
            icon={TbBrandBooking}
            title="Booking"
            url="/carbooking"
          />
          <NavItem
            navSize={navSize}
            icon={FiBriefcase}
            title="Tours"
            url="/tours"
          />
          <NavItem
            navSize={navSize}
            icon={TbBrandBooking}
            title="Booking"
            url="/toursbooking"
          /> */}
        </Flex>
        <Flex
          flexDir="column"
          w="100%"
          p="5%"
          mb={4}
          alignItems={navSize === "small" ? "center" : "flex-start"}
        >
          <Divider display={navSize === "small" ? "none" : "flex"} />
          <Box alignItems="center">
            <Avatar size="sm" src="" />
            <Flex
              flexDir="column"
              display={navSize === "small" ? "none" : "flex"}
            >
              <Menu>
                <MenuButton as={Button} rightIcon={<FaChevronDown />}>
                  {email}
                </MenuButton>
                <MenuList>
                  <MenuItem
                    as="a"
                    href="/"
                    onClick={() => localStorage.clear()}
                  >
                    Logout
                  </MenuItem>
                  <MenuItem>Edit profile</MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          </Box>
        </Flex>
      </Flex>
      <Divider orientation="vertical" bg="#131313" width="1px" h="100%" />
    </Flex>
  );
};

export default SideBar;
