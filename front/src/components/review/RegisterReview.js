import React, { useState } from 'react';
import {Button,Col,Form,Modal,Card} from 'react-bootstrap';
import * as Api from "../../api";

function RegisterReview() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <button onClick={handleShow}>리뷰등록</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form.Group controlId="userEditProfileImage" className="mb-3">
            <Form.Control
              type="file"
              // name="file"
              // method="post"
              // encType="multipart/form-data"
              // onChange={(e) => upload(e)}
            />
          </Form.Group>

          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                // type="email"
                // placeholder="name@example.com"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
              />
            <Form.Group as={Col} controlId="formGridState">
          <Form.Label>State</Form.Label>
          <Form.Select defaultValue="Choose...">
            <option>선택</option>
            <option>대여소</option>
            <option>보관소</option>
          </Form.Select>
        </Form.Group>
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control 
              as="textarea" 
              rows={3} 
              // type="description"
              // placeholder="description"
              // value={description}
              // onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Save 
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default RegisterReview;