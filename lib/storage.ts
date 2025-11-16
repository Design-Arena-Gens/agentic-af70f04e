import type { Donation } from './impactModel';

export function encodeStateToQuery(donations: Donation[]): string {
  const json = JSON.stringify(donations);
  const bytes = new TextEncoder().encode(json);
  const b64 = typeof window !== 'undefined' ? btoa(String.fromCharCode(...bytes)) : Buffer.from(bytes).toString('base64');
  return b64.replaceAll('+', '-').replaceAll('/', '_').replace(/=+$/u, '');
}

export function decodeStateFromQuery(): Donation[] | null {
  if (typeof window === 'undefined') return null;
  const param = new URLSearchParams(window.location.search).get('d');
  if (!param) return null;
  try {
    const b64 = param.replaceAll('-', '+').replaceAll('_', '/');
    const pad = b64.length % 4 === 0 ? '' : '='.repeat(4 - (b64.length % 4));
    const raw = atob(b64 + pad);
    const bytes = Uint8Array.from(raw, c => c.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json);
  } catch {
    return null;
  }
}
