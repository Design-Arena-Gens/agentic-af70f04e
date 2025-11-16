export type Donation = {
  id?: string;
  createdAt?: string;
  amount: number;
  category: 'Food Security' | 'Shelter Support' | 'Counseling & Legal Aid' | 'Hygiene & Supplies';
  note?: string;
};

export type Impact = {
  meals: number;
  shelterNights: number;
  counselingHours: number;
  supplyKits: number;
};

export type ImpactTotals = Impact & { amount: number };

// Conversion model (illustrative):
// - Food Security: $1 -> 2 meals
// - Shelter Support: $35 -> 1 shelter night
// - Counseling & Legal Aid: $80 -> 1 counseling hour
// - Hygiene & Supplies: $20 -> 1 supply kit
export function calculateImpact(d: Donation): Impact {
  const base: Impact = { meals: 0, shelterNights: 0, counselingHours: 0, supplyKits: 0 };
  switch (d.category) {
    case 'Food Security':
      base.meals += Math.floor(d.amount * 2);
      break;
    case 'Shelter Support':
      base.shelterNights += Math.floor(d.amount / 35);
      break;
    case 'Counseling & Legal Aid':
      base.counselingHours += Math.floor(d.amount / 80);
      break;
    case 'Hygiene & Supplies':
      base.supplyKits += Math.floor(d.amount / 20);
      break;
  }
  return base;
}
