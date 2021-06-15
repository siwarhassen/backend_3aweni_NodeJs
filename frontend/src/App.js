import React, { Suspense,useEffect } from "react";
import logo from './logo.svg';
import { BrowserRouter , Route, Switch } from "react-router-dom";
import './App.css';
import Header from './user/components/Header';
import PrivateRoute from './user/components/routing/PrivateRoute';
import PrivateScreen from './user/components/screens/PrivateScreen';
import LoginScreen from './user/components/screens/LoginScreen';
import RegisterScreen from './user/components/screens/RegisterScreen';
import ForgotPasswordScreen from './user/components/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './user/components/screens/ResetPasswordScreen';
import EditProfileScreen from './user/components/screens/profile/EditProfileScreen';
import EducationScreen from './user/components/screens/profile/EducationScreen';
import PostsProfileScreen from './user/components/screens/profile/PostsProfile';
import ExperienceScreen from './user/components/screens/profile/ExperienceScreen';
import ProjetScreen from './user/components/screens/profile/ProjetScreen';
import SkillsScreen from './user/components/screens/profile/SkillsScreen';
import PagesScreen from './user/components/screens/pages/PagesScreen';
import MyPagesScreen from './user/components/screens/pages/MyPagesScreen';
import chartScreen from './user/components/screens/pages/chartScreen';
import CreatePageScreen from './user/components/screens/pages/CreatePageScreen';
import AllPagesScreen from './user/components/screens/pages/AllPagesScreen';
import PageDetailsScreen from './user/components/screens/pages/PageDetailsSreen';
import PageFDetailsScreen from './user/components/screens/pages/PageFDetailsScreen';
import UserNotFollowedScreen from './user/components/screens/users/UserNotFollowedScreen';
import EditPageScreen from './user/components/screens/pages/EditPageScreen';
import NotificationScreen from './user/components/screens/users/NotificationScreen';
import ProfileScreen from './user/components/screens/users/ProfileScreen';
import ProfileEScreen from './user/components/screens/users/ProfileEScreen';
import ProfilePScreen from './user/components/screens/users/ProfilePScreen';
import ProfileSScreen from './user/components/screens/users/ProfileSScreen';
import EditEducationScreen from './user/components/screens/profile/EditEducationScreen';
import EditProjetScreen from './user/components/screens/profile/EditProjetScreen';
import EditExperienceScreen from './user/components/screens/profile/EditExperienceScreen';
import {fetchPages} from "./redux/slices/pagesSlice";
import {fetchEducations} from "./redux/slices/educationSlice";
import {fetchMyPages} from "./redux/slices/mypagesSlice";
import {fetchUsers} from "./redux/slices/userSlice";
import {fetchFollowerusers} from "./redux/slices/followeruserSlice";
import {fetchNotifications} from "./redux/slices/notificationSlice";
import {fetchCvs} from "./redux/slices/cvSlice";
import {fetchExperiences} from "./redux/slices/experienceSlice";
import {fetchSkills} from "./redux/slices/skillSlice";
import {fetchProjects} from "./redux/slices/projectSlice";
import {fetchFollowerpages} from "./redux/slices/followerpageSlice";
import Jdf from './user/components/courses/pdf';
import {fetchCourses,fetchCoursesofUser} from "./redux/slices/coursesSlice";
import {useDispatch} from "react-redux";
import HomeCourse from './user/components/courses/HomeCourses';
import Error404 from './user/Error404';
import Groups from './user/components/Group/Groups';
import AddGroup from './user/components/Group/AddGroup';
import Chatbox from './user/components/Chat/Chatbox';
import Messenger from './user/components/Chat/Messenger';
import GroupTimeline from './user/components/Group/GroupTimeline';
import About from './user/components/Group/About';
import {fetchGroups} from "./redux/slices/groupsSlice";
import Meeting from "./user/components/videoChat/pages/meetings/Meeting";
import { DataLayer } from "./user/components/videoChat/contexts/DataLayer";
import SocketContext from "./user/components/videoChat/contexts/SocketContext";
import reducer, { initialState } from "./user/components/videoChat/reducer";
import Newest from './user/components/Group/newest';
import Mygroups from './user/components/Group/Mygroups';
import Members from './user/components/Group/Members';
import HeaderAdmin from "./admin/components/HeaderAdmin";
import AddJob from "./user/components/Job/AddJob";
import JobDetails from "./user/components/Job/JobDetails";
import Jobs from "./user/components/Job/Jobs";
import Posts from "./user/components/Post/Posts";
import AddProblem from "./user/components/Problem/AddProblem";
import ProblemDetail from "./user/components/Problem/ProblemDetail";
import Problems from "./user/components/Problem/Problems";
import JobDetailsAdmin from "./admin/components/Job/JobDetailsAdmin";
import ListJobs from "./admin/components/Job/ListJobs";
import EditJob from "./user/components/Job/EditJob";
import EditProblem from "./user/components/Problem/EditProblem";
import ListPosts from "./admin/components/Post/ListPosts";
import ListProblems from "./admin/components/Problem/ListProblems";
import ListPostCategory from "./admin/components/PostCategory/ListPostCategory";
import AddCategoryp from "./admin/components/PostCategory/AddCategoryp";
import EditCategoryp from "./admin/components/PostCategory/EditCategoryp";
import Chart from "./admin/components/PostCategory/Chart";
import Profile from "./user/components/UsersAccpted/Profile";
import EditNote from "./user/components/UsersAccpted/EditNote";
import BookInterview from "./user/components/UsersAccpted/BookInterview";
import Question_Technique from "./user/components/UsersAccpted/question_technique";
import Erreur404 from "./user/Error404";
const Coursesofuser = React.lazy(() => import("./user/components/courses/Coursesofuser"));
const DisplayCourses = React.lazy(() => import("./user/components/courses/DisplayCourses"));
const CourseDetail = React.lazy(() => import("./user/components/courses/CourseDetail"));
const AddCourse = React.lazy(() => import("./user/components/courses/AddCourse"));
const Learn = React.lazy(() => import("./user/components/courses/Learn"));
const Quiz = React.lazy(() => import("./user/components/courses/Quiz"));
const Certification = React.lazy(() => import("./user/components/courses/Certification"));
const Consultusersincourse = React.lazy(() => import("./user/components/courses/Consultusersincourse"));
const CourseChart = React.lazy(() => import("./user/components/courses/CourseChart"));
const UpdateCourse = React.lazy(() => import("./user/components/courses/UpdateCourse"));
function App() {
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(fetchPages());
    dispatch(fetchMyPages());
    dispatch(fetchEducations());
    dispatch(fetchUsers());
    dispatch(fetchFollowerusers());
    dispatch(fetchNotifications());
    dispatch(fetchCvs());
    dispatch(fetchExperiences());
    dispatch(fetchProjects());
    dispatch(fetchSkills());
    dispatch(fetchFollowerpages());
    dispatch(fetchCourses());
    dispatch(fetchGroups());
    dispatch(fetchCoursesofUser());
    }, [dispatch]);
  return (

    <div className="App">
           <BrowserRouter>
  <Suspense fallback={<p>...Loading page please wait</p>}>

              <Switch>
           <Route exact path="/login" component={LoginScreen}/>
           <Route exact path="/forgotpassword" component={ForgotPasswordScreen}/>
           <Route exact path="/register" component={RegisterScreen}/>
           <Route exact path="/api/auth/resetpassword/:token" component={ResetPasswordScreen}/>
          <PrivateRoute exact path="/" component={PrivateScreen}/>
          <PrivateRoute exact path="/edit_info_user" component={EditProfileScreen}/> 
          <PrivateRoute exact path="/profile_education" component={EducationScreen}/>
          <PrivateRoute exact path="/profile_projet" component={ProjetScreen}/>
          <PrivateRoute exact path="/profile_experience" component={ExperienceScreen}/>
          <PrivateRoute exact path="/profile_skills" component={SkillsScreen}/>
          <PrivateRoute exact path="/mypages" component={MyPagesScreen}/> 
          <PrivateRoute exact path="/pages" component={PagesScreen}/> 
          <PrivateRoute exact path="/createpage" component={CreatePageScreen}/> 
          <PrivateRoute exact path="/pagedetails/:id" component={PageDetailsScreen}/>
          <PrivateRoute exact path="/allpages" component={AllPagesScreen}/>
          <PrivateRoute exact path="/pagefollowersdetails/:id" component={PageFDetailsScreen}/>
          <PrivateRoute exact path="/editpage/:id" component={EditPageScreen}/>
          <PrivateRoute exact path="/notifications" component={NotificationScreen}/>
          <PrivateRoute exact path="/list_users" component={UserNotFollowedScreen}/>
          <PrivateRoute exact path="/userdetails/:id" component={ProfileScreen}/>
          <PrivateRoute exact path="/userdetailsE/:id" component={ProfileEScreen}/>
          <PrivateRoute exact path="/userdetailsP/:id" component={ProfilePScreen}/>
          <PrivateRoute exact path="/editeducation/:id" component={EditEducationScreen}/>
          <PrivateRoute exact path="/userdetailsS/:id" component={ProfileSScreen}/>
          <PrivateRoute exact path="/editexperience/:id" component={EditExperienceScreen}/>
          <PrivateRoute exact path="/editproject/:id" component={EditProjetScreen}/>
          <PrivateRoute exact path="/statistic" component={chartScreen}/>
            <Route exact path="/chatbox" render={(props) => <Chatbox {...props} />} ></Route>
           <Route exact path="/chat/:id" render={(props) => <Messenger {...props} />} ></Route>
           <Route exact path="/group/:id" render={(props) => <GroupTimeline {...props} />} ></Route>
           <Route exact path="/about/:id/" render={(props) => <About {...props} />} ></Route>
           <Route exact path="/addgroup" render={(props) => <AddGroup {...props} />} ></Route>
           <Route exact path="/groups" render={(props) => <Groups {...props} />} ></Route>
           <Route exact path="/newest" render={(props) => <Newest {...props} />} ></Route>
           <Route exact path="/mygroups" render={(props) => <Mygroups {...props} />} ></Route>
           <Route exact path="/members/:id" render={(props) => <Members {...props} />} ></Route>
                    <Route exact path="/homecourse" render={(props) => <HomeCourse {...props} />} ></Route>
                   <Route exact path="/detailcourse/:id" render={(props) => <CourseDetail {...props} />} ></Route>
                   <Route exact path="/addcourse" render={(props) => <AddCourse {...props} />} ></Route>
                    <Route exact path="/quiz/:id/:index" render={(props) => <Quiz {...props} />} ></Route>
                    <Route exact path="/learn/:id" render={(props) => <Learn {...props} />} ></Route>
                   <Route exact path="/displayallcourses" render={(props) => <DisplayCourses {...props} />} ></Route>
                   <Route exact path="/certification/:id" render={(props) => <Certification {...props} />} ></Route>
                   <Route exact path="/Consultusersincourse/:id" render={(props) => <Consultusersincourse {...props} />} ></Route>
                   <Route exact path="/coursechart" render={(props) => <CourseChart {...props} />} ></Route>
                   <Route exact path="/updatecourse/:id" render={(props) => <UpdateCourse {...props} />} ></Route>
                   <Route exact path="/Coursesofuser/:id" render={(props) => <Coursesofuser {...props} />} ></Route>
              <Route path="/profile" exact render={(props) => <ProfileScreen {...props} />}></Route>
                    <Route exact path="/update_note_technique/:id"  component={Question_Technique }   />
                 <Route exact path="/edit_note/:id"  component={EditNote }   />
        <Route exact path="/update_date_interview/:id"  component={BookInterview }   />
  
        <Route path="/profile_accepted"  component={  localStorage.getItem("role")==1 ?  Profile : Profile   }  exact />
          <Route path="/problem/:id" exact render={(props) => <ProblemDetail {...props} />}></Route>
          <Route path="/problems" exact render={(props) => <Problems {...props} />}></Route>
          <Route path="/posts" exact render={(props) => <Posts {...props} />}></Route>
          <Route path="/addjob" exact render={(props) => <AddJob {...props} />}></Route>
          <Route path="/addproblem" exact render={(props) => <AddProblem {...props} />}></Route>
          <Route path="/jobs" exact render={(props) => <Jobs {...props} />}></Route>
          <Route path="/job/:id" exact render={(props) => <JobDetails {...props} />}></Route>
          <Route path="/editjob" exact render={(props) => <EditJob {...props} />}></Route>
          <Route path="/editproblem" exact render={(props) => <EditProblem {...props} />}></Route>
          <Route path="/postsprofile" exact render={(props) => <PostsProfileScreen {...props} />}></Route>
     
         
  
		
  <SocketContext>

      <DataLayer initialState={initialState} reducer={reducer}>

      <Route exact path="/meeting" component={Meeting} />
 <Route exact path="*" component={Error404} />
      </DataLayer>
    </SocketContext>
   
    </Switch>
 
          
  
              

     
          
         <Switch>
          <Route
            path="/jobDetails/:id"
            exact
            render={(props) => <JobDetailsAdmin  component={  localStorage.getItem("role")==1 ?  JobDetailsAdmin : Erreur404   } />}
          ></Route>
          <Route path="/jobsAdmin" exact render={(props) => <ListJobs  component={  localStorage.getItem("role")==1 ?  ListJobs : Erreur404   }  />}></Route>
          <Route path="/postsAdmin" exact render={(props) => <ListPosts  component={  localStorage.getItem("role")==1 ?  ListPosts : Erreur404   }  />}></Route>
          <Route path="/addCategoryp" exact render={(props) => <AddCategoryp  component={  localStorage.getItem("role")==1 ?  AddCategoryp : Erreur404   }  />}></Route>
          <Route
            path="/editCategoryp"
            exact
            render={(props) => <EditCategoryp  component={  localStorage.getItem("role")==1 ?  EditCategoryp : Erreur404   }  />}
          ></Route>
          <Route path="/chart" exact render={(props) => <Chart  component={  localStorage.getItem("role")==1 ?  Chart : Erreur404   }  />}></Route>
          <Route
            path="/categoriespAdmin"
            exact
            render={(props) => <ListPostCategory component={  localStorage.getItem("role")==1 ?  ListPostCategory : Erreur404   }  />}
          ></Route>

          <Route
            path="/problemsAdmin"
            exact
            render={(props) => <ListProblems  component={  localStorage.getItem("role")==1 ?  ListProblems : Erreur404   }  />}
          ></Route>
        </Switch>
                  </Suspense>
</BrowserRouter>
   




    </div>

  );
}

export default App;
