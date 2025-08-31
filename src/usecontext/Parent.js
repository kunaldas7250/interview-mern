import React, { createContext, useState } from 'react'
import ChildA from './ChildA'
export  const Theme=createContext()
const Parent = () => {
    const [state,setstate]=useState({Theme:"light"})
  return (
    <div>
      <Theme.Provider value={{state,setstate}}>
        <ChildA/>
      </Theme.Provider>
    </div>
  )
}

export default Parent
