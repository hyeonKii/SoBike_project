import React, { useEffect, useRef, useState } from "react";
import * as Api from "../../api";
import bikeDatas from "./bikeDatas.json";
import StorePlaces from "./StorePlaces";
import {
  Container,
  Row,
  Form,
  ButtonGroup,
  Button,
  Card,
  Col,
  Table,
} from "react-bootstrap";

import "./Search.css";

const { kakao } = window; //스크립트로 심은 kakao maps api를 window전역 객체에서 뽑아 사용
const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 }); // 마커를 클릭하면 장소명을 표출할 인포윈도우

function Search(props) {
  const myMap = useRef("");
  const mapRef = useRef();
  const [latitude, setLatitude] = useState(37.566535);
  const [longitude, setLongitude] = useState(126.9779692);
  const [serverData, setServerData] = useState("");

  useEffect(() => {
    // Api.get("bicycles/location").then((res) => setLoadedPlaces(res.data));
    const container = myMap.current; //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(latitude, longitude), //지도의 중심좌표.
      level: 5, //지도의 레벨(확대, 축소 정도)
      mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
    };

    mapRef.current = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    //-------------------------------------------------------------------------- 클러스터(모음)

    // 마커 클러스터러를 생성합니다
    const clusterer = new kakao.maps.MarkerClusterer({
      map: mapRef.current, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 10, // 클러스터 할 최소 지도 레벨
    });
    //--------------------------------------------------------------------------- 현재위치
    // HTML5의 geolocation으로 사용할 수 있는지 확인
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치 확인
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도
        setLatitude(lat);
        setLongitude(lon);

        console.log("현재 위치의 위도, 경도", lat, lon);

        // 현재 위치 표시입니다.
        const locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성, 변경
          message = '<div style="padding:5px;">현재위치</div>'; // 인포윈도우에 표시될 내용

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
      });

      // 지도에 마커와 인포윈도우를 표시하는 함수입니다
      function displayMarker(locPosition, message) {
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

        // 인포윈도우를 마커위에 표시합니다
        infowindow.open(mapRef.current, marker_present);

        // 지도 중심좌표를 접속위치로 변경합니다
        mapRef.current.setCenter(locPosition);
      }
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
    // json 파일 데이터를 마커에 표시합니다.
    const locationData = bikeData;

    // 인포윈도우를 표시하는 클로저를 만드는 함수입니다
    function makeOverListener(map, marker, infowindow) {
      return function () {
        infowindow.open(map, marker);
      };
    }
    // 인포윈도우를 닫는 클로저를 만드는 함수입니다
    function makeOutListener(infowindow) {
      return function () {
        infowindow.close();
      };
    }

    for (let i = 0; i < locationData.length; i++) {
      // 마커가 표시될 위치입니다
      const markerPosition = new kakao.maps.LatLng(
        locationData[i][0],
        locationData[i][1]
      );

      // 마커를 생성합니다
      const marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(mapRef.current);
      const iwContent = locationData[i][2];
      const iwPosition = markerPosition; //인포윈도우 표시 위치입니다

      // 인포윈도우를 생성합니다
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
    // 클러스터러에 마커들을 추가합니다
    clusterer.addMarkers(markers);

    //---------------------------------------------------------------------- 클릭시 위도, 경도
    // kakao.maps.event.addListener(map, "click", function (mouseEvent) {
    //   // 클릭한 위도, 경도 정보를 가져옵니다
    //   const latlng = mouseEvent.latLng;
    //   setLatlng(latlng);
    //   console.log("클릭한 위도와 경도", latlng.getLat(), latlng.getLng());
    // });
    //------------------------------------------------------------------------지도의 현재 중심좌표

    //---------------------------------------------------------------------------- 검색 기능
  }, [props.searchPlace]); //검색시 새로고침

  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

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

        for (let i = 0; i < data.length; i++) {
          displayMarker(data[i]);
          bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
        }
        console.log("검색 경도 위도: ", data[0].x, data[0].y);
        setLatitude(place.y);
        setLongitude(place.x);

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        mapRef.current.setBounds(bounds);
        // 서버로 데이터 보냄
        currentLocation(data[0].x, data[0].y);

        getInfo();

        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place) {
          // 마커를 생성하고 지도에 표시합니다
          // const marker = new kakao.maps.Marker({
          //   map: mapRef.current,
          //   position: new kakao.maps.LatLng(place.y, place.x),
          // });
        }
        setInputText("");
      }
    }
  };

  const currentLocation = async (longitude, latitude) => {
    const long = String(longitude);
    const lati = String(latitude);
    // console.log(`확인용:`,long)
    Api.get(
      `datas/bicycle/locationsByCurrentLocation?latitude=${lati}&longitude=${long}`
    ).then((res) => setServerData(res.data));
    console.log("serverData", serverData);
  };

  function getInfo() {
    // 지도의 현재 중심좌표를 얻어옵니다
    const center = mapRef.current.getCenter();
    // 지도의 현재 영역을 얻어옵니다
    const bounds = mapRef.current.getBounds();
    console.log("현재 중심 좌표", bounds);
  }

  console.log("밖의 데이터", serverData);

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
              <Card.Body>
                <Row className="justify-content-md-left">
                  <h3 style={{ fontWeight: "bold" }}>검색 결과</h3>
                </Row>
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
