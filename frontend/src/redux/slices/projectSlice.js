import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
let initialState = {
    projects: [],
    selectedProject: {},
    errors: "",
    };
const projectsSlice=createSlice({
    name: "projects",
    initialState,
    reducers: {
        populateProjects(state, action) {
        state.projects = action.payload;
        },
        selectProject(state, action) {
            state.populateProjects = action.payload;
            },
        addProject: (state, action) => {
            const payload = action.payload;
            state.projects.push(payload);
            },
        deleteProject: (state, action) => {
            const payload = action.payload;
            const index = state.projects.findIndex((project) => project._id === payload);
            if (index !== -1) {
                state.projects.splice(index, 1);
                               }
       },
       updateProject: (state, action) => {
        const payload = action.payload;
        state.projects.set(payload);
                           },
      
    
         setErrors(state, action) {
                 state.errors = action.payload;
          },
             },
             
        
        });
        

export const fetchProjects=()=>async(dispatch)=>{
    const config = {
        headers: {
            "Content-Type":"appliation/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    }
    axios.get(`/project/getAll`, config)
                .then((response) => {
                 dispatch(populateProjects(response.data));
                 console.log(response.data)
                })
                .catch((error) => {
                  console.log(error)
                })
}





export const selectProjects=(state)=>{
    return [state.projects.projects,state.projects.errors];
}
export const {populateProjects,addProject,setErrors,deleteProject,selectProject,updateProject}=projectsSlice.actions;
export default projectsSlice.reducer;