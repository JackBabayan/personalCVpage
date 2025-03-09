"use client";
import { useEffect, useRef } from 'react';
import { Box, Heading, Text, List, ListItem, VStack, Divider, Spinner, Center, Container } from "@chakra-ui/react";
import useStore from '@/store/store';

import styles from "./style.module.scss"

const Experience = () => {
  const { experiences, loading, error, fetchExperiences } = useStore();


  useEffect(() => {
    fetchExperiences();
  }, [fetchExperiences]);

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
    <section className={styles.contactWrapper}>
      <h3>
        Experience
      </h3>

      {experiences.map((experience, index) => (
        <VStack key={index} align="start" spacing={4} mb={8}>
          <h5>
            {experience.position}
          </h5>
          <Text fontSize="lg" color="gray.500">
            {experience.location} | {experience.dates}
          </Text>
          <Text>{experience.description}</Text>
          <Text fontWeight="bold" mt={2}>Projects:</Text>
          <List spacing={2}>
            {experience.projects.map((project, idx) => (
              <ListItem key={idx}>{project}</ListItem>
            ))}
          </List>
          {index < experiences.length - 1 && <Divider />}
        </VStack>
      ))}
    </section>
  );
};

export default Experience;
