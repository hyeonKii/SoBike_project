import React, { useEffect, useState, useContext } from "react";
import { Card, Form, Col, Row } from "react-bootstrap";
import { MdRoom } from "react-icons/md";
import * as Api from "../../api";
import { UserStateContext } from "../../App";
import { FiHeart, FiMessageCircle } from "react-icons/fi";
import styled from "styled-components";
import Accordion from "react-bootstrap/Accordion";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import ReviewDetail from "../review/ReviewDetail";
const BottomLine = styled.div`
  margin: 10px 0;
`;
function StorePlace({ serverData }) {
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );

    return <FiMessageCircle onClick={decoratedOnClick} />;
  }
  const userState = useContext(UserStateContext);
  const [reviews, setReviews] = useState([]);
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
  function CardCount({ count }) {
    return <div style={{ float: "left", marginLeft: "5px" }}>{count}</div>;
  }
  useEffect(() => {
    Api.get("reviews").then((res) => {
      setReviews(res.data);
    });
  }, []);
  return (
    <Accordion defaultActiveKey="0">
      <Card>
        <Card.Header>
          <BottomLine>
            <Row>
              <div style={{ flex: "4" }}>{serverData.locationName}</div>
              <div style={{ flex: "1" }}>
                {userState.user && (
                  <FiHeart
                    onClick={handleclick}
                    style={
                      likeToggle
                        ? { backgroundColor: "white" }
                        : { backgroundColor: "pink" }
                    }
                  />
                )}
              </div>
            </Row>
            <div>
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
            </div>
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
