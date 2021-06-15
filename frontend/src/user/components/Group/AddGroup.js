
import React,{PureComponent, useState} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select'
import { useHistory } from "react-router-dom";
import HeaderWithoutLeftPanel from '../../../user/components/HeaderWithoutLeftPanel';
const AddGroup = () =>{
    let history = useHistory();
    const [Name, setName]= useState("");
    const [Description, setDescription]= useState("");
    const [Type, setType]= useState("");
    const [Professionnal, setProfessionnal]= useState("0");
    const [photo, setphoto]= useState("https://res.cloudinary.com/espritnn/image/upload/v1619272672/samples/3aweni/arton104603_epsopx.jpg");
    const [Owner, setOwner]= useState(localStorage.getItem("connecteduser"));
    const [error, setError]= useState("");
    const Groupid="";
    
    const goTel = () => {
        document.getElementById("test").style.width = "500px";
        document.getElementById("test").style.marginRight = "300px";
     
        };

          const checkvalid = () => {
            if (document.getElementById("Name").value !== "" && {Type}.Type !== "")
             {
             
               document.getElementById("buttonajout").style.backgroundColor = " rgba(37, 99, 235, var(--tw-bg-opacity))";

             }
         
            };
        const goDesk = () => {
            document.getElementById("test").style.width = "940px";
            document.getElementById("test").style.marginRight = "30px";
            };
    const Privacy = [
        { value: 'Private', label: '🔒Private' },
        { value: 'Public', label: '🌐Public' }
      ]
      const FriendsList = [
        { value: '111111', label: 'Siwar Hassen' },
        { value: '222222', label: 'Sabrine Fliss' }
      ]

 
      const addHandler = async (e) =>{
        e.preventDefault();
        const config = {
            header: {
                "Content-Type":"application/json"
            }
        }

      
        try {
            const {data} = await axios.post(
                process.env.REACT_APP_API_URL+"/groups/create", 
                {Name,Description,Type,Professionnal,photo,Owner},
                config);
                const id=data._id;
                const newMember = {
                    Group: id,
                    Role: 'Admin',
                    Member: localStorage.getItem("connecteduser")
                };
                const resp = await axios.post(process.env.REACT_APP_API_URL+'/groupmember/join', newMember);
                history.push('/group/'+id )
    
               
      
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }


  
    
 

    return(
        
        <div>
         <HeaderWithoutLeftPanel />
        <div class="FixedHeightContainer  rounded-md"  id="test" >
        <ion-icon name="desktop-outline" class="bg-gray-100 p-2 rounded-full text-2xl"  role="img" onClick={goDesk} aria-label="camera-outline"></ion-icon>
        <ion-icon name="phone-portrait-outline" class="bg-gray-100 p-2 rounded-full text-2xl"  role="img" onClick={goTel} aria-label="camera-outline"  ></ion-icon>
       

  
  <div class="Content" >
 
  <div class="profile is_group bg-white rounded-2xl -mt-4">


    
<img src="https://res.cloudinary.com/espritnn/image/upload/v1619272672/samples/3aweni/arton104603_epsopx.jpg" class="rounded-md" alt=""/>

<div class="profiles_content" >

    <div class="profile_info" style={{marginRight:'850px'}}>
        <h3 style={{width:'250px'}}> {Name} </h3>
     
        <p> 	{(Type=="Public"?(<ion-icon name="globe-outline"></ion-icon>):(<ion-icon name="lock-closed-outline"></ion-icon>) )}
        		 {Type} Group ·  1 member</p>
        
    </div>
    <div class="flex items-center space-x-4">
        
    </div>

</div>

<nav class="cd-secondary-nav border-t -mb-0.5 lg:pl-2" >
    <ul>
        <li> <a title="You Can Use This After Creating The Group"> Home</a></li>
        <li><a title="You Can Use This After Creating The Group">About</a></li>
        <li><a title="You Can Use This After Creating The Group">Photos</a></li>
        <li><a title="You Can Use This After Creating The Group">Reviews</a></li>
        <li><a title="You Can Use This After Creating The Group">Discussion</a></li>
        <li><a title="You Can Use This After Creating The Group">Videos</a></li>
        <li><a title="You Can Use This After Creating The Group">About</a></li>
    </ul>
</nav>

<div class="lg:flex lg:mt-8 mt-4 lg:space-x-8">
    <div class="lg:w-8/12 lg:px-14 space-y-7">
<div class="bg-white shadow border border-gray-100 rounded-lg dark:bg-gray-900 lg:mx-0 p-4" uk-toggle="target: #create-post-modal" style={{pointerEvents: 'none'}}>
                            <div class="flex space-x-3">
                                <img src="assets/user/images/avatars/username.png" class="w-10 h-10 rounded-full"/>
                                <input placeholder="What's Your Mind ? " class="bg-gray-100 hover:bg-gray-200 flex-1 h-10 px-6 rounded-full"/> 
                            </div>
                            
                            <div class="grid grid-flow-col pt-3 -mx-1 -mb-1 font-semibold text-sm">
                            <div class="hover:bg-gray-100 flex items-center p-1.5 rounded-md cursor-pointer"> 
                            <ion-icon name="camera-outline" class="bg-gray-100 p-2 rounded-full text-2xl" role="img" aria-label="camera-outline"></ion-icon>
                             Photo/Video 
                                </div>
                                <div class="hover:bg-gray-100 flex items-center p-1.5 rounded-md cursor-pointer"> 
                                <ion-icon name="person-add-outline" class="bg-gray-100 p-2 rounded-full text-2xl" role="img" aria-label="camera-outline"></ion-icon>
                            Tag Friend 
                                </div>
                                <div class="hover:bg-gray-100 flex items-center p-1.5 rounded-md cursor-pointer"> 
                                <ion-icon name="happy-outline" class="bg-gray-100 p-2 rounded-full text-2xl" role="img" aria-label="camera-outline"></ion-icon>
                           Feeling /Activity 
                                </div>
                            </div> 
                        </div>
                        
                        </div>
                        <div class="lg:w-4/12 flex-shirink-0"  >

<div class="mb-4" >

    <h1 class="block text-xl font-bold"> About  </h1>

    <div class="space-y-4 mt-3">
                                
                                <div class="flex items-center space-x-3">
                                    <ion-icon name="people" class="bg-gray-100 p-2 rounded-full text-2xl md hydrated" role="img" aria-label="people"></ion-icon>
                                    <div class="flex-1">
                                        <div class="font-semibold">  1 Member </div>
                                    </div>
                                </div>
                                {(Type=="Private"?(<div class="flex items-start space-x-3">
                                    <ion-icon name="lock-closed-outline" class="bg-gray-100 p-2 rounded-full text-2xl md hydrated" role="img" aria-label="people"></ion-icon>
                                    <div class="flex-1">
                                        <div class="font-bold"> Private </div>
                                        <div> Only Members can see who's in the group and what they post. </div>
                                    </div>
                                </div>):(<div class="flex items-start space-x-3">
                                    <ion-icon name="globe-outline" class="bg-gray-100 p-2 rounded-full text-2xl md hydrated" role="img" aria-label="people"></ion-icon>
                                    <div class="flex-1">
                                        <div class="font-bold"> Public </div>
                                        <div> Anyone can see who's in the group and what they post. </div>
                                    </div>
                                </div>) )}
							
                                
                               
                                 
                            </div>
    

</div>


</div>
                        </div>
                       
              


</div>
  </div>
  
</div>

                <div class="lg:p-12 max-w-xl lg:my-0" >
                    
            <form onSubmit={addHandler} class="lg:p-10 p-6 space-y -3 relative bg-white shadow-xl rounded-md" style={{marginTop:'50px'}}>
          
            <h1 class="lg:text-2xl text-xl font-semibold mb-6" > Create Group </h1>
                {error && <span>{error}</span>}
                <div>
                        <label class="mb-0"> Group Name (*) </label>
                        <input type="text" onKeyUp={checkvalid} id="Name"     placeholder="Your Group Name"  style={{ backgroundColor: '#f3f4f6'}} required value={Name} onChange={(e) => setName(e.target.value)} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                    </div>
                    <div>
                    <label htmlFor="password" class="mb-0"> Description </label>
                    <textarea type="text"  id="Description"value={Description} onChange={(e) => setDescription(e.target.value)} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                </div>
                    <div>
                        <label class="mb-0"> Privacy (*) </label>
                        <Select placeholder="Privacy ..."  required   isOptionSelected={checkvalid}   id="privaacy" options={Privacy} onChange={(e) => setType(e.value)} />

                    </div>
                    <div>
                        <label class="mb-0"> Invite Friends </label>                  
                          <Select 
    isMulti
    placeholder="Invite Friends (Optional)"
    name="colors"
    options={FriendsList}
    className="basic-multi-select"
    classNamePrefix="select"
  />
                    </div>
               
                <div>
                    <button type="submit"  id="buttonajout" class="bg-gray-700 font-semibold p-2 mt-5 rounded-md text-center text-white w-full">
                        Create Group</button>
                </div>
                
              
            </form>
          
        </div>
        
    </div>
    )
}

export default AddGroup;




