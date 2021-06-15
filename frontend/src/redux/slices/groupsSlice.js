import { createSlice } from "@reduxjs/toolkit";
import { queryApi } from "../../utils/queryApi";
let initialState = {
    groups: [],
    selectedGroup: {},
    errors: "",
    };
const groupsSlice=createSlice({
    name: "groups",
    initialState,
    reducers: {
        populateGroups(state, action) {
        state.groups = action.payload;
        },
        selectGroup(state, action) {
            state.populateGroups = action.payload;
            },
        addGroup: (state, action) => {
            const payload = action.payload;
            state.groups.push(payload);
            },
        deleteGroup: (state, action) => {
            const payload = action.payload;
            const index = state.groups.findIndex((group) => group._id === payload);
            if (index !== -1) {
                state.groups.splice(index, 1);
                               }
       },

       searchgroup :(state, action)=>{
        state.groups = action.payload;
        
        },
    
         setErrors(state, action) {
                 state.errors = action.payload;
          },
             },
             
        
        });

export const fetchGroups=()=>async(dispatch)=>{
    const [res,error]=await queryApi("groups");
    if(error){
        console.log(error);
    }
    else{
        dispatch(populateGroups(res));
    }
}

export const searchgroupbyName=(Name)=>async(dispatch)=>{
    const [res,error]=await queryApi("groups/search/"+Name);
   
    if(error){
        console.log(error);
    }
    else{
      dispatch(searchgroup(res));
    }
}



export const selectGroups=(state)=>{
    return [state.groups.groups,state.groups.errors];
}
export const {populateGroups,selectGroup,addGroup,searchgroup,deleteGroup,setErrors}=groupsSlice.actions;
export default groupsSlice.reducer;