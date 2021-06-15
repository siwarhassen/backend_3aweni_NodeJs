import React ,{Component} from 'react';
import {Link } from 'react-router-dom';
import { useApi } from "../../../hooks/useApi";
import useChat from "../../../useChat";
import axios from "axios";
import { useEffect, useState } from "react";


const Groupsingle = ({ id })=> {
    
const [group, err, reload] = useApi("groups/group/"+id,null,"GET");
const [members, erre, reloads] = useApi("groupmember/members/"+id);
    {
        return (
           

                 <li>  
                                <div class="card">
                                    <div class="card-media h-28">
                                        <div class="card-media-overly"></div>
                                        <img src={group?.photo} alt="" class=""/>
                                        
                                    </div>
                                    <div class="card-body">  
                                        <a href="timeline-group.html" class="font-semibold text-lg truncate"> <Link to={`/group/${group?._id}`} > {group?.Name} </Link>  </a>
                                        <div class="flex items-center flex-wrap space-x-1 text-sm text-gray-500 capitalize" style={{marginLeft:"50px"}}>
                                            <a  href="javascript:void(0);"> <span id="member" >  {members?.length} Members </span> </a>
                                            
                                        </div>    
        
                        
                                        <div class="flex mt-3 space-x-2 text-sm">
                                            <a href="#" class="bg-blue-600 flex flex-1 h-8 items-center justify-center rounded-md text-white capitalize"> 
                                                Join 
                                            </a>
                                            <a href="#" class="bg-gray-200 flex flex-1 h-8 items-center justify-center rounded-md capitalize"> 
                                            <Link to={`/group/${group?._id}`} >
                                                View 
                                                </Link>
                                            </a>
                                        </div>    
        
                                    </div>
                                </div>
                            </li>
   )
    
}



}

export default Groupsingle;