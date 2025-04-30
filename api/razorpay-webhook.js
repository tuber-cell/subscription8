import getRawBody from 'raw-body';
import crypto from 'crypto';

export const config = {
  api: {
    bodyParser: false, // Razorpay requires raw body
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    // Get raw body
    const rawBody = await getRawBody(req);
    const signature = req.headers['x-razorpay-signature'];
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Compute hash
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(rawBody)
      .digest('hex');

    // Signature validation
    if (signature !== expectedSignature) {
      console.error('❌ Invalid webhook signature');
      return res.status(400).json({ error: 'Invalid signature' });
    }

    // Parse payload and log it
    const payload = JSON.parse(rawBody.toString());
    console.log('✅ Valid Razorpay webhook payload:', payload);

    // TODO: Handle the event (e.g., save to DB)

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('❌ Webhook error:', err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
