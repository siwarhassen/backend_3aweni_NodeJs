import pages from "./slices/pagesSlice";
import users from "./slices/userSlice";
import educations from "./slices/educationSlice";
import mypages from "./slices/mypagesSlice";
import followerusers from "./slices/followeruserSlice";
import notifications from "./slices/notificationSlice";
import cvs from "./slices/cvSlice";
import experiences from "./slices/experienceSlice";
import projects from "./slices/projectSlice";
import skills from "./slices/skillSlice";
import followerpage from "./slices/followerpageSlice";
import favoris from "./slices/favorisSlice";
import usercourse from "./slices/usercourseSlice";
import reviewscourse from "./slices/reviewscourseSlice";
import courses from "./slices/coursesSlice";
import { combineReducers } from "redux";
import groups from "./slices/groupsSlice";
import jobReducer from "./reducers/jobReducer";
import postReducer from "./reducers/postReducer";
import reactionReducer from "./reducers/reactionReducer";
import problemReducer from "./reducers/problemReducer";
import commentReducer from "./reducers/commentReducer";
import categorypReducer from "./reducers/categorypReducer";
import usersaccptedReducer from "./reducers/usersAcptedReducer";
const reducers = combineReducers({
pages,
mypages,
educations,
users,
notifications,
followerusers,
cvs,
experiences,
projects,
skills,
followerpage,
courses,
reviewscourse,
usercourse,
groups,
jobReducer,
postReducer,
reactionReducer,
problemReducer,
commentReducer,
categorypReducer,
favoris,
usersaccptedReducer
});
export default reducers;