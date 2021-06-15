import React,{PureComponent, useState} from 'react';
import { Link } from 'react-router-dom';
import { queryApi } from "../../../utils/queryApi";
import { useApi } from "../../../hooks/useApi";
import {useDispatch, useSelector} from "react-redux";
import { selectGroups ,fetchGroups, searchgroupbyName , searchgroup} from "../../../redux/slices/groupsSlice";
import Groupsingle from './groupsingle';
import Groupmini from './groupmini';
import Header from '../../../user/components/Header';
import CreateRoom from "../videoChat/components/modal/CreateModal";
import SquareButton from "../videoChat/components/buttons/SquareButton/SquareButton";


import OpenChat from '../Chat/openchat';
import JoinRoom from '../videoChat/components/modal/Join';





export default function Groupes() {

    const [groups,  err, reload] =useSelector(selectGroups); 
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [showCreateRoom, setShowCreateRoom] = useState(false);

    const showCreateRoomFunc = () => {
      setShowCreateRoom(!showCreateRoom);
    };
    const [showJoinRoom, setShowJoinRoom] = useState(false);

    const showJoinRoomFunc = () => {
      setShowJoinRoom(!showJoinRoom);
    };
    const dispatch = useDispatch();
    const  handleOnInputChange = async(event)=> {
  
        const query = event.target.value;
  
    if(query!=="")
    {   dispatch(searchgroupbyName(query));
      
    }
    else
    { 
        dispatch(fetchGroups())
    }
       
};
   

        return (
          
<div>        
<Header />


      
{/* <!-- Main Contents --> */}
        <div class="main_content">
            <div class="mcontainer">
           
                <div class="flex justify-between relative md:mb-4 mb-3">
                    <div class="flex-1">
                        <h2 class="text-3xl font-semibold"> Groups </h2>
                        <nav class="cd-secondary-nav border-b md:m-0 -mx-4">
                            <ul>
                                <li class="active"><a href="#" class="lg:px-2">   Suggestions </a></li>
                                <li><a href="#" class="lg:px-2">  <Link to={`/mygroups`}  > My groups </Link> </a></li>
                            </ul>
                        </nav>
                    </div>
                    <Link to={`/addgroup`}  >
                    <a href="#" class="flex items-center justify-center h-9 lg:px-5 px-2 rounded-md bg-blue-600 text-white space-x-1.5 absolute right-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                clip-rule="evenodd"></path>
                        </svg>
                        <span class="md:block ">  </span>
                       
                            <span>Create</span>
                
                    </a> 
                    </Link>
                </div>
            
     

                <div class="relative" uk-slider="finite: true">
                
                    <div class="uk-slider-container px-1 py-3">
                        <ul class="uk-slider-items uk-child-width-1-4@m uk-child-width-1-3@s uk-grid-small uk-grid">
                        {groups.slice(groups.length-10,groups.length).map((groupe, index) => (
                            <Groupsingle id={groupe?._id} />
                            ))}
                            
                        </ul>

                        <a class="absolute bg-white bottom-1/2 flex items-center justify-center p-2 -left-4 rounded-full shadow-md text-xl w-9 z-10 dark:bg-gray-800 dark:text-white" href="#" uk-slider-item="previous"> <i class="icon-feather-chevron-left"></i></a>
                        <a class="absolute bg-white bottom-1/2 flex items-center justify-center p-2 -right-4 rounded-full shadow-md text-xl w-9 z-10 dark:bg-gray-800 dark:text-white" href="#" uk-slider-item="next"> <i class="icon-feather-chevron-right"></i></a>

                    </div>
                </div>

                <div class="sm:my-6 my-3 flex items-center justify-between border-b pb-3">
                    <div>
                        <h2 class="text-xl font-semibold"> Categories </h2>
                        <p class="font-medium text-gray-500 leading-6"> Find a group by browsing top categories. </p>
                    </div>
                    <a href="#" class="text-blue-500 sm:block hidden"> See all </a>
                </div> 

                <div class="relative -mt-3" uk-slider="finite: true">
                
                    <div class="uk-slider-container px-1 py-3">
                        <ul class="uk-slider-items uk-child-width-1-5@m uk-child-width-1-3@s uk-child-width-1-2 uk-grid-small uk-grid">
                
                            <li>
                                <div class="rounded-md overflow-hidden relative w-full h-36">
                                    <div class="absolute w-full h-3/4 -bottom-12 bg-gradient-to-b from-transparent to-gray-800 z-10">
                                    </div>
                                    <img src="assets/user/images/category/travel.jpg" class="absolute w-full h-full object-cover" alt=""/>
                                    <div class="absolute bottom-0 w-full p-3 text-white z-20 font-semibold text-lg"> Travel </div>
                                </div>
                            </li>
                            <li>
                                <div class="rounded-md overflow-hidden relative w-full h-36">
                                    <div class="absolute w-full h-3/4 -bottom-12 bg-gradient-to-b from-transparent to-gray-800 z-10">
                                    </div>
                                    <img src="assets/user/images/category/business.jpg" class="absolute w-full h-full object-cover" alt=""/>
                                    <div class="absolute bottom-0 w-full p-3 text-white z-20 font-semibold text-lg"> Business </div>
                                </div>
                            </li>
                            <li>
                                <div class="rounded-md overflow-hidden relative w-full h-36">
                                    <div class="absolute w-full h-3/4 -bottom-12 bg-gradient-to-b from-transparent to-gray-800 z-10">
                                    </div>
                                    <img src="assets/user/images/category/health.jpg" class="absolute w-full h-full object-cover" alt=""/>
                                    <div class="absolute bottom-0 w-full p-3 text-white z-20 font-semibold text-lg"> Health </div>
                                </div>
                            </li>
                            <li>
                                <div class="rounded-md overflow-hidden relative w-full h-36">
                                    <div class="absolute w-full h-3/4 -bottom-12 bg-gradient-to-b from-transparent to-gray-800 z-10">
                                    </div>
                                    <img src="assets/user/images/category/science-and-tech.jpg" class="absolute w-full h-full object-cover"alt=""/>
                                    <div class="absolute bottom-0 w-full p-3 text-white z-20 font-semibold text-lg"> Science </div>
                                </div>
                            </li>
                            <li>
                                <div class="rounded-md overflow-hidden relative w-full h-36">
                                    <div class="absolute w-full h-3/4 -bottom-12 bg-gradient-to-b from-transparent to-gray-800 z-10">
                                    </div>
                                    <img src="assets/user/images/category/Buy-and-sell.jpg" class="absolute w-full h-full object-cover" alt=""/>
                                    <div class="absolute bottom-0 w-full p-3 text-white z-20 font-semibold text-lg"> Buy & sell</div>
                                </div>
                            </li>
                            <li>
                                <div class="rounded-md overflow-hidden relative w-full h-36">
                                    <div class="absolute w-full h-3/4 -bottom-12 bg-gradient-to-b from-transparent to-gray-800 z-10">
                                    </div>
                                    <img src="assets/user/images/category/travel.jpg" class="absolute w-full h-full object-cover" alt="" />
                                    <div class="absolute bottom-0 w-full p-3 text-white z-20 font-semibold text-lg"> Travel </div>
                                </div>
                            </li>
                
                        </ul>
                    </div>
                    
                    <a class="absolute bg-white top-16 flex items-center justify-center p-2 -left-4 rounded-full shadow-md text-xl w-9 z-10 dark:bg-gray-800 dark:text-white" href="#" uk-slider-item="previous"> <i class="icon-feather-chevron-left"></i></a>
                    <a class="absolute bg-white top-16 flex items-center justify-center p-2 -right-4 rounded-full shadow-md text-xl w-9 z-10 dark:bg-gray-800 dark:text-white" href="#" uk-slider-item="next"> <i class="icon-feather-chevron-right"></i></a>

                </div>

                <br/>  
                
                <div class="lg:flex lg:space-x-12">

                    <div class="lg:w-3/4"> 


                        <h3 class="text-xl font-semibold"> Your Groups </h3>
                        <nav class="cd-secondary-nav border-b">
                            <ul>
                                <li class="active"><a href="#" class="lg:px-2"> All Groups <span> {groups.length} </span> </a></li>
                                <li  ><a  href="javascript:void(0);" class="lg:px-2">  <Link to={`/newest`}  > Recently added </Link> </a></li><li><a href="#" class="lg:px-2"> Family </a></li>
                                <li><a href="#" class="lg:px-2"> University </a></li>
                                <li><a href="#" class="lg:px-2"> more </a></li>
                            </ul>
                        </nav>

                        <input  type="text" id="search-input" placeholder="search by name" onChange={handleOnInputChange} style={{width:"180px"}}/>
      
                        <div class="grid md:grid-cols-2 divide divide-gray-200 gap-x-4 mt-4">
                       
                           


                        {groups.map((groupe, index)=>
                        <Groupmini id={groupe?._id} />
                        )}

                        
                        </div> 
                    </div>
                   

                </div>

               
                
        
            </div>


      <OpenChat/>
 </div>
        </div>


     
   )
    




}