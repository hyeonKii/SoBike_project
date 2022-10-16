import React from "react";
import Carousel from "../carousel/Carousel"
import Sections from "./Sections";

const Main = () => {
  return (
    <>
      <section>
        <Carousel />
      </section>

      <section>
        <Sections />
      </section>
    </>
  );
};

export default Main;
