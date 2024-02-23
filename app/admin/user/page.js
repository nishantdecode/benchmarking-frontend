'use client'

import Header from '@/app/components/header/header'
import React from 'react'
import { RxAvatar } from 'react-icons/rx'

const UserPage = () => {
  return (
    <>
    <Header title="Adding New User" icon={<RxAvatar size={32} />} />
      <div className="flex flex-col w-full h-full mt-14 p-5 pl-7 sm:pl-10 gap-10"></div>
    </>
  )
}

export default UserPage