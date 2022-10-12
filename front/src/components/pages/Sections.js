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
              <span>탄소가 환경에 미치는 영향</span>
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
          <div className="chart"></div>
        </div>

        <div className="wrapper1">
          <div className="chart">chart1</div>
          <div className="text-wrapper1">
            <div className="title1">
              <span>운송수단이 개인 탄소배출량에 어쩌구</span>
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
