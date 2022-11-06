const initialData={
    loading : false
};

export const alertsReducer1= (state= initialData, action)=>{
    switch(action.type)
    {
        case 'LOADING1': {
            return {
                ...state,
                loading : action.payload
            }
        }
        default : return state
    }
}