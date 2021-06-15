import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
let initialState = {
    users: [],
    selectedUser: {},
    errors: "",
    };
const usersSlice=createSlice({
    name: "users",
    initialState,
    reducers: {
        populateUsers(state, action) {
        state.users = action.payload;
        },
        selectUser(state, action) {
            state.populateUsers = action.payload;
            },
            
        addUser: (state, action) => {
            const payload = action.payload;
            state.users.push(payload);
            },
        updateUser: (state, action) => {
                const payload = action.payload;
                state.users.set(payload);
                },
        deleteUser: (state, action) => {
            const payload = action.payload;
            const index = state.users.findIndex((user) => user._id === payload);
            if (index !== -1) {
                state.users.splice(index, 1);
                               }
       },
       selectoneuser:
       (state, action) => {
        const payload = action.payload;
        state.selectedUser=  action.payload;
        },
         setErrors(state, action) {
                 state.errors = action.payload;
          },
             },
             
        
        });
        

export const fetchUsers=()=>async(dispatch)=>{
    const config = {
        headers: {
            "Content-Type":"appliation/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    }
    axios.get(`/api/auth/all_users`, config)
                .then((response) => {
                 dispatch(populateUsers(response.data));
                 console.log(response.data)
                })
                .catch((error) => {
                  console.log(error)
                })
}

export const fetchconnectuser=()=>async(dispatch)=>{
    const config = {
        headers: {
            "Content-Type":"appliation/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    }
    axios.get("/api/auth/details_user",config).then((response)=>{
        dispatch(selectoneuser(response.data.data));
     });

}



export const selectSessionUser=(state)=>{
    return [state.users.selectedUser];
}
export const selectUsers=(state)=>{
    return [state.users.users,state.users.errors];
}
export const {populateUsers,addUser,setErrors,deleteUser,selectUser,updateUser,selectoneuser}=usersSlice.actions;
export default usersSlice.reducer;