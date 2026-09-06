import { useEffect, type CSSProperties, type ReactNode } from "react";
import type { CourseMagazineConfig } from "./types";

type ThemeStyle = CSSProperties & Record<`--${string}`, string>;

export function ReturnToCourseList({ target, className }: { target: string; className: string }) {
  return <a className={className} href={target} target="_top">← 返回課程列表</a>;
}

export function MagazineShell({ config, children }: { config: CourseMagazineConfig; children: ReactNode }) {
  useEffect(() => {
    document.documentElement.dataset.ready = "true";
    document.title = `${config.title}｜喬馨身體空間`;
  }, [config.title]);

  const theme: ThemeStyle = {
    "--paper": config.theme.paper,
    "--ink": config.theme.ink,
    "--purple": config.theme.accent,
    "--purple-mid": config.theme.accentMid,
    "--purple-soft": config.theme.accentSoft,
    "--lavender": config.theme.accentSurface,
    "--line": config.theme.line,
    "--muted": config.theme.muted,
  };

  return <>
    <ReturnToCourseList className="floating-return" target={config.returnTarget} />
    <main className="magazine" data-course-magazine={config.slug} style={theme}>{children}</main>
  </>;
}

export function ChapterHeading({ number, title, id, className = "section-heading compact" }: { number: string; title: string; id: string; className?: string }) {
  return <div className={className}><p className="section-number">{number}</p><h2 id={id}>{title}</h2></div>;
}
