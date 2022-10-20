import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import styled from "styled-components";
import ReviewEditForm from "./ReviewEditForm";
const EditButton = styled.button`
  font-size: 8px;
  border: dotted 0.5px;
  background-color: transparent;
  cursor: pointer;
`;

function EditReview({ review, setReviews }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <EditButton onClick={handleShow}>편집</EditButton>
      <Modal show={show} onHide={handleClose} style={{ zIndex: 100000 }}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ReviewEditForm
            review={review}
            setReviews={setReviews}
            handleClose={handleClose}
          />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditReview;
