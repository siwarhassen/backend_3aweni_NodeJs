import React,{useState} from 'react';
import {Link} from "react-router-dom";
import axios from 'axios';
import "./screen.css";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

const ResetPasswordScreen = ({history, match}) =>{

    const [password, setPassword]= useState("");
    const [confirmPassword, setConfirmPassword]= useState("");
    const [success, setSuccess]= useState("");
    const [error, setError]= useState("");

    const resetPasswordHandler = async (e) =>{
        e.preventDefault();
        const config = {
            header: {
                "Content-Type":"appliation/json"
            },
        };

        if(password !== confirmPassword){
            setPassword("");
            setConfirmPassword("");
            setTimeout(() =>{
                setError("")
            }, 5000);
            return setError("Passwords do not match")
        }

        try {
            const {data} = await axios.post(
            `/api/auth/resetpassword/${match.params.token}`,
            {
                password,
            },
                config
                );
            console.log(data);
            setSuccess(data.data);
            store.addNotification({
                title: "Succeeded",
                message: "Your password has been changed with success",
                type: "success",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOut"],
                dismiss: {
                  duration: 3000,
                  onScreen: true
                }
              });
              history.goBack();
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    }

    return (
        <body style={{background:"#f3f4f6",height:"650px"}}>
            <ReactNotification/>
                <div class="lg:p-12 max-w-xl lg:my-0 my-12 mx-auto p-6 space-y-">
                    <form onSubmit={resetPasswordHandler} class="lg:p-10 p-6 space-y-3 relative bg-white shadow-xl rounded-md">
                        <h1 class="lg:text-2xl text-xl font-semibold mb-6"> Reset Password </h1>
                        {success && (
                            <span>
                                {success} <Link to="/login">Login</Link>
                            </span>
                        )}
                      
                        <div>
                            <label htmlFor="password" class="mb-0"> New Password </label>
                            <input type="password" placeholder="******" id="password" required value={password} onChange={(e) => setPassword(e.target.value)} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                        </div>
                        <div>
                            <label htmlFor="confpassword" class="mb-0"> Confirm Password </label>
                            <input type="password" placeholder="******" id="confpassword" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                        </div>
                        {error && <span style={{color:'red'}}>{error}</span>}
                        <div>
                            <button type="submit" class="bg-blue-600 font-semibold p-2 mt-5 rounded-md text-center text-white w-full">
                                Reset Email</button>
                        </div>
                    </form>
                </div>
        </body>
    )

}

export default ResetPasswordScreen;