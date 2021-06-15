import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
let initialState = {
    experiences: [],
    selectedExperience: {},
    errors: "",
    };
const experiencesSlice=createSlice({
    name: "experiences",
    initialState,
    reducers: {
        populateExperiences(state, action) {
        state.experiences = action.payload;
        },
        selectExperience(state, action) {
            state.populateExperiences = action.payload;
            },
        addExperience: (state, action) => {
            const payload = action.payload;
            state.experiences.push(payload);
            },
        deleteExperience: (state, action) => {
            const payload = action.payload;
            const index = state.experiences.findIndex((experience) => experience._id === payload);
            if (index !== -1) {
                state.experiences.splice(index, 1);
                               }
       },
       updateExperience: (state, action) => {
        const payload = action.payload;
        state.experiences.set(payload);
                           },
      
    
         setErrors(state, action) {
                 state.errors = action.payload;
          },
             },
             
        
        });
        

export const fetchExperiences=()=>async(dispatch)=>{
    const config = {
        headers: {
            "Content-Type":"appliation/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    }
    axios.get(`/experience/getAll`, config)
                .then((response) => {
                 dispatch(populateExperiences(response.data));
                 console.log(response.data)
                })
                .catch((error) => {
                  console.log(error)
                })
}





export const selectExperiences=(state)=>{
    return [state.experiences.experiences,state.experiences.errors];
}
export const {populateExperiences,addExperience,setErrors,deleteExperience,selectExperience,updateExperience}=experiencesSlice.actions;
export default experiencesSlice.reducer;