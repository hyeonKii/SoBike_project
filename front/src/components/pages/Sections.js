import React from "react";

import "./Sections.css";

// import girl from "../../images/girl.jpg";
// import oldwoman from "../../images/oldwoman.jpg";
// import people from "../../images/people.jpg";

const Sections = () => {
  return (
    <>
      <div className="main-container">
        <div className="wrapper1">
          <div className="text-wrapper1">
            <div className="title1">
              <span>가장 가까운 대중교통 정류장</span>
            </div>
            <div className="content1">
              <p>
                서울시에 5754개의 자전거 대여소에 <br/>40,500대의 공공 자전거가 있다는 것을 아시나요?<br/>
                이는 평균 240~350m 마다 <br/>자전거를 대여할 수 있고 반납할 수 있다는 말입니다.
              </p>
              <p>
                
              </p>
            </div>
          </div>
          <div className="chart"></div>
        </div>

        <div className="wrapper1">
          <div className="chart">chart1</div>
          <div className="text-wrapper1">
            <div className="title1">
              <span>남들보다 더 상쾌한 아침</span>
            </div>
            <div className="content1">
              <p>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet
              </p>
              <p>
                sint. Velit officia consequat duis enim velit mollit.
                Exercitation
              </p>
              <p>veniam consequat sunt nostrud amet.</p>
            </div>
          </div>
        </div>

        <div className="wrapper1">
          <div className="text-wrapper1">
            <div className="title1">
              <span>이렇게 노력해 보세요</span>
            </div>
            <div className="content">
              <p>
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet
              </p>
              <p>
                sint. Velit officia consequat duis enim velit mollit.
                Exercitation
              </p>
              <p>veniam consequat sunt nostrud amet.</p>
            </div>
          </div>
          <div className="chart">chart1</div>
        </div>
      </div>
    </>
  );
};

export default Sections;
