import React from "react";
import { Grid, GridItem, Text } from "@chakra-ui/react";
import axios from "axios";
import AsyncGrid from "../AsyncGrid";
import { useQuery } from "@tanstack/react-query";

const SelectableGridMeals = ({ selectedItems, onToggleItem }) => {
  const {
    isLoading,
    data: response,
    isError,
  } = useQuery({
    queryKey: ["fetchMeals"],
    queryFn: async () => {
      return axios
        .get("http://37.27.23.25:8090/api/v1/restaurant/meals/getAll", {
          timeout: 2000,
          headers: { "Accept-language": "en" },
        })
        .then((res) => res.data);
    },
  });

  return (
    <AsyncGrid isError={isError} isLoading={isLoading}>
      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(2, 1fr)",
        }}
        gap={4}
      >
        {response?.map((item) => (
          <GridItem
            height="36px"
            pl="15px"
            key={item.id}
            borderWidth="1px"
            borderRadius="100px"
            cursor="pointer"
            _hover={{ backgroundColor: "gray.100" }}
            backgroundColor={
              selectedItems.includes(item.id) ? "#F7570D" : "gray.100"
            }
            onClick={() => onToggleItem(item.id)}
          >
            <Text fontSize="18px" fontWeight="400">
              {item.name}
            </Text>
          </GridItem>
        ))}
      </Grid>
    </AsyncGrid>
  );
};

export default SelectableGridMeals;
