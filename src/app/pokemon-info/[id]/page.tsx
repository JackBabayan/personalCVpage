"use client"
import { useEffect, useState } from 'react';
import Link from "next/link";
import { useParams } from 'next/navigation';
import {
  Box, Text, Container, Breadcrumb,
  BreadcrumbItem,Spinner, Center
} from '@chakra-ui/react';

import { ChevronRightIcon } from "@chakra-ui/icons";

export default function PokemonDetail() {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [id]);

  if (!data) return  <Container maxW="80vw" mt="20px" mb="20px">
    <Center bg="bg.emphasized" h="100vh" w="100%">
      <Spinner size="lg" />
    </Center>
  </Container>

  return (
    <Container maxW="80vw" mt="20px" mb="20px">
      <Box mb="20px">

        <Breadcrumb  spacing='8px' separator={<ChevronRightIcon color='gray.500' />}>

          <BreadcrumbItem>
            <Link href="/">Home Page</Link>
          </BreadcrumbItem>

          <BreadcrumbItem>
            <Link href="/pokemon-page">Pokemon Page</Link>
          </BreadcrumbItem>

        </Breadcrumb>


      </Box>

      <Box>
        <Text>Name: {data.name}</Text>
        <Text>Height: {data.height}</Text>
        <Text>Weight: {data.weight}</Text>
      </Box>
    </Container>
  );
}
