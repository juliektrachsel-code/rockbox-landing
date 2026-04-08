// Vercel serverless function — proxies ConvertKit V4 subscription
// Keeps API key server-side, handles both waitlist and preorder forms

const KIT_API_KEY = process.env.KIT_API_KEY;
const KIT_BASE = 'https://api.kit.com/v4';

const TAG_IDS = {
  waitlist: 18828355,
  preorder: 18828356,
};

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, firstName, lastName, type = 'waitlist' } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email required' });
  }

  const tagId = TAG_IDS[type] || TAG_IDS.waitlist;

  try {
    // 1. Create or update subscriber
    const subRes = await fetch(`${KIT_BASE}/subscribers`, {
      method: 'POST',
      headers: {
        'X-Kit-Api-Key': KIT_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email_address: email,
        first_name: firstName || '',
        fields: {
          last_name: lastName || '',
          source: type,
        },
      }),
    });

    const subData = await subRes.json();

    if (!subRes.ok) {
      console.error('Kit subscriber error:', subData);
      return res.status(500).json({ error: 'Failed to create subscriber' });
    }

    const subscriberId = subData.subscriber?.id;

    // 2. Apply tag
    await fetch(`${KIT_BASE}/tags/${tagId}/subscribers`, {
      method: 'POST',
      headers: {
        'X-Kit-Api-Key': KIT_API_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email_address: email }),
    });

    return res.status(200).json({ success: true, subscriber_id: subscriberId });

  } catch (err) {
    console.error('Subscribe error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
