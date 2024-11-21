import React, { useState } from 'react';
import { Button, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './side.css';
import hero from '../images/hero.webp'

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const handleClose = () => setShow(false);

  const handleShow = (event) => {
    const button = event.target.getBoundingClientRect();
    setModalPosition({
      top: button.top + window.scrollY + button.height + 5,
      left: button.left + (open ? 200 : 20), // Adjust position based on sidebar width
    });
    setShow(true);
  };

  const navigate = useNavigate()
  const handleLogout =()=>{
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("user")
    navigate('/')
  }

  return (
    <div>
      <div
        style={{
          minHeight: '100vh',
          width: open ? '250px' : '70px',
          transition: 'width 0.3s',
          color: 'white',
          borderRadius: '0px 20px 20px 0px',
        }}
        className="d-flex bg-dark flex-column align-items-center py-3 flex-grow-1 h-100"
      >
        <div
          style={{ fontFamily: 'Squada One, sans-serif', color: 'white' }}
          className="fs-3 mt-2 text-center mb-5"
        >
          T<span>S</span>
          {open && (
            <span
              className="ms-2 "
              style={{ fontFamily: 'Squada One, sans-serif', color: 'white' }}
            >
              TroubleSooter
            </span>
          )}
        </div>
        <div className="w-100 text-center">
          <Link
            onClick={handleShow}
            style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}
          >
            <i className="fa-solid fa-user fs-4 mb-5 mt-5"></i>
            {open && <span className="ms-2">Profile</span>}
          </Link>
        </div>
        <div className="w-100 text-center">
          <button onClick={handleLogout} style={{ textDecoration: 'none', color: 'white' }} className='btn btn-dark'>
            <i className="fa-solid fa-right-from-bracket fs-4 mb-5 mt-5"></i>
            {open && <span className="ms-2">Logout</span>}
          </button>
        </div>
        <Button
          id="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          style={{
            top: '20px',
            left: open ? '250px' : '70px',
            transition: 'left 0.3s',
            marginTop: '50vh',
          }}
          className="btn btn-dark"
        >
          {open ? '<' : '>'}
        </Button>
      </div>

      {/* Custom Positioned Modal */}
      {show && (
        <div
          style={{
            position: 'absolute',
            top: modalPosition.top,
            left: modalPosition.left,
            zIndex: 1050, // Ensure it stays above other content
            backgroundColor: 'white',
            borderRadius: '10px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            padding: '1rem',
            width: '300px',
            
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h5 className="mb-3"></h5>
            <Button variant="close" onClick={handleClose} />
          </div>
          
            <img className='w-100' src={hero} alt="" />
            <div style={{"fontFamily":"Squada One, sans-serif"}} className='fs-3 text-center'>
            Trouble<span style={{"color":"#6e1212"}}>Shooter</span>
          </div>
          <div className="d-flex justify-content-end">
           
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
