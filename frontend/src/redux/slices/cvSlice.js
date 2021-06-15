import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
let initialState = {
    cvs: [],
    selectedCv: {},
    errors: "",
    };
const cvsSlice=createSlice({
    name: "cvs",
    initialState,
    reducers: {
        populateCvs(state, action) {
        state.cvs = action.payload;
        },
        selectCv(state, action) {
            state.populateCvs = action.payload;
            },
        addCv: (state, action) => {
            const payload = action.payload;
            state.cvs.push(payload);
            },
        deleteCv: (state, action) => {
            const payload = action.payload;
            const index = state.cvs.findIndex((cv) => cv._id === payload);
            if (index !== -1) {
                state.cvs.splice(index, 1);
                               }
       },
       updateCv: (state, action) => {
        const payload = action.payload;
        state.cvs.set(payload);
                           },
      
    
         setErrors(state, action) {
                 state.errors = action.payload;
          },
             },
             
        
        });
        

export const fetchCvs=()=>async(dispatch)=>{
    const config = {
        headers: {
            "Content-Type":"appliation/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    }
    axios.get(`/cv/getAll`, config)
                .then((response) => {
                 dispatch(populateCvs(response.data));
                 console.log(response.data)
                })
                .catch((error) => {
                  console.log(error)
                })
}





export const selectCvs=(state)=>{
    return [state.cvs.cvs,state.cvs.errors];
}
export const {populateCvs,addCv,setErrors,deleteCv,selectCv,updateCv}=cvsSlice.actions;
export default cvsSlice.reducer;