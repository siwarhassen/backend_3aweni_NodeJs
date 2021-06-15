import ACTIONS from '../actions/'

const usersaccpted = []

const usersaccptedReducer = (state = usersaccpted, action) => {
    switch(action.type)
    {
       
        case ACTIONS.GET_ALL_USERS_ACCEPTED: 
            return action.payload
        default: 
          return state
    }
}
export default usersaccptedReducer