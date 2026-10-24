import {LIFF_ID} from './liff-config.mjs';
import {UNKNOWN_DECK_MESSAGE, createSharePickerFlow, isConfiguredLiffId, parseDeckId} from './share-core.mjs';
import {UnknownDeckError, makeShareMessages} from './share-message.mjs';

const panelElement = document.querySelector('#share-panel');
const statusElement = document.querySelector('#status');
const shareButton = document.querySelector('#share-button');
const deckId = parseDeckId(window.location.search);
let shareFlow = null;

function setState(message, {mode = 'detail', showButton = false, disabled = false, buttonLabel = '重新嘗試'} = {}) {
  panelElement.dataset.mode = mode;
  panelElement.setAttribute('aria-busy', mode === 'loading' ? 'true' : 'false');
  statusElement.textContent = message;
  shareButton.hidden = !showButton;
  shareButton.disabled = disabled;
  shareButton.textContent = buttonLabel;
}

async function openShareTargetPicker() {
  if (!shareFlow) return;
  setState('正在開啟 LINE 分享……', {mode: 'loading'});

  try {
    const result = await shareFlow.open();
    if (result.status === 'ignored' || result.closeRequested) return;

    if (result.status === 'success') {
      setState('分享完成，請返回 LINE。');
    } else {
      setState('已取消分享，可以關閉此頁。');
    }
  } catch {
    setState('目前無法開啟分享畫面，請確認已登入 LINE 並更新至最新版後再試一次。', {
      showButton: true,
      buttonLabel: '重新嘗試'
    });
  }
}

async function start() {
  if (!deckId) {
    setState(UNKNOWN_DECK_MESSAGE, {showButton: false});
    return;
  }

  if (!isConfiguredLiffId(LIFF_ID)) {
    setState('分享功能尚未完成設定，請稍後再試。', {showButton: false});
    return;
  }

  try {
    const messages = makeShareMessages(deckId, LIFF_ID);
    shareFlow = createSharePickerFlow({liff: window.liff, messages});
  } catch (error) {
    if (error instanceof UnknownDeckError) {
      setState(UNKNOWN_DECK_MESSAGE, {showButton: false});
      return;
    }
    throw error;
  }

  try {
    await window.liff.init({liffId: LIFF_ID, withLoginOnExternalBrowser: true});
    if (!window.liff.isLoggedIn()) {
      window.liff.login({redirectUri: window.location.href});
      return;
    }
    if (!window.liff.isApiAvailable('shareTargetPicker')) {
      setState('此環境不支援好友分享，請在最新版 LINE 中重新開啟。', {showButton: false});
      return;
    }
    await openShareTargetPicker();
  } catch {
    setState('分享功能初始化失敗，請稍後再試。', {showButton: false});
  }
}

shareButton.addEventListener('click', openShareTargetPicker);
start();
