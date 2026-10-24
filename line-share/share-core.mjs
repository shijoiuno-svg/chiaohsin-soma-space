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

export function createSharePickerFlow({liff, messages}) {
  let state = 'idle';

  return {
    get state() {
      return state;
    },

    async open() {
      if (state === 'opening' || state === 'completed') {
        return {status: 'ignored', closeRequested: false};
      }

      state = 'opening';

      try {
        const result = await liff.shareTargetPicker(messages, {isMultiple: true});
        const status = shareResultStatus(result);
        state = 'completed';

        let closeRequested = false;
        if (liff.isInClient()) {
          try {
            liff.closeWindow();
            closeRequested = true;
          } catch {
            closeRequested = false;
          }
        }

        return {status, closeRequested};
      } catch (error) {
        state = 'idle';
        throw error;
      }
    }
  };
}

export function isConfiguredLiffId(value) {
  return typeof value === 'string' && value.length > 0 && value !== 'REPLACE_AFTER_LIFF_REGISTRATION';
}
