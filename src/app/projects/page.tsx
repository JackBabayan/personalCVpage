"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';
import Link from "next/link";

import { Box, Input, Button, List, Container, Spinner ,Center} from "@chakra-ui/react";

import styles from "./style.module.scss"

export default function Projects() {



  return (
    <Container maxW="80vw" mt="20px" mb="20px" className={styles.pokemonWrapper}>
      <Box as="section" mb="20px">
        Projects
      </Box>
    </Container>
  );
}
