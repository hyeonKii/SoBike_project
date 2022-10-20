import React, { useEffect, useRef, useState } from "react";
import * as Api from "../../api";
import bikeDatas from "./newBikeDatas.json";
import StorePlaces from "./StorePlaces";
import { Container, Row, Button, Card, Col } from "react-bootstrap";

import "./Search.css";

const { kakao } = window; //스크립트로 심은 kakao maps api를 window전역 객체에서 뽑아 사용

function Search() {
  const myMap = useRef("");
  const mapRef = useRef();

  // 초기 좌표는 서울 시청
  const [latitude, setLatitude] = useState(37.566535);
  const [longitude, setLongitude] = useState(126.9779692);
  const [serverData, setServerData] = useState("");

  useEffect(() => {
    const container = myMap.current; //지도를 담을 영역의 DOM 레퍼런스
    //지도를 생성할 때 필요한 기본 옵션
    const options = {
      center: new kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표.
      level: 4, //지도의 레벨(확대, 축소 정도)
      mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
    };

    mapRef.current = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    //--------------------------------------------------------------------------- 현재위치
    // HTML5의 geolocation으로 사용할 수 있는지 확인
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치 확인
      navigator.geolocation.getCurrentPosition(function (position) {
        const currentPositionLatitude = position.coords.latitude, // 위도
          currentPositionLonitude = position.coords.longitude; // 경도
        setLatitude(currentPositionLatitude);
        setLongitude(currentPositionLonitude);

        currentLocation(currentPositionLonitude, currentPositionLatitude);

        // 현재 위치 표시입니다.
        const locPosition = new kakao.maps.LatLng(
            currentPositionLatitude,
            currentPositionLonitude
          ), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성, 변경
          message = '<div style="padding:5px;">현재위치</div>'; // 인포윈도우에 표시될 내용

        // 마커와 인포윈도우를 표시함수를 호출
        displayMarker(locPosition, message);
      });

      // 지도에 마커와 인포윈도우를 표시하는 함수
      const displayMarker = (locPosition, message) => {
        // 마커를 생성합니다
        const marker_present = new kakao.maps.Marker({
          map: mapRef.current,
          position: locPosition,
        });

        const iwContent = message, // 인포윈도우에 표시할 내용
          iwRemoveable = true;

        // 인포윈도우를 생성합니다
        const infowindow = new kakao.maps.InfoWindow({
          content: iwContent,
          removable: iwRemoveable,
        });

        // 인포윈도우를 마커위에 표시
        infowindow.open(mapRef.current, marker_present);

        // 지도 중심좌표를 접속위치로 변경
        mapRef.current.setCenter(locPosition);
      };
    }
    //--------------------------------------------------------------------------------json 데이터
    // json 파일 테이터입니다
    const bikeData = bikeDatas.map((data, index) => {
      return [
        data.latitude,
        data.longitude,
        `<div style="padding:5px">${data.address2}</div>`,
      ];
    });

    const markers = [];
    // json 파일 데이터를 마커에 표시
    const locationData = bikeData;

    // 인포윈도우를 표시하는 클로저를 만드는 함수
    function makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    }
    // 인포윈도우를 닫는 클로저를 만드는 함수
    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    }

    for (let i = 0; i < locationData.length; i++) {
      // 마커가 표시될 위치
      const markerPosition = new kakao.maps.LatLng(
        locationData[i][0],
        locationData[i][1]
      );

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커가 지도 위에 표시되도록 설정
      marker.setMap(mapRef.current);
      const iwContent = locationData[i][2];
      const iwPosition = markerPosition; //인포윈도우 표시 위치

      // 인포윈도우를 생성
      const infowindow = new kakao.maps.InfoWindow({
        position: iwPosition,
        content: iwContent,
      });

      markers.push(marker);

      kakao.maps.event.addListener(
        // 마커에 마우스 올리고 내렸을 때
        marker,
        "mouseover",
        makeOverListener(mapRef.current, marker, infowindow)
      );
      kakao.maps.event.addListener(
        marker,
        "mouseout",
        makeOutListener(infowindow)
      );
    }

    //-------------------------------------------------------------------------- 클러스터(모음)

    // 마커 클러스터러를 생성
    const clusterer = new kakao.maps.MarkerClusterer({
      map: mapRef.current, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 10, // 클러스터 할 최소 지도 레벨
    });

    // 클러스터러에 마커들을 추가합니다
    clusterer.addMarkers(markers);

    // ---------------------------------------------------------------------- 클릭시 위도, 경도
    kakao.maps.event.addListener(
      mapRef.current,
      "click",
      function (mouseEvent) {
        // 클릭한 위도, 경도 정보를 가져옵니다
        const latlng = mouseEvent.latLng;
        currentLocation(latlng.getLng(), latlng.getLat())
      }
    );
  }, []);

  const [inputText, setInputText] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const places = new kakao.maps.services.Places(); //장소 검색 객체 생성
    places.keywordSearch(inputText, placesSearchCB); //키워드로 장소 검색 ()

    // 키워드 검색 완료 시 호출되는 콜백함수
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가
        let bounds = new kakao.maps.LatLngBounds();

        for (let i = 0; i < 1; i++) {
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }

        // 검색된 장소 위치를 지도의 가운데로 지도 범위를 재설정
        mapRef.current.setBounds(bounds);
        // 맵 레벨을 4로 조정
        mapRef.current.setLevel(4);

        // 서버로 데이터 보냄
        currentLocation(data[0].x, data[0].y);

        setInputText("");
      }
    }
  };

  //서버로 지도 중심좌표 전달
  const currentLocation = async (longitude, latitude) => {
    // console.log('서버로 보낼 좌표', longitude, latitude);
    const long = String(longitude);
    const lati = String(latitude);
    Api.get(
      `datas/bicycle/locationsByCurrentLocation?latitude=${lati}&longitude=${long}`
    ).then((res) => setServerData(res.data));
  };

  return (
    <>
      <div className="register-div"></div>
      <Container fluid className="container">
        <Row>
          <Col md="3" lg="3">
            <Card
              className="search"
              style={{
                width: "20rem",
                borderColor: "white",
                marginTop: "20px",
              }}
            >
              <Card.Body>
                <Row className="justify-content-md-left">
                  <h3 style={{ fontWeight: "bold" }}>검색</h3>
                  {/* <DropdownButton 
                            id="dropdown-basic-button" 
                            title="분류별 검색"          
                        >
                            <Dropdown.Item href="#/action-1">대여소 검색</Dropdown.Item>
                            <Dropdown.Item href="#/action-2">보관소 검색</Dropdown.Item>
                        </DropdownButton> */}
                </Row>
              </Card.Body>
            </Card>

            <Card
              className="searchCard"
              style={{
                width: "20rem",
                marginBottom: "10px",
                border: "none",
                // borderStyle: "dashed",
                // borderColor: "#9966FF",
                borderRadius: "20px",
              }}
            >
              <Card.Body>
                <Row className="justify-content-md-left">
                  {/* <Col>
                        <span>지역</span>
                        <input
                            className="search-name"
                            type="text"
                            value={search}
                            placeholder="검색"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        </Col>

                        <Col>
                        <span>상세검색</span>    
                        <input
                            className="search-name"
                            type="text"
                            value={search}
                            placeholder="상세검색"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        </Col> */}
                  <Col>
                    <form
                      className="inputForm"
                      onSubmit={handleSearch}
                      style={{
                        width: "250px",
                      }}
                    >
                      <h5
                        style={{
                          marginBottom: "10px",
                          fontWeight: "bold",
                        }}
                      >
                        지역 검색
                      </h5>

                      <input
                        placeholder="검색"
                        onChange={onChange}
                        value={inputText}
                        style={{
                          height: "40px",
                          borderColor: "#9966FF",
                          borderRadius: "5px",
                        }}
                      />
                      <Button
                        type="submit"
                        style={{
                          height: "40px",
                          marginLeft: "5px",
                          marginBottom: "3px",
                          backgroundColor: "#9966FF",
                          borderColor: "#9966FF",
                          borderRadius: "5px",
                        }}
                      >
                        검색
                      </Button>
                    </form>
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <Card
              className="searchResult"
              style={{
                width: "20rem",
                border: "none",
                // borderStyle: "dashed",
                // borderColor: "#9966FF",
                borderRadius: "20px",
              }}
            >
              <Card.Header>
                  <h3 style={{ fontWeight: "bold"}}>검색 결과</h3>
                </Card.Header>
              <Card.Body
              style={{
                width: "20rem",
                border: "none",
                // borderStyle: "dashed",
                // borderColor: "#9966FF",
                borderRadius: "20px",
                height: "300px",
                overflow:"auto",
              }}>
                
                {serverData.length > 0 && (
                  <StorePlaces serverData={serverData} />
                )}
              </Card.Body>
            </Card>
          </Col>

          <Col style={{ marginTop: "35px" }}>
            <div
              className="rentalLocation"
              style={{
                display: "flex",
                height: "40px",
                textAlign: "center",
                justifyContent: "center",
                backgroundColor: "#CC99FF",
                borderRadius: "10px",
                boxShadow: "7px 7px 39px rgba(227, 193, 235, 1)",
              }}
            >
              <div
                style={{
                  display: "flex",
                  marginTop: "5px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "white",
                }}
              >
                대여소 위치
              </div>
            </div>

            <Col
              style={{
                display: "flex",
                marginTop: "3rem",
                justifyContent: "center",
              }}
            >
              <Card
                className="mapCard"
                style={{
                  width: "50rem",
                  alignItems: "center",
                  boxShadow: "7px 7px 39px rgba(243, 228, 246, 1)",
                  border: "none",
                  // borderColor: "lightgray",
                  borderRadius: "20px",
                }}
              >
                <Card.Body>
                  <Card.Title style={{ fontWeight: "bold" }}>
                    대여소 위치
                  </Card.Title>

                  <div
                    ref={myMap}
                    id="map"
                    style={{
                      width: "500px",
                      height: "500px",
                    }}
                  ></div>
                </Card.Body>
              </Card>
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Search;
