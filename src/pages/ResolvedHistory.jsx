import React from 'react'
import { Card, Spinner } from 'react-bootstrap'
import Header from '../Components/Header'


const ResolvedHistory = () => {
  return (
    <>
    <Header/>
    <h3 className='ms-5 fw-bold mt-3'><span className='bg-dark py-2 px-5 rounded text-light'><i className="fa-solid fa-clock-rotate-left me-2 fs-4"></i>History</span></h3>
      <div className='w-100 mt-5 container-fluid py-3 rounded d-flex justify-content-  flex-wrap'>
     
      <Card style={{ width: '18rem' }} className='shadow'>
          <Card.Body>
              <Card.Title><h1>Title</h1></Card.Title>
  
              <Card.Text>
                  <h5>Description:</h5>
                  <p>Lorem ipsum dolor sit amet consectetur</p>
                  <hr />
                  <span className="fw-bold mb-3">Status:</span>
                  <div className='d-flex align-items-center'><span><i class="fa-solid fa-circle-check text-success"></i></span><span className='ms-2 fw-bold'>Resolved</span><span className="btn btn-dark ms-2">View</span></div>
                  <div className="d-flex justify-content-end align-items-center mt-2">
                      <div className="btn btn-warning  text-light fw-bold"><i class="fa-solid fa-pen-to-square"></i></div>
                      <div className="btn btn-danger  text-light fw-bold ms-2"><i class="fa-solid fa-trash"></i></div>
                  </div>
              </Card.Text>
  
          </Card.Body>
      </Card>
  </div>
    </>
  )
}

export default ResolvedHistory