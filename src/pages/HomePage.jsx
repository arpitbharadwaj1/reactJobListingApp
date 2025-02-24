import React from "react";
import Hero from "../components/Hero";
import HomeCards from "../components/HomeCards";
import JobListing from "../components/JobListing";
import ViewAllJobs from "../components/ViewAllJobs";

const HomePage = () => {
  return (
    <>
      <Hero></Hero>
      <HomeCards></HomeCards>
      <JobListing isHome={true}></JobListing>
      <ViewAllJobs></ViewAllJobs>
    </>
  );
};

export default HomePage;
