import React from "react";
import { NavLink } from "react-router-dom";
import {
  Flex,
  Box,
  IconButton,
  useDisclosure,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Link,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { RxHamburgerMenu } from "react-icons/rx";
const navLinks = [
  { id: 1, text: "RestaurantForm", path: "/restaurantsform" },
  // { id: 2, text: "CarForm", path: "/about" },
  // { id: 3, text: "TourForm", path: "/services" },
  { id: 4, text: "Contact", path: "/contact" },
];
const HeaderNav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Flex p={4} align="center">
      <Box display={{ base: "none", md: "block" }}>
        <Flex columnGap={10}>
          {navLinks.map((link) => (
            <Link
              key={link.id}
              as={NavLink}
              to={link.path}
              fontSize="18px"
              fontWeight="400"
              textDecoration="none"
            >
              {link.text}
            </Link>
          ))}
        </Flex>
      </Box>
      <Box display={{ base: "block", md: "none" }}>
        <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Menu</DrawerHeader>
            <DrawerBody>
              <Grid column={1} rowGap={7} _hover={{ bg: "#F7570D" }}>
                {navLinks.map((item) => (
                  <GridItem key={item.id}>
                    <Link
                      as={NavLink}
                      to={item.path}
                      mb={4}
                      key={item.id}
                      onClick={onClose}
                      _hover={{ bg: "#F7570D" }}
                    >
                      {item.text}
                    </Link>
                  </GridItem>
                ))}
              </Grid>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
        <IconButton
          icon={<RxHamburgerMenu />}
          variant="outline"
          color="black"
          onClick={onOpen}
          ml={260}
        />
      </Box>
    </Flex>
  );
};

export default HeaderNav;
