import React, { useEffect, useRef } from 'react'
import './Components.css'

function Receivedmsg(props) {
const ref = useRef(null)

useEffect(()=>{
  ref.current.scrollIntoView({ behavior: 'smooth' });
},
[ref])

  return (
    <div ref={ref} id='content1'>
        {props.msg}
    </div>
  )
}

export default Receivedmsg