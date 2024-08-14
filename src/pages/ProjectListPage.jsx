import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

import { API_URL } from "../config/api";


function ProjectListPage() {
  const [projects, setProjects] = useState(null);

  const getAllProjects = () => {
    axios
      .get(`${API_URL}/projects?_embed=tasks`)
      .then((response) => {
        const projectsFromApi = response.data;
        const newList = projectsFromApi.reverse();
        setProjects(newList);
      })
      .catch((error) => console.log("Error getting projects from the API...", error));
  };

  useEffect(() => {
    getAllProjects();
  }, []);

  if(projects === null){
    return <Loader />;
  }
  
  return (
    <div className="ProjectListPage">
      
        {projects && projects.map((project) => {
          return (
            <div className="ProjectCard card" key={project.id} >
              <Link to={`/projects/${project.id}`}>
                <h3>{project.title}</h3>
              </Link>
            </div>
          );
        })}     
       
    </div>
  );
}

export default ProjectListPage;
