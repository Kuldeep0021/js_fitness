const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || '';

export async function sendGymEmail(userData, type) {
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...userData, triggerType: type }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`Webhook error: ${res.status} ${res.statusText} - ${text}`);
    }

    console.log('sendGymEmail success');
    return { success: true };
  } catch (err) {
    console.error('sendGymEmail error', err);
    return { success: false, error: err && err.message ? err.message : String(err) };
  }
}

export default sendGymEmail;
