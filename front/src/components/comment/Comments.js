import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import * as Api from "../../api";
import Comment from "./Comment";
import CommentAddForm from "./CommentAddForm";
function Comments({ reviewId, userId,nickName, isUser }) {
  const [comments, setComments] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  ///reviews/:reviewId/comment
  useEffect(() => {
    Api.get(`reviews/${reviewId}/comment`).then((res) => {
      if (!Array.isArray(res.data)) {
        console.log("res.data(comment) is not array");
        return;
      }
      setComments(res.data);
    });
  }, [reviewId]);
  return (
    <>
      {comments.map((comment) => (
        <Comment
          key={comment._id}
          comment={comment}
          isEditable={isUser?.userId===comment.userId}
          setComments={setComments}
        />
      ))}
      {isAdding && (
        <CommentAddForm
          reviewId={reviewId}
          userId={userId}
          nickName={nickName}
          setIsAdding={setIsAdding}
          setComments={setComments}
        />
      )}
      {isUser && (
        <Row className="mt-3 mb-3 text-center">
          <Col sm={{ span: 20 }}>
            <Button variant="outline-success" onClick={() => setIsAdding(true)}>
              +
            </Button>
          </Col>
        </Row>
      )}
    </>
  );
}

export default Comments;
