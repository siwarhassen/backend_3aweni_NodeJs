import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
let initialState = {
    followerpages: [],
    selectedFollowerpage: {},
    errors: "",
    };
const followerpagesSlice=createSlice({
    name: "followerpages",
    initialState,
    reducers: {
        populateFollowerpages(state, action) {
        state.followerpages = action.payload;
        },
        selectFollowerpage(state, action) {
            state.populateFollowerpages = action.payload;
            },
        addFollowerpage: (state, action) => {
            const payload = action.payload;
            state.followerpages.push(payload);
            },
        deleteFollowerpage: (state, action) => {
            const payload = action.payload;
            const index = state.followerpages.findIndex((followerpage) => followerpage._id === payload);
            if (index !== -1) {
                state.followerpages.splice(index, 1);
                               }
       },
       updateFollowerpage: (state, action) => {
        const payload = action.payload;
        state.followerpages.set(payload);
                           },
      
    
         setErrors(state, action) {
                 state.errors = action.payload;
          },
             },
             
        
        });
        

export const fetchFollowerpages=()=>async(dispatch)=>{
    const config = {
        headers: {
            "Content-Type":"appliation/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    }
    axios.get(`/followpage/getN`, config)
                .then((response) => {
                 dispatch(populateFollowerpages(response.data));
                 console.log(response.data)
                })
                .catch((error) => {
                  console.log(error)
                })
}





export const selectFollowerpages=(state)=>{
    return [state.followerpage.followerpages,state.followerpage.errors];
}
export const {populateFollowerpages,addFollowerpage,setErrors,deleteFollowerpage,selectFollowerpage,updateFollowerpage}=followerpagesSlice.actions;
export default followerpagesSlice.reducer;