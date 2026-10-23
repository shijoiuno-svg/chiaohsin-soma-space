import {LIFF_ID} from './liff-config.mjs';
import {UNKNOWN_DECK_MESSAGE, isConfiguredLiffId, parseDeckId, shareResultStatus} from './share-core.mjs';
import {UnknownDeckError, makeShareMessages} from './share-message.mjs';

const statusElement = document.querySelector('#status');
const shareButton = document.querySelector('#share-button');
const deckId = parseDeckId(window.location.search);
let messages = null;
let sharing = false;

function setState(message, {showButton = true, disabled = false} = {}) {
  statusElement.textContent = message;
  shareButton.hidden = !showButton;
  shareButton.disabled = disabled;
}

async function openShareTargetPicker() {
  if (sharing || !messages) return;
  sharing = true;
  setState('正在開啟好友與群組選擇畫面……', {showButton: true, disabled: true});

  try {
    const result = await window.liff.shareTargetPicker(messages, {isMultiple: true});
    if (shareResultStatus(result) === 'success') {
      setState('分享完成！你也可以再次選擇其他好友或群組。');
    } else {
      setState('已取消分享。需要時可以重新選擇好友或群組。');
    }
  } catch {
    setState('目前無法開啟分享畫面，請確認已登入 LINE 並更新至最新版後再試一次。');
  } finally {
    sharing = false;
    shareButton.disabled = false;
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
    messages = makeShareMessages(deckId, LIFF_ID);
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
    setState('已準備好分享兩張身心覺察課程卡片。');
    await openShareTargetPicker();
  } catch {
    setState('分享功能初始化失敗，請稍後再試。', {showButton: false});
  }
}

shareButton.addEventListener('click', openShareTargetPicker);
start();
