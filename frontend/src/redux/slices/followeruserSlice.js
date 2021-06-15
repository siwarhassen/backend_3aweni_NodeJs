import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
let initialState = {
    followerusers: [],
    selectedFolloweruser: {},
    errors: "",
    };
const followerusersSlice=createSlice({
    name: "followerusers",
    initialState,
    reducers: {
        populateFollowerusers(state, action) {
        state.followerusers = action.payload;
        },
        selectFolloweruser(state, action) {
            state.populateFollowerusers = action.payload;
            },
        addFolloweruser: (state, action) => {
            const payload = action.payload;
            state.followerusers.push(payload);
            },
        deleteFolloweruser: (state, action) => {
            const payload = action.payload;
            const index = state.followerusers.findIndex((followeruser) => followeruser._id === payload);
            if (index !== -1) {
                state.followerusers.splice(index, 1);
                               }
       },
      
    
         setErrors(state, action) {
                 state.errors = action.payload;
          },
             },
             
        
        });
        

export const fetchFollowerusers=()=>async(dispatch)=>{
    const config = {
        headers: {
            "Content-Type":"appliation/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    }
    axios.get(`/followuser/getAll`, config)
                .then((response) => {
                 dispatch(populateFollowerusers(response.data));
                 console.log(response.data)
                })
                .catch((error) => {
                  console.log(error)
                })
}

/*export const filter=(category)=>async(dispatch)=>{
    const config = {
        headers: {
            "Content-Type":"appliation/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    }

    axios.get(`/page/getPagesByCategory/${category}`, config)
    .then((response) => {
    dispatch(populatePages(response.data));
     console.log(response.data)
    })
    .catch((error) => {
      console.log(error)
    })
}*/



export const selectFollowerusers=(state)=>{
    return [state.followerusers.followerusers,state.followerusers.errors];
}
export const {populateFollowerusers,addFolloweruser,setErrors,deleteFolloweruser,selectFolloweruser}=followerusersSlice.actions;
export default followerusersSlice.reducer;