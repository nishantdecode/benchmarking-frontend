import { Button } from '@/components/ui/button'
import { IoIosArrowDown } from "react-icons/io";
import React from 'react'

const OptionButton = () => {
  return (
    <div className='flex flex-row gap-1'>
      <Button variant="outline" className="flex py-0 text-xs justify-center w-full sm:w-auto gap-2">Export as <IoIosArrowDown size={16} className='text-primary'/></Button>
    </div>
  )
}

export default OptionButton