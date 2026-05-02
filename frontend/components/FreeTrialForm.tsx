"use client";

import { useState } from 'react';
import { sendGymEmail } from '../lib/api';

export default function FreeTrialForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle'|'sending'|'success'|'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('sending');
    const res = await sendGymEmail({ name, email }, 'trial');
    if (res && res.success) {
      setStatus('success');
      setName('');
      setEmail('');
    } else {
      setStatus('error');
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6">
      <h3 className="text-xl font-bold mb-4">Claim Your Free Trial</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Full Name</label>
          <input required value={name} onChange={e => setName(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="Your name" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3 py-2 border rounded-lg" placeholder="you@example.com" />
        </div>
        <div>
          <button type="submit" disabled={status === 'sending'} className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-lg">
            {status === 'sending' ? 'Sending...' : 'Get Free Trial'}
          </button>
        </div>
        {status === 'success' && <p className="text-green-600">Success! Check your email for the trial pass.</p>}
        {status === 'error' && <p className="text-red-600">Failed to send. Please try again later.</p>}
      </form>
    </div>
  );
}
