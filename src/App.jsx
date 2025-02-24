import React from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainLayout from "./layouts/MainLayout";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";
import { HashRouter } from 'react-router-dom';

const App = () => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "/api";
  // Add new job
  const addJob = async (newJob) => {
    const res = await fetch(`${baseUrl}/jobs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newJob),
    });
    return;
  };

  // delete job
  const deleteJob = async (id) => {
    const res = await fetch(`${baseUrl}/jobs/${id}`, {
      method: "DELETE",
    });
    return;
  };

  // updateJob
  const updateJob = async (updatedJob) => {
    const res = await fetch(`${baseUrl}/jobs/${updatedJob.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedJob),
    });
    return;
  };

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="/allJobs" element={<JobsPage />} />
        {/* Passing a function and calling here i.e. addJob */}
        <Route path="/add-job" element={<AddJobPage addJobSubmit={addJob} />} />
        <Route
          path="/allJobs/:id"
          element={<JobPage deleteJob={deleteJob} />}
          loader={jobLoader}
        />
        <Route
          path="edit-job/:id"
          element={<EditJobPage updateJobSubmit={updateJob} />}
          loader={jobLoader}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    )
  );

  return (
    <HashRouter>
      <RouterProvider router={router} />
    </HashRouter>
  );
};

export default App;
