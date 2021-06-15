import React ,{ useEffect,useState }from 'react'
import {useParams,useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import "./file.css";
import Header from "../Header";
import axios from 'axios'
import {showErrmsg,showSuccessmsg} from '../utils/notification/Notification'
import {isEmpty } from '../utils/validation/Validation'
const initialState = {
    
    err: '',
    success: ''
}

function BookInterview() {
    
  const [value, onChange] = useState(new Date());
   
    const {id} = useParams()
    
    const history = useHistory()
    
    const [user_accp,setUser_accp] = useState(initialState)

    const { err , success} = user_accp


       
 


    const handleUpdate = async () => {
      console.log(value)
       
try {
   
        const res = await axios.put(`http://localhost:3000/accept/update_date_interview`,{
      
            user_accepted:id,date_interview:value
        })
        return setUser_accp({...user_accp , err:'', success:'success'}) 
  
    
} catch (err) {
    


}
    }

    
  


    return (
        <>
            <div className="App">
          <Header />
         <body>
      <div class="main_content">
        <div class="mcontainer">
          <div class="lg:flex  lg:space-x-12">
            <div class="lg:w-3/4">
              <div class="flex justify-between relative md:mb-4 mb-3">
                <div class="flex-1">
                  <h2 class="text-3xl font-semibold"> Book Interview  </h2>
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
           <h2>Book Interview </h2>
           <Calendar
        onChange={onChange}
        value={value}
      />

    
      
     
      
        <button onClick={handleUpdate}  >Update</button>
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
    </div>
        
        </>
    )
}

export default BookInterview
