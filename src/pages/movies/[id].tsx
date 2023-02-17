import {
  Flex,
  Heading,
  Image,
  Stack,
  useDisclosure,
  Modal,
  useToast,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  Center,
  IconButton,
} from "@chakra-ui/react";
import { BsFillBookmarkHeartFill } from "react-icons/bs";
import { BsArrowLeft } from "react-icons/bs";
import { useRouter } from "next/router";

import ReactPlayer from "react-player";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase/appClient";
import React from "react";
import Head from "next/head";
function Movie() {
  const toast = useToast();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const goBack = () => {
    router.back();
  };
  const favoritesRef = collection(db, "favorites");
  const addToFavorites = async ({
    title,
    image,
  }: {
    title: string;
    image: string;
  }) => {
    try {
      const docRef = await addDoc(favoritesRef, {
        title,
        image,
      });
      toast({
        title: "Added to favorites",
        description: "We've added this movie to your favorites",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {}
  };
  const data = router.query;
  const movieData = () => {
    try {
      const movieData = JSON.parse(data.data as string);

      return (
        <Flex
          blur={isOpen ? "20px" : "0px"}
          align="center"
          justifyContent={"space-between"}
          direction={["column", "column", "row", "row"]}
          gap="4"
        >
          <Image
            src={movieData.image}
            alt={movieData.title}
            w="100%"
            className="max-w-xs rounded-lg shadow-2xl opacity-90"
            h="auto"
            mb="4"
          />
          <Stack
            spacing="4"
            w="100%"
            maxW="lg"
            className="px-4 mx-auto sm:px-6 lg:px-8"
          >
            <Heading as="h1" size="2xl" className="font-bold ">
              {movieData.title}
            </Heading>
            <BsFillBookmarkHeartFill
              onClick={() => {
                addToFavorites({
                  title: movieData.title,
                  image: movieData.image,
                });
              }}
              className={`text-2xl text-green-500 hover:text-green-600
                cursor-pointer active:text-green-700
              `}
            />
            <span className="text-gray-600">{movieData.description}</span>

            <span className="text-gray-600">
              Rating: {movieData.rating} / 10
            </span>
            <span className="text-gray-600">
              Release Date: {movieData.releaseDate}
            </span>
            <button
              className="px-4 py-2 font-bold text-white bg-green-500 rounded-full hover:bg-green-700"
              onClick={onOpen}
            >
              Watch Trailer
            </button>
          </Stack>
          <Modal isOpen={isOpen} onClose={onClose} isCentered>
            <ModalOverlay />
            <ModalCloseButton />
            <ModalContent>
              <ModalBody>
                <Center>
                  <ReactPlayer url={movieData.movieTrailer} controls />
                </Center>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Flex>
      );
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <Head>
        <title>Movie App</title>
      </Head>
      <div
        className={`
    container px-4 py-16 mx-auto
    
  `}
      >
        <IconButton
          my="4"
          bg="green.500"
          _hover={{
            bg: "green.600",
          }}
          onClick={goBack}
          icon={<BsArrowLeft />}
          aria-label="Go Back"
        />

        {movieData()}
      </div>
    </>
  );
}

export default React.memo(Movie);
