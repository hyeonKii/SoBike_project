import React, { useState, useContext } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import styled from "styled-components";
import Information from "../../newBikeDatas.json";
import Select from "react-select";
import GlobalStyle from "../GlobalStyle";



function ReviewRegisterForm({ setReviews , handleClose }) {
  const [show, setShow] = useState(false);
  const userState = useContext(UserStateContext);
 

  const options = Information.map((data) => ({
    value: data.address1,
    label: data.address2,
  }));

  const [locationName, setLocationName] = useState("");
  const [roadAddress, setRoadAddress] = useState("");
  const [reviewForm, setReviewForm] = useState({
    email: userState.user.email,
    title: "",
    contents: "",
  });
  function handleOnchange(e) {
    const { name, value } = e.target;
    setReviewForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handleSubmit = async (e) => {
    // preventDefault 해주기
    e.preventDefault();
    const userId = userState.user.userId; //로그인된 사용자 id
    try {
      const res = await Api.post("reviews", {
        userId,
        ...reviewForm,
        locationName,
        roadAddress,
      });
      setReviews((prev) => [...prev, res.data]);
    } catch (err) {
      console.log("review 등록에 실패하였습니다.", err);
    }
  };
  const isSelectLocationName = locationName.length > 0;
  const isWriteTitle = reviewForm.title.length > 0;
  const isWriteCotent = reviewForm.contents.length > 0;
  const isFormValid = isSelectLocationName&&isWriteTitle&&isWriteCotent
  return (
    <>
    <GlobalStyle/>
      <Form.Group controlId="userEditProfileImage" className="mb-3">
        <Form.Control
          type="file"
          // name="file"
          // method="post"
          // encType="multipart/form-data"
          // onChange={(e) => upload(e)}
        />
      </Form.Group>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>제목</Form.Label>
          <Form.Control
            type="text"
            placeholder="title"
            name="title"
            value={reviewForm.title}
            onChange={handleOnchange}
          />
          {!isWriteTitle && (
                <p class="inputWarning">
                  제목을 작성해 주세요.
                </p>
              )}
        </Form.Group>
        <Row className="mb-3">
          <fieldset disabled>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label>이메일</Form.Label>
              <Form.Control
                value={reviewForm.email}
                onChange={handleOnchange}
              />
            </Form.Group>
          </fieldset>
          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>장소</Form.Label>
            <Select
              name="locationName"
              placeholder="장소"
              options={options}
              onChange={(data) => {
                setLocationName(data.label);
                setRoadAddress(data.value);
              }}
            />
            {!isSelectLocationName && (
                <p class="inputWarning">
                  장소를 선택해주세요
                </p>
              )}
          </Form.Group>
        </Row>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>본문</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="contents"
            type="contents"
            placeholder="contents"
            value={reviewForm.contents}
            onChange={handleOnchange}
          />
          {!isWriteCotent && (
                <p class="inputWarning">
                  본문을 작성해 주세요.
                </p>
              )}
        </Form.Group>
        <Form.Group>
          <Button variant="primary" type="submit" onClick={handleClose} disabled={!isFormValid}>
            Save
          </Button>{" "}
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Form.Group>
      </Form>
    </>
  );
}
export default ReviewRegisterForm;
