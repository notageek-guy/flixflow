import {
  Flex,
  Heading,
  useMediaQuery,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Avatar,
  Link,
  Divider,
  HStack,
} from "@chakra-ui/react";
import Logout from "./Logout";
import { BiCameraMovie } from "react-icons/bi";
import Hamburger from "hamburger-react";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const list = [
    {
      name: "Movies",
      href: "/movies",
      id: 1,
    },

    {
      name: "Search",
      href: "/search",
      id: 2,
    },
    {
      name: "Watchlist",
      id: 3,
      href: "/watchlist",
    },
    {
      name: "Editor",
      id: 4,
      href: "/addmovies",
    },
  ];

  const { user } = useAuth();
  const [isOpen, setOpen] = useState(false);
  const [isLargerThan768] = useMediaQuery("(min-width: 768px)");
  const hoverEffects = {
    _hover: {
      color: "gray.400",
      transition: "all 0.2s ease-in-out",
    },
  };
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      w="100%"
      p={8}
      bg="gray.800"
      color="white"
    >
      <Flex align="center" mr={5}>
        <Heading
          as="h1"
          size={{
            base: "md",
            md: "lg",
            lg: "xl",
          }}
          className="text-green-400"
        >
          FlixFlow
        </Heading>
        <BiCameraMovie className="ml-2 text-green-400" size={30} />
      </Flex>
      <Flex align="center" mr={5} display={isLargerThan768 ? "none" : "flex"}>
        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          color="white"
          size={20}
          label="Show menu"
        />
        <Drawer
          size="full"
          isOpen={isOpen}
          placement="right"
          onClose={() => setOpen(false)}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>
                <Flex direction={"column"} align="center" gap="4">
                  <Avatar size={"xl"} src={user?.photoURL} />
                  <Flex align="center" justifyContent={"center"}>
                    <Heading as="h1" size="md" className="text-gray-400">
                      {user?.displayName}
                    </Heading>
                    <Logout />
                  </Flex>
                </Flex>
              </DrawerHeader>
              <Divider />
              <DrawerBody>
                <Flex direction="column" align="center" gap="4" mt={4}>
                  <Link
                    href="/movies"
                    w="100%"
                    className="text-center text-gray-200 "
                    _hover={{
                      color: "gray.400",
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    Movies
                  </Link>
                  <Link
                    href="/search"
                    w="100%"
                    className="text-center text-gray-200"
                    _hover={{
                      color: "gray.400",
                      transition: "all 0.2s ease-in-out",
                    }}
                  >
                    Search
                  </Link>
                  <Link
                    href="/watchlist"
                    w="100%"
                    className="text-center text-gray-200"
                  >
                    Watchlist
                  </Link>
                </Flex>
              </DrawerBody>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </Flex>
      <Flex align="center" mr={5} display={isLargerThan768 ? "flex" : "none"}>
        <HStack spacing="24px" mr={4}>
          {list.map(({ name, href, id }) => {
            return (
              <Link
                key={id}
                href={href}
                w="100%"
                className="text-center text-gray-200 "
                {...hoverEffects}
              >
                {name}
              </Link>
            );
          })}
        </HStack>
        <Logout />
      </Flex>
    </Flex>
  );
}
