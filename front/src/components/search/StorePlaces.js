import React from "react";
import StorePlace from "./StorePlace"
function StorePlaces({ serverData,addLike}) {
  return (
    <>
      {serverData.map((data) => (
        <StorePlace
          key={data.rentalLocationId}
          serverData={data}
          addLike={addLike}
        />
      ))}
    </>
  );
}

export default StorePlaces;
