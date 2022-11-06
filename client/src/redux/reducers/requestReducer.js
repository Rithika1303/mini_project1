const initialData = {
    requests : []
};

export const requestReducer = (state= initialData , action)=>{
    switch(action.type)
    {
        case 'GET_ALL_REQUESTS':{
            return{
                ...state,
                requests : action.payload
            }
        }
        default: return state
    }
}