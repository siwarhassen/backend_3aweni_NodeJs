import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
let initialState = {
    skills: [],
    selectedSkill: {},
    errors: "",
    };
const skillsSlice=createSlice({
    name: "skills",
    initialState,
    reducers: {
        populateSkills(state, action) {
        state.skills = action.payload;
        },
        selectSkill(state, action) {
            state.populateSkills = action.payload;
            },
        addSkill: (state, action) => {
            const payload = action.payload;
            state.skills.push(payload);
            },
        deleteSkill: (state, action) => {
            const payload = action.payload;
            const index = state.skills.findIndex((skill) => skill._id === payload);
            if (index !== -1) {
                state.skills.splice(index, 1);
                               }
       },
       updateSkill: (state, action) => {
        const payload = action.payload;
        state.skills.set(payload);
                           },
      
    
         setErrors(state, action) {
                 state.errors = action.payload;
          },
             },
             
        
        });
        

export const fetchSkills=()=>async(dispatch)=>{
    const config = {
        headers: {
            "Content-Type":"appliation/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    }
    axios.get(`/skill/getAll`, config)
                .then((response) => {
                 dispatch(populateSkills(response.data));
                 console.log(response.data)
                })
                .catch((error) => {
                  console.log(error)
                })
}





export const selectSkills=(state)=>{
    return [state.skills.skills,state.skills.errors];
}
export const {populateSkills,addSkill,setErrors,deleteSkill,selectSkill,updateSkill}=skillsSlice.actions;
export default skillsSlice.reducer;