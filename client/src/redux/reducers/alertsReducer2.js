const initialData={
    loading : false
};

export const alertsReducer2= (state= initialData, action)=>{
    switch(action.type)
    {
        case 'LOADING2': {
            return {
                ...state,
                loading : action.payload
            }
        }
        default : return state
    }
}