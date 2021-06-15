import { createSlice } from "@reduxjs/toolkit";
import { queryApi } from "../../utils/queryApi";
let initialState = {
    favoris: [],
  
    selectedFavoris:[],
    errors: "",
    };
const favorisSlice=createSlice({
    name: "favoris",
    initialState,
    reducers: {
        populateFavoris(state, action) {
     
        state.favoris = action.payload;
        },
   
        selectFavoris(state, action) {
       
            state.populateFavoris = action.payload;
            },
           
            
        addfavoris: (state, action) => {
            const payload = action.payload;
            state.favoris.push(payload);
          
            
            },
      
        deleteFavoris: (state, action) => {
           
            const payload = action.payload;
            const index = state.favoris.findIndex((fav) => fav._id === payload);
       
            if (index !== -1) {
                state.favoris.splice(index, 1);
             }
             
       },
    
      
    
       setErrorsf(state, action) {
                 state.errors = action.payload;
          },
             },
             
        
        });

export const fetchFavoris=()=>async(dispatch)=>{
    const [res,error]=await queryApi("favoris/displayf");
    if(error){
        console.log(error);
    }
    else{
        dispatch(populateFavoris(res));
    }
}






export const selectFavoris=(state)=>{
    return [state.favoris.favoris,state.favoris.errors];
}


export const {populateFavoris,addfavoris,setErrorsf,deleteFavoris}=favorisSlice.actions;
export default favorisSlice.reducer;