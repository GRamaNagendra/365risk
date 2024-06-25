import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ProblemDetails = () => {
  const { name, problemId } = useParams();
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    fetchProblem();
  }, [name, problemId]);

  const fetchProblem = async () => {
    try {
      const response = await axios.get(`/api/industries/${name}/problems/${problemId}`);
      setProblem(response.data);
    } catch (error) {
      console.error('Error fetching problem:', error);
    }
  };

  if (!problem) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{problem.title}</h2>
      {problem.imagePath && <img src={`/${problem.imagePath}`} alt={problem.title} />}
      <p>{problem.description}</p>
    </div>
  );
};

export default ProblemDetails;
