import React from 'react'
import {useSelector} from 'react-redux'
import AuthReducers from './AuthReducer'

function UserList() {

    const {userVerify}=useSelector((state)=>state.AuthReducers)
    console.log(userVerify,"====")
  return (
    <div>UserList</div>
  )
}

export { UserList}