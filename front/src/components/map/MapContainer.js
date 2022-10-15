import React, { useEffect, useRef, useState } from "react";

import * as Api from "../../api";

const { kakao } = window; //스크립트로 심은 kakao maps api를 window전역 객체에서 뽑아 사용
const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 }); // 마커를 클릭하면 장소명을 표출할 인포윈도우

// 지도를 표시할 div
const MapContainer = (props) => {
  const myMap = useRef("");
  const [loadedPlaces, setLoadedPlaces] = useState("");

  useEffect(() => {
    Api.get("bicycles/location").then((res) => setLoadedPlaces(res.data));
    console.log(loadedPlaces)

    const container = myMap.current; //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(37.566535, 126.9779692), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
      mapTypeId: kakao.maps.MapTypeId.ROADMAP, // 지도종류
    };

    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
    //--------------------------------------------------------------------------

    // 마커 클러스터러를 생성합니다
    const clusterer = new kakao.maps.MarkerClusterer({
      map: map, // 마커들을 클러스터로 관리하고 표시할 지도 객체
      averageCenter: true, // 클러스터에 포함된 마커들의 평균 위치를 클러스터 마커 위치로 설정
      minLevel: 10, // 클러스터 할 최소 지도 레벨
    });

    // HTML5의 geolocation으로 사용할 수 있는지 확인
    if (navigator.geolocation) {
      // GeoLocation을 이용해서 접속 위치 확인
      navigator.geolocation.getCurrentPosition(function (position) {
        const lat = position.coords.latitude, // 위도
          lon = position.coords.longitude; // 경도

        console.log(`확인용: `, lat, lon);
        const locPosition = new kakao.maps.LatLng(lat, lon), // 마커가 표시될 위치를 geolocation으로 얻어온 좌표로 생성, 변경
          message = '<div style="padding:5px;">현재위치</div>'; // 인포윈도우에 표시될 내용

        // 마커와 인포윈도우를 표시합니다
        displayMarker(locPosition, message);
      });

      // 지도에 마커와 인포윈도우를 표시하는 함수입니다
      function displayMarker(locPosition, message) {
        // 마커를 생성합니다
        const marker_present = new kakao.maps.Marker({
          map: map,
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
        infowindow.open(map, marker_present);

        // 지도 중심좌표를 접속위치로 변경합니다
        map.setCenter(locPosition);
      }
    }
    //--------------------------------------------------------------------------------
    const markers = [];
    const locationData = [
      [
        37.53439,
        126.869598,
        '<div style="padding:5px">목동3단지 시내버스정류장</div>',
      ],
    ];
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
      marker.setMap(map);
      const iwContent = locationData[i][2];
      const iwPosition = markerPosition; //인포윈도우 표시 위치입니다

      // 인포윈도우를 생성합니다
      const infowindow = new kakao.maps.InfoWindow({
        position: iwPosition,
        content: iwContent,
      });

      markers.push(marker);

      kakao.maps.event.addListener(
        marker,
        "mouseover",
        makeOverListener(map, marker, infowindow)
      );
      kakao.maps.event.addListener(
        marker,
        "mouseout",
        makeOutListener(infowindow)
      );
    }
    // 클러스터러에 마커들을 추가합니다
    clusterer.addMarkers(markers);
  }, [props.searchPlace]); //검색시 새로고침

  return (
    <div
      ref={myMap}
      id="map"
      style={{
        width: "500px",
        height: "500px",
      }}
    ></div>
  );
};

export default MapContainer;
