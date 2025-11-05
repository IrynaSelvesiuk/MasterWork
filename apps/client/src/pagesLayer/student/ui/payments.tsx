'use client';

import React from 'react';
import { WalletSummary } from '@/pagesLayer/profile/ui/WalletSummary';
import { Card } from '@/shared/ui/card';

const mockPayments = [
  {
    id: 1,
    type: 'Deposit',
    amount: 500,
    date: '2025-11-01',
    description: 'Added via card',
  },
  {
    id: 2,
    type: 'Lesson',
    amount: -120,
    date: '2025-11-02',
    description: 'Math lesson with Alex',
  },
];

export default function PaymentsPage() {
  const payments = mockPayments;

  return (
    <section className="space-y-6">
      <WalletSummary walletBalance={380} />

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Payment History</h2>

        {payments.length === 0 ? (
          <p className="text-gray-500 text-center py-4">
            You don’t have any transactions yet.
          </p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-600">
                <th className="p-2">Date</th>
                <th className="p-2">Type</th>
                <th className="p-2">Amount</th>
                <th className="p-2">Description</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{p.date}</td>
                  <td className="p-2">{p.type}</td>
                  <td
                    className={`p-2 font-medium ${p.amount < 0 ? 'text-red-500' : 'text-green-600'}`}
                  >
                    {p.amount < 0 ? p.amount : `+${p.amount}`} ₴
                  </td>
                  <td className="p-2">{p.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </section>
  );
}
