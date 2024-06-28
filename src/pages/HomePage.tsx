import React from 'react'
import Main from '../components/MainSection'
import UsersSection from '../components/UsersSection'
import MakeUser from '../components/MakeUser'

const HomePage = () => {
  return (
    <div>
        <Main/>
        <UsersSection/>
        <MakeUser/>
    </div>
  )
}

export default HomePage