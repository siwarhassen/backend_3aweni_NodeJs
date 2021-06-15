import React ,{ useState }from 'react'
import {useParams,useHistory} from 'react-router-dom'
import "./file.css";
import {showErrmsg,showSuccessmsg} from '../utils/notification/Notification'
import axios from 'axios'
import {isEmpty } from '../utils/validation/Validation'
import Header from'../Header';


 export default function Question_Technique({match}){
    const initialState = {
    q1: '',
    q2:'',
    q3:'' ,
      err: '',
    success: ''
}
  
  const history = useHistory()
    const id = match.params.id;
    
    const [user_accp,setUser_accp] = useState(initialState)

    const {q1,q2,q3,err , success} = user_accp

    const handleChangeInput= e => {
        const {name,value} = e.target
        setUser_accp({...user_accp, [name]:value})
        
            }
       
 


    const handleUpdate = async () => {
    
        if (isEmpty(q1) )
        return setUser_accp({...user_accp , err:"please fill q1 filed", success:''})
        if (isEmpty(q2) )
        return setUser_accp({...user_accp , err:"please fill q2 filed", success:''})
        if (isEmpty(q3) )
        return setUser_accp({...user_accp , err:"please fill 3 filed", success:''})
      
try {
let i=0

    if (q1 ==="React est une bibliotheque JavaScript")
    i++
    if (q2 === "JavaScript XML")
    i++
    if(q3 === "creer des applications sans configuration de build.")
    i++
   
        const res = await axios.put(`http://localhost:3000/accept/update_note_technique`,{
      
            user_accepted:id,note_technique:i
        })
        return setUser_accp({...user_accp , err:'', success:'success'}) 
  
    
} catch (err) {
    


}
    }

    
  


    return (
        <div>
          
                   <Header />
         <body>

      <div class="main_content">
        <div class="mcontainer">
          <div class="lg:flex  lg:space-x-12">
            <div class="lg:w-3/4">
            <a
                  onClick={()=> history.goBack()}
                  class="flex items-center justify-center h-9 lg:px-5 px-2 rounded-md bg-blue-600 text-white space-x-1.5 absolute right-0"
                >
                {"<-"}
                 
                </a>
              <div class="job-list">
              <div className="profile_page edit_user">
            <div className="row">

            </div>
           <div className="col-left">
           <h2>Question Interview </h2>
            
     
        <div className="form-group">
            <label htmlFor="q1" >Qu’est-ce que React?</label>
            <input class="form-control" type="text" name="q1" value={q1} onChange={handleChangeInput}   />
        </div>
      
        <div className="form-group">
            <label htmlFor="q2" >Qu’est-ce que JSX?</label>
            <input  class="form-control" type="text" name="q2" value={q2} onChange={handleChangeInput}   />
        </div>
        <div className="form-group">
            <label htmlFor="q3" >A quoi sert la commande create-react-app?</label>
            <input class="form-control" type="text" name="q3" value={q3} onChange={handleChangeInput}   />
        </div>
     
      
        <button class="bg-blue-600 flex flex-1 h-8 items-center justify-center rounded-md text-white capitalize" onClick={handleUpdate}  >Submit</button>
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

        
        
    )
}


