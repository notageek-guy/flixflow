import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Stack,
  Heading,
  HStack,
  Center,
  Link,
  Flex,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { auth } from "@/firebase/appClient";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { FaGoogle, FaGithub } from "react-icons/fa";
import Head from "next/head";
export default function Signup() {
  const router = useRouter();
  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(email, password);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid h-screen place-items-center">
      <Head>
        <title>Sign Up</title>
      </Head>
      <div className="p-10 rounded-lg shadow-xl w-96">
        <Heading as="h1" size="xl" className="text-center text-green-400 ">
          FlixFlow
        </Heading>

        <Text className="text-center">Create an account</Text>
        <Center className="my-5">
          <HStack spacing={4}>
            <FaGithub size={30} className="text-green-400" />
            <FaGoogle size={30} className="text-green-400" />
          </HStack>
        </Center>
        <form className="mt-5" onSubmit={handleSubmit}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button type="submit" colorScheme={"green"} w="full">
              Sign Up
            </Button>
            <Flex justifyContent="center">
              <Text>Already have an account?</Text>
              <span className="ml-1 text-green-400 cursor-pointer">
                <Link href="/login">Login</Link>
              </span>
            </Flex>
          </Stack>
        </form>
      </div>
    </div>
  );
}
