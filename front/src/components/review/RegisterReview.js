import React, { useState, useContext } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import styled from "styled-components";
import Information from "../../json/newBikeDatas.json";
import Select from "react-select";
import ReviewRegisterForm from "./ReviewRegisterForm"
const RegisterReviewBtn = styled.button`
  margin-top: 5px;
  text-align: center;
  border: 0;
  background-color: transparent;
  &:hover {
    background-color: rgb(199, 208, 210);
  }
`;

function RegisterReview({ setReviews }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <RegisterReviewBtn onClick={handleShow}>리뷰등록</RegisterReviewBtn>
      <Modal show={show} onHide={handleClose} style={{zIndex:100000}}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         <ReviewRegisterForm
             setReviews={setReviews}
             handleClose={handleClose}
         />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default RegisterReview;
