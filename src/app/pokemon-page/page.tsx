"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';
import Link from "next/link";

import { Box, Input, Button, List, Container, Spinner ,Center} from "@chakra-ui/react";

import styles from "@/styles/pokemon.module.scss"

export default function PokemonPage() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    setLoading(true);
  
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => {
        setData((prevData) => {
          const newData = data.results.filter(
            (item) => !prevData.some((existing) => existing.name === item.name)
          );
          return [...prevData, ...newData];
        });
        setHasMore(data.results.length > 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [offset]);
  

  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxW="80vw" mt="20px" mb="20px" className={styles.pokemonWrapper}>
      <Box as="section" mb="20px">
        <Input
          placeholder="Search Pokémon"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Box>

      <Box as="section" mb="20px">
        <List.Root gap="2" listStyle="decimal" align="center">
          {filteredData.map((item, ind) => (
            <List.Item key={ind}>
              <Link href={`/pokemon-info/${item.name}`}>{item.name}</Link>
            </List.Item>
          ))}
        </List.Root>
      </Box>

      {loading &&  <Center bg="bg.emphasized" h="100vh" w="100%"><Spinner size="lg"  /></Center>}

      {hasMore && !loading && (
        <Button
          onClick={() => setOffset((prevOffset) => prevOffset + 20)}
          colorScheme="blue"
        >
          Load More
        </Button>
      )}
    </Container>
  );
}
