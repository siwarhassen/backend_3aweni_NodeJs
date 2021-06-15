import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
let initialState = {
    mypages: [],
    selectedMyPage: {},
    errors: "",
    };
const mypagesSlice=createSlice({
    name: "mypages",
    initialState,
    reducers: {
        populateMyPages(state, action) {
        state.mypages = action.payload;
        },
        selectMyPage(state, action) {
            state.populateMyPages = action.payload;
            },
        addMyPage: (state, action) => {
            const payload = action.payload;
            state.mypages.push(payload);
            },
        deleteMyPage: (state, action) => {
            const payload = action.payload;
            const index = state.mypages.findIndex((page) => page._id === payload);
            if (index !== -1) {
                state.mypages.splice(index, 1);
                               }
       },
      
    
         setErrors(state, action) {
                 state.errors = action.payload;
          },
             },
             
        
        });
        

export const fetchMyPages=()=>async(dispatch)=>{
    const config = {
        headers: {
            "Content-Type":"appliation/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    }
    axios.get(`/page/getMyPages`, config)
                .then((response) => {
                 dispatch(populateMyPages(response.data));
                 console.log(response.data)
                })
                .catch((error) => {
                  console.log(error)
                })
}





export const selectMyPages=(state)=>{
    return [state.mypages.mypages,state.mypages.errors];
}
export const {populateMyPages,addMyPage,setErrors,deleteMyPage,selectMyPage}=mypagesSlice.actions;
export default mypagesSlice.reducer;