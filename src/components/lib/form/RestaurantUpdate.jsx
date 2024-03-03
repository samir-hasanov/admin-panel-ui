import React, { useEffect, useState } from "react";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import Map from "../../assets/map.png";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Image,
  SimpleGrid,
  Textarea,
  useBreakpointValue,
  Text,
  Flex,
  IconButton,
  Icon,
  VStack,
  Select,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectableGrid from "./SelectableGrid";
import SelectableGridFeature from "./SelectableGridFeature";
import SelectableGridMeals from "./SelectableGridMeals";
import { useLocation } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import SelectableGridPrice from "./SelectableGridPrice";

const validationSchema = yup.object().shape({
  // name: yup.string().required("Name is required"),
  nameRus: yup.string().required("Name is required"),
  nameEng: yup.string().required("Name is required"),
  engDesc: yup.string().required("Eng description is required"),
  rusDesc: yup.string().required("Rus description is required"),
  openingTime: yup.string().required("Opening time is required"),
  closingTime: yup.string().required("Closing time is required"),
  // imageUrls: yup.array().min(1, "At least one photo is required"),
});

const prefixData = [
  { id: 1, prefix: "+994" },
  { id: 2, prefix: "+955" },
  { id: 3, prefix: "+988" },
];

const RestaurantUpdate = () => {
  const width = useBreakpointValue({ base: "full", md: "50%" });
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [restaurant, setResUpdate] = useState({});
  const [click, setClick] = useState(true);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const { setFormData, setImages } = useUserContext();

  /////////////////////////////////////////////
  // const {
  //   isLoading,
  //   data: response,
  //   isError,
  // } = useQuery({
  //   queryKey: ["fetchResUpdateId"],
  //   queryFn: async () => {
  //     return axios
  //       .get(`http://37.27.23.25:8090/api/v1/restaurant/getById/${id}`, {
  //         timeout: 2000,
  //         headers: {
  //           // accept: "*/*",
  //           // currency: "USD",
  //           "Accept-language": "en",
  //         },
  //       })
  //       .then((res) => res.data);
  //   },
  // });
  /////////////////////////////

  useEffect(() => {
    const fetchRestaurant = async () => {
      await axios
        .get(`http://37.27.23.25:8090/api/v1/restaurant/getById/${id}`, {
          headers: {
            "Accept-language": "en",
          },
        })
        .then((response) => setResUpdate(response.data));
    };
    fetchRestaurant();
  }, [id]);

  console.log("getDataupdate " + restaurant.address);

  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const handlePhotoChange = (e) => {
    const files = e.target.files;
    setPreviewPhotos(
      Array.from(files).map((file) => URL.createObjectURL(file))
    );
    setValue("imageUrls", files);
    setClick(true);
  };

  const onSubmit = async (data) => {
    console.log("submit - > " + data);
    const newData = {
      ...data,
      number: data.prefixNumber + data.number,
    };
    delete newData.prefixNumber;
    setFormData(newData);
    setImages(previewPhotos);
    console.log("newData : " + newData.number);
    const token = localStorage.getItem("token");
    console.log("token : -> " + token);
    try {
      await axios.post("http://37.27.23.25:8090/api/v1/restaurant", newData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Box pt={5}>
      <Flex alignItems="center" ml={5} columnGap={2}>
        <Icon fontSize="25px">
          <FaArrowLeftLong />
        </Icon>
        <Text fontWeight="500" fontSize="28px">
          Update form
        </Text>
      </Flex>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box width={width} padding={10}>
          <Flex mb={4}>
            <Flex>
              <FormControl isInvalid={errors.imageUrls}>
                <FormLabel fontWeight="500" fontSize="28px">
                  Photos:
                </FormLabel>
                {click ? (
                  <Box
                    bg="#F3F3F3"
                    width="150px"
                    height="200px"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <IconButton
                      onClick={() => setClick(false)}
                      width="100px"
                      height="100px"
                    >
                      <Icon as={IoMdAddCircleOutline} fontSize="25px" />
                    </IconButton>
                  </Box>
                ) : (
                  <>
                    {" "}
                    <Input
                      name="imageUrls"
                      type="file"
                      onChange={handlePhotoChange}
                      multiple
                    />
                  </>
                )}

                <FormErrorMessage>{errors.imageUrls?.message}</FormErrorMessage>
              </FormControl>
            </Flex>
            <Flex columnGap={1} ml={2} mb={4}>
              <SimpleGrid
                mt="50px"
                columnGap={2}
                columns={{ base: 1, md: 2, lg: 2 }}
                spacing={4}
              >
                {previewPhotos.map((url, index) => (
                  <Image
                    key={index}
                    src={url}
                    alt={`Preview ${index + 1}`}
                    width="200px"
                    height="200px"
                  />
                ))}
              </SimpleGrid>
            </Flex>
          </Flex>
          <Box
            width={{ base: "100%", md: "50%", lg: "25%", xl: "760px" }}
            mb={4}
          >
            <Box>
              <FormLabel fontWeight="500" fontSize="28px">
                Name:
              </FormLabel>
            </Box>
            <Flex alignItems="center" justifyContent="space-between">
              <Box width="375px">
                <FormControl isInvalid={errors.nameRus}>
                  <Controller
                    control={control}
                    name="nameRus"
                    render={({ field }) => (
                      <Input
                        type="text"
                        value={restaurant?.name}
                        {...field}
                        placeholder="Name in Russian"
                      />
                    )}
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>
              </Box>
              <Box width="375px">
                <FormControl isInvalid={errors.nameEng}>
                  <Controller
                    control={control}
                    name="nameEng"
                    render={({ field }) => (
                      <Input
                        type="text"
                        {...field}
                        placeholder="Name in England"
                      />
                    )}
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>
              </Box>
            </Flex>
          </Box>
          <Box
            width={{ base: "100%", md: "50%", lg: "25%", xl: "760px" }}
            mb={4}
          >
            <Box>
              {" "}
              <FormLabel fontWeight="500" fontSize="28px">
                Slogan
              </FormLabel>
            </Box>
            <Flex alignItems="center" justifyContent="space-between">
              <Box width="375px">
                <FormControl isInvalid={errors.name}>
                  <Controller
                    control={control}
                    name="rusDesc"
                    render={({ field }) => (
                      <Textarea
                        type="text"
                        {...field}
                        placeholder=" Slogan in Russian"
                      />
                    )}
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>
              </Box>

              <Box width="375px">
                <FormControl isInvalid={errors.name}>
                  <Controller
                    control={control}
                    name="engDesc"
                    render={({ field }) => (
                      <Textarea
                        type="text"
                        {...field}
                        placeholder="Slogan in England"
                      />
                    )}
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>
              </Box>
            </Flex>
          </Box>
          <Box width={{ base: "100%", md: "50%", lg: "25%", xl: "315px" }}>
            <Box>
              {" "}
              <Text fontWeight="500" fontSize="28px">
                Working hours{" "}
              </Text>
            </Box>
            <Flex mt={5} width="100%" justifyContent="space-between">
              <Box mb={4}>
                <FormControl isInvalid={errors.openingTime}>
                  <FormLabel>
                    <Text fontWeight="500" fontSize="28px">
                      From
                    </Text>
                  </FormLabel>
                  <Controller
                    control={control}
                    name="openingTime"
                    render={({ field }) => (
                      <Input
                        type="time"
                        value={restaurant?.openingTime}
                        {...field}
                        width={120}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.openingTime?.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>

              <Box mb={4}>
                <FormControl isInvalid={errors.closingTime}>
                  <FormLabel fontWeight="500" fontSize="28px">
                    Till:
                  </FormLabel>
                  <Controller
                    control={control}
                    name="closingTime"
                    render={({ field }) => (
                      <Input
                        type="time"
                        value={restaurant?.closingTime}
                        {...field}
                        width={120}
                      />
                    )}
                  />
                  <FormErrorMessage>
                    {errors.closingTime?.message}
                  </FormErrorMessage>
                </FormControl>
              </Box>
            </Flex>
            <Box width="315px">
              <Text fontWeight="500" fontSize="28px">
                Contacts
              </Text>
              <VStack width="100%">
                <Box height="315px">
                  <Image src={Map} />
                </Box>
                <Box width="100%">
                  <FormControl isInvalid={errors.name}>
                    <FormLabel fontWeight="500" fontSize="28px"></FormLabel>
                    <Controller
                      control={control}
                      name="address"
                      render={({ field }) => (
                        <Input
                          type="text"
                          // value={restaurant?.address || ""}
                          {...field}
                          placeholder="Address"
                        />
                      )}
                    />
                    <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                  </FormControl>
                </Box>
                <Flex>
                  <Box>
                    <FormLabel></FormLabel>
                    <Controller
                      name="prefixNumber"
                      control={control}
                      defaultValue="+994"
                      render={({ field }) => (
                        <Select {...field} variant="filled" maxW="120px">
                          {prefixData?.map((item) => (
                            <option key={item.id} value={item.prefix}>
                              {item.prefix}
                            </option>
                          ))}
                        </Select>
                      )}
                    />
                  </Box>
                  <Box>
                    <FormControl isInvalid={errors.name}>
                      <FormLabel fontWeight="500" fontSize="28px"></FormLabel>
                      <Controller
                        control={control}
                        name="number"
                        render={({ field }) => (
                          <Input
                            type="tel"
                            {...field}
                            placeholder="Phone number"
                            variant="filled"
                          />
                        )}
                      />
                      <FormErrorMessage>
                        {errors.name?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                </Flex>
              </VStack>
            </Box>
          </Box>

          <Box
            mb={4}
            width={{ base: "100%", md: "50%", lg: "25%", xl: "400px" }}
          >
            <FormLabel fontWeight="500" fontSize="28px">
              Cuisines:
            </FormLabel>
            <Controller
              control={control}
              name="cuisineIds"
              defaultValue={[]}
              render={({ field }) => (
                <SelectableGrid
                  selectedItems={field.value}
                  onToggleItem={(itemId) => {
                    const selectedItems = field.value.includes(itemId)
                      ? field.value.filter((id) => id !== itemId)
                      : [...field.value, itemId];
                    field.onChange(selectedItems);
                  }}
                />
              )}
            />
          </Box>
          <Box
            mb={4}
            width={{ base: "100%", md: "50%", lg: "25%", xl: "400px" }}
          >
            <FormLabel fontWeight="500" fontSize="28px">
              Features:
            </FormLabel>
            <Controller
              control={control}
              name="featureIds"
              defaultValue={[]}
              render={({ field }) => (
                <SelectableGridFeature
                  selectedItems={field.value}
                  onToggleItem={(itemId) => {
                    const selectedItems = field.value.includes(itemId)
                      ? field.value.filter((id) => id !== itemId)
                      : [...field.value, itemId];
                    field.onChange(selectedItems);
                  }}
                />
              )}
            />
          </Box>
          <Box
            mb={4}
            width={{ base: "100%", md: "50%", lg: "25%", xl: "300px" }}
          >
            <FormLabel fontWeight="500" fontSize="28px">
              Meals:
            </FormLabel>
            <Controller
              control={control}
              name="mealIds"
              defaultValue={[]}
              render={({ field }) => (
                <SelectableGridMeals
                  selectedItems={field.value}
                  onToggleItem={(itemId) => {
                    const selectedItems = field.value.includes(itemId)
                      ? field.value.filter((id) => id !== itemId)
                      : [...field.value, itemId];
                    field.onChange(selectedItems);
                  }}
                />
              )}
            />
          </Box>

          <Box
            mb={4}
            width={{ base: "100%", md: "50%", lg: "25%", xl: "300px" }}
          >
            <FormLabel fontWeight="500" fontSize="28px">
              Price:
            </FormLabel>
            <Controller
              control={control}
              name="priceIds"
              defaultValue={[]}
              render={({ field }) => (
                <SelectableGridPrice
                  selectedItems={field.value}
                  onToggleItem={(itemId) => {
                    const selectedItems = field.value.includes(itemId)
                      ? field.value.filter((id) => id !== itemId)
                      : [...field.value, itemId];
                    field.onChange(selectedItems);
                  }}
                />
              )}
            />
          </Box>
          <Flex justifyContent="space-between" columnGap={5}>
            {" "}
            {/* <Button
              mt={10}
              // type="submit"
              width="100%"
              _hover={{ bg: "#F7570D", color: "white" }}
              onClick={() => navigate("/respreview")}
            >
              <Text fontSize="18px" fontWeight="400">
                Preview
              </Text>
            </Button> */}
            <Button
              mt={10}
              width="100%"
              type="submit"
              _hover={{ bg: "#F7570D", color: "white" }}
            >
              <Text fontSize="18px" fontWeight="400">
                Update
              </Text>
            </Button>
          </Flex>
        </Box>
      </form>
    </Box>
  );
};

export default RestaurantUpdate;
