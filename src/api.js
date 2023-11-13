const express = require("express");
const cors = require('cors');
const serverless = require("serverless-http");

require('dotenv').config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const app = express();
app.use(express.json());

app.use(cors())

// app.use(
//   cors({
//     origin: "https://stripefrnt.netlify.app",
//     methods: "POST",
//     allowedHeaders: ["Content-Type"],
//     credentials: true,
//   })
// );

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    hello: "hi!"
  });
});

const calculateOrderAmount = (items) => {

  return 1000;
};

const amount = 1000

router.post("/create-payment-intent", async (req, res) => {
  const { qty } = req.body;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount * qty,
    currency: "usd",
    payment_method_types: ['us_bank_account']
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

app.use(`/.netlify/functions/api`, router);

module.exports = app;
module.exports.handler = serverless(app);

// const PORT = process.env.APPPORT || 9000

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}.`)
// }) 