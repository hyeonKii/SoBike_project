import { useNavigate } from "react-router-dom";
import { TbClipboardText } from "react-icons/tb";
import { Card, Row, Col } from "react-bootstrap";
import "../components.css";
import ReviewDetail from "./ReviewDetail";
import EditReview from "./EditReview";
import styled from "styled-components"

const FloatLeft = styled.div`
    display:inline-block; 
    margin-right:10px;
`

function ReviewTable({ review, isEditable, setReviews, isNetwork }) {
  const navigate = useNavigate();
  return (
    <tbody>
      <tr>
        <th>{review?.title}</th>
        <th>{review?.email}</th>
        <th>
        <div>
          <FloatLeft>
            {isNetwork && <ReviewDetail key={review.id} review={review} />}
          </FloatLeft>
          <FloatLeft>
            {isEditable && (
              <EditReview review={review} setReviews={setReviews} />
            )}
          </FloatLeft>
        </div>
        </th>
      </tr>
    </tbody>
  );
}

export default ReviewTable;
