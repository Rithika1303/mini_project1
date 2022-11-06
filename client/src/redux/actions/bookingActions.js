import axios from "axios";
import { message } from "antd";
export const bookCar = (reqObj) => async (dispatch) => {
  dispatch({ type: "LOADING", payload: true });
  try {
    await axios.post("/api/bookings/bookcar", reqObj);
    dispatch({ type: "LOADING", payload: false });
    message.success("Your car booked successfully");
    setTimeout(() => {
      window.location.href = "/";
    }, 500);
  } catch (error) {
    console.log(error)
    dispatch({ type: "LOADING", payload: false });
    message.error("Something went wrong , please try later");
  }
};

export const getallbookings=()=> async dispatch=>{
  dispatch({type: 'LOADING', payload: true})

  try{
      const response = await axios.get('/api/bookings/getallbookings')
      dispatch({type: 'GET_ALL_BOOKINGS',payload:response.data})
      dispatch({type: 'LOADING', payload: false})
  } catch(error){
      console.log(error)
      dispatch({ type: 'LOADING', payload: false})
  }
}
export const getallhostreq=()=> async dispatch=>{
  dispatch({type: 'LOADING', payload: true})

  try{
      const response = await axios.get('/api/bookings/getallhostreq')
      dispatch({type: 'GET_ALL_BOOKINGS',payload:response.data})
      dispatch({type: 'LOADING', payload: false})
  } catch(error){
      console.log(error)
      dispatch({ type: 'LOADING', payload: false})
  }
}

export const changerequest = (reqOb) => async dispatch => {
  dispatch({ type: 'LOADING', payload: true })

  try {
      await axios.post('/api/bookings/changerequest', reqOb)
      message.success('done')
      setTimeout(() => {
          window.location.href = '/HostCar'
      }, 500);
      dispatch({ type: 'LOADING', payload: false })
  } catch (error) {
      console.log(error)
      message.error('something went wrong')
      dispatch({ type: 'LOADING', payload: false })
  }
}

