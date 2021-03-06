import paypal from "paypal-rest-sdk";

paypal.configure({
  mode: "sandbox", //sandbox or live
  client_id: process.env.CLIENT_ID,
  client_secret: process.env.PAYPAL_SECRET
});

const create_payment_json: paypal.Payment = {
  intent: "sale",
  payer: {
    payment_method: "paypal"
  },
  redirect_urls: {
    return_url: "http://return.url",
    cancel_url: "http://cancel.url"
  },
  transactions: [
    {
      item_list: {
        items: [
          {
            name: "item",
            sku: "item",
            price: "1.00",
            currency: "USD",
            quantity: 1
          }
        ]
      },
      amount: {
        currency: "USD",
        total: "1.00"
      },
      description: "This is the payment description."
    }
  ]
};

paypal.payment.create(
  create_payment_json,
  (error: paypal.SDKError, payment: paypal.PaymentResponse) => {
    if (error) {
      throw error;
    } else {
      console.log("Create Payment Response");
      console.log(payment);
    }
  }
);
