"use client";

import { Fragment, useEffect } from "react";
import ChatAI from "@/components/chatAI"
import { Box, Heading, Text, Flex, VStack, Spinner, Center } from "@chakra-ui/react";
import useStore from '@/store/store';

import styles from "./styles.module.scss"

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
    <section className={styles.aboutWrapper}>
      <Heading as='h3' size='md'>
        About Me
      </Heading>

      <Box mb={9}>

        <VStack spacing={6} align="start">
          <Text fontSize="lg" dangerouslySetInnerHTML={{ __html: aboutMe?.description || '' }} />
          {aboutMe?.technicalSkills && aboutMe.technicalSkills.map((section, index) => (
            <Flex key={index} gap={1} className={styles.technicalSkillsWrap}>
              <h5>{section.coreTechnologies?.name || section.styling?.name || section.tools?.name || section.ui?.name || section.methodologies?.name}: </h5>
              <Flex key={index} gap={1} flexWrap={"wrap"}>
                {(section.coreTechnologies?.technologies || section.styling?.technologies || section.tools?.technologies || section.ui?.technologies || section.methodologies?.technologies)?.map((tech, idx) => (
                  <Fragment key={idx}>
                    <Text as={"span"} key={idx}>{tech}</Text>
                    {(section.coreTechnologies?.technologies || section.styling?.technologies || section.tools?.technologies || section.ui?.technologies || section.methodologies?.technologies).length - 1 != idx && ", "}
                  </Fragment>
                ))}
              </Flex>
            </Flex>
          ))}
          <Text fontSize="lg">{aboutMe?.ending}</Text>
        </VStack>
      </Box>

      <Box>
        <ChatAI />
      </Box>
    </section>
  );
};

export default About;