import { useNavigate } from "react-router-dom";
import { Card, Row, Button, Col } from "react-bootstrap";
import './UserCard.css';

function UserCard({ user, setIsEditing, isEditable, isNetwork }) {
  const navigate = useNavigate();
  console.log(user);
  return (
    <Card
      className="myInfo" 
      style={{
        alignItems: "center", 
        width: "20rem",
        marginTop: "10rem",
        border: "none",
        // borderStyle: "dashed",
        // borderColor: "#9966FF",
        borderRadius: "20px"
      }} 
      >
      <Card.Body>
        <Row className="justify-content-md-center">
          <Card.Img
            style={{ width: "10rem"}}
            className="mb-3"
            src={user?.image}
            alt="라이언"
          />
        </Row>
        <Card.Title>{user?.nickName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{user?.email}</Card.Subtitle>
        

        {isEditable && (
          <Col>
            <Row className="mt-3 text-center text-info">
              <Col sm={{ span: 20 }}>
                <Button
                  size="20px"
                  style={{
                    backgroundColor: "white",
                    borderColor:"#9966FF",borderRadius: "50px",
                    color: "#9966FF"
                  }}
                  onClick={() => setIsEditing(true)}
                >
                  편집
                </Button>
              </Col>
            </Row>
          </Col>
        )}

      </Card.Body>
    </Card>
  );
}

export default UserCard;
