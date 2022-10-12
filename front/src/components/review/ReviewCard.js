import { useNavigate } from "react-router-dom";
import { Card, Row, Col } from "react-bootstrap";
import "../components.css";
import ReviewDetail from "./ReviewDetail";
//test
// import profileImageFilename from "/back/uploads";

//test

function ReviewCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();

  return (
    <Card className="mb-2 ms-3 mr-5 profile-card" style={{ width: "18rem" }}>
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem", height: "8rem" }}
            className="mb-3"
            src={`http://kdt-ai5-team11.elicecoding.com:5001/${user?.profileImageFilename}`}
            alt="사용자 등록 프로필 이미지"
          />
        </Row>
        <Card.Title>{user?.name}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        {/* <Card.Text>{user?.description}</Card.Text> */}

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <button className="edit-btn" onClick={() => setIsEditing(true)}>
                  편집
                </button>
              </Col>
            </Row>
          </Col>
        )}

        {isNetwork && (
          <ReviewDetail key={user.id} user={user}/>
        )}
      </Card.Body>
    </Card>
  );
}

export default ReviewCard;
