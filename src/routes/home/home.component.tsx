import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/header/header.component'

const Home = () => {
  return (
    <React.Fragment>
      <Header />
      <Outlet />
    </React.Fragment>
  )
}

export default Home
