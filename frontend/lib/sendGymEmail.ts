const WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'http://localhost:5678/webhook/gym-triggers';

type TriggerType = 'trial' | 'welcome' | 'renewal';

type UserData = {
  name: string;
  email: string;
};

export async function sendGymEmail(userData: UserData, type: TriggerType) {
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...userData, triggerType: type }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`n8n webhook error: ${res.status} ${res.statusText} - ${text}`);
    }

    const data = await res.json().catch(() => null);
    return { success: true, data };
  } catch (error) {
    // keep error handling simple and return a consistent shape
    // caller can inspect `error` or the `success` flag
    // eslint-disable-next-line no-console
    console.error('sendGymEmail error', error);
    return { success: false, error: (error as Error).message ?? String(error) };
  }
}

export default sendGymEmail;
