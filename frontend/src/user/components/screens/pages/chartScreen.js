import React ,{useState , useEffect} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import Header from '../../Header';
import {Bar, Line, Pie} from 'react-chartjs-2';
import {useDispatch, useSelector} from "react-redux";
import { selectMyPages} from "../../../../redux/slices/mypagesSlice";
import { selectFollowerpages} from "../../../../redux/slices/followerpageSlice";
const PagesScreen = ({history}) =>{
    
    
    //const [number, setNumber]= useState([]);
    const [chartData,setChartData]=useState({});
    const [mypages,  err, reload] =useSelector(selectMyPages);
    const [followerpages,  err1, reload1] =useSelector(selectFollowerpages);

    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history.push("/login")
        }

       
        let numberfollowers=[];
        let namepages=[];

        const config = {
            headers: {
                "Content-Type":"appliation/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        }

      
        for (let i of mypages){
            namepages.push(i.name);
        }

     /*   axios.get(`/followpage/getN`, config)
        .then((response) => {
            setNumber(response.data);
            console.log(number)
        })
        .catch((error) => {
        console.log(error)
        })*/

        console.log(followerpages)

        for (let i of followerpages){
            console.log(i)
            numberfollowers.push(i);
        }

        console.log(numberfollowers)
        console.log(namepages)
        
            setChartData({
              labels:namepages,
              datasets:[{
                label:"number of followers in page",
                data:numberfollowers,
                backgroundColor:"#0000FF"
               
              }
              ]
            });
                
            }
           
    ,[history]);

    const data={
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets:[{label:"sales",data:[3,2,5,7,4]}]
    }
    

    return (
        <>
        <Header/>
    <body>
    <div id="wrapper">
        <div class="main_content">
            <div class="mcontainer">

            <div class="flex justify-between relative md:mb-4 mb-3">
                    <div class="flex-1">
                        <h2 class="text-3xl font-semibold"> Pages </h2>
                        <nav class="cd-secondary-nav border-b md:m-0 -mx-4">
                            <ul>
                                        <li><Link to="/pages" class="lg:px-2">Pages </Link></li>
                                        <li><Link to="/mypages" class="lg:px-2">My pages </Link></li>
                                        <li class="active"><Link to="/statistic" class="lg:px-2">Statistic </Link></li>
                            </ul>
                        </nav>
                    </div>
                    <a href="#" class="flex items-center justify-center h-9 lg:px-5 px-2 rounded-md bg-blue-600 text-white space-x-1.5 absolute right-0">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5">
                            <path fill-rule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                clip-rule="evenodd"></path>
                        </svg>
                        
                        <Link to="/createpage" class="md:block" style={{color:"white"}}>Create </Link>
                    </a> 
                </div>

                <div >
        
        
        </div>

        
                        <br/> 
                    </div>
                    
                     
                    </div>
                    <div  style={{marginLeft:"400px",width:"720px"}} >
                    <Line    data={chartData}  
                    options={{title:{display:true,text:"followers/page",fontSize:25}}}  
            />
        </div>
        
        </div>
        </body>
        </>
    )
}
export default PagesScreen;