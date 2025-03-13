"use client";

import { Fragment, useEffect } from "react";
import { Box, Heading, Text, Flex, ListItem, VStack, Spinner, Center } from "@chakra-ui/react";
import useStore from '@/store/store';

import styles from "./style.module.scss"

const About = () => {
  const { aboutMe, loading, error, fetchAboutMe } = useStore();

  useEffect(() => {
    fetchAboutMe();
  }, [fetchAboutMe]);

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
    <section className={styles.abourWrapper}>
      <h3>
        About Me
      </h3>
  
      <Box mb={6}>
        <Text fontSize="lg" dangerouslySetInnerHTML={{ __html: aboutMe?.description || '' }} />
      </Box>

      <VStack spacing={6} paddingLeft={7} align="start">
        {aboutMe?.technicalSkills && aboutMe.technicalSkills.map((section, index) => (
          <Flex key={index} gap={1}     flexWrap={"wrap"}>
            <h5>{section.coreTechnologies?.name || section.styling?.name || section.tools?.name || section.ui?.name || section.methodologies?.name} : </h5>
              {(section.coreTechnologies?.technologies || section.styling?.technologies || section.tools?.technologies || section.ui?.technologies || section.methodologies?.technologies)?.map((tech, idx) => (
                <Text key={idx}>{tech} {(section.coreTechnologies?.technologies || section.styling?.technologies || section.tools?.technologies || section.ui?.technologies || section.methodologies?.technologies).length -1 != idx && ","}</Text>
              ))}
           
          </Flex>
        ))}
      </VStack>
      <Box mt={8}>
        <Text fontSize="lg">{aboutMe?.ending}</Text>
      </Box>
    </section>
  );
};

export default About;