import { useNavigate } from "react-router-dom";
import { TbClipboardText } from "react-icons/tb";
import "../components.css";
import ReviewDetail from "./ReviewDetail";
import EditReview from "./EditReview";
function ReviewTable({ review, isEditable, setReviews, isNetwork }) {
  const navigate = useNavigate();
  return (
    <tbody>
      <tr>
        <th>{review?.title}</th>
        <th>{review?.title}</th>
        <th>
          <ReviewDetail key={review.id} user={review} />
          {isEditable && <EditReview review={review} setReviews={setReviews} />}
        </th>
      </tr>
    </tbody>
  );
}

export default ReviewTable;
