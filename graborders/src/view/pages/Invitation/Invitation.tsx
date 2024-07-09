import React, { useEffect } from "react";
import SubHeader from "src/view/shared/Header/SubHeader";

function Events() {
  return (
    <div>
      <SubHeader title="Events" path="/" />
      <div className="detaill__company" style={{ whiteSpace: "pre-line" }}>
        <img src="/images/events/1.jpg" />
        <img src="/images/events/2.jpg" />

      </div>
    </div>
  );
}

export default Events;
