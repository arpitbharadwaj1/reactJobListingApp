import React from "react";
import JobCard from "./JobCard";
import { useState, useEffect } from "react";
import Spinner from "./Spinner";

const JobListing = ({ isHome = false }) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const baseUrl = import.meta.env.VITE_API_BASE_URL || "/api";
      console.log(import.meta , 'meta')
      const apiUrl = isHome ? `${baseUrl}/jobs?_limit=3` : `${baseUrl}/jobs`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setJobs(data);
        setLoading(false);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };
    // calling the const
    fetchJobs();
  }, []);

  return (
    <>
      <section className="bg-blue-50 px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-indigo-500 mb-6 text-center">
            {isHome ? "Recent Jobs" : "Browse Jobs"}
          </h2>

          {loading ? (
            <Spinner loading={loading} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <JobCard key={job.id} job={job}></JobCard>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default JobListing;
