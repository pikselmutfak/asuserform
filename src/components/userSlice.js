import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'

const userSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setAll: (state, action) => {
            return action.payload
        },
        add: (state, action) => {
            const newUser = action.payload
            state.push(newUser)
        },
        update: (state,action) => {

            console.log('update action', action)
            return state.map(item => {
                if (item._id === action.payload._id) {
                    return action.payload
                }
                return item
            })
        },
        remove: (state, action) => {
            return state.filter(item => {
                return item._id !== action.payload._id
            })
        }
    }
})

export const {setAll, add, update, remove} = userSlice.actions

export const selectUsers = (state) => {
    return state.users
}

export const selectUserById = id => state => {

    const user = state.users.find(u => u._id === id)
    return user
}

export const asyncGetUsers = callback => dispatch => {

    // thunk function

    axios.get('/api/users')
    .then((response) => {

        console.log('updated user', response.data)
        dispatch(setAll(response.data))
        callback()
    })
    .catch((err) => {

        console.log(err)
        callback()
    })
}

export const asyncAddUser = (user,callback) => dispatch => {
    
    console.log('--- user will be added', user)

    axios.post(
        '/api/user', // post url
        user  // post body
    )
    .then((response) => {

        console.log('--- user added', response)
        dispatch(add(response.data))
        callback()
    })
    .catch((err) => {

        console.log(err)
        callback()
    })
}

export const asyncUpdateUser = (user,callback) => dispatch => {

    console.log('--- user will be patched', user)
    axios.patch(
        '/api/user/'+user._id, // post url
        user    // patch body
    )
    .then((response) => {

        console.log('--- user patched', response)
        dispatch(update(user, response.data))
        callback()
    })
    .catch((err) => {

        console.log(err)
        callback()
    })
}

export const asyncRemoveUser = (user,callback) => dispatch => {

    // thunk function

    axios.delete('/api/user/'+user._id)
    .then((response) => {

        console.log('removed user', response)
        if (response.status === 202) {
            dispatch(remove(user))
        }
        callback()
    })
    .catch((err) => {

        console.log(err)
        callback()
    })
}

export default userSlice.reducer