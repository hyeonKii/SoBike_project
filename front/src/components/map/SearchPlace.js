import React, { useState } from "react";
import MapContainer from "./MapContainer";

const SearchPlace = () => {
  const [inputText, setInputText] = useState("");
  const [place, setPlace] = useState("");

  const onChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPlace(inputText);
    setInputText("");
  };

  return (
    <>
      <form 
        className="inputForm" 
        onSubmit={handleSubmit}
        style ={{
            width: "250px"
        }}
        >
        <input
          placeholder="검색"
          onChange={onChange}
          value={inputText}
          style={{
              borderRadius: "5px",
          }}
        />
        <button 
            type="submit"
            style={{
                
                marginLeft: "5px",
                backgroundColor: "lightblue",
                borderColor: "lightblue",
                borderRadius: "5px"
            }}
        >
            검색
        </button>
      </form>
      <MapContainer searchPlace={place} />
    </>
  );
};

export default SearchPlace;