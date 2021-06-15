import React ,{useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';

import CreateRoom from "./videoChat/components/modal/CreateModal";


import JoinRoom from './videoChat/components/modal/Join';

const HeaderWithoutLeftPanel = ({history}) =>{
 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showCreateRoom, setShowCreateRoom] = useState(false);

    const showCreateRoomFunc = () => {
      setShowCreateRoom(!showCreateRoom);
    };
    const [showJoinRoom, setShowJoinRoom] = useState(false);
const [userId, setUserId] = useState("");
    const showJoinRoomFunc = () => {
      setShowJoinRoom(!showJoinRoom);
    };
    const [user, setUser]= useState(Object);
    const [notif, setNotif]= useState([]);
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
                try {
                    axios.get("/api/auth/details_user",config).then((response)=>{
                        setUser(response.data.data);
                        console.log(user)});                    
                   
                } catch (error) {
                    console.log(error)
                }
                axios.get(`/notif/getAll`, config)
                .then((response) => {
                setNotif(response.data);
                console.log(response.data)
                })
                .catch((error) => {
                console.log(error)
                })
            }
    ,[history]);
    const logoutHandler = async () => {
        try {
            localStorage.clear()
            window.location.href = "/" ;
        } catch (err) {
            window.location.href = "/" ;
        }
    }
        return (
          

<div>
   <header style={{zIndex:100}}>
     
            <div class="header_wrap">
                <div class="header_inner mcontainer">
                    <div class="left_side">
                        
                        <span class="slide_menu" uk-toggle="target: #wrapper ; cls: is-collapse is-active">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path d="M3 4h18v2H3V4zm0 7h12v2H3v-2zm0 7h18v2H3v-2z" fill="currentColor"></path></svg>
                        </span>

                        <div id="logo">
                            <a href="homepage.html"> 
                                <img src="assets/user/images/logoo.png" alt=""/>
                                <img src="assets/user/images/logoo.png" class="logo_mobile" alt="" />
                            </a>
                        </div>
                    </div>
                     {/*  <!-- search icon for mobile -->*/}
                   
                    <div class="header-search-icon" uk-toggle="target: #wrapper ; cls: show-searchbox"> </div>
                    <div class="header_search">
                        <input value="" type="text" class="form-control" placeholder="Search for Friends , Videos and more.." autocomplete="off"/>
                        <i class="uil-search-alt"></i>
                    </div>
                    <div uk-drop="mode: click" class="hidden md:w-1/3 w-11/12 shadow-lg rounded-md -mt-2 bg-white">
                        <div class="-mt-2 p-3">
                            <h4 class="font-semibold mb-1 mt-2 px-2.5 text-lg"> Recently  </h4>
                            <ul>
                                <li>
                                    <a href="#" class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"> 
                                        <img src="assets/user/images/avatars/avatar-4.jpg" alt="" class="border mr-3 rounded-full shadow-sm w-8"/>
                                        Erica Jones
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"> 
                                        <img src="assets/user/images/group/group-2.jpg" alt="" class="border mr-3 rounded-full shadow-sm w-8"/>
                                        Coffee  Addicts
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"> 
                                        <img src="assets/user/images/group/group-4.jpg" alt="" class="border mr-3 rounded-full shadow-sm w-8"/>
                                         Mountain Riders
                                    </a>
                                </li>
                                <li>
                                    <a href="#" class="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md"> 
                                        <img src="assets/user/images/group/group-5.jpg" alt="" class="border mr-3 rounded-full shadow-sm w-8"/>
                                        Property Rent And Sale 
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
    
                    <div class="right_side">
    
                        <div class="header_widgets">
                            <a href="#" class="is_link">  Home  </a> 
                            <a href="#" class="is_link">  Dennis Han  </a>  
                           
                            <div uk-drop="mode: click" class="header_dropdown dropdown_cart">
                             
                                <div class="drop_headline">
                                    <h4>  My Cart </h4>
                                    <a href="#" class="btn_action hover:bg-gray-100 mr-2 px-2 py-1 rounded-md underline"> Checkout </a>
                                </div>

                                <ul class="dropdown_cart_scrollbar" data-simplebar>
                                    <li>
                                        <div class="cart_avatar">
                                            <img src="assets/user/images/product/2.jpg" alt=""/>
                                        </div>
                                        <div class="cart_text">
                                            <div class=" font-semibold leading-4 mb-1.5 text-base line-clamp-1"> Wireless headphones </div>
                                            <p class="text-sm">Type Accessories  </p>
                                        </div>
                                        <div class="cart_price">
                                            <span> $14.99 </span>
                                            <button class="type"> Remove</button>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="cart_avatar">
                                            <img src="assets/user/images/product/13.jpg" alt=""/>
                                        </div>
                                        <div class="cart_text">
                                            <div class=" font-semibold leading-4 mb-1.5 text-base line-clamp-1"> Parfum Spray</div>
                                            <p class="text-sm">Type Parfums  </p>
                                        </div>
                                        <div class="cart_price">
                                            <span> $16.99 </span>
                                            <button class="type"> Remove</button>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="cart_avatar">
                                            <img src="assets/user/images/product/15.jpg" alt=""/>
                                        </div>
                                        <div class="cart_text">
                                            <div class=" font-semibold leading-4 mb-1.5 text-base line-clamp-1"> Herbal Shampoo </div>
                                            <p class="text-sm">Type Herbel  </p>
                                        </div>
                                        <div class="cart_price">
                                            <span> $12.99 </span>
                                            <button class="type"> Remove</button>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="cart_avatar">
                                            <img src="assets/user/images/product/14.jpg" alt=""/>
                                        </div>
                                        <div class="cart_text">
                                            <div class=" font-semibold leading-4 mb-1.5 text-base line-clamp-1"> Wood Chair </div>
                                            <p class="text-sm">Type Furniture  </p>
                                        </div>
                                        <div class="cart_price">
                                            <span> $19.99 </span>
                                            <button class="type"> Remove</button>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="cart_avatar">
                                            <img src="assets/user/images/product/9.jpg" alt=""/>
                                        </div>
                                        <div class="cart_text">
                                            <div class=" font-semibold leading-4 mb-1.5 text-base line-clamp-1"> Strawberries FreshRipe </div>
                                            <p class="text-sm">Type Fruit  </p>
                                        </div>
                                        <div class="cart_price">
                                            <span> $12.99 </span>
                                            <button class="type"> Remove</button>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="cart_avatar">
                                            <img src="assets/user/images/product/2.jpg" alt=""/>
                                        </div>
                                        <div class="cart_text">
                                            <div class=" font-semibold leading-4 mb-1.5 text-base line-clamp-1"> Wireless headphones </div>
                                            <p class="text-sm">Type Accessories  </p>
                                        </div>
                                        <div class="cart_price">
                                            <span> $14.99 </span>
                                            <button class="type"> Remove</button>
                                        </div>
                                    </li>
                                    <li>
                                        <div class="cart_avatar">
                                            <img src="assets/user/images/product/13.jpg" alt=""/>
                                        </div>
                                        <div class="cart_text">
                                            <div class=" font-semibold leading-4 mb-1.5 text-base line-clamp-1"> Parfum Spray</div>
                                            <p class="text-sm">Type Parfums  </p>
                                        </div>
                                        <div class="cart_price">
                                            <span> $16.99 </span>
                                            <button class="type"> Remove</button>
                                        </div>
                                    </li>
                                </ul>
        
                                <div class="cart_footer">
                                    <p> Subtotal : $ 320 </p>
                                    <h1> Total :  <strong> $ 320</strong> </h1>
                                </div>
                            </div>

                            <a href="#" class="is_icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                                </svg>
                                <span>1</span>
                            </a>
                            <div uk-drop="mode: click" class="header_dropdown">
                                 <div  class="dropdown_scrollbar" data-simplebar>
                                     <div class="drop_headline">
                                         <h4>Notifications </h4>
                                         <div class="btn_action">
                                         <Link to="/notifications"><a>
                                                 <i class="icon-feather-settings" uk-tooltip="title: Notifications settings ; pos: left" title="" aria-expanded="false"></i>
                                             </a></Link>
                                         </div>
                                     </div>
                                     <ul>
                                     { notif?.map((val,key) => {
                                            return(
                                                
                                        <li key={key}>
                                         
                                         <Link to={`/userdetails/${val._id}`}><a>
                                                 <div class="drop_avatar"> <img src={val.profilePicture} alt=""/>
                                                 </div>
                                                 <div class="drop_text">
                                                     <p>
                                                         You have a new invitation from <strong> {val.username}</strong>
                                                         <span class="text-link"> View his profile</span>
                                                     </p>
                                                     
                                                 </div>
                                             </a>
                                             </Link>
                                         </li>
                                            )})}
                                     </ul> 
                                 </div>
                            </div> 

                              {/*<!-- Message --> */}
                                <Link to={`/chat/${user._id}`}  >                     
                                       <a href="#" class="is_icon">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                                <span>4</span>
                            </a>
                            </Link>
                    
                            <a href="#">
                                <img src={user.profilePicture} class="is_avatar" alt=""/>
                            </a>
                            <div uk-drop="mode: click;offset:5" class="header_dropdown profile_dropdown">

                                <a href="timeline.html" class="user">
                                    <div class="user_avatar">
                                        <img src={user.profilePicture} alt=""/>
                                    </div>
                                    <div class="user_name">
                                        <div> {user.username} </div>
                                        <span> {user.email} </span>
                                    </div>
                                </a>
                                <hr class="border-gray-100"/>
                                <a>
                                    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clip-rule="evenodd"></path></svg>
                                    <Link to="/profile_education">My Account </Link>
                                    
                                </a>
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z"  clip-rule="evenodd" />
                                    </svg>
                                    <Link to="/mypages" class="lg:px-2">Manage Pages</Link>
                                    
                                </a>
                                <a href="group-feed.html">
                                    <svg fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z"></path><path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd"></path></svg>
                                    My Billing 
                                </a>
                                <a href="#" id="night-mode" class="btn-night-mode">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                                      </svg>
                                     Night mode
                                    <span class="btn-night-mode-switch">
                                        <span class="uk-switch-button"></span>
                                    </span>
                                </a>
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                                    </svg>
                                    <Link to="/" onClick={logoutHandler}>Logout </Link>
                                </a>

                                
                            </div>

                        </div>
                        
                    </div>
                </div>
            
            </div>
  </header>



       


        </div>


     
   )
    
}



export default HeaderWithoutLeftPanel;
