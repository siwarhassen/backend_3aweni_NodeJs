import React,{useState} from 'react';
import axios from 'axios';
import "./screen.css";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';

const ForgotPasswordScreen = () =>{

    const [email, setEmail]= useState("");
    const [success, setSuccess]= useState("");
    const [error, setError]= useState("");

    const forgotPasswordHandler = async (e) =>{
        e.preventDefault();
        const config = {
            header: {
                "Content-Type":"appliation/json"
            },
        };

        try {
            const {data} = await axios.post(
                "/api/auth/forgotpassword", 
                {email},
                config
                );
            setSuccess(data.data);
            store.addNotification({
                title: "Email send",
                message: "Please check your e_mail",
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
                    <form onSubmit={forgotPasswordHandler} class="lg:p-10 p-6 space-y-3 relative bg-white shadow-xl rounded-md">
                        <h1 class="lg:text-2xl text-xl font-semibold mb-6"> Forgot Password </h1>
                        
                        {success && <span>{success}</span>}
                        <div>
                            <p>
                                Please enter the email address you register your account with.
                                we will send you reset password confirmation to this email
                            </p>
                        </div>
                        <div>
                            <label htmlFor="email" class="mb-0"> Email Address </label>
                            <input type="email" placeholder="Info@example.com" id="email" required value={email} onChange={(e) => setEmail(e.target.value)} class="bg-gray-100 h-12 mt-2 px-3 rounded-md w-full"/>
                        </div>
                        {error && <span style={{color:'red'}}>{error}</span>}
                        <div>
                            <button type="submit" class="bg-blue-600 font-semibold p-2 mt-5 rounded-md text-center text-white w-full">
                                Send Email</button>
                        </div>
                    </form>
                </div>
            </body>
    )

}

export default ForgotPasswordScreen;