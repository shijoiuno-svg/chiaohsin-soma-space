"use client";

import { useEffect, useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent, type WheelEvent as ReactWheelEvent } from "react";
import { MagazineShell } from "../../shared/MagazineShell";
import { MobileSwipeReader, Pager } from "../../shared/reading";
import { FurtherReadingModule, LongformModule, SceneryGalleryModule, VideoModule } from "../../shared/modules";
import { myofascialArticlePages, myofascialConfig, myofascialFurtherLinks, myofascialScenerySlides, myofascialVideo } from "./data";

const structureMagazinePages = [
  { className: "bridge", title: "肌膜 × 張力平衡 × 身體排列", content: <div className="spread-copy"><p>我們可以把肌肉－骨骼系統，看成一個持續調整張力的整體。</p><p>骨骼提供支撐，周圍的軟組織彼此牽引；肌膜的連續性，讓力量可以在不同部位之間傳遞。</p><p>反過來說，當軟組織的張力改變，骨骼之間的相對位置也可能跟著改變。</p><p>因此，身體的排列，也和整體張力如何分布有關。</p></div> },
  { className: "model", title: "張力如何維持一個結構？", content: <><figure><img src="/myofascial-magazine/03-1.webp" alt="完整的原始平衡張力均衡結構模型" /></figure><div className="spread-copy"><p>不同方向的張力彼此作用，<br />可以共同維持一個結構的平衡。</p><p className="small-note">圖為張力均衡結構（Tensegrity），作為理解整體張力關係的模型。</p></div></> },
  { className: "force", title: "當力量進入整個結構", content: <><figure><img src="/myofascial-magazine/03-2.webp" alt="手施加外力後，力量進入整個張力均衡結構" /></figure><div className="spread-copy"><p>當一處受到外力，<br />力量不只停留在受力的位置，<br />而會沿著整個結構傳遞。</p><p>原有的張力關係也會隨之改變，<br />整體一起調整。</p></div></> },
  { className: "overload", title: "當負荷超過結構可以承受的程度", content: <><figure><img src="/myofascial-magazine/03-3.webp" alt="明顯加大外力後，張力均衡結構受到影響" /></figure><div className="spread-copy"><p>當負荷超過結構可以承受的程度，<br />結構可能受到破壞。</p><p>由於力量會沿著張力線傳遞，<br />受到影響或發生破壞的位置，<br />不一定就在外力直接作用的地方。</p></div></> },
  { className: "pause", title: null, content: <><blockquote>緊繃的地方，<br />不一定是問題的起點。</blockquote><div className="spread-copy"><p>身體某處的緊繃、拉扯或不舒服，<br />有時可能和其他部位的張力關係有關。</p><p>身體也可能透過其他部位的調整，<br />來因應原有的負荷。</p><p>這也是我們理解身體「代償」的一種方式。</p></div></> },
  { className: "resolution", title: null, content: <><blockquote>改變一處，<br />整體可能重新找到平衡。</blockquote><div className="spread-copy"><p>透過按摩或伸展練習，<br />可以改變軟組織的張力，<br />讓整個系統有機會重新組織。</p><p>骨骼之間的相對排列也可能隨之改變，<br />讓身體重新找到新的平衡。</p></div></> },
];

export default function MyofascialMagazine() {
  const [gridPage, setGridPage] = useState(0);
  const [structurePage, setStructurePage] = useState(0);
  const [structureMobile, setStructureMobile] = useState(false);
  const [structureWidth, setStructureWidth] = useState(0);
  const [structureHeight, setStructureHeight] = useState(0);
  const [structureDrag, setStructureDrag] = useState(0);
  const [movementPage, setMovementPage] = useState(0);
  const [practicePage, setPracticePage] = useState(0);
  const structureViewportRef = useRef<HTMLDivElement>(null);
  const structureGesture = useRef<{ x: number; y: number; axis: "x" | "y" | null } | null>(null);
  const structureDragRef = useRef(0);
  const structureWheelLock = useRef(0);
  const structureSuppressClickUntil = useRef(0);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 760px)");
    const update = () => setStructureMobile(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  const structureStart = structureMobile ? structurePage : Math.floor(structurePage / 2) * 2;
  const structureStep = structureMobile ? 1 : 2;
  const structureMax = structureMobile ? 5 : 4;
  useEffect(() => {
    const viewport = structureViewportRef.current;
    if (!viewport) return;
    const measure = () => {
      setStructureWidth(viewport.clientWidth);
      const pages = Array.from(viewport.querySelectorAll<HTMLElement>(".structure-mag-page")) as HTMLElement[];
      const visible = pages.slice(structureStart, structureStart + structureStep);
      setStructureHeight(Math.max(...visible.map(page => page.scrollHeight), 0));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    viewport.querySelectorAll(".structure-mag-page").forEach(page => observer.observe(page));
    return () => observer.disconnect();
  }, [structureStart, structureStep]);
  const moveStructure = (direction: number) => setStructurePage(Math.max(0, Math.min(structureMax, structureStart + direction * structureStep)));
  const finishStructureDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const width = structureWidth || structureViewportRef.current?.clientWidth || 1;
    const drag = structureDragRef.current;
    const gesture = structureGesture.current;
    event.stopPropagation();
    if (gesture?.axis === "x") {
      event.preventDefault();
      structureSuppressClickUntil.current = Date.now() + 450;
      if (Math.abs(drag) > Math.min(90, width * .14)) moveStructure(drag < 0 ? 1 : -1);
    } else if (!structureMobile && gesture?.axis === null) {
      const rect = event.currentTarget.getBoundingClientRect();
      moveStructure(event.clientX < rect.left + rect.width / 2 ? -1 : 1);
    }
    structureDragRef.current = 0;
    setStructureDrag(0);
    structureGesture.current = null;
  };
  const cancelStructureDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    structureDragRef.current = 0;
    setStructureDrag(0);
    structureGesture.current = null;
  };
  const onStructurePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.stopPropagation();
    structureGesture.current = { x: event.clientX, y: event.clientY, axis: null };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const onStructurePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const gesture = structureGesture.current;
    if (!gesture) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.axis && Math.max(Math.abs(dx), Math.abs(dy)) > 7) gesture.axis = Math.abs(dx) > Math.abs(dy) * 1.2 ? "x" : "y";
    if (gesture.axis === "x") {
      event.preventDefault();
      event.stopPropagation();
      const atEdge = (structureStart === 0 && dx > 0) || (structureStart === structureMax && dx < 0);
      const nextDrag = atEdge ? dx * .28 : dx;
      structureDragRef.current = nextDrag;
      setStructureDrag(nextDrag);
    }
  };
  const onStructureWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (structureMobile || Math.abs(event.deltaX) < Math.abs(event.deltaY) * 1.2 || Math.abs(event.deltaX) < 18) return;
    event.preventDefault();
    event.stopPropagation();
    const now = Date.now();
    if (now - structureWheelLock.current < 450) return;
    structureWheelLock.current = now;
    moveStructure(event.deltaX > 0 ? 1 : -1);
  };
  const onStructureKeyDown = (event: ReactKeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowRight") { event.preventDefault(); moveStructure(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); moveStructure(-1); }
  };
  return <MagazineShell config={myofascialConfig}>
    <section className="section section-01" aria-labelledby="title-01">
      <div className="hero-copy">
        <p className="section-number">01</p>
        <h1 id="title-01"><span className="title-line">你的身體裡，</span><span className="title-line">有一張網</span></h1>
        <p className="subtitle">——認識肌膜：全身連結的起點</p>
        <div className="hero-intro">
          <p>我們的身體並不是由一塊一塊<br />彼此分離的零件所組成，而是由一張<br />無所不在的網絡包覆、貫穿並連結著。</p>
          <p>這張網，就是「肌膜」。<br />它像無數細緻的線彼此交織，<br />從頭到腳、從內到外，<br />連結每一個細胞，串連每一個動作，<br />也承載著我們的力量、感受與記憶。</p>
        </div>
        <details className="terminology-note">
          <summary>關於「肌膜」這個名稱 <span aria-hidden="true" /></summary>
          <p>我沿用過去學習時使用的「肌膜」來指稱 fascia。最初從肌肉內部一層層的結締組織開始認識，後來逐漸理解它與全身其他結締組織的連續關係。這裡的使用，也接近《解剖列車》所談的肌筋膜（myofascia）與筋膜網（fascial web）概念。</p>
        </details>
      </div>
      <figure className="hero-visual"><img src="/assets/myofascial-course-cover.webp" alt="女性背部與手臂被連續的白色肌膜纖維包覆連結" /></figure>
    </section>

    <section className="section section-02" aria-labelledby="title-02">
      <div className="section-02-layout">
        <div className="section-02-copy"><p className="section-number">02</p><h2 id="title-02">拉動網的一角</h2><div className="section-lead"><p>當一處被牽動，<br />改變不只發生在那一點。</p><p>張力沿著連續的網絡傳遞，<br />遠處也可能跟著改變。</p></div><aside><span>重點</span><p>身體就像這張連續的網，<br />一處的改變，會影響整體。</p></aside></div>
        <MobileSwipeReader className="grid-sequence" page={gridPage} total={2} onChange={setGridPage}><figure className="mobile-swipe-page"><figcaption>牽動前</figcaption><img src="/myofascial-magazine/02-before.webp" alt="受力前的規則網格" /></figure><span className="sequence-arrow" aria-hidden="true">↓</span><figure className="mobile-swipe-page"><figcaption>牽動後</figcaption><img src="/myofascial-magazine/02-after.webp" alt="一角被拉動後，變形向遠處傳遞的網格" /></figure></MobileSwipeReader>
      </div>
      <div className="mobile-only-pager"><Pager page={gridPage} total={2} onChange={setGridPage} quiet /></div>
    </section>

    <section className="section section-03" aria-labelledby="title-03">
      <header className="structure-mag-heading"><p className="section-number">03</p><div><h2 id="title-03">身體如何維持平衡？</h2><p>肌膜 × 張力平衡 × 身體排列</p></div></header>
      <div className="structure-mag-reader" ref={structureViewportRef} tabIndex={0} aria-label="03 六頁數位雜誌，可左右拖曳或使用方向鍵翻頁" onPointerDown={onStructurePointerDown} onPointerMove={onStructurePointerMove} onPointerUp={finishStructureDrag} onPointerCancel={cancelStructureDrag} onClickCapture={(event) => { event.stopPropagation(); if (Date.now() < structureSuppressClickUntil.current) event.preventDefault(); }} onWheel={onStructureWheel} onKeyDown={onStructureKeyDown} style={{ height: structureHeight || undefined }}>
        <div className={`structure-mag-track ${structureDrag ? "is-dragging" : ""}`} style={{ transform: `translate3d(${-(structureMobile ? structureStart : structureStart / 2) * structureWidth + structureDrag}px,0,0)` }}>
          {structureMagazinePages.map((page, index) => <article className={`structure-mag-page page-${index + 1} ${page.className}`} aria-hidden={index < structureStart || index >= structureStart + structureStep} key={index}><span className="mag-page-number">{index + 1} / 6</span>{page.title && <h3>{page.title}</h3>}{page.content}</article>)}
        </div>
      </div>
      <nav className="structure-mag-controls" aria-label="03 翻頁控制">
        <button type="button" onClick={() => moveStructure(-1)} disabled={structureStart === 0} aria-label="上一頁">←</button>
        <span>{structureMobile ? `${structureStart + 1} / 6` : `${structureStart + 1}–${structureStart + 2} / 6`}</span>
        <button type="button" onClick={() => moveStructure(1)} disabled={structureStart === structureMax} aria-label="下一頁">→</button>
      </nav>
      <p className="structure-swipe-hint">左右滑動閱讀</p>
    </section>

    <section className="section section-04" aria-labelledby="title-04">
      <div className="section-heading heading-side"><div><p className="section-number">04</p><h2 id="title-04">一個動作，可以走多遠？</h2></div><p className="section-lead">從一個小小的動作開始，<br />感受力量如何透過身體的連結，<br />一步步影響到更遠的地方。</p></div>
      <MobileSwipeReader className="movement-grid" page={movementPage} total={2} onChange={setMovementPage}>
        <article className="mobile-swipe-page"><figure><img src="/myofascial-magazine/04-1.webp" alt="單手平舉，掌心朝上的預備動作" /></figure><div><span>1 / 2　預備位置</span><p>單手平舉，掌心朝上。</p></div></article>
        <article className="mobile-swipe-page"><figure><img src="/myofascial-magazine/04-2.webp" alt="手掌向前翻並帶動手臂與軀幹螺旋" /></figure><div><span>2 / 2　手臂向前螺旋</span><p>讓手掌向前翻，慢慢轉成掌心朝後。</p></div></article>
      </MobileSwipeReader>
      <div className="mobile-only-pager"><Pager page={movementPage} total={2} onChange={setMovementPage} quiet /></div>
      <aside className="practice-note mobile-practice-note"><span>Practice Note</span>不要追求最大角度，只是感受這個動作可以走到哪裡。</aside>
      <div className="practice-reader"><MobileSwipeReader className="practice-notes" page={practicePage} total={2} onChange={setPracticePage}><div className="practice-steps mobile-swipe-page"><h3>練習步驟</h3><ol><li>站穩，脊椎延展，頭頂向上。</li><li>單手平舉，掌心朝上，深呼吸幾次，感受身體的重量與支撐。</li><li>手掌往前翻，讓掌心慢慢轉向後方。</li><li>帶動前臂、手肘、上臂、肩膀，甚至軀幹自然跟著旋轉。</li><li>保持呼吸，停留幾個呼吸，再慢慢回到預備位置；換另一側練習。</li></ol></div><blockquote className="explore mobile-swipe-page"><span>探索與感受</span><ul><li>手臂旋轉時，身體其他部位有什麼感覺或改變？</li><li>胸口、背部、肋骨、腹部，有什麼感覺？</li><li>身體的重量、平衡、呼吸有受到影響嗎？</li><li>這個小小的動作，帶動了哪些地方？</li></ul></blockquote></MobileSwipeReader><div className="mobile-only-pager practice-page-nav"><Pager page={practicePage} total={2} onChange={setPracticePage} quiet /></div></div>
      <aside className="practice-note desktop-practice-note"><span>Practice Note</span>不要追求最大角度，只是感受這個動作可以走到哪裡。</aside>
    </section>

    <VideoModule number="05" heading="跟著我動一動" id="title-05" video={myofascialVideo} />
    <LongformModule number="06" heading="深度閱讀" id="title-06" pages={myofascialArticlePages} placeholder />
    <SceneryGalleryModule number="07" heading="練習風景" id="title-07" slides={myofascialScenerySlides} />
    <FurtherReadingModule title="延伸閱讀" id="further-title" items={myofascialFurtherLinks} returnTarget={myofascialConfig.returnTarget} />
  </MagazineShell>;
}
