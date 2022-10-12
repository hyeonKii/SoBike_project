import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import CommentAddForm from './CommentAddForm';
const cmnt1={
  comment : "좋아용!!",
  name : "지징"
}
function ReviewDetail({user}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <button onClick={handleShow}>리뷰</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {user?.name}<br/>
        {user?.email}<br/>
        {user?.description}
        </Modal.Body>
        <Modal.Footer>
          {cmnt1.comment}
          {cmnt1.name}
            <CommentAddForm/>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ReviewDetail;