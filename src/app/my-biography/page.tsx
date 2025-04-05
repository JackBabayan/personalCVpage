"use client";

import { useEffect } from "react";
import { Box, Flex, Spinner, Text, VStack, Center } from "@chakra-ui/react";
import useStore from '@/store/store';
import BookSlider from '@/components/BookSlider';
import styles from "./style.module.scss";

const BioPage = () => {
  const { bio, loading, error, fetchBio } = useStore();

  useEffect(() => {
    fetchBio();
  }, [fetchBio]);

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" />
      </Center>
    );
  }

  if (error) {
    return (
      <Box color="red.500" textAlign="center">
        <Text>{error}</Text>
      </Box>
    );
  }
  return (
    <section className={styles.bioWrapper}>
      <h3>
        {bio?.title}
      </h3>
      <Box mt={4} mb={20}>
        <Text fontSize="lg">{bio?.description}</Text>
      </Box>

      <VStack spacing={10} align="start">
        {bio?.content?.map((item, index) => (
          <Flex key={index} gap={16}>
            <div>
              <h4>{item.title}</h4>
              <Text fontSize="md" mt={2}>{item.description}</Text>
            </div>
            <BookSlider images={item.images} />
          </Flex>
        ))}
      </VStack>
    </section>
  );
};

export default BioPage;
