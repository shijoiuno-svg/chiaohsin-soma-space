(() => {
  const recipient = 'shijoiuno@gmail.com';
  const subject = '【喬馨身體空間】網站聯絡｜（請填寫稱呼）';
  const body = [
    '稱呼：',
    '',
    '詢問類別：課程與學習／合作邀約／其他',
    '',
    '問題內容：'
  ].join('\n');

  window.CONTACT_EMAIL = Object.freeze({
    recipient,
    subject,
    body,
    href: `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  });
})();
