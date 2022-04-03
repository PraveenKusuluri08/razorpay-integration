const express = require("express");
const cors = require("cors");
const path = require("path");
const Razorpay = require("razorpay");
const shortid = require("shortid");
require("dotenv").config()

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));
const razorPay = new Razorpay({
  key_id:process.env.KEY_ID,
  key_secret:process.env.KEY_SECRET,
});
app.get("/logo.svg", (req, res) => {
  res.sendFile(path.join(__dirname, "logo.svg"));
});

app.post("/razorpay", async (req, res) => {
    console.log(req.body)
  let options = {
    amount: (req.body.amount)*100,
    receipt: shortid.generate(),
    payment_capture: 1,
    currency: "INR",
  };
  try {
    const payment = await razorPay.orders.create(options);
    console.log(payment)
    res.json({
      id: payment.id,
      curreny: payment.currency,
      amount: payment.amount,
      createdAt:payment.created_at,
    });
  } catch (err) {
    console.log(err);
  }
});
app.listen(5000, () => {
  console.log("App is listening on port 5000");
});
