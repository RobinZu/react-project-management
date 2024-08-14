
import { useState, useEffect } from "react";
import axios from "axios";

import { API_URL } from "../config/api";
import { useNavigate, useParams } from "react-router-dom";

function EditProjectPage() {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const { projectId } = useParams();

    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`${API_URL}/projects/${projectId}`)
            .then(response => {                
                setTitle(response.data.title);
                setDescription(response.data.description);
            })
            .catch(e => console.log(e))
    }, [projectId]);


    const handleFormSubmit = (e) => {
        e.preventDefault();

        const newDetails = {
            title: title,
            description: description
        }

        axios.put(`${API_URL}/projects/${projectId}`, newDetails)
            .then( response => {
                // redirect to project details page
                navigate(`/projects/${projectId}`);
            })
            .catch(e => console.log("Error updating project...", e))
    }

    const deleteProject = () => {
        axios.delete(`${API_URL}/projects/${projectId}`)
            .then( response => {
                navigate("/projects");
                
            })
            .catch(e => console.log("Error deleting project", e));
    }

    return (
        <div className="EditProjectPage">

            <h3>Edit the Project</h3>

            <form onSubmit={handleFormSubmit}>
                <label>
                    Title:
                    <input
                        type="text"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </label>

                <label>
                    Description:
                    <textarea
                        name="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </label>
                
                <button type="submit">Update Project</button>
            </form>

            <button onClick={deleteProject}>Delete Project</button>
        </div>
    );
}

export default EditProjectPage;
