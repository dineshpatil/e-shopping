import React from "react";
import axios from "axios";

import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51J4OoeSClK0d9JInDwy5cmXDlbIWrtBWbyfNco3KmD6GLYgoOSrHnV0vCOlj3y1twIDDCAOpfQ257z8Gfv8aP79p00hbLp2Eu1";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then((response) => {
        alert("Payment sucessful");
      })
      .catch((error) => {
        console.log("Payment error: ", JSON.parse(error));
        alert("Payment FAILED");
      });
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="E-Shopping Ltd"
      billingAddress
      shippingAddress
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
