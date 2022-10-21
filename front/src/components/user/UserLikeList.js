import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import UserLike from "./UserLike";
import * as Api from "../../api";

import { UserStateContext } from "../../App";



function UserLikeList({portfolioOwnerId}) {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);

    const [userLikes, setUserLikes] = useState([]);

    useEffect(() => {
        // 만약 전역 상태의 user가 null이라면, 로그인 페이지로 이동함.
        if (!userState.user) {
          navigate("/");
          return;
        }
        // "users/likes" 엔드포인트로 GET 요청을 하고, users를 response의 data로 세팅함.
        Api.get("users/likes", portfolioOwnerId).then((res) => setUserLikes(res.data));
        }, [portfolioOwnerId, navigate]);

        console.log(userLikes);


    return (
        <Container fluid 
            className="container"
            style={{marginLeft: "25px"}}
            >
            <Row className="jusify-content-center">
                
                {userLikes.map((userLikes) => (
                 <Col>   
                <UserLike 
                    roadAddress={userLikes.roadAddress} locationName={userLikes.locationName}
                    locationId={userLikes.locationId}
                    setUserLikes={setUserLikes}
                    />
                    </Col>
                ))}
                
            </Row>
        </Container>

    );
};



export default UserLikeList;