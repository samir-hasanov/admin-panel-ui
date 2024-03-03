import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Flex,
  ButtonGroup,
  Text,
} from "@chakra-ui/react";
import Loading from "../lib/Loading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ErrorPage from "../lib/ErrorPage";

const itemsPerPage = 5;

const ResBookingTable = () => {
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
        navigate("/resbooking");
        break;
      case "Zefferano":
        navigate("/");
        break;
      case "BeerBasha":
        navigate("/");
        break;
      // Add more cases as needed

      default:
        console.warn("Unknown page name:", name);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://37.27.23.25:8090/api/v1/restaurant/book/getAll?id=3"
        );
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error);
      }
    };

    fetchData();

    const intervalId = setInterval(() => {
      // setLoading(true);
      fetchData();
    }, 1000);

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
            {["All", "Zefferano", "BeerBasha"].map((name) => (
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
              <Th>Quest</Th>
              <Th>Date</Th>
              <Th>Time</Th>
              <Th>Restaurant</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Loading />
            ) : (
              <>
                {currentData?.map((item) => (
                  <Tr fontWeight="700" key={item.id}>
                    <Td>
                      {item.username} {item.lastname}
                    </Td>
                    <Td>{item.peopleCount}</Td>
                    <Td>{item.day}</Td>
                    <Td>{item.time}</Td>
                    <Td>
                      <Button borderRadius="32px" bg="#FFCC00">
                        {item.restaurant}
                      </Button>
                    </Td>
                  </Tr>
                ))}
              </>
            )}
          </Tbody>
        </Table>
        <HStack mt={4} spacing={3} mb={5}>
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

export default ResBookingTable;
