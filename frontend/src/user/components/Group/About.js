import React,{PureComponent, useState} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { queryApi } from "../../../utils/queryApi";
import { useApi } from "../../../hooks/useApi";
import { useDispatch ,useSelector , useEffect} from 'react-redux';
import Select from 'react-select'
import Header from '../../../user/components/Header';
import Board from 'react-trello'
import {Dialog,Button,DialogActions,DialogContent,DialogContentText,DialogTitle } from '@material-ui/core';
import Moment from "react-moment";
export default function About({match}) {
	const id = match.params.id;
	const [group, err, reload] = useApi("groups/group/"+id,null,"GET");
	const [members, erre, reloads] = useApi("groupmember/members/"+id);
  const [taskdone, errer, reloadsr] = useApi("task/done/"+id,null,"GET");
  const [taskdoing, errerq, reloadsrq] = useApi("task/doing/"+id,null,"GET");
  const [tasktodo, errerr, reloadsrr] = useApi("task/todo/"+id,null,"GET");
  const [history, errerrs, reloadsrrg] = useApi("historique/"+id,null,"GET");
  const [Name, setName]= useState(group?.Name);
  const [Description, setDescription]= useState(group?.Description);
  const [Type, setType]= useState(group?.Type);
  const [error, setError]= useState("");
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);

  const handleClickOpen2 = () => {
    setOpen2(true);
  };

  const handleClose2 = () => {
    setOpen2(false);
  };
    const data = {
      lanes: [
        {
          id: 'Done',
          title: 'done',
          label: '2/2',
          style: {
            backgroundColor: '#3179ba',
            boxShadow: '2px 2px 4px 0px rgba(0,0,0,0.75)',
            color: '#fff',
            width: 280
          },
          cards: taskdone?.map(user => ({
            id: user._id,
            title: user.State,
            description: user.Description
          }))
        },
        {
          id: 'Doing',
          title: 'doing',
          label: '0/0',
          style: {
            backgroundColor: '#ba7931',
            boxShadow: '2px 2px 4px 0px rgba(0,0,0,0.75)',
            color: '#fff',
            width: 280
          },
          cards: taskdoing?.map(user => ({
            id: user._id,
            title: user.State,
            description: user.Description
          }))
        },
        {
          id: 'ToDo',
          title: 'ToDo',
          label: '0/0',
          style: {
            backgroundColor: '#ba7981',
            boxShadow: '2px 2px 4px 0px rgba(0,0,0,0.75)',
            color: '#fff',
            width: 280
          },
          cards: tasktodo?.map(user => ({
            id: user._id,
            title: user.State,
            description: user.Description
          }))
        }
      ]
    }  
    const updatetoprofessinal = async (e) =>{
      setOpen2(false);
  
        e.preventDefault();
        const config = {
            header: {
                "Content-Type":"application/json"
            }
        }

      
        try {
       
        
                const updatedgrouptopro = {
                    Professionnal: 1,
                   };
                await axios.put(process.env.REACT_APP_API_URL+'/groups/update/'+group?._id ,updatedgrouptopro);
                document.location.reload();
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    
    }
  const  showform = () => {
     document.getElementById("updateform").hidden  = false;
     document.getElementById("showform").hidden  = true;
        };

        const Privacy = [
          { value: 'Private', label: '🔒Private' },
          { value: 'Public', label: '🌐Public' }
        ]

        const update = async (e) =>{
          e.preventDefault();
          const config = {
              header: {
                  "Content-Type":"application/json"
              }
          }
  
        
          try {
         
          
                  const updatedgroup = {
                      Name: Name,
                      Description: Description,
                      Type:Type,
                  };
                  await axios.put(process.env.REACT_APP_API_URL+'/groups/update/'+group?._id ,updatedgroup);
                  
      
                 
        
          } catch (error) {
              setError(error.response.data.error);
              setTimeout(() => {
                  setError("");
              }, 5000);
          }
      }

    const handleDragEnd = (cardId,sourceLaneId, targetLaneId) => {
     
      const config = {
        header: {
            "Content-Type":"application/json"
        }
    }

  
    try {
   
            const updatedtask = {
                State: targetLaneId  
            };
      axios.put(process.env.REACT_APP_API_URL+'/task/update/'+cardId ,updatedtask);
     
      axios.get(process.env.REACT_APP_API_URL+'/task/'+cardId).then(resp => {

          const addtohistoryup =   {
            User : localStorage.getItem("connecteduser"),
           Group: id, 
            Information : "Moved From " +sourceLaneId +" To " +targetLaneId+ " A Task Named: "+resp.data.Description ,         
        }
           
       axios.post(process.env.REACT_APP_API_URL+'/historique/add',addtohistoryup);
      });   
  
    } catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
            setError("");
        }, 5000);
    }
    }

 

    const handleCardAdd = (card, laneId) => {
  
      const config = {
        header: {
            "Content-Type":"application/json"
        }
    }

  
    try {
   

            const adddedcard = {
              Group: id,
              State: laneId,
              Description:card.description,
              Member:localStorage.getItem("connecteduser"),
              
            };
           axios.post(process.env.REACT_APP_API_URL+'/task/add',adddedcard);
            
           const addtohistory =   {
            User : localStorage.getItem("connecteduser"),
           Group: id, 
            Information : "Added To " +laneId+ " A New Task Named: "+card.description ,         
        }
           
        axios.post(process.env.REACT_APP_API_URL+'/historique/add',addtohistory);
    } catch (error) {
        setError(error.response.data.error);
        setTimeout(() => {
            setError("");
        }, 5000);
    }
    }
    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
      setOpen(false);
    };

    {
        return (
          
			
<body>
<Header></Header>
	<div>
		<div class="main_content">
			<div class="mcontainer">
				<div class="profile is_group bg-white rounded-2xl -mt-4">
				
			
					<nav class="cd-secondary-nav border-t -mb-0.5 lg:pl-2">
						<ul>
							<li ><Link to={`/group/${group?._id}`} > Home </Link></li>
              <li><Link to={`/members/${group?._id}`} > Members </Link></li>
							<li class="active"><li><Link to={`/about/${group?._id}`} > About </Link></li></li>
						</ul>
					</nav>

                    <div class="bg-white rounded-md shadow-sm border p-5">
                   
                    {(group?.Professionnal=="1"?(  
                      <div>
                    <div class="flex">
                    <h5 style={{marginLeft:'100px'}}   > Done ✔️ </h5>
                    <h5 style={{marginLeft:'190px'}}  > Doing ⏳ </h5>
                    <h5 style={{marginLeft:'220px'}}  > ToDo ⌛ </h5>
                    <Button  style={{marginLeft:'190px'}} onClick={handleClickOpen} class="items-center justify-center h-8 px-3 rounded-md bg-gray-700 bg-opacity-70 text-white space-x-1.5"> 
                          <span> History  </span>
                          </Button>
                  
                    </div>
                    <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
          <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
          X
          </Button>
          </DialogActions>
          <DialogTitle id="alert-dialog-title"><h5 style={{marginLeft:"220px"}}> History</h5></DialogTitle>
          <DialogContent>
          <DialogContentText id="alert-dialog-description" style={{overflowY:"scroll" , overflow: "hidden"}}>
            
            {history?.map((hisot, index)=>
                        <div> * {hisot?.User?.username} {hisot?.Information}  {hisot?.Task?.Description}  <Moment fromNow ago>{hisot?.createdAt}</Moment> Ago </div>
                        )}
          
           
          </DialogContentText>
          </DialogContent>
          
      </Dialog>
                    <Board data={data}   style={{backgroundColor: 'white'}} editable  onCardAdd={handleCardAdd}  handleDragEnd={handleDragEnd}/>
                    </div>
                    ):(<div></div>) )}
                           
                            <h1 class="block text-xl font-bold"> Details  </h1>
                            <div class="space-y-4 mt-3">
                            
                            <div class="flex items-center space-x-3">
                                    <ion-icon name="albums" class="bg-gray-100 p-1.5 rounded-full text-xl md hydrated" role="img" aria-label="albums"></ion-icon>
                                    <div class="flex-1">
                                        <div>  <a href="#" class="text-blue-500">{group?.Name.toUpperCase()}</a> </div> 
                                    </div>
                                </div>
                                <div class="flex items-center space-x-3">
                              
                                    <ion-icon name="globe-outline" class="bg-gray-100 p-1.5 rounded-full text-xl md hydrated" role="img" aria-label="mail open"></ion-icon>
                                    <div class="flex-1">
                                        <div> Public  · Anyone on or off Socialite </div> 
                                    </div>
									
									{(group?.Owner==localStorage.getItem("connecteduser")?(<div style={{display:  'flex'}}>	<a id="showform"  href="javascript:void(0);"  style={{display:  'flex'}} class="flex items-center justify-center h-9 px-5 rounded-md bg-blue-600 text-white  space-x-1.5">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
								</svg>
								<span> <button onClick={showform} > Update Informations </button> </span>

								</a>
                &nbsp;
                {(group?.Professionnal=="0"?(
                <a  href="javascript:void(0);"  style={{display:  'flex'}} class="flex items-center justify-center h-9 px-5 rounded-md bg-red-600 text-white  space-x-1.5">
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clip-rule="evenodd"></path>
								</svg>
								<span> <button  onClick={handleClickOpen2} > Make Professionnal </button> </span>
                </a>  ):(<div></div>) )}
                </div>
                ):(<div></div>) )}
								
								
                                </div>
                             
                                <div class="flex items-center space-x-3">
                                    <ion-icon name="book-outline" class="bg-gray-100 p-1.5 rounded-full text-xl md hydrated" role="img" aria-label="albums"></ion-icon>
                                    Description : 
                                </div>
                                <div class="line-clamp-3" id="more-text">
                                {group?.Description}</div>
                                <a href="#" id="more-text" uk-toggle="target: #more-text ; cls: line-clamp-3"> See more </a>
                                <form onSubmit={update}  class="lg:p-10 p-6 space-y -3 relative bg-white shadow-xl rounded-md" id="updateform" style={{marginTop:'50px'}} hidden>
          
          <h1 class="lg:text-2xl text-xl font-semibold mb-6" > Update Group </h1>
              {error && <span>{error}</span>}
              <div>
                      <label class="mb-0"> Group Name </label>
                      <input type="text"  id="Name"     placeholder={group?.Name}  style={{ backgroundColor: '#f3f4f6'}}   onChange={(e) => setName(e.target.value)} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                  </div>
                  <div>
                  <label htmlFor="password" class="mb-0"> Description </label>
                  <textarea type="text"  id="Description"  placeholder={group?.Description}  onChange={(e) => setDescription(e.target.value)} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
              </div>
                  <div>
                      <label class="mb-0"> Privacy  </label>
                   <Select placeholder={group?.Type}        id="privaacy" options={Privacy} onChange={(e) => setType(e.value)} />

                  </div>
                 
             
              <div>
                  <button type="submit"  id="buttonajout" class="bg-green-500 font-semibold p-2 mt-5 rounded-md text-center text-white w-full">
                      Update Group</button>
              </div>
              
            
          </form>
          <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{" ⚠️ Professionnal Mode ⚠️"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are You sure You Want To Turn This Group Into Professionnal Mode  ?? 
           (Professionnal Mode Will Turn This Group Type To Private And Create A Table For Task Participation ) 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} color="primary"  autoFocus > 
            Disagree
          </Button>
          <Button onClick={updatetoprofessinal} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
					<div class="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Modal body text goes here.</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary">Save changes</button>
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
                            </div>
                            

                        </div>
				</div>
				
			</div>
            
		</div>
        
	</div>
	
	
</body>

       


            


     
   )
    
}



}

