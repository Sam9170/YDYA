import React, { useEffect, useRef } from 'react'
import './Components.css'

function Sentmsg(props) {
  const ref = useRef(null)


  useEffect(()=>{
    ref?.current.scrollIntoView({ behavior: 'smooth' });
  },
  [ref])

  return (
    <div ref={ref} id='content'>
      {props.msg}
    </div>
  )
}


export default Sentmsg