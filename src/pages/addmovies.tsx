import Layout from "@/components/Layout";
import { addDoc, collection } from "firebase/firestore";

import { db } from "@/firebase/appClient";
import { useEffect, useState } from "react";
import {
  useToast,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@chakra-ui/react";
import Head from "next/head";

export default function Editor() {
  const toast = useToast();
  const [movie, setMovie] = useState({
    title: "",
    description: "",
    rating: 0,
    image: "",
    movieTrailer: "",
    releaseDate: "",
  });
  const movieRef = collection(db, "movies");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(movieRef, movie);
      setMovie({
        title: "",
        description: "",
        movieTrailer: "",
        rating: 0,
        image: "",
        releaseDate: "",
      });
      toast({
        title: "Movie added.",
        description: "We've added your movie for you.",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    setMovie({
      title: "",
      description: "",
      movieTrailer: "",
      rating: 0,
      image: "",
      releaseDate: "",
    });
  }, []);
  return (
    <Layout>
      <Head>
        <title>Add Movie</title>
      </Head>
      <div className="container px-2 py-2 mx-auto sm:py-4 sm:px-4">
        <form className="w-full max-w-xs mx-auto sm:max-w-sm " onSubmit={handleSubmit}>
          <FormControl id="title">
            <FormLabel>Title</FormLabel>
            <Input type="text" name="title" onChange={handleChange} />
          </FormControl>
          <FormControl id="description" mt="2">
            <FormLabel>Description</FormLabel>
            <Input type="text" name="description" onChange={handleChange} />
          </FormControl>
          <FormControl id="rating" mt="2">
            <FormLabel>Rating</FormLabel>
            <Input type="number" name="rating" onChange={handleChange} />
          </FormControl>
          <FormControl id="movieTrailer" mt="2">
            <FormLabel>Movie Trailer</FormLabel>
            <Input type="url" name="movieTrailer" onChange={handleChange} />
          </FormControl>
          <FormControl id="releaseDate" mt="2">
            <FormLabel>Release Date</FormLabel>
            <Input type="text" name="releaseDate" onChange={handleChange} />
          </FormControl>

          <FormControl id="image" mt="2">
            <FormLabel>Image</FormLabel>
            <Input type="url" name="image" onChange={handleChange} />
          </FormControl>
          <Button
            type="submit"
            mt="4"
            w="100%"
            maxW={"xs"}
            mx="auto"
            sx={{
              bg: "#22c55e",
              _hover: {
                opacity: "0.8",
              },
              color: "black",
              padding: "2rem 1rem",
            }}
            variant="solid"
          >
            Add Movie
          </Button>
        </form>
      </div>
    </Layout>
  );
}
