import {
  Box,
  Card,
  Image,
  Stack,
  Text,
  Button,
  Flex,
  Icon,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
// import { generatePath, useNavigate } from "react-router-dom";
// import { ROUTES } from "../routes/Routes";

const RestaurantItem = ({ imageUrls, rate, id }) => {
  // const handleNavigate = (id) => {
  //   navigate(generatePath(`${ROUTES.RESTAURANTSFORMID}?id=${id}`, { id: id }));
  // };
  // const navigate = useNavigate();
  const text =
    "Major elements of Azerbaijani culture are its decorative and applied arts. They are represented by a wide range of handicrafts, such as chasing";
  const maxLength = 46;
  const [isExpanded, setIsExpanded] = useState(false);
  const truncatedText = text.slice(0, maxLength);
  const handleToggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <Box padding="5px">
      <Card
        maxW="sm"
        _hover={{
          boxShadow: "0 10px 12px rgba(0, 0, 0, 0.9)",
          transform: "translateY(3px)",
        }}
        bg="#F9F8F8"
        border="none"
      >
        <Image
          src={imageUrls}
          alt="Green double couch with wooden legs"
          borderRadius="lg"
        />
        <Stack
          mt="6"
          mx="auto"
          spacing="3"
          width="315px"
          padding="1px"
          alignItems="center"
        >
          <Box width="100%">
            <Text fontSize="18px" fontWeight="500">
              {isExpanded ? text : truncatedText}
              {!isExpanded && text.length > maxLength && (
                <Button variant="link" onClick={handleToggleReadMore}>
                  Read More ...
                </Button>
              )}
              {isExpanded ? (
                <>
                  <Button variant="link" onClick={handleToggleReadMore}>
                    Read Less
                  </Button>
                </>
              ) : (
                <></>
              )}
            </Text>
          </Box>
          <Flex justifyContent="space-between" width="100%">
            <Text fontWeight="300" fontSize="18px">
              Zefferano
            </Text>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              columnGap={1}
            >
              <Text fontWeight="300" fontSize="18px">
                {rate}
              </Text>
              <Icon as={FaStar} color="#F7570D" />
            </Flex>
          </Flex>
          <Flex justifyContent="space-between" width="100%">
            <Button
              // onClick={() => handleNavigate(id)}
              width="150px"
              h="62px"
              borderRadius="10px"
              fontWeight="400"
              fontSize="18px"
              color="#F7570D"
              bg="#FFEBE2"
              _hover={{ color: "black" }}
            >
              Edit
            </Button>
            <Button
              width="150px"
              h="62px"
              borderRadius="10px"
              fontWeight="400"
              fontSize="18px"
              color="white"
              bg="#F7570D"
              _hover={{ color: "black" }}
            >
              Promote
            </Button>
          </Flex>
        </Stack>
      </Card>
    </Box>
  );
};

export default RestaurantItem;
