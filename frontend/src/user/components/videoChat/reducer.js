export const initialState = {
  userName: null,
  imageUrl: null,
  isGoogleSignin: false,
  showChatBox: false,
  showParticipants: false,
  allUsers: [],
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
   
    case "SET_GUEST_DATA":
      return {
        ...state,
        userName: action.name,
        isGoogleSignin: action.isGoogleSignin,
      };
    case "OPEN_CHAT":
      return {
        ...state,
        showChatBox: action.chat,
        showParticipants: false,
      };
    case "OPEN_PARTICIPANTS":
      return {
        ...state,
        showParticipants: action.participants,
        showChatBox: false,
      };
    case "ADD_ALL_USERS":
      console.log(action.users);
      return {
        ...state,
        allUsers: action.users,
      };
    default:
      return state;
  }
};

export default reducer;
