import React from "react";
import { useNavigate, NavLink } from "react-router-dom";

import { ROUTE } from "../route";
import "./BikeAnimation.css";

const BikeAnimation = () => {
  return (
    <>
      <div className="animation-wrapper">
        <div className="btn-box">
          <NavLink className="search-btn" to={ROUTE.SEARCH.link}>
            자전거 타러 가기
          </NavLink>
        </div>

        <div className="sky">
          <div className="bike">
            <div className="bike__cloud-1"></div>
            <div className="bike__cloud-2"></div>
            <div className="bike__cloud-3"></div>
            <div className="bike__bike">
              <div className="bike__wheel"></div>
              <div className="bike__wheel"></div>
              <div className="bike__down-tube"></div>
              <div className="bike__tubes">
                <div className="bike__chain"></div>
                <div className="bike__seat-stays"></div>
                <div className="bike__chain-stays"></div>
                <div className="bike__seat-tube"></div>
                <div className="bike__star">
                  <div className="bike__pedal"></div>
                </div>
                <div className="bike__seat"></div>
              </div>
              <div className="bike__top-tube"></div>
              <div className="bike__fo"></div>
              <div className="bike__head-tube"></div>
              <div className="bike__helm"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BikeAnimation;
