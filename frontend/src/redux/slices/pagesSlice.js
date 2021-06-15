import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
let initialState = {
    pages: [],
    selectedPage: {},
    errors: "",
    };
const pagesSlice=createSlice({
    name: "pages",
    initialState,
    reducers: {
        populatePages(state, action) {
        state.pages = action.payload;
        },
        selectPage(state, action) {
            state.populatePages = action.payload;
            },
        addPage: (state, action) => {
            const payload = action.payload;
            state.pages.push(payload);
            },
        deletePage: (state, action) => {
            const payload = action.payload;
            const index = state.pages.findIndex((page) => page._id === payload);
            if (index !== -1) {
                state.pages.splice(index, 1);
                               }
       },
      
    
         setErrors(state, action) {
                 state.errors = action.payload;
          },
             },
             
        
        });
        

export const fetchPages=()=>async(dispatch)=>{
    const config = {
        headers: {
            "Content-Type":"appliation/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    }
    axios.get(`/page/Allpages`, config)
                .then((response) => {
                 dispatch(populatePages(response.data));
                 console.log(response.data)
                })
                .catch((error) => {
                  console.log(error)
                })
}

export const filter=(category)=>async(dispatch)=>{
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
}



export const selectPages=(state)=>{
    return [state.pages.pages,state.pages.errors];
}
export const {populatePages,addPage,setErrors,deletePage,selectPage}=pagesSlice.actions;
export default pagesSlice.reducer;