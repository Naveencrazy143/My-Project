export const USER_DETAILS_LIST='USER_DETAILS_LIST'

export const userDetailsList=(response)=>{

    return {
        type:USER_DETAILS_LIST,
        payload:response
    }

}

const inisitilSate= {
    userVerify:undefined
}

const AuthReducers=(state=inisitilSate,action)=>{

    switch(action.type){
        case USER_DETAILS_LIST:
            state={
                ...state,userVerify:action.payload
            }
            break;
            default:
            state=state
            break
    }

    return state

}

export default AuthReducers