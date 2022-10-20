import React from "react";

import "./Sections.css";

import count from "../../images/count.png";
import manual from "../../images/manual.png";
import bikeicon from "../../images/bike-icon.png";
import saving from "../../images/saving.png";
import exercise from "../../images/exercise.png";

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
                서울시의 약 5,000대의 자전거 대여소에서
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
              <p className="quotation" style={{ textAlign: "left" }}>
                (버스 정류장 500m, 지하철역 1.5km 보다 가까움)
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
            <div className="img-box">
              <div className="upside">
                <img className="saving" src={saving} alt="saving icon" />
                <img className="exercise" src={exercise} alt="exercise icon" />
              </div>
              <div className="downside">
                <img className="bikeicon" src={bikeicon} alt="bike icon" />
              </div>
            </div>
          </div>
          <div className="text-wrapper2">
            <div className="title2">
              <span>지갑은 무겁고 몸은 가볍게</span>
            </div>
            <div className="content3">
              <p>
                서울시 공공 자전거, 환승 마일리지가 있다는 것을 아시나요?
                <br />
                대중교통 환승 시 결제에 사용할 수 있는 마일리지가 적립됩니다.
                <p className="quotation" style={{ textAlign: "left" }}>
                  (365 정기권 이용자)
                </p>
              </p>
            </div>
            <div className="content4">
              <p>
                자전거는 열량 소모도 많은 유산소 운동입니다.
                <br />
                바쁜 하루의 이동 시간을 운동 시간으로 바꾸어 보세요.
              </p>
            </div>
          </div>
        </div>

        <div className="wrapper">
          <div className="text-wrapper3">
            <div className="title3">
              <span>간단하게 찾아 보세요</span>
            </div>
            <div className="content-wrappe3">
              <p className="content5">
                검색을 통해 주변 대여소를 확인해 보세요.
                <br />
                가까운 위치의 대여소가 지도에 마커로 표시됩니다.
              </p>

              <p className="content6">
                자전거 대여소를 이용하고 리뷰를 남기면
                <br />
                다른 사람들과 정보를 주고 받을 수 있습니다.
              </p>
            </div>
          </div>
          <div className="chart3">
            <img src={manual} alt="the number of bicycles" />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sections;
