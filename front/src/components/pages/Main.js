import React from "react";
import Carousel from "../carousel/Carousel";
import Sections from "./Sections";
import BikeAnimation from "./BikeAnimation";

const Main = () => {
  return (
    <>
      <section>
        <Carousel />
      </section>

      <section>
        <Sections />
      </section>
      <section>
        <BikeAnimation />
      </section>
    </>
  );
};

export default Main;
