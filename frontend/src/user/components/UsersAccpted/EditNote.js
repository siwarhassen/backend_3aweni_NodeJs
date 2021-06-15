import React ,{ useEffect,useState }from 'react'
import {useParams,useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {showErrmsg,showSuccessmsg} from '../utils/notification/Notification'
import {isEmpty } from '../utils/validation/Validation'
import Header from '../../../user/components/Header';
const initialState = {
    note: 0,
    err: '',
    success: ''
}

function EditNote() {
    

   
    const {id} = useParams()
 
    
    const history = useHistory()
    
    const [user_accp,setUser_accp] = useState(initialState)

    const {note, err , success} = user_accp

    const handleChangeInput= e => {
        const {name,value} = e.target
        setUser_accp({...user_accp, [name]:value , err:'', success:''})
        
            }
       
 


    const handleUpdate = async () => {
        if (isEmpty(note) )
        return setUser_accp({...user_accp , err:"please fill Note filed", success:''})
        if (note >5 || note <0 )
        return setUser_accp({...user_accp , err:"Note error", success:''})
try {
   
        const res = await axios.put(`http://localhost:3000/accept/note_final`,{
      
            user_accepted:id,note_interview:note
        })
        return setUser_accp({...user_accp , err:'', success:'success'}) 
  
    
} catch (err) {
    


}
    }

    
  


    return (
        <>
        <Header />
         <body>
      <div class="main_content">
        <div class="mcontainer">
          <div class="lg:flex  lg:space-x-12">
            <div class="lg:w-3/4">
              <div class="flex justify-between relative md:mb-4 mb-3">
                <div class="flex-1">
                  <h2 class="text-3xl font-semibold"> Update  User note  </h2>
                  <nav class="cd-secondary-nav border-b md:m-0 -mx-4">
                    <ul>
                      <li class="active">
                        <a href="#" class="lg:px-2">
                          List 
                        </a>
                      </li>
                      
                     
                    </ul>
                  </nav>
                </div>
        
                <a
                  onClick={()=> history.goBack()}
                  class="flex items-center justify-center h-9 lg:px-5 px-2 rounded-md bg-blue-600 text-white space-x-1.5 absolute right-0"
                >
                {"<-"}
                 
                </a>
              </div>
              <div class="job-list">
              <div className="profile_page edit_user">
            <div className="row">

            </div>
           <div className="col-left">
           <h2> Note Interview</h2>
            
     
        <div className="form-group">
            <label htmlFor="note" >Note Interview</label>
            <input class="form-control" type="number" name="note" value={note} onChange={handleChangeInput}   />
        </div>
      
     
      
        <button class="bg-blue-600 flex flex-1 h-8 items-center justify-center rounded-md text-white capitalize" onClick={handleUpdate}  >Update</button>
        {err && showErrmsg(err)}
            {success && showSuccessmsg(success)}
        </div> 
     
        </div>


















 
 




        
       
            

           
            
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
       
        
        </>
    )
}

export default EditNote
