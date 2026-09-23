import { useState } from "react";
import { ChapterHeading } from "./MagazineShell";
import { MobileSwipeReader, Pager, clampPage } from "./reading";
import type { FurtherReadingItem, LongformPage, ScenerySlide, VideoData } from "./types";

export function VideoModule({ number, heading, id, video }: { number: string; heading: string; id: string; video: VideoData }) {
  const src = video.url || (video.videoId ? `https://www.youtube-nocookie.com/embed/${video.videoId}` : "");
  return <section className="section section-05" aria-labelledby={id}>
    <ChapterHeading number={number} title={heading} id={id} />
    {(video.leadTitle || video.leadText) && <div className="video-intro">{video.leadTitle && <strong>{video.leadTitle}</strong>}{video.leadText && <p>{video.leadText}</p>}</div>}
    <div className="video-wrap">{src
      ? <iframe src={src} title={video.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
      : <div className="video-placeholder" role="img" aria-label={video.title}><span>VIDEO</span><p>{video.title}</p></div>}
    </div>
    {(video.caption || video.description) && <div className="video-caption">{video.caption && <p>{video.caption}</p>}{video.description && <p>{video.description}</p>}</div>}
  </section>;
}

function LongformPageContent({ page, continuationLabel }: { page: LongformPage; continuationLabel: string }) {
  return <>
    {page.intro && <><p className="placeholder-chip">{page.label}</p>{page.title && <h3>{page.title}</h3>}</>}
    {!page.intro && <p className="continuation">{page.label || continuationLabel}</p>}
    {page.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
  </>;
}

export function LongformModule({ number, heading, id, pages, placeholder = false }: { number: string; heading: string; id: string; pages: LongformPage[]; placeholder?: boolean }) {
  const [page, setPage] = useState(0);
  const current = pages[page];
  return <section className="section section-06" aria-labelledby={id}>
    <div className="article-shell">
      <header><p className="section-number">{number}</p><h2 id={id}>{heading}</h2></header>
      <article className="longform desktop-longform" key={page}><LongformPageContent page={current} continuationLabel={placeholder ? "PLACEHOLDER／文章續頁" : "文章續頁"} /></article>
      <MobileSwipeReader className="mobile-article-reader" page={page} total={pages.length} onChange={setPage}>
        {pages.map((item, index) => <article className="longform mobile-swipe-page" key={index}><LongformPageContent page={item} continuationLabel={placeholder ? "PLACEHOLDER／文章續頁" : "文章續頁"} /></article>)}
      </MobileSwipeReader>
      <Pager page={page} total={pages.length} onChange={setPage} quiet />
    </div>
  </section>;
}

export function SceneryGalleryModule({ number, heading, id, slides }: { number: string; heading: string; id: string; slides: ScenerySlide[] }) {
  const [page, setPage] = useState(0);
  return <section className="section section-07" aria-labelledby={id}>
    <ChapterHeading number={number} title={heading} id={id} />
    <div className="scenery-reader">
      <MobileSwipeReader className="scenery-viewport" page={page} total={slides.length} onChange={setPage}>
        {slides.map((slide, index) => <figure className="scenery-slide mobile-swipe-page" key={`${slide.alt}-${index}`} aria-hidden={index !== page}>
          {slide.placeholder || !slide.src
            ? <div className="scenery-placeholder" role="img" aria-label={slide.alt} style={slide.aspectRatio ? { aspectRatio: slide.aspectRatio } : undefined}><span>{String(index + 1).padStart(2, "0")}</span><p>{slide.label}</p><small>{slide.note}</small></div>
            : <><img src={slide.src} alt={slide.alt} style={slide.aspectRatio ? { aspectRatio: slide.aspectRatio } : undefined} />{(slide.caption || slide.credit) && <figcaption>{slide.caption}{slide.credit && <small>{slide.credit}</small>}</figcaption>}</>}
        </figure>)}
      </MobileSwipeReader>
      <button className="scenery-arrow scenery-prev" type="button" onClick={() => setPage(value => clampPage(value - 1, slides.length))} disabled={page === 0} aria-label="上一張照片">←</button>
      <button className="scenery-arrow scenery-next" type="button" onClick={() => setPage(value => clampPage(value + 1, slides.length))} disabled={page === slides.length - 1} aria-label="下一張照片">→</button>
      <nav className="scenery-dots" aria-label="練習風景照片選擇">{slides.map((slide, index) => <button type="button" className={index === page ? "active" : ""} aria-label={`查看第 ${index + 1} 張照片`} aria-current={index === page ? "true" : undefined} onClick={() => setPage(index)} key={`${slide.alt}-${index}`} />)}</nav>
    </div>
  </section>;
}

export function FurtherReadingModule({ title, id, items, returnTarget }: { title: string; id: string; items: FurtherReadingItem[]; returnTarget: string }) {
  const sortedItems = [...items].sort((a, b) => a.order - b.order);
  return <section className="section magazine-back-cover" aria-labelledby={id}>
    <div className="further"><h2 id={id}>{title}</h2><div className="further-list">{sortedItems.map(item => <a href={item.url} onClick={item.url === "#" ? event => event.preventDefault() : undefined} key={`${item.order}-${item.url}`}><span className="further-copy"><small>{item.type}</small><strong>{item.title}</strong></span><span className="further-arrow" aria-hidden="true">→</span></a>)}</div></div>
    <a className="ending-return" href={returnTarget} target="_top">← 返回課程列表</a>
  </section>;
}
