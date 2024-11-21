import React, { useEffect, useState } from 'react';
import { Button, Card, FloatingLabel, Form, Modal, Spinner } from 'react-bootstrap';
import { getAllGrievanceApi, getUpdatedGrievanceApi, getUpdatedStatusApi } from '../services/allApi';

const ComplaintsCard = ({ search }) => {
  const [show, setShow] = useState(false);
  const [allGrievance, setAllGrievance] = useState([]);
  const [selectedGrievance, setSelectedGrievance] = useState(null); // Track selected grievance
  const [GrievanceData, setGrievanceData] = useState({ reply: '' });

  // Fetch all grievances on component mount
  useEffect(() => {
    getAllGrievances();
  }, []);

  const getAllGrievances = async () => {
    try {
      const result = await getAllGrievanceApi();
      if (result.status === 200) {
        setAllGrievance(result.data);
      } else {
        console.log(result.response.data);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // Filter grievances based on search query (case-insensitive)
  const filteredSearch = allGrievance.filter((grievance) =>
    grievance.title.toLowerCase().includes(search.toLowerCase())
  );

  // Show modal for a specific grievance
  const handleShow = (grievance) => {
    setSelectedGrievance(grievance); // Set the selected grievance
    setGrievanceData({ reply: '' }); // Pre-fill reply if it exists
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setSelectedGrievance(null); // Clear selected grievance
    setGrievanceData({ reply: '' }); // Reset reply
  };

  const handleSendReply = async (gid) => {
    if (!GrievanceData.reply.trim()) {
      alert('Please fill in the reply before sending.');
      return;
    }

    try {
      const reqBody = GrievanceData; // Reply data

      // Update grievance reply
      const result = await getUpdatedGrievanceApi(gid, reqBody);

      if (result.status === 200) {
        console.log('Grievance updated successfully:', result.data);

        // Update status to "resolved"
        const updatedStatusData = { status: 'resolved' };
        await handleStatus(gid, updatedStatusData);

        handleClose(); // Close modal
        getAllGrievances(); // Refresh the grievances list
      } else {
        alert(result.response?.data || 'Unexpected error occurred.');
      }
    } catch (err) {
      console.error('Error updating grievance reply:', err);
      alert('Failed to update grievance reply. Please try again.');
    }
  };

  const handleStatus = async (gid, updatedStatusData) => {
    try {
      // Update status
      const result = await getUpdatedStatusApi(gid, updatedStatusData);
      console.log('Status updated successfully:', result.data);
    } catch (err) {
      console.error('Error updating grievance status:', err);
      alert('Failed to update grievance status. Please try again.');
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <div className="w-100 mt-2 row">
        {filteredSearch.length > 0 ? (
          filteredSearch
            .slice()
            .reverse()
            .map((grievance) => (
              <div className="col-lg-3 mt-3" key={grievance._id}>
                <Card style={{ width: '100%' }} className="mt-2 flex-grow-1 h-100">
                  <Card.Body>
                    <Card.Title>
                      <h1>{grievance.title}</h1>
                    </Card.Title>
                    <Card.Text>
                      <h5>Description:</h5>
                      <p>{grievance.description}</p>
                      <hr />
                      <span className="fw-bold mb-3">Status:</span>
                      {grievance.status === 'pending' ? (
                        <div className="d-flex align-items-center">
                          <Spinner className="" animation="border" role="status">
                            <span className="visually-hidden"></span>
                          </Spinner>
                          <span className="ms-2 fw-bold">Pending...</span>
                          <button
                            onClick={() => handleShow(grievance)}
                            className="btn btn-warning text-light ms-3 fw-bold"
                          >
                            Reply
                          </button>
                        </div>
                      ) : (
                        <div className="d-flex align-items-center">
                          <span>
                            <i className="fa-solid fa-circle-check text-success"></i>
                          </span>
                          <span className="ms-2 fw-bold">Resolved</span>
                        </div>
                      )}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </div>
            ))
        ) : (
          <div className="fw-bold text-danger text-center">Grievance Not Found</div>
        )}
      </div>

      {/* Modal for Reply */}
      {show && selectedGrievance && (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title>Reply for Grievance</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <FloatingLabel controlId="floatingInputReply" label="Reply" className="mb-3">
              <Form.Control
                value={GrievanceData.reply}
                onChange={(e) => setGrievanceData({ ...GrievanceData, reply: e.target.value })}
                type="text"
                placeholder="Reply"
              />
            </FloatingLabel>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="dark" onClick={() => handleSendReply(selectedGrievance._id)}>
              Send
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default ComplaintsCard;
