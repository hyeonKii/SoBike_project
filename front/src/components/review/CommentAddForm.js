import React, { useState } from "react";
import {Form, Col, Row } from "react-bootstrap";
import * as Api from "../../api";



//get:조회 post:등록 put:수정
function CommentAddForm({ portfolioOwnerId, setIsAdding, setComment }) {
  const [CommentForm, setCommentForm] = useState({
    comment: "",
    name: "",
  });
  function handleOnchange(e) {
    const { name, value } = e.target;
    setCommentForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  const handleSubmit = async (e) => {
    // preventDefault 해주기
    e.preventDefault();
    const id = portfolioOwnerId; //로그인된 사용자 id
    // try {
    //   const res = await Api.post("edu/add", {
    //     id,
    //     ...setCommentForm,
    //   });
    //   setComment((prev) => [...prev, res.data]);
    //   setIsAdding((prev) => !prev);
    // } catch (err) {
    //   console.log("등록에 실패하였습니다.", err);
    // }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col>
        <Form.Control
          type="text"
          placeholder="댓글"
          name="comment"
          value={CommentForm.comment}
          onChange={handleOnchange}
        />
        </Col>
        <Col>
        <Form.Control
          type="text"
          placeholder="작성자"
          name="name"
          value={CommentForm.name}
          onChange={handleOnchange}
        />
        </Col>
        </Row>
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

export default CommentAddForm;
