import { createSlice } from "@reduxjs/toolkit";
import { queryApi } from "../../utils/queryApi";
let initialState = {
    courses: [],
    coursesofuser:[],
    selectedCourse:[],
    errors: "",
    };
const coursesSlice=createSlice({
    name: "courses",
    initialState,
    reducers: {
        populateCourses(state, action) {
     
        state.courses = action.payload;
        },
   
        selectCourse(state, action) {
       
            state.populateCourses = action.payload;
            },
            coursesofuser(state, action) {
       
                state.coursesofuser = action.payload;
                },
            
        addcourse: (state, action) => {
            const payload = action.payload;
            state.courses.push(payload);
            state.coursesofuser.push(payload);
            },
            updatecourse: (state, action) => {
                const payload = action.payload.course;
              
                const index = state.courses.findIndex(
                (item) => item._id === payload._id
                );

                const ind = state.coursesofuser.findIndex(
                    (item) => item._id === payload._id
                    );
           
                if (index !== -1) {
                state.courses[index] = payload;
                }

                if (ind !== -1) {
                    state.coursesofuser[index] = payload;
                    }
                },
        deleteCourse: (state, action) => {
           
            const payload = action.payload;
            const index = state.courses.findIndex((course) => course._id === payload);
            const ind = state.coursesofuser.findIndex((course) => course._id === payload);
            if (index !== -1) {
                state.courses.splice(index, 1);
                               }
                if (ind !== -1) {
          state.coursesofuser.splice(ind, 1);
               }
       },
       searchcourse :(state, action)=>{
        state.courses = action.payload;
        }
       ,
       filtercoursebylevel (state, action){
        state.courses = action.payload;
        }
       ,
      
    
         setErrors(state, action) {
                 state.errors = action.payload;
          },
             },
             
        
        });

export const fetchCourses=()=>async(dispatch)=>{
    const [res,error]=await queryApi("course");
    if(error){
        console.log(error);
    }
    else{
        dispatch(populateCourses(res));
    }
}


export const fetchCoursesofUser=()=>async(dispatch)=>{
    const [res,error]=await queryApi("course/coursesbyuser",null,"GET",false);
    if(error){
        console.log(error);
    }
    else{
        dispatch(coursesofuser(res));
    }
}

export const searchcoursesbyName=(Name)=>async(dispatch)=>{
    const [res,error]=await queryApi("course/searchnamelike/"+Name);
    if(error){
        console.log(error);
    }
    else{
      dispatch(searchcourse(res));
    }
}


export const filtercoursesbyLevel=(Level)=>async(dispatch)=>{
    const [res,error]=await queryApi("course/filterbylevel/"+Level);
    if(error){
        console.log(error);
    }
    else{
        dispatch(filtercoursebylevel(res));
    }
}
export const selectCourses=(state)=>{
    return [state.courses.courses,state.courses.errors];
}

export const selectCoursesofuser=(state)=>{
    return [state.courses.coursesofuser];
}
export const {updatecourse,coursesofuser,populateCourses,addcourse,searchcourse,setErrors,deleteCourse,selectCourse,filtercoursebylevel}=coursesSlice.actions;
export default coursesSlice.reducer;