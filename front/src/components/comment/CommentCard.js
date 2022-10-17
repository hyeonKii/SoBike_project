import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
function CommentCard({ comment, isEditable, setIsEditing, setComments }) {
  async function handleDelete() {
    try {
      ///reviews/comment/:commentId
      await Api.delete(`reviews/${comment.reviewId}/comments/${comment.commentId}`);  
      //로그인 한 상태에서 바로 삭제하면 _id사용 , 로그아웃하고 로그인 한뒤 삭제하려고 하면 commentId사용  --왜???
      setComments((arr) => {
        const newArr = arr.filter((obj) => {
          if (obj.commentId === comment.commentId)
            return false; //filter함수에서 false면 삭제됨.
          else return true;
        });
        return newArr;
      });
    } catch (error) {
      console.log("comment 삭제에 실패했습니다.", error);
    }
  console.log("comment card",comment)
  }
  const Date =comment.createdAt.split("T")[0]
  const Time = comment.createdAt.split("T")[1].split(".")[0]
  return (
    <>
      <Row className="align-items-center">
        <Col sm={8}>
          <span>{comment.contents}</span>
          <br />
          <span className="text-muted">{comment.nickName} {Date} {Time}</span>
        </Col> 
        {isEditable && (
          <Col sm={4}>
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              편집
            </Button>.{' '}
            <Button
              variant="outline-danger"
              size="sm"
              onClick={handleDelete}
            >
              삭제
            </Button>
          </Col>
        )}
      </Row>
    </>
  );
}

export default CommentCard;
