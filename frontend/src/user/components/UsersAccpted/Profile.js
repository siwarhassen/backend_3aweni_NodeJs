import React,{useState,useEffect} from 'react'
import axios from 'axios'
import LinesEllipsis from "react-lines-ellipsis";
import 'react-notifications/lib/notifications.css';
import {useSelector,useDispatch} from 'react-redux'
import {useParams,Link} from 'react-router-dom'
import {showSuccessmsg,showErrmsg} from '../utils/notification/Notification';
import {dispatchGetAllUsers_accepted,fetchAllUsersAccepted} from '../../../redux/actions/usersAccpetedAction'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Donut from 'react-donut';
import Moment from 'react-moment';
import Header from '../../../user/components/Header';
import { selectCvs } from '../../../redux/slices/cvSlice';
const initialState = {
    err:'',
    success:''
}

function Profile() {
    

 
    const usersaccpted = useSelector(state => state.usersaccptedReducer)
    const [data,setData] = useState(initialState)
    const [loading,setLoading] = useState(false)
    const [callback,setCallback] = useState(false)
    const {err,success} = data
    const dispatch = useDispatch()
    const {id} = useParams()
   

    useEffect(()=> {
    

        
            fetchAllUsersAccepted(localStorage.getItem("jobid")).then(res => {
                dispatch(dispatchGetAllUsers_accepted(res))
              
            })

   
        
    },[dispatch,callback,setData])

const handleContrat = async () => {
  try {


    setLoading(true)
        await axios.post(`http://localhost:3000/accept/filtre`,{
          Job:localStorage.getItem("jobid")
        })
        setLoading(false)
        NotificationManager.success('Contrat', 'Les contrats sont genere avec success');
        setCallback(!callback)
        return setData({...data, err:'' ,success:'success'})   



} catch (err) {
setData({...data, err:err.response.data.msg ,success:''})   
}
}
  


    const handleDelete = async (id) => {
try {


        if(window.confirm("Are you sure you want to delete this user ?"))
        {
            setLoading(true)
            await axios.delete(`http://localhost:3000/accept/delete/${id}`)
            setLoading(false)
            NotificationManager.error('Delete', 'Delete avec success');
            setCallback(!callback)
        }
    

  
} catch (err) {
    setData({...data, err:err.response.data.msg ,success:''})   
}
    }
    const [responseData, setResponseData] = useState('')

useEffect(() => {
  
    var options = {
      method: 'GET',
      url: 'https://covid-19-tracking.p.rapidapi.com/v1/tunisia',
      headers: {
        'x-rapidapi-key': 'c73665fbf9msh4dbabc4887a33bdp1e260djsne3580d3097f9',
        'x-rapidapi-host': 'covid-19-tracking.p.rapidapi.com'
      }
    };
    
    axios.request(options).then(function (response) {
      setResponseData(response.data)
      const arr = []
      responseData.map((m) => {
        
  
        arr.push(m)
      })
      setResponseData(arr)
      console.log('test use effect' + arr)
    }).catch(function (error) {
      console.error(error);
    });
  
  }, []
  
  )
    return (
        <>
          <Header/>
           <body>











             
      <div class="main_content">
        <div class="mcontainer">
         
        <div class="flex justify-between relative md:mb-4 mb-3">
        <div class="flex-1" uk-slider="finite: true">
        <center>
    <h1>{responseData.Country_text}</h1>
      <div class="row">
      <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Total Cases</h5>
                    <span  class="h2 font-weight-bold mb-0">{responseData["Total Cases_text"]}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-gradient-info text-white rounded-circle shadow">
                      <i class="fas fa-lungs-virus"></i>
                      </div>  
                      </div>

                    </div>
                    <p class="mt-3 mb-0 text-sm">
                    <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> {responseData["New Cases_text"]}</span>
                    <span class="text-nowrap">Today</span>
                  </p>
                    </div>
                    </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Total Deaths</h5>
                    <span class="h2 font-weight-bold mb-0">{responseData["Total Deaths_text"]}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-gradient-red text-white rounded-circle shadow">
                      <i class="fas fa-skull-crossbones"></i>
                      </div>  
                      </div>

                    </div>
                    <p class="mt-3 mb-0 text-sm">
                    <span class="text-success mr-2"><i class="fa fa-arrow-up"></i> {responseData["New Deaths_text"]}</span>
                    <span class="text-nowrap">Today</span>
                  </p>
                    </div>
                    </div>
                    </div>
                    <div class="col-xl-3 col-md-6">
              <div class="card card-stats">
                
                <div class="card-body">
                  <div class="row">
                    <div class="col">
                    <h5 class="card-title text-uppercase text-muted mb-0">Total Recovered</h5>
                   
                    <span class="h2 font-weight-bold mb-0">{responseData["Total Recovered_text"]}</span>
                    </div>
                    <div class="col-auto">
                      <div class="icon icon-shape bg-gradient-green text-white rounded-circle shadow">
                      <i class="fas fa-briefcase-medical"></i>
                      </div>  
                      </div>

                    </div>
                    <p class="mt-3 mb-0 text-sm">
                    <span class="text-success mr-2"></span>
                    <span class="text-nowrap"></span>
                  </p>
                    </div>
                    </div>
                    </div>
               
                
                
        </div>
        </center>
                        <h2 class="text-3xl font-semibold"> List Users accepted </h2>
                       
                        <nav class="cd-secondary-nav border-b md:m-0 -mx-4">
                            <ul>
                                <li class="active"><a   class="lg:px-2">        List Users </a></li>
                              
                            </ul>
                        </nav>
                    </div>

                    <a
                 onClick={()=>handleContrat()}
                  class="flex items-center justify-center h-9 lg:px-5 px-2 rounded-md bg-blue-600 text-white space-x-1.5 absolute right-0"
                >
                  Signer Contrat
                 
                </a>       
           
               
                
        <NotificationContainer/>
              </div>
              
              <div class="relative uk-slider" uk-slider="finite: true">
         
              <div>
            {err && showErrmsg(err)}
            {success && showSuccessmsg(success)}
            {loading && <h3>...... loading</h3>}
        </div>


       
        <div class="uk-slider-container px-1 py-3" uk-slider="finite: true">

        <ul class="uk-slider-items uk-child-width-1-5@m uk-child-width-1-3@s uk-child-width-1-2 uk-grid-small uk-grid"
        style={{transform: `translate3d(0px, 0px, 0px)`}}

        >


        {
                            usersaccpted.map(user => (
                             
                          
                        
                              <li key={user._id} tabIndex="-1" class="uk-active">
                                  <div class="card">
                                    <div class="card-media h-44">
                                      
                                        <div class="card-media-overly"></div>
                                        <img src="assets/user/images/brand/brand-avatar-4.png" alt="" />
                                        <span class="absolute bg-white px-2 py-1 text-sm rounded-md m-2"> Label</span>
                                      
                                        <a href={user.Lien_meet} class="absolute bg-red-100 font-semibold px-2.5 py-1 rounded-lg text-red-500 text-xs top-2.5 left-2.5">
                                            Lien Meet
                                        </a>
                                    </div>
                                    <div class="card-body">
                                        <div class="-top-3 absolute bg-blue-100 font-medium px-2 py-1 right-2 rounded-full text text-blue-500 text-sm">
                                      
                                        {"Note Final :"+user.note_final}
                                       
                                        </div>
                                        <div class="text-xs font-semibold uppercase text-yellow-500"> {user.user.username}</div>
                                        <div class="ext-lg font-medium mt-1 t truncate">  
                                         {"Note cv:"+user.note_cv}
                                       
                                     
                                          </div>
                                         
                                          <div class="ext-lg font-medium mt-1 t truncate">  
                                        {"Note Technique:"+user.note_technique} 
                                  
                                          </div>
                                          <div class="ext-lg font-medium mt-1 t truncate"> 
                                         
                                         <Moment format="YYYY/MM/DD">
                                         {user.date_interview }
           </Moment> 
                                        
                                      
                                    
                                         </div>
                                          <div class="ext-lg font-medium mt-1 t truncate">  
                                      
                                        {"interview:"+user.etat_interview}
                                          </div>

                                          <div class="flex mt-3 space-x-2 text-sm">
                                         
                                            <Link to={`edit_note/${user._id}`} class="bg-blue-600 flex flex-1 h-8 items-center justify-center rounded-md text-white capitalize">
                              Note
                           </Link>
                         
                                     
                                            <a onClick={()=>handleDelete(user._id)} class="bg-gray-200 flex flex-1 h-8 items-center justify-center rounded-md capitalize"> 
                                            remove 
                                            </a>
                                        </div>
               
                        
                                       
                                        
                                           </div>
                                </div>
                               
                             
                              </li>
                            ))
                        }

</ul>
</div>


                                     
<Donut
        chartData={[
          { name: 'score > 8', data: usersaccpted.filter(e=>e.note_final>8).length },
          { name: 'score < 8', data: usersaccpted.filter(e=>e.note_final<8).length },
     
        ]}
        chartWidth={300}
        chartHeight={500}
        title="Users Accepted"
        chartThemeConfig={{
          series: {
            colors: ['#ffe0bd', 'orange'],
          },
        }}
      />








 
 




        
       
            

           
            
              </div>
            </div>
          </div>
       
    </body>
       
        
        </>
    )
}

export default Profile
