import React,{useState , useEffect} from 'react';
import {Link } from 'react-router-dom';
import axios from 'axios';
import "./screen.css";
import { GoogleLogin } from 'react-google-login';

/*const initialState = {
    email: '',
    password: '',
    err: ''
}*/

const LoginScreen = ({history}) =>{
   // const [user,setUser] = useState(initialState);
    const [email, setEmail]= useState("");
    const [password, setPassword]= useState("");
    const [error, setError]= useState("");

    

    useEffect(() => {
        if(localStorage.getItem("authToken")){
            history.push("/");
        }
    }, [history]);

    const loginHandler = async (e) =>{
        e.preventDefault();
        const config = {
            header: {
                "Content-Type":"appliation/json"
            },
        };

        try {
            const {data} = await axios.post(
                "/api/auth/login", 
                {email, password},
                config);
            localStorage.setItem("authToken", data.token);
            history.push("/");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }


    const responseSuccessGoogle = async (response) => {
         const config = {
            header: {
                "Content-Type":"appliation/json"
            },
        };
         try {
            const {data} = await axios.post(
                '/api/auth/googlelogin',
                {tokenId: response.tokenId},
                config);
           
            localStorage.setItem("authToken", data.token)
            history.push("/")
        } catch (err) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }

    const responseErrorGoogle = async (response) => {
        
    }


    return(

            <body style={{background:"#f3f4f6",height:"650px"}}>
                <div class="lg:p-12 max-w-xl lg:my-0 my-12 mx-auto p-6 space-y-">
                    <form onSubmit={loginHandler} class="lg:p-10 p-6 space-y-3 relative bg-white shadow-xl rounded-md">
                        <h1 class="lg:text-2xl text-xl font-semibold mb-6"> Login </h1>
                        
                        <div>
                            <label htmlFor="email" class="mb-0"> Email Address </label>
                            <input type="email" placeholder="Info@example.com" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} tabIndex={1} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                        </div>
                        <div>
                            <label htmlFor="password" class="mb-0"> Password 
                            <Link to="/forgotpassword" tabIndex={4}>Forgot Password?</Link>
                            </label>
                            <input type="password" placeholder="******" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} tabIndex={2} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                        </div>
                        {error && <span style={{color:'red'}}>{error}</span>}
                        <div>
                            <button type="submit" tabIndex={3} class="bg-blue-600 font-semibold p-2 mt-5 rounded-md text-center text-white w-full">
                                Login</button>
                        </div>
                        <span>Don't have an account ? <Link to="/register">Register</Link> </span>
                        <GoogleLogin
                            clientId="978518760089-h0ncc4su74ie7jp6p4e6phm55fkg3r82.apps.googleusercontent.com"
                            buttonText="Login With Google"
                            onSuccess={responseSuccessGoogle}
                            onFailure={responseErrorGoogle}
                            cookiePolicy={'single_host_origin'}
                        />
                    </form>
                </div>
            </body>
    )
}

export default LoginScreen;