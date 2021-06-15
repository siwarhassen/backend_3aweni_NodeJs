import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
let initialState = {
    notifications: [],
    selectedNotification: {},
    errors: "",
    };
const notificationsSlice=createSlice({
    name: "notifications",
    initialState,
    reducers: {
        populateNotifications(state, action) {
        state.notifications = action.payload;
        },
        selectNotification(state, action) {
            state.populateNotifications = action.payload;
            },
        addNotification: (state, action) => {
            const payload = action.payload;
            state.notifications.push(payload);
            },
        deleteNotification: (state, action) => {
            const payload = action.payload;
            const index = state.notifications.findIndex((notification) => notification._id === payload);
            if (index !== -1) {
                state.notifications.splice(index, 1);
                               }
       },
      
    
         setErrors(state, action) {
                 state.errors = action.payload;
          },
             },
             
        
        });
        

export const fetchNotifications=()=>async(dispatch)=>{
    const config = {
        headers: {
            "Content-Type":"appliation/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
        }
    }
    axios.get(`/notif/getNotif`, config)
                .then((response) => {
                 dispatch(populateNotifications(response.data));
                 console.log(response.data)
                })
                .catch((error) => {
                  console.log(error)
                })
}



export const selectNotifications=(state)=>{
    return [state.notifications.notifications,state.notifications.errors];
}
export const {populateNotifications,addNotification,setErrors,deleteNotification,selectNotification}=notificationsSlice.actions;
export default notificationsSlice.reducer;