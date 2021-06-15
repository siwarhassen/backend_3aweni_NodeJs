import React ,{Component} from 'react';
import {Link } from 'react-router-dom';
import { useApi } from "../../../hooks/useApi";
import useChat from "../../../useChat";
import axios from "axios";
import { useEffect, useState } from "react";


const Groupmini = ({ id })=> {
    
const [group, err, reload] = useApi("groups/group/"+id,null,"GET");
const [members, erre, reloads] = useApi("groupmember/members/"+id);
    {
        return (
          
        (group?.Type=="Public"?(  <div class="flex items-center space-x-4 py-3 hover:bg-gray-100 rounded-md -mx-2 px-2">
        <div class="w-14 h-14 flex-shrink-0 rounded-md relative"> 
            <img src={group?.photo} class="absolute w-full h-full inset-0 rounded-md object-cover" alt=""/>
        </div>
        <div class="flex-1">
            <a href="timeline-group.html"  class="text-lg font-semibold capitalize">  <Link to={`/group/${group?._id}`} > {group?.Name} </Link>  </a>
            <div class="text-sm text-gray-500 mt-0.5"> {members?.length} Member</div>
        </div>
        <a href="#" class="flex items-center justify-center h-9 px-4 rounded-md bg-gray-200 font-semibold"> 
        <Link to={`/group/${group?._id}`} > View </Link>
       </a>
        </div>):(<div hidden></div>) )
                                
                                   
   )
    
}



}

export default Groupmini;