import { createSlice } from "@reduxjs/toolkit";
import { queryApi } from "../../utils/queryApi";
let initialState = {
    groupmembers: [],
    selectedGroup: {},
    errors: "",
    };
const groupsSlice=createSlice({
    name: "groupmembers",
    initialState,
    reducers: {
        populateMembers(state, action) {
        state.groupmembers = action.payload;
        },
        selectMember(state, action) {
            state.populateMembers = action.payload;
            },
        addMember: (state, action) => {
            const payload = action.payload;
            state.groupmembers.push(payload);
            },
        deleteMember: (state, action) => {
            const payload = action.payload;
            const index = state.groups.findIndex((groupmember) => groupmember._id === payload);
            if (index !== -1) {
                state.groupmembers.splice(index, 1);
                               }
       },
      
    
         setErrors(state, action) {
                 state.errors = action.payload;
          },
             },
             
        
        });

        export const fetchMembers=(idg)=>async(dispatch)=>{
            const [res,error]=await queryApi("/groupmember/members/"+idg);
            if(error){
                console.log(error);
            }
            else{
                dispatch(populateReviews(res));
            }
        }




export const selectMembers=(state)=>{
    return [state.groupmembers.groupmembers,state.groupmembers.errors];
}
export const {populateMembers,selectMember,addMember,deleteMember,setErrors}=groupmembersSlice.actions;
export default groupmembersSlice.reducer;