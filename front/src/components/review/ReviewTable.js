import { useNavigate } from "react-router-dom";
import { TbClipboardText } from "react-icons/tb";
import "../components.css";
import ReviewDetail from "./ReviewDetail";
function ReviewTable({ user, isNetwork }) {
  const navigate = useNavigate();
  return (
    <tbody>
      <tr>
        <th>{user?.name}</th>
        <th>{user?.description}</th>
        <th><ReviewDetail key={user.id} user={user}/></th>
      </tr>
    </tbody>
  );
}

export default ReviewTable;
