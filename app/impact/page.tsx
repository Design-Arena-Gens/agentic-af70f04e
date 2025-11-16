"use client";

import { useEffect, useMemo, useState } from 'react';
import { decodeStateFromQuery, encodeStateToQuery } from '../../lib/storage';
import { calculateImpact, type Donation, type ImpactTotals } from '../../lib/impactModel';
import { toCsv } from '../../lib/csv';

export default function ImpactPage() {
  const [donations, setDonations] = useState<Donation[]>([]);

  useEffect(() => {
    const fromUrl = decodeStateFromQuery();
    if (fromUrl) {
      setDonations(fromUrl);
      return;
    }
    const raw = localStorage.getItem('oba_donations_v1');
    if (raw) {
      try {
        setDonations(JSON.parse(raw));
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('oba_donations_v1', JSON.stringify(donations));
    // Update URL for quick copy/share without navigation
    const url = new URL(window.location.href);
    if (donations.length === 0) {
      url.searchParams.delete('d');
    } else {
      url.searchParams.set('d', encodeStateToQuery(donations));
    }
    window.history.replaceState({}, '', url.toString());
  }, [donations]);

  const totals = useMemo<ImpactTotals>(() => donations.reduce((acc, d) => {
    const impact = calculateImpact(d);
    acc.amount += d.amount;
    acc.meals += impact.meals;
    acc.shelterNights += impact.shelterNights;
    acc.counselingHours += impact.counselingHours;
    acc.supplyKits += impact.supplyKits;
    return acc;
  }, { amount: 0, meals: 0, shelterNights: 0, counselingHours: 0, supplyKits: 0 }), [donations]);

  function addDonation(d: Donation) {
    setDonations(prev => [{ ...d, id: crypto.randomUUID(), createdAt: new Date().toISOString() }, ...prev]);
  }

  function removeDonation(id: string) {
    setDonations(prev => prev.filter(d => d.id !== id));
  }

  function exportCsv() {
    const csv = toCsv(donations);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'orangeblossom_impact.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  function copyShareLink() {
    navigator.clipboard.writeText(window.location.href);
  }

  return (
    <div className="grid gap-8">
      <div className="grid gap-6 rounded-2xl border bg-white p-6">
        <h1 className="text-2xl font-semibold">Impact Tracker</h1>
        <DonationForm onAdd={addDonation} />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <StatCard label="Total donated" value={`$${totals.amount.toFixed(2)}`} />
          <StatCard label="Meals" value={totals.meals.toLocaleString()} />
          <StatCard label="Shelter nights" value={totals.shelterNights.toLocaleString()} />
          <StatCard label="Counseling hours" value={totals.counselingHours.toLocaleString()} />
          <StatCard label="Supply kits" value={totals.supplyKits.toLocaleString()} />
        </div>
        <div className="flex flex-wrap gap-3">
          <button onClick={exportCsv} className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50">Export CSV</button>
          <button onClick={copyShareLink} className="rounded-md border px-3 py-2 text-sm font-medium hover:bg-gray-50">Copy share link</button>
        </div>
      </div>

      <div className="grid gap-4 rounded-2xl border bg-white p-6">
        <h2 className="text-lg font-semibold">Donations</h2>
        {donations.length === 0 ? (
          <p className="text-sm text-gray-500">No donations yet. Add your first above.</p>
        ) : (
          <ul className="divide-y">
            {donations.map((d) => {
              const imp = calculateImpact(d);
              return (
                <li key={d.id} className="flex flex-col gap-2 py-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="grid gap-1">
                    <div className="text-sm text-gray-500">{new Date(d.createdAt!).toLocaleString()}</div>
                    <div className="text-base font-medium">${d.amount.toFixed(2)} ? {d.category}</div>
                    {d.note && <div className="text-sm text-gray-600">Note: {d.note}</div>}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    <Tag>{imp.meals} meals</Tag>
                    <Tag>{imp.shelterNights} shelter nights</Tag>
                    <Tag>{imp.counselingHours} counseling hrs</Tag>
                    <Tag>{imp.supplyKits} supply kits</Tag>
                    <button onClick={() => removeDonation(d.id!)} className="ml-2 rounded-md border px-2 py-1 text-xs hover:bg-gray-50">Remove</button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="text-xs text-gray-500">{label}</div>
      <div className="mt-1 text-xl font-semibold">{value}</div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="inline-flex items-center rounded-full bg-brand-50 px-2.5 py-1 text-brand-800">{children}</span>;
}

function DonationForm({ onAdd }: { onAdd: (d: Donation) => void }) {
  const [amount, setAmount] = useState<string>("");
  const [category, setCategory] = useState<Donation['category']>('Food Security');
  const [note, setNote] = useState<string>("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const parsed = parseFloat(amount);
    if (Number.isNaN(parsed) || parsed <= 0) return;
    onAdd({ amount: parsed, category, note });
    setAmount("");
    setNote("");
  }

  return (
    <form onSubmit={submit} className="grid gap-3 sm:grid-cols-4">
      <div className="sm:col-span-1">
        <label className="text-xs text-gray-600">Amount (USD)</label>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          step="0.01"
          min="0"
          placeholder="e.g. 100"
          className="mt-1 w-full rounded-md border px-3 py-2"
          required
        />
      </div>
      <div className="sm:col-span-1">
        <label className="text-xs text-gray-600">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as Donation['category'])}
          className="mt-1 w-full rounded-md border px-3 py-2"
        >
          <option>Food Security</option>
          <option>Shelter Support</option>
          <option>Counseling & Legal Aid</option>
          <option>Hygiene & Supplies</option>
        </select>
      </div>
      <div className="sm:col-span-2">
        <label className="text-xs text-gray-600">Note (optional)</label>
        <input
          value={note}
          onChange={(e) => setNote(e.target.value)}
          type="text"
          placeholder="Message, designation, campaign..."
          className="mt-1 w-full rounded-md border px-3 py-2"
        />
      </div>
      <div className="sm:col-span-4">
        <button type="submit" className="inline-flex items-center rounded-md bg-brand-600 px-4 py-2 font-medium text-white hover:bg-brand-700">
          Add donation
        </button>
      </div>
    </form>
  );
}
