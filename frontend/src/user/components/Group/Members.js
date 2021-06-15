import React,{PureComponent, useState} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import { queryApi } from "../../../utils/queryApi";
import { useApi } from "../../../hooks/useApi";
import { useDispatch ,useSelector} from 'react-redux';
import Select from 'react-select'
import Header from '../../../user/components/Header';
import {Dialog,Button,DialogActions,DialogContent,DialogContentText,DialogTitle } from '@material-ui/core';

export default function Members({match}) {
	const id = match.params.id;
	const [group, err, reload] = useApi("groups/group/"+id,null,"GET");
	const [members, erre, reloads] = useApi("groupmember/members/"+id);
	const [connectedmember, erree, reloadse] = useApi("groupmember/member/"+localStorage.getItem("connecteduser"));
	const [open, setOpen] = React.useState(false);
	const [open2, setOpen2] = React.useState("");
	const [idmember, setIdmember] = React.useState(false);
	const [open3, setOpen3] = React.useState(false);
	const [error, setError]= useState("");
	const handleClickOpen =  (ida) => async() =>{
		setOpen(true);
		setIdmember(ida);
	  };
	
	  const handleClose = () => {
		setOpen(false);
	  };

	
	  const handleClose2 = () => {
		setOpen2(false);
	  };
	  const handleClickOpen2 = (ida) => async() =>{
		setOpen2(true);
		setIdmember(ida);
	  };
	
	  const handleClose3 = () => {
		setOpen3(false);
	  };
	  const handleClickOpen3 = (ida)=> async() =>{
		setOpen3(true);
		setIdmember(ida);
	  };


	  const addadmin =  () =>{
	
		setOpen(false);
		const config = {
			header: {
				"Content-Type":"application/json"
			}
		}

	  
		try {
	     
			const updatedroleadmin = {
				Role: "Admin",
			   };
				
		 axios.put(process.env.REACT_APP_API_URL+'/groupmember/updaterole/'+idmember ,updatedroleadmin);
				
		 document.location.reload();
			   
	  
		} catch (error) {
			setError(error.response.data.error);
			setTimeout(() => {
				setError("");
			}, 5000);
		}
	}

	const removeadmin =  () =>{
	
		setOpen2(false);
		const config = {
			header: {
				"Content-Type":"application/json"
			}
		}

	  
		try {
	     
			const updatedrolemember = {
				Role: "Member",
			   };
				
	 axios.put(process.env.REACT_APP_API_URL+'/groupmember/updaterole/'+idmember ,updatedrolemember);
	 document.location.reload();
	
			   
	  
		} catch (error) {
			setError(error.response.data.error);
			setTimeout(() => {
				setError("");
			}, 5000);
		}
	}

	const removemember = async (e) =>{
		setOpen3(false);
		e.preventDefault();
		const config = {
			header: {
				"Content-Type":"application/json"
			}
		}
	  
		try {
	   
		axios.delete(process.env.REACT_APP_API_URL+'/groupmember/leave/'+idmember );
		document.location.reload();
 
		} catch (error) {
			setError(error.response.data.error);
			setTimeout(() => {
				setError("");
			}, 5000);
		}
	}


    {
        return (
          
			
<body>
<Header /> 
	<div>
		<div class="main_content">
			<div class="mcontainer">
				<div class="profile is_group bg-white rounded-2xl -mt-4">
				
			
					<nav class="cd-secondary-nav border-t -mb-0.5 lg:pl-2">
						<ul>
							<li ><Link to={`/group/${group?._id}`} > Home </Link></li>
							<li><a href="#0">Photos</a></li>
                            <li class="active"><Link to={`/members/${group?._id}`} > Members </Link></li>
							<li><a href="#0">Discussion</a></li>
							<li><a href="#0">Videos</a></li>
							<li><Link to={`/about/${group?._id}`} > About </Link></li>
						</ul>
					</nav>
                    <div class="bg-white rounded-md shadow-sm border p-5">

                    <div class="widget border-t pt-4">
							<div class="flex items-center justify-between mb-2">
								<div>
									<h4 class="text-xl -mb-0.5 font-semibold"> Members({members?.length}) </h4>
								</div>
							</div>
							<div>
                            {members?.map((member, index) => (
                          
								<div class="flex items-center space-x-4 hover:bg-gray-100 rounded-md -mx-2 p-2">
									<div class="w-14 h-14 flex-shrink-0 rounded-md relative">
										<img src={member?.Member?.profilePicture} class="absolute w-full h-full inset-0 rounded-md" alt=""/>
									</div>
									<div class="flex-1">
										<h3 class="text-lg font-semibold capitalize">{member?.Member?.username} </h3>
										<div class="text-sm text-gray-500 -mt-0.5">
                                        {member?.Role}
										
										</div>
									</div>
									{(connectedmember?.Role=="Admin"?(
									<a  href="javascript:void(0);"  class="flex items-center justify-center h-9 px-4 rounded-md bg-gray-200 font-semibold" onClick={handleClickOpen3(member?._id)}>  Remove </a>
                                   ):(<div></div> ))}			

                                    {(group?.Owner==localStorage.getItem("connecteduser")?(<div class="flex">
									
                                    &nbsp;
									{(member?.Role=="Member"?(
                                    <a  href="javascript:void(0);"  class="flex items-center justify-center h-9 px-4 rounded-md bg-gray-200 font-semibold" onClick={handleClickOpen(member?._id)}  >  Make Admin </a>
									):( <a  href="javascript:void(0);"  class="flex items-center justify-center h-9 px-4 rounded-md bg-gray-200 font-semibold" onClick={handleClickOpen2(member?._id)}>  Remove Admin </a>
									) )} 
								  </div> ):(<div></div>) )}
                                </div>
                                  ))}							
							</div>
						</div>
						<Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{" ⚠️ Make Admin ⚠️"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Are You sure You Want To Make This Member An Admin  ?
       </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary"  autoFocus > 
            Disagree
          </Button>
          <Button onClick={addadmin}  color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
	  <Dialog
        open={open2}
        onClose={handleClose2}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"⚠️ Remove Admin ⚠️"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
		  Are You sure You Want To Remove This Admin  ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2} color="primary"  autoFocus > 
            Disagree
          </Button>
          <Button onClick={removeadmin} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
	  <Dialog
        open={open3}
        onClose={handleClose3}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"⚠️ Remove Member ⚠️"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
           Are You sure You Want To Remove This Member ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose3} color="primary"  autoFocus > 
            Disagree
          </Button>
          <Button onClick={removemember} color="primary">
            Agree
          </Button>
        </DialogActions>
      </Dialog>
                            <div class="space-y-4 mt-3">
                           
                               
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

