import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
let initialState = {
    educations: [],
    selectedEducation: {},
    errors: "",
    };
const educationsSlice=createSlice({
    name: "educations",
    initialState,
    reducers: {
        populateEducations(state, action) {
        state.educations = action.payload;
        },
        selectEducation(state, action) {
            state.populateEducations = action.payload;
            },
        addEducation: (state, action) => {
            const payload = action.payload;
            state.educations.push(payload);
            },
        deleteEducation: (state, action) => {
            const payload = action.payload;
            const index = state.educations.findIndex((education) => education._id === payload);
            if (index !== -1) {
                state.educations.splice(index, 1);
                               }
       },
       updateEducation: (state, action) => {
        const payload = action.payload;
        state.educations.set(payload);
                           },
      
    
         setErrors(state, action) {
                 state.errors = action.payload;
          },
             },
             
        
        });
        

export const fetchEducations=()=>async(dispatch)=>{
    const config = {
        headers: {
            "Content-Type":"appliation/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    }
    axios.get(`/education/getAll`, config)
                .then((response) => {
                 dispatch(populateEducations(response.data));
                 console.log(response.data)
                })
                .catch((error) => {
                  console.log(error)
                })
}





export const selectEducations=(state)=>{
    return [state.educations.educations,state.educations.errors];
}
export const {populateEducations,addEducation,setErrors,deleteEducation,selectEducation,updateEducation}=educationsSlice.actions;
export default educationsSlice.reducer;