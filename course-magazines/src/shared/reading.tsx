import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";

export const clampPage = (page: number, total: number) => Math.max(0, Math.min(total - 1, page));

export function Pager({ page, total, onChange, quiet = false }: { page: number; total: number; onChange: (n: number) => void; quiet?: boolean }) {
  return <nav className={`pager ${quiet ? "pager-quiet" : ""}`} aria-label="翻頁控制">
    <button onClick={() => onChange(clampPage(page - 1, total))} disabled={page === 0} aria-label="上一頁">←</button>
    <span>{page + 1} / {total}</span>
    <button onClick={() => onChange(clampPage(page + 1, total))} disabled={page === total - 1} aria-label="下一頁">→</button>
  </nav>;
}

export function MobileSwipeReader({ page, total, onChange, className, children }: { page: number; total: number; onChange: (n: number) => void; className: string; children: ReactNode }) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ x: number; y: number; axis: "x" | "y" | null } | null>(null);
  const dragRef = useRef(0);
  const [drag, setDrag] = useState(0);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;
    const measure = () => {
      setWidth(viewport.clientWidth);
      if (window.innerWidth > 760) { setHeight(0); return; }
      const pages = viewport.querySelectorAll<HTMLElement>(".mobile-swipe-page");
      setHeight(pages[page]?.scrollHeight || 0);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    viewport.querySelectorAll(".mobile-swipe-page").forEach(item => observer.observe(item));
    return () => observer.disconnect();
  }, [page]);

  const handlers = {
    onPointerDown: (event: ReactPointerEvent<HTMLElement>) => {
      if (window.innerWidth > 760) return;
      gesture.current = { x: event.clientX, y: event.clientY, axis: null };
      event.currentTarget.setPointerCapture(event.pointerId);
    },
    onPointerMove: (event: ReactPointerEvent<HTMLElement>) => {
      const current = gesture.current;
      if (!current) return;
      const dx = event.clientX - current.x;
      const dy = event.clientY - current.y;
      if (!current.axis && Math.max(Math.abs(dx), Math.abs(dy)) > 7) current.axis = Math.abs(dx) > Math.abs(dy) * 1.2 ? "x" : "y";
      if (current.axis === "x") {
        event.preventDefault();
        const atEdge = (page === 0 && dx > 0) || (page === total - 1 && dx < 0);
        const nextDrag = atEdge ? dx * .28 : dx;
        dragRef.current = nextDrag;
        setDrag(nextDrag);
      }
    },
    onPointerUp: () => {
      if (gesture.current?.axis === "x" && Math.abs(dragRef.current) > Math.min(90, (width || 1) * .14)) {
        onChange(clampPage(page + (dragRef.current < 0 ? 1 : -1), total));
      }
      dragRef.current = 0;
      setDrag(0);
      gesture.current = null;
    },
    onPointerCancel: () => { dragRef.current = 0; setDrag(0); gesture.current = null; },
  };

  return <div className={`${className} mobile-swipe-viewport`} ref={viewportRef} {...handlers} style={{ height: height || undefined }}>
    <div className={`mobile-swipe-track ${drag ? "is-dragging" : ""}`} style={{ transform: `translate3d(${-page * width + drag}px,0,0)` }}>{children}</div>
  </div>;
}
