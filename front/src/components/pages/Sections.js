import React from "react";

import "./Sections.css";

import count from "../../images/count.png";
import manual from "../../images/manual.png";

const Sections = () => {
  return (
    <>
      <div className="main-container">
        <div className="wrapper">
          <div className="text-wrapper1">
            <div className="title1">
              <span>가장 가까운 대중교통</span>
            </div>
            <div className="content-wrappe1">
              <p className="content1">
                서울시에서는 약 5,000대의 자전거 대여소와
                <br />
                40,000대의 공공 자전거를 이용할 수 있다는 것을 아시나요?
                <br />
              </p>
              <p className="quotation" style={{ textAlign: "left" }}>
                (서울열린데이터광장)
              </p>
              <p className="content2">
                이동 시 자전거를 240~350m 거리 안에서
                <br /> 쉽고 빠르게 이용할 수 있습니다.
              </p>
            </div>
          </div>
          <div className="chart1">
            <img src={count} alt="the number of bicycles" />
            <p className="quotation" style={{ textAlign: "left" }}>
              (서울시 구별 자전거 거치 대수)
            </p>
          </div>
        </div>

        <div className="wrapper">
          <div className="chart2">
            <img src={manual} alt="manual" />
          </div>
          <div className="text-wrapper2">
            <div className="title2">
              <span>간단하게 찾아 보세요</span>
            </div>
            <div className="content3">
              <p>
                검색을 통해 주변 대여소를 확인해 보세요.
                <br />
                가까운 위치의 대여소가 지도에 마커로 표시됩니다.
              </p>
              </div>
              <div className="content4">
              <p>
                자전거 대여소를 이용하고 리뷰를 남기면
                <br />
                다른 사람들과 정보를 주고 받을 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sections;
