import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import SelectableGrid from "./SelectableGrid";
import SelectableGridFeature from "./SelectableGridFeature";
import { useUserContext } from "../context/UserContext";
import axios from "axios";
import FormData from 'form-data';
import { useQuery } from "@tanstack/react-query";
import SelectableGridFilter from "./SelectableGridFilter";

const validationSchema = yup.object().shape({
  // name: yup.string().required("Name is required"),
  // nameRus: yup.string().required("Name is required"),
  // nameEng: yup.string().required("Name is required"),
  // engDesc: yup.string().required("Eng description is required"),
  // rusDesc: yup.string().required("Rus description is required"),
  // openingTime: yup.string().required("Opening time is required"),
  // closingTime: yup.string().required("Closing time is required"),
  // imageUrls: yup.array().min(1, "At least one photo is required"),
});

const prefixData = [
  { id: 1, prefix: "+994" },
  { id: 2, prefix: "+955" },
  { id: 3, prefix: "+988" },
];
const disCount = [
  { id: 1, discount: "10%" },
  { id: 2, discount: "20%" },
  { id: 3, discount: "30%" },
];

const RestaurantForm = () => {
  const width = useBreakpointValue({ base: "full", md: "50%" });
  const [previewPhotos, setPreviewPhotos] = useState([]);
  const [click, setClick] = useState(true);
  const { setFormData, setImages } = useUserContext();
  const {
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const { data } = useQuery({
    queryKey: ["fetchPrice"],
    queryFn: async () => {
      return axios
        .get("http://37.27.23.25:8090/api/v1/restaurant/price-list", {
          timeout: 2000,
          headers: { "Accept-language": "en" },
        })
        .then((res) => res.data);
    },
  });

  const handlePhotoChange = (e) => {
    const files = e.target.files;
    setPreviewPhotos(
      Array.from(files).map((file) => URL.createObjectURL(file))
    );
    setValue("files", files)

    setClick(true);
  };

  const onSubmit = async (data) => {

    const time = ":00"
    const newData = {
      ...data,
      phoneNumber: data.prefixNumber + data.phoneNumber,
      openingTime: data.openingTime + time,
      closingTime: data.closingTime + time,
      latitude: "40.459410578442636",
      longitude: "49.80123456789012",
    };
    delete newData.prefixNumber;

    setFormData(newData);
    setImages(previewPhotos);

    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId")
    console.log("token : -> " + token);
    const form = new FormData();
    for (let i = 0; i < newData?.files?.length; i++) {
      form.append(`files`, newData.files[i]);
    }
    delete newData.files
    try {
      const response = await axios.post(
        "http://37.27.23.25:8082/api/v1/restaurant/upload",
        form,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const lastData = { ...newData, images: response.data }

      try {

        setTimeout(async () => {
          const response = await axios.post(
            "http://37.27.23.25:8082/api/v1/restaurant",
            lastData,
            {
              headers: {
                "userId": userId
              },
            }
          );
          console.log("response : " + response)

          toast.success("Successful!", {
            autoClose: 2000,
          });
        }, 1500)

      } catch (error) {
        console.log(error)
      }

      toast.success("Post successful!", {
        autoClose: 2000,
      });
      console.log("Response:", response.data);
    } catch (error) {
      toast.error("Error posting. Please try again.", {
        autoClose: 2000,
      });
      console.error("Error:", error);
    }
    setTimeout(() => {
      window.location.reload();
    }, 3000);

  };



  return <>
    <Box pt={5}>
      <Flex alignItems="center" ml={5} columnGap={2}>
        <Icon fontSize="25px">
          <FaArrowLeftLong />
        </Icon>
        <Text fontWeight="500" fontSize="28px">
          New restaurant form
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
                    <Input type="file" onChange={handlePhotoChange} multiple />
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
            <Box alignItems="center">
              <FormLabel fontWeight="500" fontSize="28px">
                Name:
              </FormLabel>
              <Box width="375px" mb={5}>
                <FormControl isInvalid={errors.name}>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                      <Input
                        type="text"
                        {...field}
                        placeholder="Name in Russian"
                      />
                    )}
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>
              </Box>
              <FormLabel fontWeight="500" fontSize="28px">
                Title:
              </FormLabel>
              <Box width="375px" mb={5}>
                <FormControl isInvalid={errors.title}>
                  <Controller
                    control={control}
                    name="title"
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
              <FormLabel fontWeight="500" fontSize="28px">
                Description:
              </FormLabel>
              <Box width="375px">
                <FormControl isInvalid={errors.name}>
                  <Controller
                    control={control}
                    name="description"
                    render={({ field }) => (
                      <Textarea
                        type="text"
                        {...field}
                        placeholder=" Description"
                      />
                    )}
                  />
                  <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
                </FormControl>
              </Box>
            </Box>
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
                    name="slogan"
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
                      <Input type="time" {...field} width={120} />
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
                      <Input type="time" {...field} width={120} />
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
                        <Input type="text" {...field} placeholder="Address" />
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
                        name="phoneNumber"
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
            width={{ base: "100%", md: "50%", lg: "25%", xl: "400px" }}
          >
            <FormLabel fontWeight="500" fontSize="28px">
              Filter:
            </FormLabel>
            <Controller
              control={control}
              name="filterIds"
              defaultValue={[]}
              render={({ field }) => (
                <SelectableGridFilter
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
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem colSpan={1}>
                <Controller
                  name="price"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <Select placeholder="Select price" {...field}>
                      {data?.map((item) => (
                        <>
                          <option value={item.name} key={item.id}>
                            {item.name}
                          </option>
                        </>
                      ))}
                    </Select>
                  )}
                />
              </GridItem>
            </Grid>
          </Box>
          <Box
            mb={4}
            width={{ base: "100%", md: "50%", lg: "25%", xl: "300px" }}
          >
            <FormLabel fontWeight="500" fontSize="28px">
              DisCount:
            </FormLabel>
            <Grid templateColumns="repeat(2, 1fr)" gap={6}>
              <GridItem colSpan={1}>
                <Controller
                  name="discount"
                  control={control}
                  render={({ field }) => (
                    <Select placeholder="Select discount" {...field}>
                      <>
                        {disCount.map((item) => (
                          <option value={item.discount} key={item.id}>
                            {item.discount}
                          </option>
                        ))}
                      </>
                    </Select>
                  )}
                />
              </GridItem>
            </Grid>
          </Box>
          <Flex
            justifyContent="space-between"
            width={{ base: "100%", md: "50%", lg: "25%", xl: "400px" }}
          >
            <Button
              mt={10}
              width="100%"
              type="submit"
              _hover={{ bg: "#F7570D", color: "white" }}
            >
              <Text fontSize="18px" fontWeight="400">
                Submit
              </Text>
            </Button>
          </Flex>
        </Box>
      </form>
      <ToastContainer />
    </Box>
  </>
};

export default RestaurantForm;
