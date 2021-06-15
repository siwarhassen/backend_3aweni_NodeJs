import { createSlice } from "@reduxjs/toolkit";
import { queryApi } from "../../utils/queryApi";
let initialState = {
    reviews: [],
    selectedReview: {},
    numberrating:0,
    errors: "",
    };
const reviewcourseSlice=createSlice({
    name: "reviewscourse",
    initialState,
    reducers: {
        populateReviews(state, action) {
        state.reviewscourse = action.payload;
        },
        populatesumreviews(state, action) {
            state.numberrating = action.payload;
            },
       
        addReview: (state, action) => {
            const payload = action.payload;
            state.reviewscourse.push(payload);
           
            },
        deleteReview: (state, action) => {
            const payload = action.payload;
            const index = state.reviewscourse.findIndex((review) => review._id === payload);
            if (index !== -1) {
                state.reviewscourse.splice(index, 1);
                               }
       },

     
         setErrorsR(state, action) {
                 state.errors = action.payload;
          },
             },
             
        
        });

export const fetchReviews=(idc)=>async(dispatch)=>{
    const [res,error]=await queryApi("reviewc/"+idc);
    if(error){
        console.log(error);
    }
    else{
        dispatch(populateReviews(res));
    }
}


export const fetchsumrating=(idc)=>async(dispatch)=>{
    const [res,error]=await queryApi("reviewc/average/"+idc);
    if(error){
        console.log(error);
    }
    else{
        dispatch(populatesumreviews(res));
    }
}


export const selectReviewsCourse=(state)=>{
    return [state.reviewscourse.reviewscourse,state.reviewscourse.errors];
}

export const selectsumreviews=(state)=>{
    return [state.reviewscourse.numberrating,state.reviewscourse.errors];
}
export const {populatesumreviews,populateReviews,addReview,setErrorsR,deleteReview}=reviewcourseSlice.actions;
export default reviewcourseSlice.reducer;


