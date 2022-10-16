import React, { useState, useEffect, useRef } from "react";

import "./Carousel.css";

import girl from "../../images/girl.jpg";
import oldwoman from "../../images/oldwoman.jpg";
import people from "../../images/people.jpg";

const Carousel = () => {
  const imagesRef = useRef([
    {
      src: girl,
    },
    {
      src: oldwoman,
    },
    {
      src: people,
    },
  ]); //노출될 이미지 목록

  const [currentSlide, setCurrentSlide] = useState(0); //슬라이드의 위치
  const [style, setStyle] = useState({
    marginLeft: `${currentSlide}00%`,
  });

  const imagesLength = useRef(imagesRef.current.length); //노출될 이미지 갯수

  const moveSlide = (param) => {
    //버튼클릭, 왼쪽버튼(-1), 오른쪽 버튼(1)
    let nextIndex = currentSlide + param;

    if (nextIndex < 0) nextIndex = imagesLength.current - 1; //슬라이드가 왼쪽 끝일 경우 -1번 슬라이드로
    if (nextIndex >= imagesLength.current) nextIndex = 0; //슬라이드가 오른쪽 끝일 경우 0번 슬라이드로

    setCurrentSlide(nextIndex); //슬라이드 위치 전환
  };

  useEffect(() => {
    setStyle({
      marginLeft: `-${currentSlide}00%`,
      transitionDuration: `${1}s`
    });
  }, [currentSlide]);

  return (
    <>
      <div className="carousel-container">
        <div className="carousel-wrapper">
          <button
            className="left-arrow"
            onClick={() => {
              moveSlide(-1);
            }}
          >&lt;</button>
          <div className="carousel-content-wrapper">
            <div className="carousel-content" style={style}>
              {imagesRef.current.map((image, index) => (
                <div
                  key={index}
                  className="image"
                  style={{ backgroundImage: `url(${image.src})` }}
                ></div>
              ))}
            </div>
          </div>
          <button
            className="right-arrow"
            onClick={() => {
              moveSlide(1);
            }}
          >&gt;</button>
        </div>

        <div className="position">
          {imagesRef.current.map((x, index) => (
            <div
              key={index}
              className={index === currentSlide ? "dot current" : "dot"}
            ></div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Carousel;
