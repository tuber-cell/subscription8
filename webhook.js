// api/razorpay-webhook.js

import getRawBody from 'raw-body';
import crypto from 'crypto';

export const config = {
  api: {
    bodyParser: false, // required for Razorpay signature validation
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers['x-razorpay-signature'];
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    const hash = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    if (hash !== signature) {
      console.error('❌ Invalid signature');
      return res.status(400).send('Invalid signature');
    }

    const payload = JSON.parse(rawBody.toString());
    console.log('✅ Webhook received:', payload);

    // 👉 Handle the Razorpay event here (like saving to DB)
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ Webhook error:', err);
    return res.status(500).send('Internal Server Error');
  }
}
