// app/student/add-money/page.tsx
'use client';

import { Card } from '@/shared/ui/card';
import { useState } from 'react';

export default function AddMoneyPage() {
  const [amount, setAmount] = useState<number>(0);

  const handleSubmit = () => {
    if (amount <= 0) return alert('Enter a valid amount!');
    alert(`(Mock) Added ${amount} ₴ to your wallet`);
  };

  return (
    <section className="space-y-6">
      <Card className="p-6 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4 text-center">Add Money</h2>

        <label className="block mb-2 font-medium">Amount (₴)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="w-full border rounded-lg p-2 mb-4"
          min={1}
        />

        <label className="block mb-2 font-medium">Payment Method</label>
        <select className="w-full border rounded-lg p-2 mb-6">
          <option>Visa / Mastercard</option>
          <option>PayPal</option>
          <option disabled>Crypto (coming soon)</option>
        </select>

        <button className="w-full" onClick={handleSubmit}>
          Confirm Payment
        </button>
      </Card>
    </section>
  );
}
