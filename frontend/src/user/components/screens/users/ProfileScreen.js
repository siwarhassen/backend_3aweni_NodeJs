import React ,{useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';
import {useDispatch, useSelector} from "react-redux";
import { selectFollowerusers} from "../../../../redux/slices/followeruserSlice";
import { selectNotifications} from "../../../../redux/slices/notificationSlice";
import { Formik } from "formik";
import * as Yup from "yup";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import { Modal,Button, } from 'react-bootstrap';
import dateFormat from 'dateformat';
const EducationScreen = ({history,match}) =>{

    
//const [educations,  err, reload] =useSelector(selectEducations);
const id = match.params.id;
    const [educations,setEducations] = useState([]);
    const [user, setUser]= useState(Object);
    const [followers,setFollowers] = useState([]);
    const [numbersF,setNumbersF] = useState(0);
    const [numbersFby,setNumbersFby] = useState(0);
    const [etat, setEtat]= useState('Follow');
    const [etat1, setEtat1]= useState('');
    const [allfollowers,setAllFollowers] = useState([]);
    //const [notif, setNotif]= useState([]);
    const [notif1, setNotif1]= useState([]);
    //const [allfollowers,  err, reload] =useSelector(selectFollowerusers);
    const [notif,  errN, reloadN] =useSelector(selectNotifications);
    const [f, setF]= useState([]);

    const dateB=dateFormat(user.dateBirth, "mmmm dS, yyyy");

    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history.push("/login")
        }

        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }

          

        axios.get(`/api/auth/user/${id}`, {
            headers: headers
        })
        .then((response) => {
            setUser(response.data.data);
         console.log(user)
        })
        .catch((error) => {
          console.log(error)
        })

        /** education */

        axios.get(`/education/getAll/${id}`, {
            headers: headers
        })
        .then((response) => {
            setEducations(response.data);
            console.log(educations)
        })
        .catch((error) => {
          console.log(error)
        })

            /**get all followers */

            axios.get(`/followuser/getAllu/${id}`, {
                headers: headers
            })
            .then((response) => {
                setFollowers(response.data);
            console.log(response.data)
            })
            .catch((error) => {
            console.log(error)
            })


            axios.get(`/followuser/numbers/${id}`, {
                headers: headers
            })
            .then((response) => {
                setNumbersF(response.data);
            console.log(response.data)
            })
            .catch((error) => {
            console.log(error)
            })

            axios.get(`/followuser/numbersfu/${id}`, {
                headers: headers
            })
            .then((response) => {
                setNumbersFby(response.data);
            console.log(response.data)
            })
            .catch((error) => {
            console.log(error)
            })

            /** end followers */

            /** Condition d'etat du bouton */

             /**get all my followers */

             axios.get(`/followuser/getAll`, {
                headers: headers
            })
             .then((response) => {
                setAllFollowers(response.data);
             console.log(response.data)
             })
             .catch((error) => {
             console.log(error)
             })

             for (let i of allfollowers){
                 if(id==i.FollowerId){
                     setEtat('Followed')
                     console.log(etat)
                 }else{
                    setEtat('Follow')
                 }
             }

             /**get all my notifs 

             axios.get(`/notif/getNotif`, {
                headers: headers
            })
                .then((response) => {
                setNotif(response.data);
                console.log(response.data)
                })
                .catch((error) => {
                console.log(error)
                })*/

               /* for (let i of notif){
                    if(id==i._id){
                        setEtat('Accept invitation')
                        setEtat1('Refuse invitation')
                        console.log(etat)
                    }
                }*/

            }
           
    ,[history,etat,allfollowers]);//,notif,allfollowers

    const inviHandler = async () => {
        const id = match.params.id;
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("authToken")}`
          }

        if (etat=='Follow'){
        

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
        }else if (etat=='Followed'){

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

        }

    const followHandler = async () => {
     /*   const id = match.params.id;
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
          

          axios.get(`/notif/getAll2`, {
            headers: headers
        })
            .then((response) => {
            setNotif1(response.data);
            console.log(response.data)
            })
            .catch((error) => {
            console.log(error)
            })

          

          for (let i of notif1){
            if(id==i.SenderId){
                console.log(i._id)

                axios.delete(`/notif/delete/${i._id}`, {
                    headers: headers
                  })
                .then((response) => {
                   // dispatch(deleteMyPage(id));
                    console.log(response)
                   })
                   .catch((error) => {
                     console.log(error)
                   })
                
            }
        }

        setEtat('Friend')
        console.log(etat)*/

        }


    return (
        <>
        <Header/>
        <body>
        <ReactNotification/>
<div id="wrapper">
        <div class="main_content">
            <div class="mcontainer">

                <div class="profile user-profile bg-white rounded-2xl -mt-4">
  
                    <div class="profiles_banner">
                        <img src={user.coverPicture} alt=""/>
                        <div class="profile_action absolute bottom-0 right-0 space-x-1.5 p-3 text-sm z-50 lg:flex">
                          
                      </div>
                    </div>
                    <div class="profiles_content">

                        <div class="profile_avatar">
                            <div class="profile_avatar_holder"> 
                              <img src={user.profilePicture} alt="profle picture"/>
                            </div>
                            <div class="user_status status_online"></div>
                            <div class="icon_change_photo" hidden> <ion-icon name="camera" class="text-xl"></ion-icon> </div>
                        </div>

                        <div class="profile_info">
                            <h1> {user.username} </h1>
                            <p> Family , Food , Fashion , Fourever <a href="#">Edit </a></p>
                        </div>

                    </div>

                    <div class="flex justify-between lg:border-t flex-col-reverse lg:flex-row">
                        <nav class="cd-secondary-nav pl-2 is_ligh -mb-0.5 border-transparent">
                            <ul>
                                <li ><a href="#0">Posts</a></li>
                                <li class="active"><Link to={`/userdetails/${user._id}`} >Educations</Link></li>
                                <li ><Link to={`/userdetailsE/${user._id}`} >Experiences </Link></li>
                                <li ><Link to={`/userdetailsP/${user._id}`} >Projects </Link></li>
                                <li ><Link to={`/userdetailsS/${user._id}`} >Skills</Link></li> 
                            </ul>
                        </nav>

                        <div class="flex items-center space-x-1.5 flex-shrink-0 pr-3  justify-center order-1">
                            {/**<a href="#" class="text-blue-500"> See all </a> */} 
                            <button  onClick={inviHandler} class="flex items-center justify-center h-10 px-5 rounded-md bg-blue-600 text-white  space-x-1.5"> 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
                                </svg>
                                <span> {etat} </span>
                            </button>  
                        </div>
                    </div>

                </div>

                <div class="lg:flex lg:mt-8 mt-4 lg:space-x-8">
                  

                <div class="space-y-5 flex-shrink-0 lg:w-7/12">
                
                <img src="assets/user/images/education.jpg" style={{width:'150px', height:'150px',marginLeft:'200px'}} alt=""/>
                
                
               

{/** Educations */}
{ educations.map((val,key) => {
    return(
            <div key={key}>
{val.visible=='True' ? (
        <div class="card">
                <div class="card-header">
                    <div class="row">
                        {val.startYear} - {val.endYear}
                    </div>
                </div>
                <div class="card-body">
                    <h5 class="card-title">{val.school}({val.fieldStudy})</h5>
                    <p class="card-text">{val.description}</p>
                </div>
        </div>   
    ) : null}
               

            </div>
    )})}


{/** Educations */}
                </div>

                  <div class="lg:w-4/12 space-y-6">

                        {/*<!-- start about -->*/}
                  
                      <div class="widget">
                          <h4 class="text-2xl mb-3 font-semibold"> About </h4>
                          <ul class="text-gray-600 space-y-4">
                              
                              <li class="flex items-center space-x-2"> 
                                  <ion-icon name="globe" class=" rounded-full bg-gray-200 text-xl p-1.5 mr-3"></ion-icon>
                                  Birthday <strong> {dateB}  </strong>
                              </li>
                              <li class="flex items-center space-x-2"> 
                                  <ion-icon name="heart-sharp" class=" rounded-full bg-gray-200 text-xl p-1.5 mr-3"></ion-icon>
                                  From <strong> {user.country}  </strong>
                              </li>
                              <li class="flex items-center space-x-2"> 
                                  <ion-icon name="heart-sharp" class=" rounded-full bg-gray-200 text-xl p-1.5 mr-3"></ion-icon>
                                  Adress <strong> {user.address}  </strong>
                              </li>
                              <li class="flex items-center space-x-2"> 
                                  <ion-icon name="home-sharp" class=" rounded-full bg-gray-200 text-xl p-1.5 mr-3"></ion-icon>
                                  Email <strong> {user.email}  </strong>
                              </li>
                              <li class="flex items-center space-x-2"> 
                                  <ion-icon name="home-sharp" class=" rounded-full bg-gray-200 text-xl p-1.5 mr-3"></ion-icon>
                                  Phone Number <strong> {user.numTel}  </strong>
                              </li>
                              <li class="flex items-center space-x-2"> 
                                  <ion-icon name="logo-rss"  class=" rounded-full bg-gray-200 text-xl p-1.5 mr-3"></ion-icon>
                                  Flowwed By <strong> {numbersFby} Peaple </strong>
                              </li>                                
                          </ul>
                          
                      
                      
                      </div>
                  
                        {/*<!-- end about -->*/}
                        {/*<!-- start friends -->*/}
                      <div class="widget border-t pt-4">
                          <div class="flex items-center justify-between mb-4">
                              <div>
                                  <h4 class="text-2xl -mb-0.5 font-semibold"> Friends </h4>
                                  <p> {numbersF} Friends</p>
                              </div>
                              <a class="text-blue-600 ">See all</a>
                          </div>
                          <div class="grid grid-cols-3 gap-3 text-gray-600 font-semibold">
                          { followers.map((val,key) => {
                                    return(
                                <div key={key}>
                              <a href="#">  
                                  <div class="avatar relative rounded-md overflow-hidden w-full h-24 mb-2"> 
                                      <img src={val.profilePicture} alt="" class="w-full h-full object-cover absolute"/>
                                  </div>
                                  <div> {val.username} </div>
                              </a>
                            </div>
                            )})}
                          </div>
                          <a class="text-blue-600 "></a><a href="#" class="bg-gray-100 py-2.5 text-center font-semibold w-full mt-4 block rounded"> See all </a>
                      </div>

                        {/*<!-- end friends -->*/}
                        

                  </div>
                </div> 

            </div>
        </div>
        
        </div>   
            
    </body>
        </>
    )
}
export default EducationScreen;