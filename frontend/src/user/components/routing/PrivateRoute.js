/*import React from 'react'
import {Switch , Route} from 'react-router-dom'
import NotFound from '../utils/NotFound/NotFound'
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import { LinkedInPopUp } from 'react-linkedin-login-oauth2';
import LinkedInScreen from '../screens/LinkedInScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import PagesScreen from '../screens/pages/PagesScreen';
import MyPagesScreen from '../screens/pages/MyPagesScreen';
import CreatePageScreen from '../screens/pages/CreatePageScreen';

import { useSelector} from 'react-redux'

function PrivateRoute() {
    const auth = useSelector(state => state.auth)

    const {isLogged,isAdmin} = auth
    
    return (
       <section>
           <Switch>


                <Route exact path="/login" component={isLogged ? NotFound :LoginScreen}/>
                <Route exact path="/register" component={isLogged ? NotFound : RegisterScreen}/>
                <Route exact path="/forgotpassword" component={isLogged ? NotFound : ForgotPasswordScreen}/>
                <Route exact path="/api/auth/resetpassword/:token" component={isLogged ? NotFound : ResetPasswordScreen}/>
                <Route exact path="/linkedin" component={LinkedInPopUp} />
                <Route path="/LinkedInScreen" component={LinkedInScreen} />
                <Route exact path="/profile" component={isLogged ? NotFound : ProfileScreen}/>
                <Route exact path="/pages" component={isLogged ? NotFound : PagesScreen}/> 
                <Route exact path="/mypages" component={isLogged ? NotFound : MyPagesScreen}/> 
                <Route exact path="/createpage" component={isLogged ? NotFound : CreatePageScreen}/> 
           </Switch>
       </section>
    )
}

export default PrivateRoute*/



import {Redirect,Route} from 'react-router-dom';

const PrivateRoute = ({component: Component, ...rest}) => {
    return (
        <Route
        {...rest}
        render={(props) => 
                localStorage.getItem("authToken") ? (
                    <Component {...props} />
                ) : (
                    <Redirect to="/login"/>
                )
        }
        />
    );
};

export default PrivateRoute;

