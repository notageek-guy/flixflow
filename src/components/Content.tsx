import { Box, Button, Heading, Stack } from "@chakra-ui/react";
import React from "react";

import { Image } from "@chakra-ui/react";
export default function Content() {
  return (
    <Stack
      direction={["column", "row"]}
      spacing="24px"
      className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
    >
      <Box w="100%" maxW="lg">
        <Heading as="h1" size="4xl" className="font-bold text-green-500">
          Unlimited movies, TV shows, and more.
        </Heading>
        <p className="mt-4 text-lg text-gray-600">
          FlixFlow is a movie streaming service that offers a wide variety of
          award-winning TV shows, movies, anime, documentaries, and more on
          thousands of internet-connected devices.
        </p>
        <p className="mt-4 text-lg text-gray-600">
          You can watch as much as you want, whenever you want without a single
          ad – all for one low monthly price. There&apos;s always something new
          to discover and new TV shows and movies are added every week!
        </p>
        <Button
          mt="4"
          w="100%"
          maxW={"xs"}
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
          Get Started
        </Button>
      </Box>
      <Box w="100%" maxW="lg" className="hidden md:block">
        <Image
          className=" opacity-90 max-h-[500px] rounded-md"
          src="/poster.jpg"
          alt="FlixFlow"
          objectFit="cover"
          w="100%"
          h="100%"
        />
      </Box>
    </Stack>
  );
}
