import * as ActionType from "../../ActionTypes";
import axios from 'axios';

//הצגת כל הפריטים 
export const user = () => {

    return (dispach) => {
        axios.get(`https://localhost:44395/api/User/getAllUsers`)
            .then(res => {
                console.log(res)
                dispach(allUser(res.data))
            })
            .catch(err => {
                console.log(err);
            })
    }
}
export const allUser = (users) => {
    return {
        type: ActionType.ALL_USER,
        paylod: users
    }
}

//Login
export const logUser = (user) => {
    return (dispach) => {
        axios.post(`https://localhost:44395/api/User/IsUser`, user)
            .then(res => {
                console.log(res.data)
                
                dispach(saveUser(res.data))
            })
    }
}
export const saveUser = (user) => {
    return {
        type: ActionType.SAVE_USER,
        paylod: user
    }
}

//Register
export const AddUser = (user) => {
    return (dispach) => {
        axios.post(`https://localhost:44395/api/User/AddUser`, user)
            .then(res => {
                console.log(user)
                dispach(addUser(res.data))
            })
    }
}
export const addUser = (user) => {
    return {
        type: ActionType.ADD_USER,
        paylod: user
    }
}

export const UpdateUser = (theUser) => {
    return (dispach) => {
        axios.delete(`https://localhost:44395/api/User/DeleteUser`, theUser)
            .then(res => {
                console.log(user)
                dispach(updateUser(theUser))


            })
    }
}

export const updateUser = (theUser) => {
    return {
        type: ActionType.UPDATE_USER,
        paylod: theUser
    }
}

