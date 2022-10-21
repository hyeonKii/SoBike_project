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
        
        if (!userState.user) {
          navigate("/");
          return;
        }
        
        Api.get("users/likes", portfolioOwnerId).then((res) => setUserLikes(res.data));
        }, [portfolioOwnerId, navigate]);



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