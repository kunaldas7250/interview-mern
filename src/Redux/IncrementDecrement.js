
import React, { useReducer } from 'react'

const IncrementDecrement = () => {
    const reducer=(state,action)=>{
        switch(action.type){
            case "increment":
                return {...state,count:state+action.payload}
            case "decrement":
                return {...state,count:state-action.payload}
            case "len":
                return {...state,length:action.payload.length}
            default:
                return state 
        }
    }
    const [state, dispatch] = useReducer(reducer, { count: 0, length: 0 });
  return (
    <div>
      <h2>Increment and Decrement Using useReducer:{state.count}</h2>
      <h3>Length: {state.length}</h3>
      <button onClick={()=>dispatch({type:"increment",payload:5})}>Increment by 5</button>
      <button onClick={()=>dispatch({type:"decrement",payload:10})}>Decrement by 10</button>
      <br></br>
      <input type='text' placeholder='enter your length' onChange={(e)=>dispatch({type:"len",payload:e.target.value})}/>
    </div>
  )
}

export default IncrementDecrement
