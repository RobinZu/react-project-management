import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";

const API_URL = "https://project-management-api-4641927fee65.herokuapp.com";


function ProjectListPage() {
  const [projects, setProjects] = useState(null);

  const getAllProjects = () => {
    axios
      .get(`${API_URL}/projects?_embed=tasks`)
      .then((response) => setProjects(response.data))
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
