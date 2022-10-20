import React, { useEffect, useState, useContext } from "react";
import { Card, Row } from "react-bootstrap";
import { MdRoom } from "react-icons/md";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import { BsHeartFill, BsHeart, BsChat, BsChatFill } from "react-icons/bs";
import styled from "styled-components";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import ReviewDetail from "../review/ReviewDetail";
const BottomLine = styled.div`
  margin: 10px 0;
`;
const ReveiwTotal = styled.div`
  .chat,
  .chatfill {
    cursor: pointer;
  }
  .chat:hover {
    color: gray;
  }
`;
const Hearts = styled.div`
    flex: 1;
    .heartfill,.heart{
      cursor: pointer;
    }
    .heart:hover{
     color:pink;
    }
    .heartfill{
      color:pink;
    }
`;
function StorePlace({ serverData, addLike }) {
  console.log(serverData);
  function CustomToggle({ children, eventKey }) {
    const [seeReview, setSeeReview] = useState(false);
    const decoratedOnClick = useAccordionButton(eventKey, () => {
      console.log("totally custom!");
      setSeeReview(!seeReview);
    });

    return (
      <>
        {seeReview ? (
          <BsChatFill
            className="chatfill"
            onClick={decoratedOnClick}
            color="gray"
          />
        ) : (
          <BsChat className="chat" onClick={decoratedOnClick} />
        )}
      </>
    );
  }
  const userState = useContext(UserStateContext);
  const [reviews, setReviews] = useState([]);
  console.log("serverData.islike", serverData.isLike);
  const [likeToggle, setLikeToggle] = useState(serverData.isLike);

  const handleclick = async (e, isLike) => {
    e.preventDefault();
    //const userId = userState.user.userId; //로그인된 사용자 id
    const locationId = serverData.rentalLocationId;
    setLikeToggle(!isLike);
    if (likeToggle) {
      try {
        const res = await Api.delete(
          `datas/bicycle/location/likes/${locationId}`
        );
        setLikeToggle(res.data.isLike);
      } catch (error) {
        console.log("관심 삭제에 실패했습니다.", error);
      }
    } else {
      try {
        const res = await Api.post(`datas/bicycle/location/likes/`, {
          locationId,
        });
        console.log(res.data);
        setLikeToggle(res.data.isLike);
      } catch (err) {
        console.log("관심 등록에 실패하였습니다.", err);
      }
    }
  };
  function CardCount({ count }) {
    return <div style={{ float: "left", marginLeft: "5px" }}>{count}</div>;
  }
  useEffect(() => {
    Api.get("reviews").then((res) => {
      setReviews(res.data);
    });
  }, []);
  // console.log(userState)
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <BottomLine>
            <Row>
              <div style={{ flex: "4" }}>{serverData.locationName}</div>
              <Hearts onClick={(e) => handleclick(e, likeToggle)}>
                {addLike &&
                  (likeToggle ? <BsHeartFill className="heartfill" /> : <BsHeart className="heart"/>)}
              </Hearts>
            </Row>
            <ReveiwTotal>
              <div className="text-muted">
                <MdRoom />
                {serverData.roadAddress}
              </div>
              <CustomToggle
                eventKey="1"
                style={{ float: "left" }}
              ></CustomToggle>
              <CardCount
                count={
                  reviews.filter((data) => {
                    if (data.locationName === serverData.locationName)
                      return data;
                  }).length
                }
              />
            </ReveiwTotal>
          </BottomLine>
        </Card.Header>
        <Accordion.Collapse eventKey="1">
          <Card.Body>
            {reviews
              .filter((data) => {
                if (data.locationName === serverData.locationName) return data;
              })
              .map((data) => {
                return (
                  <Card>
                    <Card.Body>
                      <div>{data?.title}</div>
                      <div>
                        <ReviewDetail
                          review={data}
                          style={{ float: "right" }}
                        />
                      </div>
                    </Card.Body>
                  </Card>
                );
              })}
          </Card.Body>
        </Accordion.Collapse>
      </Card>
    </Accordion>
  );
}

export default StorePlace;
