import React from 'react'
import { useSelector } from 'react-redux'

function ProfilePage() {
    const userData=useSelector(state=>state.auth.userData)
  return (
    <div className='pb-[10lvh] pt-[20lvh] flex flex-col px-3 gap-2'>
        <h1 className='text-lg'>{userData.name}</h1>
        <p className='text-green-400'>Email : {userData.email}</p>
    </div>
  )
}

export default ProfilePage