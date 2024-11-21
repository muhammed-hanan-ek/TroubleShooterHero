import React from 'react'

const Notification = () => {
  return (
    <div className='container mt-5'>
        <h3><span className='bg-dark text-light px-4 py-3 rounded'><i class="fa-solid fa-message fs-4 me-2"></i>Notifications</span></h3>
        <div className="bg-dark w-100 mt-5 text-light fs-5 fw-bold p-3" style={{borderRadius:"20px"}}>
            • User added a Grievance, He is in a Trouble
        </div>
    </div>
  )
}

export default Notification