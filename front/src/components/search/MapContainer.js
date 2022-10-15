import React, { useEffect, useRef } from "react";

const { kakao } = window; //스크립트로 심은 kakao maps api를 window전역 객체에서 뽑아 사용
const infowindow = new kakao.maps.InfoWindow({ zIndex: 1 }); // 마커를 클릭하면 장소명을 표출할 인포윈도우

// 지도를 표시할 div
const MapContainer = (props) => {
  const myMap = useRef("");

  useEffect(() => {
    const container = myMap.current; //지도를 담을 영역의 DOM 레퍼런스
    const options = {
      //지도를 생성할 때 필요한 기본 옵션
      center: new kakao.maps.LatLng(33.450701, 126.570667), //지도의 중심좌표.
      level: 3, //지도의 레벨(확대, 축소 정도)
    };
    const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

    const places = new kakao.maps.services.Places(); //장소 검색 객체 생성

    places.keywordSearch(props.searchPlace, placesSearchCB); //키워드로 장소 검색 ()

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

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정
        map.setBounds(bounds);

        // 지도에 마커를 표시하는 함수입니다
        function displayMarker(place) {
          // 마커를 생성하고 지도에 표시합니다
          var marker = new kakao.maps.Marker({
            map: map,
            position: new kakao.maps.LatLng(place.y, place.x),
          });

          // // 마커에 클릭이벤트를 등록합니다
          // kakao.maps.event.addListener(marker, "click", function () {
          //   // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
          //   infowindow.setContent(
          //     '<div style="padding:5px;font-size:12px;">' +
          //       place.place_name +
          //       "</div>"
          //   );
          //   infowindow.open(map, marker);
          // });
        }
      }
    }
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
