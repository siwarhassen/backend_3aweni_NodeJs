import React ,{useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';
const EducationScreen = ({history}) =>{

    const [user, setUser]= useState(Object);
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

                console.log(config.headers.Authorization)
    
                try {
                    axios.get("/api/auth/details_user",config).then((response)=>{
                        setUser(response.data.data);
                        console.log(user)});
                       
                } catch (error) {
                    console.log(error)
                }
                
            }
           
    ,[history]);

    return (
        <>
        <Header/>
        <body>
        {/**    {user.map((val,key) => {
               return(
                   <div key={key}>
                        <h1> hiii {val.username}</h1>
                   </div>
               ) 
            })}*/}

<div id="wrapper">
        <div class="main_content">
            <div class="mcontainer">

                <div class="profile user-profile bg-white rounded-2xl -mt-4">
  
                    <div class="profiles_banner">
                        <img src="assets/user/images/avatars/profile-cover.jpg" alt=""/>
                        <div class="profile_action absolute bottom-0 right-0 space-x-1.5 p-3 text-sm z-50 lg:flex">
                          <a href="#" class="flex items-center justify-center h-8 px-3 rounded-md bg-gray-700 bg-opacity-70 text-white space-x-1.5"> 
                              <ion-icon name="crop-outline" class="text-xl"></ion-icon>
                              <span> Crop  </span>
                          </a>
                          <a href="#" class="flex items-center justify-center h-8 px-3 rounded-md bg-gray-700 bg-opacity-70 text-white space-x-1.5"> 
                              <ion-icon name="create-outline" class="text-xl"></ion-icon>
                              <span> Edit </span>
                          </a>
                      </div>
                    </div>
                    <div class="profiles_content">

                        <div class="profile_avatar">
                            <div class="profile_avatar_holder"> 
                                <img src={user.profilePicture} alt=""/>
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
                                <li ><Link to="/profile_education" >Educations</Link></li>
                                <li ><a href="#0">Experiences </a></li>
                                <li ><a href="#0">Projects </a></li>
                                <li ><a href="#0">Skills</a></li> 
                            </ul>
                        </nav>

                        <div class="flex items-center space-x-1.5 flex-shrink-0 pr-3  justify-center order-1">
                            {/**<a href="#" class="text-blue-500"> See all </a> */} 
                            <a href="#" class="flex items-center justify-center h-10 px-5 rounded-md bg-blue-600 text-white  space-x-1.5"> 
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
                                </svg>
                                <span> Add Your Story </span>
                            </a>
                            
                        </div>
                    </div>

                </div>

                <div class="lg:flex lg:mt-8 mt-4 lg:space-x-8">
                  

                <div class="space-y-5 flex-shrink-0 lg:w-7/12">



                
            
            <h1 class="lg:text-2xl text-xl font-semibold mb-6" > Create a new page </h1>
                <div class="lg:p-12 max-w-xl lg:my-0 my-12 mx-auto p-6 space-y-">
                    <form >
                        <div>
                            <label htmlFor="name" class="mb-0"> Name </label>
                            <input type="text" placeholder="Name" id="name" required class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                        </div>
                        <div>
                            <label htmlFor="type" class="mb-0"> Type </label>
                            <input type="email" placeholder="Type" id="type" required class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                        </div>
                        <div>
                            <label htmlFor="numTel" class="mb-0"> Phone number </label>
                            <input type="number" placeholder="Phone number" id="numTel" required class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                        </div>
                        <div>
                            <label htmlFor="country" class="mb-0"> Country </label>
                            <input type="text" placeholder="Country" id="country" required class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                        </div>
                        <div>
                            <label htmlFor="address" class="mb-0"> Address </label>
                            <input type="text" placeholder="Address" id="address" required class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                        </div>
                        <div>
                            <label htmlFor="profilePicture" class="mb-0"> Profile Picture </label>
                            <input type="file" placeholder="Profile Picture" id="profilePicture" required class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                        </div>
                        <div>
                            <label htmlFor="coverPicture" class="mb-0"> Cover Picture </label>
                            <input type="file" placeholder="Cover Picture" id="coverPicture" required class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                        </div>
                        <div>
                            <label htmlFor="description" class="mb-0">Description</label>
                            <textarea placeholder="Description" id="description" required class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full" rows="3"></textarea>
                        </div>
                        <div>
                            <button type="submit" class="bg-blue-600 font-semibold p-2 mt-5 rounded-md text-center text-white">
                                Register</button>
                        </div>
                    </form> 


                    

               
                </div>










                    
                      

                </div>

                  <div class="lg:w-4/12 space-y-6">
                        {/*<!-- start friends -->*/}
                      <div class="widget border-t pt-4">
                          <div class="flex items-center justify-between mb-4">
                              <div>
                                  <h4 class="text-2xl -mb-0.5 font-semibold"> Friends </h4>
                                  <p> 3,4510 Friends</p>
                              </div>
                              <a href="#" class="text-blue-600 ">See all</a>
                          </div>
                          <div class="grid grid-cols-3 gap-3 text-gray-600 font-semibold">
                              <a href="#">  
                                  <div class="avatar relative rounded-md overflow-hidden w-full h-24 mb-2"> 
                                      <img src="assets/user/images/avatars/avatar-1.jpg" alt="" class="w-full h-full object-cover absolute"/>
                                  </div>
                                  <div> Jonathan Ali </div>
                              </a>
                              <a href="#">  
                                  <div class="avatar relative rounded-md overflow-hidden w-full h-24 mb-2"> 
                                      <img src="assets/user/images/avatars/avatar-2.jpg" alt="" class="w-full h-full object-cover absolute"/>
                                  </div>
                                  <div> Jonathan Ali </div>
                              </a>
                              <a href="#">  
                                  <div class="avatar relative rounded-md overflow-hidden w-full h-24 mb-2"> 
                                      <img src="assets/user/images/avatars/avatar-3.jpg" alt="" class="w-full h-full object-cover absolute"/>
                                  </div>
                                  <div> Jonathan Ali </div>
                              </a>
                              <a href="#">  
                                  <div class="avatar relative rounded-md overflow-hidden w-full h-24 mb-2"> 
                                      <img src="assets/user/images/avatars/avatar-4.jpg" alt="" class="w-full h-full object-cover absolute"/>
                                  </div>
                                  <div> Jonathan Ali </div>
                              </a>
                              <a href="#">  
                                  <div class="avatar relative rounded-md overflow-hidden w-full h-24 mb-2"> 
                                      <img src="assets/user/images/avatars/avatar-5.jpg" alt="" class="w-full h-full object-cover absolute"/>
                                  </div>
                                  <div> Jonathan Ali </div>
                              </a>
                              <a href="#">  
                                  <div class="avatar relative rounded-md overflow-hidden w-full h-24 mb-2"> 
                                      <img src="assets/user/images/avatars/avatar-6.jpg" alt="" class="w-full h-full object-cover absolute"/>
                                  </div>
                                  <div> Jonathan Ali </div>
                              </a>
                          </div>
                          <a href="#" class="bg-gray-100 py-2.5 text-center font-semibold w-full mt-4 block rounded"> See all </a>
                      </div>

                        {/*<!-- end friends -->*/}
                        {/*<!-- start group -->*/}

                      <div class="widget border-t pt-4">
                          <div class="flex items-center justify-between mb-2">
                              <div>
                                  <h4 class="text-2xl -mb-0.5 font-semibold"> Groups </h4>
                              </div>
                              <a href="#" class="text-blue-600 ">See all</a>
                          </div>
                          <div>
                              <div class="flex items-center space-x-4 hover:bg-gray-100 rounded-md -mx-2 p-2">
                                  <div class="w-14 h-14 flex-shrink-0 rounded-md relative"> 
                                      <img src="assets/user/images/group/group-3.jpg" class="absolute w-full h-full inset-0 rounded-md" alt=""/>
                                  </div>
                                  <div class="flex-1">
                                      <h3 class="text-lg font-semibold capitalize"> Graphic Design </h3>
                                      <div class="text-sm text-gray-500 -mt-0.5"> 345K Member</div>
                                  </div>
                                  <a href="#" class="flex items-center justify-center h-9 px-4 rounded-md bg-gray-200 font-semibold">  Join </a>
                              </div>
                              <div class="flex items-center space-x-4 hover:bg-gray-100 rounded-md -mx-2 p-2">
                                  <div class="w-14 h-14 flex-shrink-0 rounded-md relative"> 
                                      <img src="assets/user/images/group/group-4.jpg" class="absolute w-full h-full inset-0 rounded-md" alt=""/>
                                  </div>
                                  <div class="flex-1">
                                      <h3 class="text-lg font-semibold capitalize"> Mountain Riders</h3>
                                      <div class="text-sm text-gray-500 -mt-0.5"> 845K Member</div>
                                  </div>
                                  <a href="#" class="flex items-center justify-center h-9 px-4 rounded-md bg-gray-200 font-semibold">  Join </a>
                              </div>
                              <div class="flex items-center space-x-4 hover:bg-gray-100 rounded-md -mx-2 p-2">
                                  <div class="w-14 h-14 flex-shrink-0 rounded-md relative"> 
                                      <img src="assets/user/images/group/group-2.jpg" class="absolute w-full h-full inset-0 rounded-md" alt=""/>
                                  </div>
                                  <div class="flex-1">
                                      <h3 class="text-lg font-semibold capitalize"> Coffee Addicts </h3>
                                      <div class="text-sm text-gray-500 -mt-0.5"> 345K Member</div>
                                  </div>
                                  <a href="#" class="flex items-center justify-center h-9 px-4 rounded-md bg-gray-200 font-semibold">  Join </a>
                              </div>
                              <div class="flex items-center space-x-4 hover:bg-gray-100 rounded-md -mx-2 p-2">
                                  <div class="w-14 h-14 flex-shrink-0 rounded-md relative"> 
                                      <img src="assets/user/images/group/group-1.jpg" class="absolute w-full h-full inset-0 rounded-md" alt=""/>
                                  </div>
                                  <div class="flex-1">
                                      <h3 class="text-lg font-semibold capitalize"> Architecture </h3>
                                      <div class="text-sm text-gray-500 -mt-0.5"> 845K Member</div>
                                  </div>
                                  <a href="#" class="flex items-center justify-center h-9 px-4 rounded-md bg-gray-200 font-semibold">  Join </a>
                              </div>
                          </div>
                      </div>
                      
                        {/*<!-- end group -->*/}

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