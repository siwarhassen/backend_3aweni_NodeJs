import React ,{useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';
import {useDispatch, useSelector} from "react-redux";
import { selectUsers} from "../../../../redux/slices/userSlice";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
const UserNotFollowedScreen = ({history}) =>{
    
    const [users,setUsers] = useState([]);
    const [followers,setFollowers] = useState([]);
    const [allfollowers,setAllFollowers] = useState([]);
    const [List,setList] = useState([]);
    const [search, setSearch]= useState('');
    const [text, setText]= useState(false);
    const [user, setUser]= useState(Object);
    const [notif, setNotif]= useState([]);
    const [test, setTest]= useState([]);
    const [f, setF]= useState([]);
    //const [users,  err, reload] =useSelector(selectUsers);
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

                /** connected user details */

                axios.get(`/api/auth/details_user`, config)
                .then((response) => {
                    setUser(response.data.data);
                 console.log(user)
                })
                .catch((error) => {
                  console.log(error)
                })

                /**get all users sauf le user connecté */

                axios.get(`/api/auth/all_users`, config)
                .then((response) => {
                    setUsers(response.data);
                 console.log(response.data)
                })
                .catch((error) => {
                  console.log(error)
                })

                 /**get followers */

                axios.get(`/followuser/getAll`, config)
                .then((response) => {
                    setFollowers(response.data);
                console.log(response.data)
                })
                .catch((error) => {
                console.log(error)
                })

                /**get all followers */

                axios.get(`/followuser/getFollowers1`, config)
                .then((response) => {
                    setAllFollowers(response.data);
                console.log(response.data)
                })
                .catch((error) => {
                console.log(error)
                })

                /**get all user not followered by l user connected */

                let h=[];

                if(followers.length!=0){
               for (let j of followers){

                    for( var i = 0; i < users.length; i++){ 
                        //console.log(users[i]._id)
                        if ( users[i]._id === j.FollowerId) { 
                    
                            //users.slice().splice(i, 1); 
                            users.splice(i, 1); 
                           // console.log(users[i]._id)
                            
                        }
                    
                    }
                    setList(users);
                  
                }
                
            }else{
                setList(users);
            }

            /** get users how have received a notif from the user connected 

            axios.get(`/notif/getAll1`, config)
                .then((response) => {
                setNotif(response.data);
                console.log(response.data)
                })
                .catch((error) => {
                console.log(error)
                })

                if(notif.length!=0){
                    for (let j of notif){
     
                         for( var i = 0; i < List.length; i++){ 
                             
                             if ( List[i]._id === j._id) { 
                         
                                 
                                 List.splice(i, 1); 
                                
                                 
                             }
                         
                         }
                         setTest(List);
                       
                     }
                     
                 }else{
                    setTest(List);
                 }*/

                

                
            }
           
    ,[history,users]);

    const inviHandler = (id) =>async () => {
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }

          axios.post(`/followuser/add/${id}`,{},{
            headers: headers
          })
          .then((response) => {
           console.log(response.data.data);
           
          })
          .catch((error) => {
            console.log(error)
          })

          axios.post(`/notif/add/${id}`,{body:`you have an invitation from ${user.username} `,title:"new invitation"}, {
            headers: headers
          })
          .then((response) => {
           console.log(response.data.data);
           
          })
          .catch((error) => {
            console.log(error)
          })

        }
        const unfollowHandler = (id) =>async () => {
            const headers = {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
              }
    
              axios.get(`/followuser/getAll/${id}`, {
                headers: headers
            })
                .then((response) => {
                setF(response.data);
                console.log(response.data)
                })
                .catch((error) => {
                console.log(error)
                })

                for (let i of f){
                    if(i.FollowerId==id){
                        axios.delete(`/followuser/delete/${i._id}`,{},{
                            headers: headers
                          })
                          .then((response) => {
                           //console.log(response.data.data);
                           
                          })
                          .catch((error) => {
                            console.log(error)
                          })
                
                     /*     axios.post(`/notif/add/${id}`,{body:`${user.username} has deleted his follow `,title:"invitation has been deleted"}, {
                            headers: headers
                          })
                          .then((response) => {
                           console.log(response.data.data);
                           
                          })
                          .catch((error) => {
                            console.log(error)
                          }) */   }
                } 
                   

              
        
    
            }
    return (
        <>
        <Header/>
    <body>
<div class="main_content">
<div class="mcontainer">

    <div class="lg:flex lg:space-x-10">
          
        <div > 
            <div class="flex justify-between relative md:mb-4 mb-3">
                <div class="flex-1">
                <input style={{width:'350px', height:'80px', marginLeft:'600px'}} type="text" placeholder="search..." onChange={e => {setSearch(e.target.value)}}/>
                                
                    <h2 class="text-3xl font-semibold"> Your friends </h2>
                    
                </div>
                
            </div>

            <div class="relative" uk-slider="finite: true">
                <div class="uk-slider-container px-1 py-3">
                    <ul class="uk-slider-items uk-child-width-1-4@m uk-child-width-1-3@s uk-child-width-1-2 uk-grid-small uk-grid">
                    { allfollowers?.filter((val)=>{
                            if(search == ""){
                                return val
                            }else if (val.username.toLowerCase().includes(search.toLowerCase())){
                                return val
                            }
                        }).map((val,key) => {
                            return(
                                
                        <li key={key}>
                            <a>
                            <Link to={`/userdetails/${val._id}`}>
                                <img src={val.profilePicture} class="w-full h-48 rounded-lg shadow-sm object-cover"/>
                                </Link>
                                <div class="pt-2">
                                   <h4 class="text-lg font-semibold"> {val.username} </h4>
                                   <p class="text-sm"> </p>
                                   <button onClick={unfollowHandler(val._id)} class="flex items-center justify-center h-9 px-3 rounded-md bg-blue-100 text-blue-500"> 
                                    Unfollow
                                </button>
                                </div>
                           </a>
                        </li>
                       

                        ) 
                        })}
            
                    </ul>
            
                    <a class="absolute bg-white bottom-1/2 flex items-center justify-center p-2 -left-4 rounded-full shadow-md text-xl w-9 z-10 dark:bg-gray-800 dark:text-white"
                        href="#" uk-slider-item="previous"> <i class="icon-feather-chevron-left"></i></a>
                    <a class="absolute bg-white bottom-1/2 flex items-center justify-center p-2 -right-4 rounded-full shadow-md text-xl w-9 z-10 dark:bg-gray-800 dark:text-white"
                        href="#" uk-slider-item="next"> <i class="icon-feather-chevron-right"></i></a>
            
                </div>
            </div>
             
     

            <div class="my-2 flex items-center justify-between pb-3">
               <div>
                   <h2 class="text-xl font-semibold"> Your Friends also following</h2> 
               </div>
               <a href="#" class="text-blue-500"> See all </a>
           </div>

           <div class="relative" uk-slider="finite: true">
               <div class="uk-slider-container px-1 py-3">
                   <ul class="uk-slider-items uk-child-width-1-4@m uk-child-width-1-3@s uk-child-width-1-2 uk-grid-small uk-grid">

                   { List?.filter((val)=>{
                            if(search == ""){
                                return val
                            }else if (val.username.toLowerCase().includes(search.toLowerCase())){
                                return val
                            }
                            
                        }).map((val,key) => {
                            return(
                                
                        <li key={key}>
                            <a>
                            <Link to={`/userdetails/${val._id}`}>
                                <img src={val.profilePicture} class="w-full h-48 rounded-lg shadow-sm object-cover"/>
                                </Link>
                                <div class="pt-2">
                                   <h4 class="text-lg font-semibold"> {val.username} </h4>
                                   <p class="text-sm"></p>
                                   <button style={{visibility: ''}} onClick={inviHandler(val._id)} class="flex items-center justify-center h-9 px-3 rounded-md bg-blue-100 text-blue-500"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 mr-2">
                                        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
                                    </svg>{text ? ('invitation sended'):('Follow')}
                                </button>
                                </div>
                           </a>
                        </li>
                       

                        ) 
                        })}
           
                   </ul>
           
                   <a class="absolute bg-white bottom-1/2 flex items-center justify-center p-2 -left-4 rounded-full shadow-md text-xl w-9 z-10 dark:bg-gray-800 dark:text-white"
                       href="#" uk-slider-item="previous"> <i class="icon-feather-chevron-left"></i></a>
                   <a class="absolute bg-white bottom-1/2 flex items-center justify-center p-2 -right-4 rounded-full shadow-md text-xl w-9 z-10 dark:bg-gray-800 dark:text-white"
                       href="#" uk-slider-item="next"> <i class="icon-feather-chevron-right"></i></a>
           
               </div>
           </div>
         

</div>
</div>
</div>
        </div>
        </body>
        </>
    )
}
export default UserNotFollowedScreen;