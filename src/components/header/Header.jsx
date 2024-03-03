import { Box } from "@chakra-ui/react";
import React from "react";
import HeaderNav from "./HeaderNav";
import HeaderBottom from "./HeaderBottom";

const Header = () => {
  return (
    <Box h="80px">
      <HeaderNav />
      <HeaderBottom />
    </Box>
  );
};

export default Header;
