import React from 'react'
import { Link } from 'react-router-dom'



const Header = () => {
  return (
    <div className='d-flex justify-content-between container-fluid align-items-center' style={{zIndex:"1"}}>
      
        <Link style={{textDecoration:"none"}}>
          <div style={{"fontFamily":"Squada One, sans-serif",color:"black"}} className='fs-1'>
            Trouble<span style={{"color":"#6e1212"}}>Shooter</span>
          </div>
        </Link>
    </div>
  )
}

export default Header