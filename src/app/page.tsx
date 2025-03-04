"use client";

// import { Box, Flex } from "@chakra-ui/react";
// import { useAuth } from '@/context/AuthContext';
import AboutMeInformation from "@/components/aboutMeInformation"
import ProjectSection from "@/components/projectSection"
import { Fragment } from "react";

export default function Home() {

  // const { authStatus } = useAuth();


  return (
    <Fragment>
      <AboutMeInformation />
      <ProjectSection/>
    </Fragment>
  );
}
