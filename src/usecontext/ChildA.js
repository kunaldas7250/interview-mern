import React, { useContext, useEffect } from 'react'
import ChildB from './ChildB'
import { Theme } from './Parent'
const ChildA = () => {
    const {state,setstate}=useContext(Theme)
    const handlechangetheme=()=>{
        setstate((prev)=>({...prev,Theme:prev.Theme==="Light"?"Pink":"Green"}))
    }
    useEffect(()=>{
        document.body.style.backgroundColor=state.Theme==="Light"?"Pink":"Green"
    },[state.Theme])
  return (
    <div>
        <button onClick={handlechangetheme}>
            changeTHEME:{state.Theme}
        </button>
      <ChildB/>
    </div>
  )
}

export default ChildA
