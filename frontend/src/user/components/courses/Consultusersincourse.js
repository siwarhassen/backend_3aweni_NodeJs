import React ,{Component,useEffect} from 'react';
import dateFormat from 'dateformat';
import { queryApi } from "../../../utils/queryApi";
import { useApi } from "../../../hooks/useApi";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import confirm, { Button, alert } from "react-alert-confirm";
import {useDispatch, useSelector} from "react-redux";
import Header from'../Header';
import "react-alert-confirm/dist/index.css";
import {populateUsercourse, selectUsercourses,fetchUserCourse,deleteUsercourse,fsortuserasc} from "../../../redux/slices/usercourseSlice";
export default function Consultusersincourse({match}) {

    const dispatch=useDispatch();
  useEffect(() => {
    dispatch(fetchUserCourse(id));
    
    }, [dispatch]);
    const history = useHistory();
    const id = match.params.id;
  //const [usercourses,erreur] = useApi("usercourse/findusers/"+id,null,"GET",false);
  const [usercourses,erreur] =useSelector(selectUsercourses);
    console.log(usercourses);
    const deleteuser=(e)=>async()=> {
        console.log(e);
        confirm({
            title: "Delete User",
            cancelText: "cancel",
            okText: "Yes",
            content: <h4 style={{color:"orange"}}>Are you sure to delete this user!</h4>,
            onOk: async() =>{
                console.log("ok");
                dispatch(deleteUsercourse(e));
                const d = await queryApi("usercourse/delete/"+e,null,"DELETE");
            }
          });
      }



   const handleSort=(e)=>async()=>{
      // console.log(e.target.id);
       dispatch(fsortuserasc(id));
              
       //usercourses.UserId?.username.sort((a,b) => parseInt(b.username) - parseInt(a.username));
   }
        return (
          
<div>
  <Header />
<br/><br/><br/><br/><br/> 
<button type="button" class="btn btn-secondary btn-icon-only" style={{marginRight:"590px"}}  onClick={() => {
                    history.goBack();
                }}>
                                                                                <span class="btn-inner--icon" style={{marginLeft:"3px"}}>
                                                                                  <i class="uil-arrow-left"></i>
                                                                                </span>
                                                                                <span style={{marginLeft:"60px",display:"block",marginTop:"-60px"}}> courses</span>
                                                                        
                                                                              </button>
                        
                                                                              <hr style={{width:"100%",textAlign:"left",marginLeft:"0"}}/>
     
<div class="card" style={{width:"800px",marginLeft:"400px"}}>
  
    {/** <!-- Card header --> */}
                   
                    <div class="card-header actions-toolbar border-0">
                        <div class="d-flex justify-content-between align-items-center">
                            <h4 class="d-inline-block mb-0">Sutdents</h4>
                            <div class="d-flex">

                                <a href="#" class="btn btn-icon btn-hover  btn-circle" uk-tooltip="Search product" title="" aria-expanded="false">
                                    <i class="uil-search"></i>
                                </a>
                                <div class="uk-drop" uk-drop="mode: click; pos: left-center; offset: 0">
                                    <form class="uk-search uk-search-navbar uk-width-1-1">
                                        <input class="uk-search-input shadow-0 uk-form-small" type="search" placeholder="Search..." autofocus=""/>
                                    </form>
                                </div>

                                <a href="#" class="btn btn-icon btn-hover  btn-circle" uk-tooltip="filter" title="" aria-expanded="false">
                                    <i class="uil-filter"></i>
                                </a>
                                <div uk-dropdown="pos: bottom-right ; mode: click ;animation: uk-animation-scale-up" class="uk-dropdown">
                                    <ul class="uk-nav uk-dropdown-nav">
                                        <li class="uk-active" value="hi" id="Newest" onClick={handleSort(usercourses._id)}> Newest </li>
                                        <li value="Newest"hh>From A-Z</li>
                                        <li><a href="#">From Z-A</a></li>
                                    </ul>
                                </div>


                                <a href="#" class="btn btn-icon btn-hover  btn-circle" uk-tooltip="More" title="" aria-expanded="false">
                                    <i class="uil-ellipsis-h"></i>
                                </a>
                                <div uk-dropdown="pos: bottom-right ; mode: click ;animation: uk-animation-scale-up" class="uk-dropdown">
                                    <ul class="uk-nav uk-dropdown-nav">
                                        <li><a href="#"> Refresh </a></li>
                                        <li><a href="#">Manage</a></li>
                                        <li><a href="#">Setting</a></li>
                                    </ul>
                                </div>


                            </div>
                        </div>
                    </div>
                    {/**   <!-- Table -->*/}
                  
                    <div class="table-responsive" >
                        <table class="table align-items-center">
                            <thead>
                                <tr>
                                    <th scope="col" >Name</th>
                                    <th scope="col" >Joined at</th>
                                    <th scope="col">Activity</th>
                                    <th scope="col"> </th>
                                </tr>
                            </thead>
                            <tbody class="list">
                            { usercourses?.map((usercourse, index) => (
                           
                                <tr>
                                    <th scope="row">
                                        <div >
                                            <div>
                                                <div class="avatar-parent-child" >
                                                    <img alt="Image placeholder" src={usercourse.UserId?.profilePicture} class="avatar  rounded-circle"/>
                                                    <span class="avatar-child avatar-badge bg-success"></span>
                                                </div>
                                            </div>
                                            <div >
                                                <a href="#" class="name h6 mb-0 text-sm">{usercourse.UserId?.username}</a>
               
                                            </div>
                                        </div>
                                    </th>
                                    
                                    
                                
                                    <td > <p style={{marginLeft:"-80px"}}> {dateFormat(usercourse.DateInscription, "dd/mm/yyyy")}</p>  </td>
                                 
                                  
                                    <td>
                                        <progress value={usercourse.PassQuiz?.length} max={usercourse.CourseId?.Module.length} role="progressbar" class="progress progress-bar" style={{width: "45%",height: "7px"}} />
                                       
                                    </td>
                                    <td class="text-right">
                                     
                                        <div class="actions ml-3">
                                            <a href="#" class="btn btn-icon btn-hover btn-sm btn-circle" uk-tooltip="Quick view" title="" aria-expanded="false">
                                                <i class="uil-external-link-alt "></i> </a>
                                            <a href="#" class="btn btn-icon btn-hover btn-sm btn-circle" uk-tooltip="Edit" title="" aria-expanded="false">
                                                <i class="uil-pen "></i> </a>
                                            <Button onClick={deleteuser(usercourse._id)} class="btn btn-icon btn-hover btn-sm btn-circle" uk-tooltip="Delete user" title="" aria-expanded="false">
                                                <i class="uil-trash-alt text-danger"></i> </Button>
                                                
                                        </div>
                                    </td>
                          
                          
                                </tr>
                            ))}
                         
                         
                            </tbody>
                        </table>
                    </div>
               
               
               
               
                </div>

                </div>
     
   )
    





}