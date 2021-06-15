import { createSlice } from "@reduxjs/toolkit";
import { queryApi } from "../../utils/queryApi";
let initialState = {
    usercourse: [],
    selectedUsercourse:[],
    errors: "",
    };
const usercoursesSlice=createSlice({
    name: "usercourse",
    initialState,
    reducers: {
        populateUsercourse(state, action) {
     
        state.usercourse = action.payload;
        },
   
     
    
        deleteUsercourse: (state, action) => {
           
            const payload = action.payload;
            const index = state.usercourse.findIndex((uc) => uc._id === payload);
            if (index !== -1) {
                console.log(index);
                state.usercourse.splice(index, 1);
                               }
       }, 
       sortusercoursesasc:(state,action)=>{
       
        state.usercourse = action.payload;
       },
     
         setErrors(state, action) {
                 state.errors = action.payload;
          },
             },
             
        
        });

export const fetchUserCourse=(id)=>async(dispatch)=>{
    const [res,error]=await queryApi("usercourse/findusers/"+id);
    if(error){
        console.log(error);
    }
    else{
        dispatch(populateUsercourse(res));
    }
}

export const fsortuserasc=(id)=>async(dispatch)=>{
    const [res,error]=await queryApi("usercourse/finduserstriAsc/"+id);
    if(error){
        console.log(error);
    }
    else{
        dispatch(sortusercoursesasc(res));
    }
}


export const selectUsercourses=(state)=>{
    return [state.usercourse.usercourse,state.usercourse.errors];
}
export const {populateUsercourse,deleteUsercourse,sortusercoursesasc}=usercoursesSlice.actions;
export default usercoursesSlice.reducer;