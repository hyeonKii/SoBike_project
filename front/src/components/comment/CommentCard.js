import { Card, Button, Row, Col } from "react-bootstrap";
import * as Api from "../../api";
function CommentCard({ comment, isEditable, setIsEditing, setComments }) {
  async function handleDelete() {
    try {
      ///reviews/comment/:commentId
      await Api.delete(`reviews/comment/${comment._id}`);
      setComments((arr) => {
        const newArr = arr.filter((obj) => {
          if (obj._id === comment._id)
            return false; //filter함수에서 false면 삭제됨.
          else return true;
        });
        return newArr;
      });
    } catch (error) {
      console.log("삭제에 실패했습니다.", error);
    }
  console.log("comment card",comment)
  }
  return (
    <>
      <Row className="align-items-center">
        <Col sm={10}>
          <span>{comment.contents}</span>
          <br />
          <span className="text-muted">{comment.nickName}</span>
        </Col> 
        {isEditable && (
          <Col sm={2}>
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => setIsEditing((prev) => !prev)}
            >
              편집
            </Button>
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
