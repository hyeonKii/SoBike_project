import React, { useState } from "react";

import * as Api from "../../api";
import MapContainer from "./MapContainer";

const SearchPlace = () => {
  //입력값
  const [inputText, setInputText] = useState("");
  //
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await Api.get("bicycles/location").then((res) => setPlace(res.data));

    //place의 값을 입력값으로
    setPlace(inputText);
    //검색창 비우기
    setInputText("");
  };

  return (
    <>
      <form className="inputForm" onSubmit={handleSubmit}>
        <input
          placeholder="Search Place..."
          onChange={onChange}
          value={inputText}
        />
        <button type="submit">검색</button>
      </form>
      <MapContainer searchPlace={place} />
    </>
  );
};

export default SearchPlace;