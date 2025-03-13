"use client";

import { useState, useEffect, useMemo } from "react";
import {
  Box, Center, SimpleGrid, Text, Tab, TabList, TabPanel, TabPanels, Tabs, Spinner
} from "@chakra-ui/react";
import ProjectItems from "@/components/projectItems";
import useStore from "@/store/store";

import styles from './style.module.scss';


export default function PortfolioPage() {

  const { portfolio, loading, error, fetchPortfolio } = useStore();
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    fetchPortfolio();
  }, [fetchPortfolio]);

  const filteredProjects = useMemo(() => {
    return portfolio.flatMap((category) => category.projects);
  }, [portfolio, activeTab]);

  if (loading) {
    return (
      <Center height="100vh">
        <Spinner size="xl" color="teal.500" />
      </Center>
    );
  }

  if (error) {
    return (
      <Center height="100vh">
        <Text fontSize="xl" color="red.500">Error: {error}</Text>
      </Center>
    );
  }

  return (
    <section className={styles.wrapper}>
      <Box className={styles.top} maxWidth={{ base: '100%', md: '70%', lg: '70%' }}>
        <h3>
          Portfolio
        </h3>
        <Box>
          <Text fontSize="lg" >
            Explore different projects I have worked on across various categories.
          </Text>
        </Box>
      </Box>

      <Tabs
        className={styles.tabsWrap}
        variant="soft-rounded"
        colorScheme="teal"
        onChange={setActiveTab}
      >
        <TabList display="flex" justifyContent="center" flexWrap="wrap" className={styles.tabsTop}>
          <Tab fontSize="lg" fontWeight="medium">All</Tab>
          {portfolio.map((tabItem, index) => (
            <Tab key={index} fontWeight="medium" minWidth={'230px'}>
              <Box>
                <Text fontSize="Lg">
                  {tabItem.tab}
                </Text>
                <Text as={"span"} fontSize="sm">{tabItem.date}</Text>
              </Box>
            </Tab>
          ))}
        </TabList>

        <TabPanels>
          <TabPanel>
            <SimpleGrid columns={1} spacing={10} className={styles.greedWrap}>
              {filteredProjects.map((project, index) => (
                <Box
                  key={index}
                  boxShadow="lg"
                  borderRadius="md"
                  p={4}
                  bg="white"
                  maxWidth={{ base: '100%', md: '70%', lg: '70%' }}
                >
                  <ProjectItems project={project} />
                </Box>
              ))}
            </SimpleGrid>
          </TabPanel>

          {portfolio.map((item, index) => (
            <TabPanel key={index}>
              <SimpleGrid columns={1} spacing={10} className={styles.greedWrap}>
                {item?.projects?.map((project, ind) => (
                  <Box
                    key={ind}
                    boxShadow="lg"
                    borderRadius="md"
                    p={4}
                    bg="white"
                    maxWidth={{ base: '100%', md: '70%', lg: '70%' }}
                  >
                    <ProjectItems project={project} />
                  </Box>
                ))}
              </SimpleGrid>
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </section>
  );
}
