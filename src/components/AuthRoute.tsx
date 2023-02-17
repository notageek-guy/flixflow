import React from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { Center, Spinner } from "@chakra-ui/react";
import type { FC } from "react";

export const AuthRoute: FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();
  if (loading)
    return (
      <Center h="100vh">
        <Spinner 
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Center>
    );
  if (user) {
    return <>{children}</>;
  } else {
    router.push("/login");
    return null;
  }
};