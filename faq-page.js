(() => {
  const state = { category: 0, openQuestion: null };

  const chevron = expanded => `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14"></path>${expanded ? '' : '<path d="M12 5v14"></path>'}</svg>`;

  function renderCategories() {
    return `<div class="faq-category-grid" role="tablist" aria-label="常見問題分類">${window.FAQ_CONTENT.map((category, index) => `
      <button class="faq-category-card${state.category === index ? ' is-active' : ''}" type="button" role="tab" aria-selected="${state.category === index}" aria-controls="faq-question-panel" data-faq-category="${index}">
        <span class="faq-category-label">${category.label}</span>
        <strong>${category.prompt}</strong>
      </button>`).join('')}</div>`;
  }

  function renderQuestion(item, index, categoryId) {
    const expanded = state.openQuestion === index;
    const answerId = `faq-answer-${categoryId}-${index}`;
    const questionCopy = `<span class="faq-question-copy faq-question-copy--pill">
      <span class="faq-question-number">${item.number}</span>
      <span class="faq-question-prompt-group">
        <span class="faq-question-mainline"><strong>${item.question}</strong><span class="faq-question-tag">${item.label}</span></span>
        ${item.related ? `<span class="faq-related">${item.related}</span>` : ''}
      </span>
    </span>`;
    return `<article class="faq-item${expanded ? ' is-open' : ''}">
      <h3 class="faq-question-heading">
        <button class="faq-question" type="button" aria-expanded="${expanded}" aria-controls="${answerId}" data-faq-question="${index}">
          ${questionCopy}
          <span class="faq-question-icon">${chevron(expanded)}</span>
        </button>
      </h3>
      ${expanded ? `<div class="faq-answer faq-answer--${categoryId}" id="${answerId}">${item.answer}</div>` : ''}
    </article>`;
  }

  function renderPanel() {
    const category = window.FAQ_CONTENT[state.category];
    return `<div class="faq-panel-heading"><span>${category.label}</span><h2>${category.prompt}</h2></div>
      <div class="faq-list">${category.items.map((item, index) => renderQuestion(item, index, category.id)).join('')}</div>`;
  }

  function updateCategories() {
    document.querySelectorAll('[data-faq-category]').forEach((button, index) => {
      const selected = index === state.category;
      button.classList.toggle('is-active', selected);
      button.setAttribute('aria-selected', String(selected));
    });
  }

  function updatePanel(focusQuestion = null, preserveTop = null) {
    const panel = document.querySelector('#faq-question-panel');
    if (!panel) return;
    panel.innerHTML = renderPanel();
    if (focusQuestion === null) return;
    requestAnimationFrame(() => {
      const nextButton = panel.querySelector(`[data-faq-question="${focusQuestion}"]`);
      if (!nextButton) return;
      nextButton.focus({ preventScroll: true });
      if (preserveTop !== null && matchMedia('(max-width: 900px)').matches) {
        window.scrollBy({ top: nextButton.getBoundingClientRect().top - preserveTop, behavior: 'auto' });
      }
    });
  }

  window.renderFaqPage = () => {
    state.category = 0;
    state.openQuestion = null;
    return `<section class="section faq-page">
      <div class="section-shell">
        <div class="heading faq-page-heading"><span class="eyebrow eyebrow-strong">FAQ</span><h1>常見問題</h1><p class="lead">從課程選擇、參與方式到上課準備，找到你開始探索前想知道的事。</p></div>
        ${renderCategories()}
        <section class="faq-question-panel" id="faq-question-panel" role="tabpanel" aria-live="polite">${renderPanel()}</section>
      </div>
    </section>`;
  };

  document.addEventListener('click', event => {
    const categoryButton = event.target.closest('[data-faq-category]');
    if (categoryButton) {
      const nextCategory = Number(categoryButton.dataset.faqCategory);
      if (nextCategory !== state.category) {
        state.category = nextCategory;
        state.openQuestion = null;
        updateCategories();
        updatePanel();
      }
      return;
    }

    const questionButton = event.target.closest('[data-faq-question]');
    if (!questionButton) return;
    const questionIndex = Number(questionButton.dataset.faqQuestion);
    const buttonTop = questionButton.getBoundingClientRect().top;
    state.openQuestion = state.openQuestion === questionIndex ? null : questionIndex;
    updatePanel(questionIndex, buttonTop);
  });
})();
