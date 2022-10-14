import React, { useState } from "react";
import {Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";

function AwardAddForm({ reviewId,userId,nickName, setComments, setIsAdding }) {
  const [commentForm, setCommentForm] = useState({
    reviewId:reviewId,
    userId:userId,
    nickName: nickName,
    contents: "",
  });
  function handleOnchange(e) {
    const { name, value } = e.target;
    setCommentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      ///reviews/:reviewId/comment/:userId
      const res = await Api.post(`reviews/${reviewId}/comment/${userId}`, {
        ...commentForm,
      });
      setComments((prev) => [...prev, res.data]);
      setIsAdding((prev) => !prev);
    } catch (err) {
      console.log("등록에 실패하였습니다.", err);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="awardAddTitle">
        <Form.Control
          type="text"
          placeholder="댓글"
          name="contents"
          value={commentForm.contents}
          onChange={handleOnchange}
        />
      </Form.Group>
      <Form.Group as={Row} className="mt-3 text-center">
        <Col sm={{ span: 20 }}>
          <button className="edit-btn me-3" type="submit">
            확인
          </button>
          <button
            className="edit-cancel-btn"
            onClick={() => setIsAdding((prev) => !prev)}
          >
            취소
          </button>
        </Col>
      </Form.Group>
    </Form>
  );
}

export default AwardAddForm;
