import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Text,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Flex,
  ButtonGroup,
  Avatar,
} from "@chakra-ui/react";
import Loading from "../lib/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../lib/ErrorPage";

const itemsPerPage = 5;

const CarBookingTable = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeButton, setActiveButton] = useState("All");
  const navigate = useNavigate();
  const handleButtonClick = (name) => {
    setActiveButton(name);
    switch (name) {
      case "All":
        navigate("/carbooking");
        break;
      case "yyyy":
        navigate("/");
        break;
      case "yyyx":
        navigate("/");
        break;

      default:
        console.warn("Unknown page name:", name);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiJ9.eyJmaXJzdG5hbWUiOiJTYW1pciIsInVzZXJJZCI6IjMyNzE5MzZlLWExOWQtNGU0ZC04OWZmLTQ3NjI2ZDcwOGRkYyIsImVtYWlsIjoic2FtaXJoYXNhbm92OTQ5NEBnbWFpbC5jb20iLCJsYXN0bmFtZSI6Ikhhc2Fub3YiLCJzdWIiOiJzYW1pcmhhc2Fub3Y5NDk0QGdtYWlsLmNvbSIsImlhdCI6MTcwNTY2MzE5OCwiZXhwIjoxNzA1NjY2Nzk4fQ.aKMAnTHeasPjMD4kBXdAF2VywZR_HqWpDdqFYM2yrYQ";
        const response = await axios.get(
          "http://37.27.23.25:8090/api/v1/car/book?userId=0598e511-6962-4c18-9f61-8e470ff1198f",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json", // You may need to adjust the content type
            },
          }
        );

        setData(response.data);

        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();
    setLoading(false);
    const intervalId = setInterval(() => {
      // setLoading(true);
      fetchData();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  if (error) {
    const status = error.response.status;
    <ErrorPage error={status} />;
    navigate(`/error/${status}`);
  } else if (error?.request) {
    <ErrorPage error={error} />;
  } else {
    <ErrorPage error={error?.request} />;
  }

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data?.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <Box p={4}>
      <Box>
        <Flex columnGap="10px">
          <ButtonGroup spacing={4}>
            {["All", "yyyy", "yyyx"].map((name) => (
              <Button
                key={name}
                onClick={() => handleButtonClick(name)}
                bg={activeButton === name ? "#34C759" : "gray.100"}
                color={activeButton === name ? "white" : "none"}
                borderRadius="32px"
                fontWeight="400"
                fontSize="18px"
              >
                {name}
              </Button>
            ))}
          </ButtonGroup>
        </Flex>
      </Box>
      <Box>
        {" "}
        <Table variant="simple" width="full">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Car</Th>
              <Th>Pick Up</Th>
              <Th>Time</Th>
              <Th>Location</Th>
              <Th>Additions</Th>
              <Th>Comment</Th>
              <Th>Total</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Loading />
            ) : (
              <>
                {currentData?.map((item) => (
                  <Tr fontWeight="700" key={item.car.id}>
                    <Td>
                      <Box alignItems="center" display="flex">
                        <Avatar src="" mr={2} />
                        <Box alignItems="center">
                          {item.userInfo.name} {item.userInfo.surname}
                          <Text>{item.userInfo.number}</Text>
                        </Box>
                      </Box>
                    </Td>
                    <Td>{item.car.brand.name}</Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td></Td>
                    <Td isNumeric color="orange">
                      {item.totalBookingPrice} ₼
                    </Td>
                  </Tr>
                ))}
              </>
            )}
          </Tbody>
        </Table>
        <HStack mt={4} spacing={2}>
          {[...Array(totalPages)].map((_, index) => (
            <Button
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
      </Box>
    </Box>
  );
};

export default CarBookingTable;
