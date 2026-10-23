export const UNKNOWN_DECK_MESSAGE = '找不到這組分享內容，請回到喬馨身體空間重新開啟分享。';

export function parseDeckId(search) {
  const params = new URLSearchParams(search || '');
  const direct = params.get('deck');
  if (direct) return direct;

  const liffState = params.get('liff.state');
  if (!liffState) return null;

  try {
    const stateUrl = new URL(liffState, 'https://liff-state.invalid/');
    return stateUrl.searchParams.get('deck');
  } catch {
    return null;
  }
}

export function shareResultStatus(result) {
  return result?.status === 'success' ? 'success' : 'cancelled';
}

export function isConfiguredLiffId(value) {
  return typeof value === 'string' && value.length > 0 && value !== 'REPLACE_AFTER_LIFF_REGISTRATION';
}
