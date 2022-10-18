import React, { useEffect, useState } from "react";
import { Card, Button, Col, Row } from "react-bootstrap";
import StorePlace from "./StorePlace"
function StorePlaces({ serverData}) {
  return (
    <>
      {serverData.map((data) => (
        <StorePlace
          key={data.rentalLocationId}
          serverData={data}
        />
      ))}
    </>
  );
}

export default StorePlaces;
