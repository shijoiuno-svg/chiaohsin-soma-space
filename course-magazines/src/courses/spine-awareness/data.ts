import type { CourseMagazineConfig, FurtherReadingItem, LongformPage, ScenerySlide, VideoData } from "../../shared/types";

export const spineConfig: CourseMagazineConfig = {
  slug: "spine-awareness",
  title: "脊椎感知與身體排列",
  returnTarget: "/#/somatic-awareness?section=course-list",
  source: "src/courses/spine-awareness/SpineMagazine.tsx",
  entry: "spine-magazine/index.html",
  theme: {
    paper: "#fff",
    ink: "#30302d",
    accent: "#796b4d",
    accentMid: "#8b765e",
    accentSoft: "#c7bca8",
    accentSurface: "#f0ebe1",
    line: "#d9d2c6",
    muted: "#716e68",
  },
};

export const spineVideo: VideoData = {
  provider: "youtube",
  videoId: "D9Ko7U1pLlg",
  title: "Rolling — Feldenkrais with Baby Liv",
  leadTitle: "看看一個動作如何慢慢發生。",
  leadText: "留意身體不同部位之間細膩的連結與變化。",
  caption: "Rolling — Feldenkrais with Baby Liv",
};

export const spineLongformPages: LongformPage[] = [
  { intro: true, label: "PLACEHOLDER／內容整理中", title: "深度閱讀內容整理中", placeholder: true, paragraphs: ["此處將收錄與脊椎感知、動作經驗及身體排列相關的延伸文章。", "目前文字僅用於確認閱讀欄寬、段落節奏與翻頁功能。"] },
  { label: "PLACEHOLDER／文章續頁", placeholder: true, paragraphs: ["深度閱讀內容整理中。", "正式內容將於後續編輯階段加入。"] },
];

export const spineScenerySlides: ScenerySlide[] = [
  { alt: "脊椎課程練習風景 Placeholder 01", label: "練習風景 Placeholder 01", note: "正式課堂照片確認後替換", aspectRatio: "3 / 2", placeholder: true },
  { alt: "脊椎課程練習風景 Placeholder 02", label: "練習風景 Placeholder 02", note: "正式課堂照片確認後替換", aspectRatio: "3 / 2", placeholder: true },
  { alt: "脊椎課程練習風景 Placeholder 03", label: "練習風景 Placeholder 03", note: "正式課堂照片確認後替換", aspectRatio: "3 / 2", placeholder: true },
];

export const spineFurtherLinks: FurtherReadingItem[] = [
  { type: "文章", title: "延伸文章 Placeholder", url: "#", order: 1 },
  { type: "影片", title: "延伸影片 Placeholder", url: "#", order: 2 },
  { type: "課程", title: "相關課程 Placeholder", url: "#", order: 3 },
];

export const spineAssets = {
  hero: "./media/spine-back-hero.png",
  development: "./media/physiological-development-baby.png",
  perception: "./media/imagery-perception-back-body.png",
  anatomy: "./media/anatomy-vertebrae.png",
  alignment: "./media/body-alignment-side-lineart.png",
  developmentStages: "./media/development-four-stages.png",
  movementWheel: "./media/movement-wheel-tire.png",
  movementTable: "./media/movement-table-tornado.png",
  movementDoor: "./media/movement-door-lizard.png",
  fullSpine: "./media/full-spine-anatomy.png",
  movementNod: "./media/movement-nod.png",
  movementShake: "./media/movement-shake-transparent.png",
  movementRoll: "./media/movement-roll-spine.png",
  alignmentWeight: "./media/alignment-weight-three-positions.png",
  alignmentTension: "./media/alignment-tension-connections.png",
  alignmentAxis: "./media/alignment-side-axis-transparent.png",
  alignmentSqueeze: "./media/alignment-practice-squeeze.png",
  alignmentExtend: "./media/alignment-practice-extend.png",
  alignmentTurn: "./media/alignment-practice-turn-transparent.png",
};
