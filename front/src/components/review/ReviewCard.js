import { Card, Row } from "react-bootstrap";
import { MdRoom } from "react-icons/md";
import ReviewDetail from "./ReviewDetail";
import EditReview from "./EditReview";

function ReviewCard({ review, isEditable, setReviews, isNetwork }) {
  const protocol = window.location.protocol;
  const hostname = window.location.hostname;
  const domain = protocol + "//" + hostname + ":5001";

  return (
    <Card className="mb-2 ms-3 mr-5 searchCard" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            className="mb-3"
            src={domain+review?.reviewImage}
            alt="사용자 등록 프로필 이미지"
          />
        </Row>
        
        <Card.Title>{review?.title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          <MdRoom/>{review?.locationName}
        </Card.Subtitle>
        <div>
          <div>
            {isNetwork && <ReviewDetail key={review.id} review={review} />}
          </div>
          <div>
            {isEditable && (
              <EditReview review={review} setReviews={setReviews} />
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ReviewCard;
