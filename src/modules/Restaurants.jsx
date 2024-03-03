import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  HStack,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import RestaurantItem from "../components/RestaurantItem";
import Async from "../components/lib/Async";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Beer from "../components/assets/Beer.jpg";
import ErrorPage from "../components/lib/ErrorPage";
const itemsPerPage = 8;
const Restaurants = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { isLoading, data, isError } = useQuery({
    queryKey: ["fetchRestaurants"],
    queryFn: async () => {
      return axios
        .get("http://37.27.23.25:8090/api/v1/restaurant/getAll")
        .then((res) => res.data.list);
    },
  });

  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data?.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Async isError={isError} isLoading={isLoading}>
      <Box h="100vh" margin="0">
        <Box>
          <Grid
            templateColumns={[
              "repeat(1, 1fr)",
              "repeat(2, 1fr)",
              "repeat(3, 1fr)",
              "repeat(4, 1fr)",
            ]}
          >
            {currentData?.map((item, idx) => (
              <GridItem colSpan={1} key={idx}>
                <RestaurantItem
                  key={idx}
                  imageUrls={Beer}
                  rate={item.rate}
                  loading={isLoading}
                  id={item.id}
                />
              </GridItem>
            ))}
          </Grid>
        </Box>
        <Box mx="auto" alignItems="center" mt="20px">
          <Flex mx="auto" justifyContent="center">
            {data ? (
              <HStack mb={5}>
                {" "}
                {[...Array(totalPages)].map((_, index) => (
                  <Button
                    ml={3}
                    key={index + 1}
                    onClick={() => handlePageChange(index + 1)}
                    colorScheme={currentPage === index + 1 ? "teal" : "gray"}
                  >
                    {index + 1}
                  </Button>
                ))}
                <Text mt={2} color="black">
                  Page {currentPage} of {totalPages}
                </Text>
              </HStack>
            ) : (
              <>
                <ErrorPage isError={isError} />
              </>
            )}
          </Flex>
        </Box>
      </Box>
    </Async>
  );
};

export default Restaurants;
