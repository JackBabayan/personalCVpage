"use client"
import { useEffect, useState } from 'react';
import Link from "next/link";
import { useParams } from 'next/navigation';
import { Box, Text, Container, Breadcrumb, For, Spinner, Center } from '@chakra-ui/react';

export default function PokemonDetail() {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [id]);

  if (!data) return <Container mt="20px" mb="20px">
    <Center bg="bg.emphasized" h="100vh" w="100%">
      <Spinner size="lg" />
    </Center>
  </Container>

  return (
    <Container mt="20px" mb="20px">
      {/* <Box mb="20px">
        <For each={["underline"]}>
          {(variant) => (
            <Breadcrumb.Root key={variant} variant={variant}>
              <Breadcrumb.List>
                <Breadcrumb.Item>
                  <Link href="/">Home Page</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
                <Breadcrumb.Item>
                  <Link href="/pokemon-page">Pokemon Page</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Separator />
              </Breadcrumb.List>
            </Breadcrumb.Root>
          )}
        </For>
      </Box> */}

      <Box>
        <Text>Name: {data.name}</Text>
        <Text>Height: {data.height}</Text>
        <Text>Weight: {data.weight}</Text>
      </Box>
    </Container>
  );
}
