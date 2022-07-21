import * as ActionType from "../../ActionTypes";

const instialState = {
    users: [],
    theUser:null
}
export const userReducer = (state = instialState, action) => {
    switch (action.type) {
        //Show all items
        case ActionType.ALL_USER:
            console.log(action.paylod)
            return {
                ...state,
                users: [...action.paylod]
            }
            //Register
        case ActionType.ADD_USER:
            console.log(action.paylod)
            return {
                ...state,
                users: [...state.users, action.paylod],
                theUser:action.paylod
            }

            case ActionType.UPDATE_USER:
            console.log(action.paylod)
            return {
                ...state,
                users: [...state.users,action.paylod]
            }
            //Login
            case ActionType.SAVE_USER:
                console.log(action.paylod+"תגובה מIS");
                return {
                    ...state,
                    theUser:action.paylod
                }
        default: return state;
    }
}