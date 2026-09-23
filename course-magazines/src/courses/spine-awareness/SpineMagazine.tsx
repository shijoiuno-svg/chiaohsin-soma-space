import { useState } from "react";
import { ChapterHeading, MagazineShell } from "../../shared/MagazineShell";
import { FurtherReadingModule, LongformModule, SceneryGalleryModule, VideoModule } from "../../shared/modules";
import { MobileSwipeReader, Pager } from "../../shared/reading";
import { spineAssets, spineConfig, spineFurtherLinks, spineLongformPages, spineScenerySlides, spineVideo } from "./data";

type TopicProps = {
  className: string;
  title: string;
  lines: string[];
  src: string;
  alt: string;
};

function Topic({ className, title, lines, src, alt }: TopicProps) {
  return <article className={`spine-topic ${className}`}>
    <div className="spine-topic-copy">
      <h2>{title}</h2>
      <p>{lines.map((line, index) => <span key={line}>{line}{index < lines.length - 1 && <br />}</span>)}</p>
    </div>
    <img src={src} alt={alt} />
  </article>;
}

const developmentPages = [
  { title: "脊椎的曲線如何形成", kind: "formation" },
  { title: "重新回到爬行", kind: "timeline" },
  { title: "在爬行裡發現三個面向", kind: "directions" },
  { title: "觀察你的身體經驗", kind: "reflection" },
] as const;

function DevelopmentPage({ page }: { page: number }) {
  const item = developmentPages[page];
  return <article className={`development-page development-page-${item.kind}`}>
    <header><h3>{item.title}</h3></header>
    {item.kind === "formation" && <div className="development-formation">
      <figure><img src={spineAssets.development} alt="嬰兒爬行線稿" /><figcaption className="development-cue">重力 × 支撐 × 移動</figcaption></figure>
      <div><p>嬰兒出生時，脊椎的曲線和成人並不相同。</p><p>隨著抬頭、支撐、移動，直到逐漸站立與行走，脊椎的曲線也在成長與動作經驗中慢慢發展。</p></div>
    </div>}
    {item.kind === "timeline" && <figure className="development-timeline">
      <img src={spineAssets.developmentStages} alt="從蜷曲躺臥的嬰兒、四足爬行、開始行走的幼兒，到自然直立的成人" />
    </figure>}
    {item.kind === "directions" && <div className="development-directions-wrap">
      <p>爬行的過程中，身體會出現許多不同面向的動作。</p>
      <div className="development-directions">
        <figure><img src={spineAssets.movementWheel} alt="輪胎的手繪動作意象" /><figcaption>輪面</figcaption></figure>
        <figure><img src={spineAssets.movementTable} alt="龍捲風的手繪動作意象" /><figcaption>桌面</figcaption></figure>
        <figure><img src={spineAssets.movementDoor} alt="蜥蜴的手繪動作意象" /><figcaption>門面</figcaption></figure>
      </div>
    </div>}
    {item.kind === "reflection" && <div className="development-reflection">
      <ul>
        <li>指出爬行練習的過程中，什麼時候出現輪面、桌面或門面的動作。</li>
        <li>爬行時，有哪些部位感覺卡卡、緊緊的，或是力量無法連貫？</li>
        <li>在爬行的過程中，你有什麼心理上的感受？</li>
        <li>爬行之後，身體有什麼感覺？和練習之前有什麼不同？</li>
      </ul>
    </div>}
  </article>;
}

function DevelopmentSection() {
  const [page, setPage] = useState(0);
  return <section className="section spine-section spine-development" aria-labelledby="spine-title-02">
    <div className="development-shell">
      <div className="development-fixed">
        <ChapterHeading number="02" title="發展中的脊椎" id="spine-title-02" className="spine-section-heading" />
        <div className="development-copy">
          <p className="spine-kicker">A spine in becoming</p>
          <p>脊椎現在的形態並不是一開始就存在，而是在生命發展與動作經驗中逐漸形成。</p>
          <p>姿勢、重力與移動經驗彼此交織，也持續影響脊椎曲線與動作方式。</p>
        </div>
      </div>
      <div className="development-reader">
        <div className="development-desktop-page"><DevelopmentPage page={page} /></div>
        <MobileSwipeReader className="development-mobile-reader" page={page} total={developmentPages.length} onChange={setPage}>
          {developmentPages.map((_, index) => <div className="mobile-swipe-page" key={index}><DevelopmentPage page={index} /></div>)}
        </MobileSwipeReader>
        <Pager page={page} total={developmentPages.length} onChange={setPage} quiet />
      </div>
    </div>
  </section>;
}

const alignmentViews = ["全身排列", "重心與重量", "緊張與連結", "動態的身體排列"] as const;

function AlignmentSection() {
  const [view, setView] = useState(0);
  return <section className="section spine-section spine-alignment" aria-labelledby="spine-title-04">
    <div className="alignment-header">
      <ChapterHeading number="04" title="脊椎與身體排列" id="spine-title-04" className="spine-section-heading" />
      <nav className="alignment-index" aria-label="身體排列探索主題">
        {alignmentViews.map((label, index) => <button key={label} type="button" aria-pressed={view === index} aria-controls="alignment-visual" onClick={() => setView(index)}>{label}</button>)}
      </nav>
    </div>
    <div className="alignment-stage">
      <div className="alignment-stage-left">
        <div className="alignment-statement"><p>身體排列不是把身體固定在一個「正確姿勢」，</p><strong>而是一個持續感覺、<br />回應與調整的動態過程。</strong></div>
      </div>
      <div className="alignment-stage-right">
        <div id="alignment-visual" className="alignment-view" key={view}>
          {view === 0 && <div className="alignment-default">
            <figure><img src={spineAssets.alignmentAxis} alt="側面站立人體、脊椎骨盆與垂直中軸參考線" /></figure>
            <p>從側面觀察頭部、胸廓、骨盆與雙腳之間的排列關係。</p>
          </div>}
          {view === 1 && <div className="alignment-feature">
            <figure><img src={spineAssets.alignmentWeight} alt="三個側面站姿呈現骨盆位置與重量的變化" /></figure>
            <p className="alignment-feature-caption">重量的位置改變，身體也會重新組織。觀察骨盆改變時，全身如何一起回應。</p>
          </div>}
          {view === 2 && <div className="alignment-feature">
            <figure className="alignment-tension-plate">
              <img src={spineAssets.alignmentTension} alt="下顎、手部與肩頸張力如何牽動身體連結的三組圖像" />
              <figcaption>
                <span>下顎 ↔ 頸部</span>
                <span>手部 ↔ 肩膀</span>
                <span>肩膀 ↔ 脊椎</span>
              </figcaption>
            </figure>
            <p className="alignment-feature-caption">一個地方的緊張，也可能改變其他部位的動作。從局部的變化，觀察動作如何在身體裡彼此牽動。</p>
          </div>}
          {view === 3 && <div className="alignment-practice">
            <h3>肩膀上提找耳朵</h3>
            <div className="alignment-practice-illustrations">
              <figure><img src={spineAssets.alignmentSqueeze} alt="肩膀向上找耳朵的擠壓示意" /><figcaption><strong>擠壓</strong><span>肩膀上提找耳朵，感受上下擠壓。</span></figcaption></figure>
              <figure><img src={spineAssets.alignmentExtend} alt="頭頂與肩膀上下延伸示意" /><figcaption><strong>延伸</strong><span>頭頂向上，肩膀向下延伸。</span></figcaption></figure>
              <figure><img src={spineAssets.alignmentTurn} alt="轉頭與放鬆示意" /><figcaption><strong>轉動與放鬆</strong><span>緩慢轉頭，再放鬆肩頸。</span></figcaption></figure>
            </div>
            <aside className="alignment-practice-close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M9 18h6m-5.3 3h4.6M8.4 15.7C6.9 14.6 6 12.9 6 11a6 6 0 0 1 12 0c0 1.9-.9 3.6-2.4 4.7-.5.4-.8 1-.8 1.6H9.2c0-.6-.3-1.2-.8-1.6Z" /></svg>
              <div><strong>感受一下你的身體</strong><p>感受肩頸張力改變後，身體如何重新找到排列。</p></div>
            </aside>
          </div>}
        </div>
      </div>
    </div>
  </section>;
}

export default function SpineMagazine() {
  return <MagazineShell config={spineConfig}>
    <section className="spine-opening" aria-labelledby="spine-opening-title">
      <div className="spine-map">
        <div className="spine-chapter"><span>01</span><p>重新認識脊椎</p></div>

        <div className="spine-intro">
          <h1 id="spine-opening-title">脊椎，<br />不只是<br />一條骨頭</h1>
          <p>脊椎是身體的重要結構核心，<br />影響我們的姿勢、動作與感知方式。</p>
          <p>透過不同的觀看角度，<br />我們可以更全面地理解脊椎，<br />也重新感受它在身體中的存在。</p>
        </div>

        <figure className="spine-hero">
          <img src={spineAssets.hero} alt="背面人體與清楚可見的完整脊椎" />
        </figure>

        <Topic className="spine-topic-development" title="生理發展" lines={["脊椎的型態如何", "伴隨動作經驗與重力", "在生命歷程中逐漸形成？"]} src={spineAssets.development} alt="嬰兒爬行線稿" />
        <Topic className="spine-topic-perception" title="意象與感知" lines={["我們如何想像脊椎，", "會影響我們如何感覺它、", "移動它，以及脊椎動作", "呈現出的品質。"]} src={spineAssets.perception} alt="背面人體與脊椎感知線稿" />
        <Topic className="spine-topic-anatomy" title="解剖結構" lines={["不同區域的椎骨與關節構造，", "讓脊椎具有不同的動作方向", "與可能性。"]} src={spineAssets.anatomy} alt="椎骨與關節構造線稿" />
        <Topic className="spine-topic-alignment" title="身體排列" lines={["脊椎如何與全身的重量、", "重心、緊張與支撐彼此影響？", "我們又如何透過意象與動作，", "找到更穩定且輕鬆的排列？"]} src={spineAssets.alignment} alt="側面人體排列線稿" />

        <svg className="spine-connections" viewBox="0 0 1320 1030" preserveAspectRatio="none" aria-hidden="true">
          <path className="line-development" d="M500 265 C565 287 610 318 655 335" />
          <path className="line-perception" d="M920 265 C840 288 745 382 655 420" />
          <path className="line-anatomy" d="M430 722 C505 668 580 612 658 585" />
          <path className="line-alignment" d="M915 740 C830 735 744 709 660 700" />
          <circle className="node-development" cx="655" cy="335" r="10" />
          <circle className="node-perception" cx="655" cy="420" r="10" />
          <circle className="node-anatomy" cx="658" cy="585" r="10" />
          <circle className="node-alignment" cx="660" cy="700" r="10" />
        </svg>
      </div>

      <footer className="spine-closing">
        <div className="spine-closing-copy">
          <p>從不同的面向認識脊椎，<br />是為了回到自己的身體，<br className="mobile-break" />發展更自在、更有支撐的身體使用方式。</p>
          <span aria-hidden="true" />
          <p>本課程以身體經驗為核心，<br className="mobile-break" />透過意象、生理發展、解剖結構與動作探索，<br />逐步將覺察延伸到日常生活中的身體使用。</p>
        </div>
        <p className="living-spine">A<br />Living<br />Spine</p>
      </footer>
    </section>

    <DevelopmentSection />

    <section className="section spine-section spine-moving" aria-labelledby="spine-title-03">
      <ChapterHeading number="03" title="會動的脊椎" id="spine-title-03" className="spine-section-heading" />
      <div className="moving-composition">
        <figure className="moving-spine-plate"><img src={spineAssets.fullSpine} alt="完整脊椎由椎骨與關節串連的解剖圖" /></figure>
        <div className="moving-copy"><p className="spine-kicker">The moving spine</p><p>脊椎不是一整條僵硬的柱子，而是由許多椎骨與關節共同形成的可動結構。</p><p>不同區域的椎骨形態、關節面方向與結構關係，會帶來不同的動作可能。</p></div>
        <div className="movement-exploration">
          <span>EXPERIENTIAL ANATOMY</span><strong>從動作中感受脊椎</strong>
          <div className="movement-exploration-images">
            <figure><div className="movement-image"><img src={spineAssets.movementNod} alt="點頭動作意象" /></div><figcaption>點頭</figcaption></figure>
            <figure><div className="movement-image"><img src={spineAssets.movementShake} alt="搖頭動作意象" /></div><figcaption>搖頭</figcaption></figure>
            <figure><div className="movement-image"><img src={spineAssets.movementRoll} alt="滾動脊椎動作意象" /></div><figcaption>滾動脊椎</figcaption></figure>
          </div>
        </div>
      </div>
    </section>

    <AlignmentSection />

    <VideoModule number="05" heading="觀看身體如何發展動作" id="spine-title-05" video={spineVideo} />
    <LongformModule number="06" heading="深度閱讀" id="spine-title-06" pages={spineLongformPages} placeholder />
    <SceneryGalleryModule number="07" heading="練習風景" id="spine-title-07" slides={spineScenerySlides} />
    <FurtherReadingModule title="延伸閱讀" id="spine-further-title" items={spineFurtherLinks} returnTarget={spineConfig.returnTarget} />
  </MagazineShell>;
}
