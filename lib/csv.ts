import type { Donation } from './impactModel';
import { calculateImpact } from './impactModel';

export function toCsv(donations: Donation[]): string {
  const header = ['createdAt', 'amount', 'category', 'note', 'meals', 'shelterNights', 'counselingHours', 'supplyKits'];
  const rows = donations.map(d => {
    const imp = calculateImpact(d);
    return [
      d.createdAt ?? '',
      d.amount.toFixed(2),
      d.category,
      d.note ?? '',
      String(imp.meals),
      String(imp.shelterNights),
      String(imp.counselingHours),
      String(imp.supplyKits)
    ];
  });
  return [header, ...rows].map(r => r.map(escapeCsv).join(',')).join('\n');
}

function escapeCsv(v: string): string {
  if (/[",\n]/u.test(v)) {
    return '"' + v.replaceAll('"', '""') + '"';
  }
  return v;
}
