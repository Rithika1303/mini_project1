import axios from 'axios';
import { message } from 'antd';
export const admincheck = (reqOb) => async dispatch => {
    dispatch({ type: 'LOADING', payload: true })

    try {
        const response = await axios.post('/api/admin/admincheck', reqOb)
        if (response) {
            localStorage.setItem('user', JSON.stringify(response.data))
            message.success('login success')
            dispatch({ type: 'LOADING', payload: false })
            setTimeout(() => {
                window.location.href = '/admin'
            }, 500);
        }
    } catch (error) {
        console.log(error)
        message.error('something went wrong')
        dispatch({ type: 'LOADING', payload: false })
    }
}
