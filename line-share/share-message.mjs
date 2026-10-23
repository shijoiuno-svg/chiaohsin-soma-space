import {COURSE_DECKS} from './course-data.mjs';

export class UnknownDeckError extends Error {
  constructor(deckId) {
    super(`Unknown deck: ${deckId ?? '(missing)'}`);
    this.name = 'UnknownDeckError';
  }
}

export function makeLiffShareUrl(liffId, deckId) {
  return `https://liff.line.me/${encodeURIComponent(liffId)}/?deck=${encodeURIComponent(deckId)}`;
}

function makeCourseBubble(card, deck, shareUrl) {
  return {
    type: 'bubble',
    size: 'mega',
    hero: {
      type: 'image',
      url: card.imageUrl,
      size: 'full',
      aspectRatio: '16:9',
      aspectMode: 'fit',
      backgroundColor: '#FFFFFF'
    },
    body: {
      type: 'box',
      layout: 'vertical',
      backgroundColor: '#FFFFFF',
      paddingAll: '16px',
      spacing: 'lg',
      contents: [
        {type: 'text', text: card.title, size: 'xl', weight: 'bold', color: '#292929', wrap: true},
        {type: 'text', text: card.description, size: 'md', color: '#3D3D3D', wrap: true, lineSpacing: '5px'}
      ]
    },
    footer: {
      type: 'box',
      layout: 'vertical',
      backgroundColor: '#FFFFFF',
      paddingAll: '16px',
      paddingTop: '0px',
      spacing: '8px',
      contents: [
        {
          type: 'button', style: 'primary', color: '#376B5A', height: 'sm',
          action: {type: 'uri', label: '走進這門課', uri: card.courseUrl}
        },
        {
          type: 'button', style: 'primary', color: '#376B5A', height: 'sm',
          action: {type: 'uri', label: '查看工作坊場次', uri: deck.workshopUrl}
        },
        {
          type: 'button', style: 'secondary', color: '#CFDDCB', height: 'sm',
          action: {type: 'uri', label: '↗ 分享給好友', uri: shareUrl}
        }
      ]
    }
  };
}

export function makeShareMessages(deckId, liffId) {
  const deck = COURSE_DECKS[deckId];
  if (!deck) throw new UnknownDeckError(deckId);

  const shareUrl = makeLiffShareUrl(liffId, deckId);
  return [{
    type: 'flex',
    altText: deck.altText,
    contents: {
      type: 'carousel',
      contents: deck.cards.map(card => makeCourseBubble(card, deck, shareUrl))
    }
  }];
}
