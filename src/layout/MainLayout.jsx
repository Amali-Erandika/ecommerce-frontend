import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from'./Sidebar'

function MainLayout() {
  const [showSidebar,setSowsSidebar] = useState(false)
  return (
    <div className='bg-[#161d31] w-full min-h-screen'>
      <Header showSidebar={showSidebar} setSowsSidebar={setSowsSidebar}/>
      <Sidebar  showSidebar={showSidebar} setSowsSidebar={setSowsSidebar}/>
      <div className='ml-0 lg:ml-[260px]  pt-[95px] transition-all'>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout