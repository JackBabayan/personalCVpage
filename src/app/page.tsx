"use client";

import AboutMeInformation from "@/components/aboutMeInformation"
import ProjectSection from "@/components/projectSection"
import { Fragment, useEffect } from "react";
import useStore from '@/store/store';
import {
  Center, Text, Spinner
} from "@chakra-ui/react";

export default function Home() {

  const { projects, loading, error, fetchProjects } = useStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

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
    <Fragment>
      <AboutMeInformation />
      <ProjectSection projects={projects} loading={loading} error={error} />
    </Fragment>
  );
}
