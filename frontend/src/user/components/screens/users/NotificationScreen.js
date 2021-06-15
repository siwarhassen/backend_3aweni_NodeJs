import React ,{useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';
import {useDispatch, useSelector} from "react-redux";
import { selectUsers} from "../../../../redux/slices/userSlice";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import Table from 'react-bootstrap/Table'
const NotificationScreen = ({history}) =>{
    const [notifuser, setNotifUser]= useState([]);

    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history.push("/login")
        }
           
                const config = {
                    headers: {
                        "Content-Type":"appliation/json",
                        Authorization: `Bearer ${localStorage.getItem("authToken")}`
                    }
                }

                axios.get(`/notif/getNotif`, config)
                .then((response) => {
                setNotifUser(response.data);
                console.log(response.data)
                })
                .catch((error) => {
                console.log(error)
                })

            }
            ,[history]);

    return (
        <>
        <Header/>
    <body>
    <div class="main_content">
<div class="mcontainer">

    <div class="lg:flex lg:space-x-10">
    
    <div class="flex justify-between relative md:mb-4 mb-3">
                <div class="flex-1">
                                
                    <h2 class="text-3xl font-semibold"> Your notifications </h2>
                    
                </div>
                
            </div>
    </div>
    <Table striped bordered hover>
        <thead>
            <tr>
            <th>User Picture</th>
            <th>Username</th>
            <th></th>
            </tr>
        </thead>
        <tbody>
        { notifuser?.map((val,key) => {
                            return(
                                
                       
            <tr key={key}>
            <td><img src={val.profilePicture} style={{height:'50px',width:'50px'}} alt=""/></td>
            <td>{val.username}</td>
            <td>
            <Link to={`/userdetails/${val._id}`}><a type="submit" class="bg-blue-600 font-semibold p-2 rounded-md text-center text-white">
                                                    View profile</a></Link></td>
            </tr>
                            )})}
        </tbody>
    </Table>
</div>
</div>


    </body>
    </>
    )
}
export default NotificationScreen;