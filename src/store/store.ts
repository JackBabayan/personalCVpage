import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';

interface AboutMe {
  description: string;
  ending: string;
  technicalSkills: [{
    coreTechnologies: { name: string, technologies: string[] },
    styling: { name: string, technologies: string[] },
    tools: { name: string, technologies: string[] },
    ui: { name: string, technologies: string[] },
    methodologies: { name: string, technologies: string[] }
  }];
}

interface Project {
  id: number;
  name: string;
}

interface Experience {
  position: string;
  location: string;
  dates: string;
  description: string;
  projects: string[];
}

interface StoreState {
  aboutMe: AboutMe | null;
  projects: Project[];
  experiences: Experience[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
  fetchExperiences: () => Promise<void>;
  fetchAboutMe: () => Promise<void>;
}

const useStore = create<StoreState>()(
  devtools((set) => ({
    aboutMe: null,
    projects: [],
    experiences: [],
    loading: false,
    error: null,
    fetchAboutMe: async () => {
      set({ loading: true, error: null });
      try {
        const response = await axios.get<AboutMe>('/mocData/aboutMe.json');
        set({ aboutMe: response.data, loading: false });
      } catch (error) {
        set({
          error: axios.isAxiosError(error) ? error.message : 'Failed to fetch about me data',
          loading: false,
        });
      }
    },

    fetchProjects: async () => {
      set({ loading: true, error: null });
      try {
        const response = await axios.get<Project[]>('/mocData/projects.json');
        set({ projects: response.data, loading: false });
      } catch (error) {
        set({
          error: axios.isAxiosError(error) ? error.message : 'Failed to fetch projects',
          loading: false,
        });
      }
    },

    fetchExperiences: async () => {
      set({ loading: true, error: null });
      try {
        const response = await axios.get<Experience[]>('/mocData/experiences.json');
        set({ experiences: response.data, loading: false });
      } catch (error) {
        set({
          error: axios.isAxiosError(error) ? error.message : 'Failed to fetch experiences',
          loading: false,
        });
      }
    },
  }))
);

export default useStore;
