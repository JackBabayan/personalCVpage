"use client";

import { Box, Flex } from "@chakra-ui/react";
import { useAuth } from '@/context/AuthContext';

export default function Home() {

  const { login } = useAuth();

  return (
    <Box mt="20px" mb="20px" h="20vh">
      <Flex gap="4" align="center" h="100%" justify="center">
        <h1>Hi , this is home page ,{login ? "You are also logged in" : "You need authorisation"}</h1>
      </Flex>
    </Box>
  );
}
