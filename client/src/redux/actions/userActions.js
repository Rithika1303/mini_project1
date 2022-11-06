import axios from 'axios';
import { message } from 'antd';
export const userLogin = (reqOb) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.post('/api/users/login', reqOb)
        localStorage.setItem('user', JSON.stringify(response.data))
            message.success('login success')
            dispatch({ type: 'LOADING', payload: false })
            setTimeout(() => {
                window.location.href = '/FrontPage'
            }, 500);
    } catch (error) {
        console.log(error)
        message.error('something went wrong')
        dispatch({ type: 'LOADING', payload: false })
    }
}

export const userRegister = (reqOb) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.post('/api/users/register', reqOb)
        console.log("respose", response.data);
        if (response.data === "taken") {
            message.error("this username is taken");
            dispatch({ type: 'LOADING', payload: false })
        }
        else {
            message.success('login success')
            setTimeout(() => {
                window.location.href = '/login'
            }, 500);
            dispatch({ type: 'LOADING', payload: false })
        }
    } catch (error) {
        console.log(error)
        message.error('something went wrong')
        dispatch({ type: 'LOADING', payload: false })
    }
}

export const editProfile = (reqOb) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.get('/api/users/editProfile', reqOb)
        localStorage.setItem('user', JSON.stringify(response.data))
        message.success('Profile edited successfully')
        setTimeout(() => {
            window.location.href = '/'
        }, 500);
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error)
        message.error('something went wrong')
        dispatch({ type: 'LOADING', payload: false })
    }
}

export const getallusers = () => async dispatch => {
    dispatch({ type: 'LOADING1', payload: true })

    try {
        const response = await axios.get('/api/users/getallusers')
        dispatch({ type: 'GET_ALL_USERS', payload: response.data })
        dispatch({ type: 'LOADING1', payload: false })
    } catch (error) {
        console.log(error)
        dispatch({ type: 'LOADING1', payload: false })
    }
}

export const licensedVerified = (reqOb) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        await axios.post('/api/users/licensedVerified', reqOb)
        message.success('verified')
        setTimeout(() => {
            window.location.href = '/admin'
        }, 500);
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error)
        message.error('something went wrong')
        dispatch({ type: 'LOADING', payload: false })
    }
}

export const sendemail = (reqOb) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })
    try {
        console.log("yess",reqOb);
        const response = await axios.post('/api/users/sendemail', reqOb)
        console.log("check",response.data);
        message.success('mail send successfully')
        dispatch({ type: 'LOADING', payload: false })
    } catch (error) {
        console.log(error)
        message.error('something went wrong')
        dispatch({ type: 'LOADING', payload: false })
    }
}