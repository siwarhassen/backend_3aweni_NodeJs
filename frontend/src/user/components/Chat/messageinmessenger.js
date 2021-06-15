import React ,{Component} from 'react';
import { useApi } from "../../../hooks/useApi";
import {Link } from 'react-router-dom';
import Moment from "react-moment";

const Messageinmessenger = ( {sender,receiver} )=> {

    const [test, err, reloads] = useApi("message/last/"+sender+"/"+receiver,null,"GET");
 
    {
        return (
<li >
   
{test?.map((msgfrmdb, index) => (
              (msgfrmdb?.sender?._id==localStorage.getItem("connecteduser")?(
              <Link to={`/chat/${msgfrmdb?.receiver?._id} `} > <a href="javascript:void(0);">
              <div class="message-avatar"><i class="status-icon status-online"></i><img src={msgfrmdb?.receiver?.profilePicture} alt=""/></div>
          
              <div class="message-by">
                  <div class="message-by-headline">
                  {test?.map((msgfrmdb, index) => (
                         (msgfrmdb?.receiver?._id==localStorage.getItem("connecteduser")?(
                       <h5>{msgfrmdb?.sender?.username}</h5>  ):( <h5>{msgfrmdb?.receiver?.username}</h5>  ) ) 
                      ))} 
           {test?.map((msgfrmdb, index) => (
                      <span>
                     <Moment fromNow ago>{msgfrmdb.createdAt}</Moment>  Ago
           </span>
                      ))}  
                  </div>
                  <p>      
                                
                  {test?.map((msgfrmdb, index) => (
                        (msgfrmdb?.sender?._id==localStorage.getItem("connecteduser")?(   
                          <div> You : {msgfrmdb?.message}   </div>  ):( <div>{msgfrmdb?.message}   </div>  ) ) 
                                     ))} </p>
              </div>
          </a>
          </Link>  ):(    <Link to={`/chat/${msgfrmdb?.sender?._id} `} >  <a href="javascript:void(0);">
              <div class="message-avatar"><i class="status-icon status-online"></i><img src={msgfrmdb?.sender?.profilePicture} alt=""/></div>
          
              <div class="message-by">
                  <div class="message-by-headline">
                  {test?.map((msgfrmdb, index) => (
                         (msgfrmdb?.receiver?._id==localStorage.getItem("connecteduser")?(
                       <h5>{msgfrmdb?.sender?.username}</h5>  ):( <h5>{msgfrmdb?.receiver.username}</h5>  ) ) 
                      ))} 
           {test?.map((msgfrmdb, index) => (
                      <span>  <Moment fromNow ago>{msgfrmdb.createdAt}</Moment> </span>
                      ))}  
                  </div>
                  <p>      
                                
                  {test?.map((msgfrmdb, index) => (
                        (msgfrmdb?.sender?._id==localStorage.getItem("connecteduser")?(   
                          <div> You : {msgfrmdb?.message}   </div>  ):( <div>{msgfrmdb?.message}   </div>  ) ) 
                                     ))} </p>
              </div>
          </a> </Link> ) ) 
                           ))} 



</li>

 )
    


}

}

export default Messageinmessenger;