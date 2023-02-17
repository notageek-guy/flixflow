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
  Flex,
  Center,
} from "@chakra-ui/react";

import { useAuth } from "@/context/AuthContext";
import { FaGoogle, FaGithub } from "react-icons/fa";

import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/appClient";

import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
export default function Login() {
  const router = useRouter();
  const { handleGoogleLogin, handleGithubLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(email, password);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid h-screen place-items-center">
      <Head>
        <title>Login</title>
      </Head>
      <div className="p-10 rounded-lg shadow-xl w-96">
        <Heading as="h1" size="xl" className="text-center text-green-400 ">
          FlixFlow
        </Heading>

        <Text className="text-center">Login to your account</Text>
        <Center className="my-5">
          <HStack spacing={4}>
            <FaGithub
              onClick={handleGithubLogin}
              size={30}
              className="text-green-400 cursor-pointer"
            />
            <FaGoogle
              onClick={handleGoogleLogin}
              size={30}
              className="text-green-400 cursor-pointer"
            />
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
              Login
            </Button>
            <Flex justifyContent="center">
              <Text>Don&apos;t have an account?</Text>
              <span className="ml-1 text-green-400 cursor-pointer">
                <Link href="/signup">Sign Up</Link>
              </span>
            </Flex>
          </Stack>
        </form>
      </div>
    </div>
  );
}
