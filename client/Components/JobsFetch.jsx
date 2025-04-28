import React, { useEffect, useState, useRef, useCallback } from 'react';
import '../css/JobFetch.css'; // Ensure this CSS file exists

const JobFetch = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const observer = useRef();

  // Fetch jobs from API
  const fetchJobs = async () => {
    setLoading(true);
    setError(null);

    const url = "https://jooble.org/api/185b4ee9-fcf5-4660-ac3f-216a5bf3cfdd";
    const params = {
      keywords: 'web developer',
      location: 'India',
      page: page
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      const data = await response.json();
      console.log("Jooble API raw response:", data);

      if (data && Array.isArray(data.jobs)) {
        setJobs(prev => [...prev, ...data.jobs]); // Append new jobs to the list
      } else {
        setError("No jobs found or invalid response.");
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Something went wrong while fetching jobs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, [page]);

  // Infinite scroll: When last card is in view, fetch more jobs
  const lastJobRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setPage(prev => prev + 1); // Load next page of jobs
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  return (
    <div className='main'><h2>Available Jobs</h2>
    <div className="job-container">
      

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && jobs.length === 0 && <p>No jobs found.</p>}

      {jobs.map((job, index) => (
        <div
          className="job-card"
          key={index}
          ref={index === jobs.length - 1 ? lastJobRef : null} // Attach ref to last job for infinite scroll
        >
          <h3>{job.title}</h3>
          <p><strong>Company:</strong> {job.company || 'N/A'}</p>
          <p><strong>Location:</strong> {job.location || 'N/A'}</p>
          <p>{job.snippet?.slice(0, 150)}...</p>
          <a className="read-more-btn" href={job.link} target="_blank" rel="noopener noreferrer">
            View Job
          </a>
        </div>
      ))}
    </div>
    </div>
  );
};

export default JobFetch;
