"use client";

import AboutMeInformation from "@/components/aboutMeInformation"
import ProjectSection from "@/components/projectSection"
import { Fragment , useEffect} from "react";
import useStore from '@/store/store';

export default function Home() {

  const { projects, loading, error, fetchProjects } = useStore();

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }



  return (
    <Fragment>
      <AboutMeInformation />
      <ProjectSection projects={projects} loading={loading} error={error}/>
    </Fragment>
  );
}
