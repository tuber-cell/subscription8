const express = require('express');
const serverless = require('serverless-http');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const app = express();
app.use(express.json({ verify: (req, res, buf) => { req.rawBody = buf } }));

app.post('/api/webhook', (req, res) => {
  const secret = process.env.my_secret_razorpay_karanisgreat;
  const signature = req.headers['x-razorpay-signature'];

  const expectedSignature = crypto.createHmac('sha256', secret)
    .update(req.rawBody)
    .digest('hex');

  if (signature === expectedSignature) {
    console.log('✅ Webhook verified!');
    console.log(req.body); // handle subscription/payment event
    res.status(200).json({ status: 'ok' });
  } else {
    console.warn('❌ Invalid webhook signature');
    res.status(400).send('Invalid signature');
  }
});

module.exports.handler = serverless(app);
