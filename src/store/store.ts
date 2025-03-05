import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';

// Определяем типы для состояния
interface Project {
  id: number;
  name: string;
}

interface StoreState {
  projects: Project[];
  loading: boolean;
  error: string | null;
  fetchProjects: () => Promise<void>;
}

const useStore = create<StoreState>()(
  devtools((set) => ({
    projects: [],
    loading: false,
    error: null,

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
  }))
);

export default useStore;