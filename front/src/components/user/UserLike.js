import React, { useEffect } from "react";
import { Col, Row, Card, Button } from "react-bootstrap";
import * as Api from "../../api";

function UserLike({userId, roadAddress, locationName, setUserLikes}) {

    

    async function handleDelete() {
        try {
            Api.delete("datas/bicycle/location/likes", userId);
            setUserLikes((arr) => {
                const newArr = arr.filter((obj) => {
                    if (obj.locationName === locationName) return false;
                    else return true;
            });
            return newArr;
        });
    } catch (error) {
        console.log("삭제에 실패했습니다.", error)
    }
}

   

    return (  
        <Card
        className="mb-2 ms-3 mr-5" style={{width:"24em", border: "none", borderRadius: "20px", boxShadow: "2px 2px 10px rgba(201, 201, 201, 1)"}} >
            <Card.Body>
                <Row>
                    <Col sm ={8} style={{marginTop: "8px"}}>
                        <div style={{fontSize: "18px", fontWeight: "bold"}}>
                            {locationName}
                        </div>

                        <Card.Subtitle>
                            {roadAddress}
                        </Card.Subtitle>
                    </Col>

                    <Col sm ={4} style={{marginTop: "8px"}}>
                        <Button 
                            variant="secondary"
                            onClick={handleDelete}
                        >
                            cancel
                        </Button>
                    </Col>
                </Row>
            </Card.Body>
        </Card>

    )
}


export default UserLike;



// 좋아요 관심목록으로 불러오기
// method: get
// URL: /users/likes/:userId

// 좋아요 삭제
// method: delete
// URL: /datas/bicycle/location/likes/:userId