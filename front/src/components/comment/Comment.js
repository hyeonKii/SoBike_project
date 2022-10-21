import React, { useState } from "react";
import CommentCard from "./CommentCard";
import CommentEditForm from "./CommentEditForm";

function Comment({ comment,isEditable, setComments }) {
  const [isEditing, setIsEditing] = useState("");
  const toggleEdit = () => {
    setIsEditing((prev) => !prev);
  };
  return (
    <>
      {isEditing ? (
        <CommentEditForm
          Currentcomment={comment}
          setComments={setComments}
          editComments={toggleEdit}
        />
      ) : (
        <CommentCard
          comment={comment}
          isEditable={isEditable}
          setIsEditing={toggleEdit}
          setComments={setComments}
        />
      )}
    </>
  );
}

export default Comment;
