/*import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Job = {
  id: string;
  title: string;
  company: string;
  logo: string;
  experience: number;
  skills: string[];
  description: string;
  applied: boolean;
};

type JobState = {
  jobs: Job[];
};

const initialState: JobState = {
  jobs: [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'TechCorp',
      logo: '/assets/logo1.png',
      experience: 2,
      skills: ['React', 'TypeScript', 'CSS'],
      description: 'We are looking for a talented Frontend Developer...',
      applied: false,
    },
    {
      id: '2',
      title: 'Backend Developer',
      company: 'CodeBase',
      logo: '/assets/logo2.png',
      experience: 3,
      skills: ['Node.js', 'MongoDB', 'Express'],
      description: 'Join our backend team to build APIs...',
      applied: false,
    },
    // Add more mock jobs here...
  ],
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    applyJob: (state, action: PayloadAction<string>) => {
      const job = state.jobs.find((j) => j.id === action.payload);
      if (job) job.applied = true;
    },
  },
});

export const { applyJob } = jobSlice.actions;
export default jobSlice.reducer;
export type { Job };

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Job = {
  id: string;
  title: string;
  company: string;
  logo: string;
  experience: number;
  skills: string[];
  description: string;
  applied: boolean;
};

type JobState = {
  jobs: Job[];
};

const initialState: JobState = {
  jobs: [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'TechCorp',
      logo: '/assets/logo1.png',
      experience: 2,
      skills: ['React', 'TypeScript', 'CSS'],
      description: 'We are looking for a talented Frontend Developer...',
      applied: false,
    },
    {
      id: '2',
      title: 'Backend Developer',
      company: 'CodeBase',
      logo: '/assets/logo2.png',
      experience: 3,
      skills: ['Node.js', 'MongoDB', 'Express'],
      description: 'Join our backend team to build APIs...',
      applied: false,
    },
    // Add more mock jobs here...
  ],
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    applyJob: (state, action: PayloadAction<string>) => {
      const job = state.jobs.find((j) => j.id === action.payload);
      if (job) {
        job.applied = true;
      }
    },
    resetJobApplications: (state) => {
      state.jobs.forEach((job) => (job.applied = false));
    },
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.push(action.payload);
    },
    updateJob: (state, action: PayloadAction<Job>) => {
      const index = state.jobs.findIndex((j) => j.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
    },
    deleteJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter((j) => j.id !== action.payload);
    },
  },
});

export const { applyJob, resetJobApplications, addJob, updateJob, deleteJob } = jobSlice.actions;
export default jobSlice.reducer;
*/
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Job = {
  id: string;
  title: string;
  company: string;
  logo: string;
  experience: number;
  skills: string[];
  description: string;
  applied: boolean;
};

export type Application = {
  jobId: string;
  name: string;
  email: string;
  skills: string; // formatted string like "React Node.js"
  resume: string;
};

type JobState = {
  jobs: Job[];
  applications: Application[];
};

const initialState: JobState = {
  jobs: [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'TechCorp',
      logo: '/assets/logo1.png',
      experience: 2,
      skills: ['React', 'TypeScript', 'CSS'],
      description: 'We are looking for a talented Frontend Developer...',
      applied: false,
    },
    {
      id: '2',
      title: 'Backend Developer',
      company: 'CodeBase',
      logo: '/assets/logo2.png',
      experience: 3,
      skills: ['Node.js', 'MongoDB', 'Express'],
      description: 'Join our backend team to build APIs...',
      applied: false,
    },
  ],
  applications: [],
};

const jobSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    applyJob: (state, action: PayloadAction<string>) => {
      const job = state.jobs.find((j) => j.id === action.payload);
      if (job) job.applied = true;
    },
    resetJobApplications: (state) => {
      state.jobs.forEach((job) => (job.applied = false));
      state.applications = [];
    },
    addJob: (state, action: PayloadAction<Job>) => {
      state.jobs.push(action.payload);
    },
    updateJob: (state, action: PayloadAction<Job>) => {
      const index = state.jobs.findIndex((j) => j.id === action.payload.id);
      if (index !== -1) {
        state.jobs[index] = action.payload;
      }
    },
    deleteJob: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter((j) => j.id !== action.payload);
    },
    submitApplication: (state, action: PayloadAction<Application>) => {
      state.applications.push(action.payload);
    },
  },
});

export const {
  applyJob,
  resetJobApplications,
  addJob,
  updateJob,
  deleteJob,
  submitApplication,
} = jobSlice.actions;

export default jobSlice.reducer;
