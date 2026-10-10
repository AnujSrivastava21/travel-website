
"use client";

import PayNowButton from "./pay-now-button";

export default function TestPaymentButton() {
  return (
    <PayNowButton
      amount={149}
      title="Test Travel Itinerary"
      orderId="STORYBOOK-TEST-001"
      onClick={() => {
        console.log("Payment success callback triggered");
        alert("Demo payment success callback triggered!");
      }}
    />
  );
}
