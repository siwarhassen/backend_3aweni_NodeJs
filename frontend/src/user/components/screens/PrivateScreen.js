import React,{useState , useEffect} from 'react';
import axios from 'axios';
import Header from '../Header';
import { useDispatch ,useSelector} from 'react-redux';
import {fetchconnectuser,selectoneuser,selectSessionUser} from "../../../redux/slices/userSlice";

const PrivateScreen = ({history}) => {
    const [error, setError]= useState("");
    const [privateData, setPrivateData]= useState("");


    useEffect(() => {
        if(!localStorage.getItem("authToken")){
            history.push("/login")
        }

        const fetchPrivateData = async () =>{
            const config = {
                headers: {
                    "Content-Type":"appliation/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }

            try {
                const {data} = await axios.get("/api/private",config);
                setPrivateData(data.data);
            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You are not authorized please login !!")
            }
        }
        fetchPrivateData();
    },[history]);
const dispatch = useDispatch();

 useEffect(() => {
        dispatch(fetchconnectuser());
        }, [dispatch]);
        const user=useSelector(selectSessionUser)[0];
      
        localStorage.setItem("role" , user.role);
       localStorage.setItem("connecteduser" , user._id);
    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        history.push("/login");
    };

    return error ? (
        <span>{error}</span>
    ) : (
        <>
      {/**  
       <div style={{ background: "green", color: "white" }}>{privateData.map(home => <div>{home.data}</div>)}</div>
       <button onClick={logoutHandler}>Logout</button>
       */} 
       <Header/>
        
        </>
    );
};

export default PrivateScreen;