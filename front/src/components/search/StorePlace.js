import React, { useEffect, useState, useContext } from "react";
import { Card, Form, Col, Row } from "react-bootstrap";
import { MdRoom } from "react-icons/md";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
function StorePlace({ serverData }) {
  const userState = useContext(UserStateContext);
  const [likeToggle, setLikeToggle] = useState(true);
  const handleclick = async (e) => {
    e.preventDefault();
    //const userId = userState.user.userId; //로그인된 사용자 id
    const locationId = serverData.rentalLocationId;
    setLikeToggle(!likeToggle);
    if (likeToggle) {
      try {
        const res = await Api.post(`datas/bicycle/location/likes/`, {
          locationId,
        });
        console.log(res.data);
      } catch (err) {
        console.log("관심 등록에 실패하였습니다.", err);
      }
    } else {
      try {
        await Api.delete(`datas/bicycle/location/likes/${locationId}`);
      } catch (error) {
        console.log("관심 삭제에 실패했습니다.", error);
      }
    }
  };
  return (
    <>
      <Row className="align-items-center mb-2">
        <Col>
          <div>{serverData.locationName}</div>
          {userState.user && (
            <button
              onClick={handleclick}
              style={
                likeToggle
                  ? { backgroundColor: "white" }
                  : { backgroundColor: "gray" }
              }
            >
              좋아요
            </button>
          )}
          <div className="text-muted">
            <MdRoom />
            {serverData.roadAddress}
          </div>
        </Col>
      </Row>
    </>
  );
}

export default StorePlace;
