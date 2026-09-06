import type { CourseMagazineConfig, FurtherReadingItem, LongformPage, ScenerySlide, VideoData } from "../../shared/types";

export const myofascialConfig: CourseMagazineConfig = {
  slug: "myofascial-awareness",
  title: "肌膜覺察與動作探索",
  returnTarget: "/#/somatic-awareness?section=course-list",
  source: "src/courses/myofascial/MyofascialMagazine.tsx",
  entry: "myofascial-magazine/index.html",
  theme: {
    paper: "#fff",
    ink: "#252532",
    accent: "#654c8d",
    accentMid: "#8068aa",
    accentSoft: "#b8aad1",
    accentSurface: "#f2eef8",
    line: "#ded6eb",
    muted: "#6e6b75",
  },
};

export const myofascialVideo: VideoData = {
  provider: "youtube",
  videoId: "aqz-KE-bpKQ",
  title: "影片 Placeholder",
  placeholder: true,
};

export const myofascialArticlePages: LongformPage[] = [
  { intro: true, label: "PLACEHOLDER／示範文字", title: "［文章標題 Placeholder］", placeholder: true, paragraphs: ["［短導言 Placeholder］這裡是用來確認文章第一頁的標題、導言與正文比例，以及長文開始時的閱讀節奏。", "［正文 Placeholder］這是一段示範文字，只用於測試數位雜誌中的長篇閱讀版型。正式內容將由內容編輯者另行決定，並依文章內在段落人工安排分頁。", "［正文 Placeholder］每一頁可以有不同長度，頁面高度會跟隨內容自然增加，不會依字數、字元數或固定高度自動切開。"] },
  { label: "PLACEHOLDER／文章續頁", placeholder: true, paragraphs: ["［Page 2 Placeholder］這是文章第二頁的示範正文。翻到後續頁面時，不再重複完整的大標題，讓閱讀像延續同一篇文章，而不是進入另一張簡報。", "［正文 Placeholder］此處測試較安靜的文字密度、行距與段落間距。未來內容較長或較短，都可以作為獨立頁面由編輯者安排。", "［正文 Placeholder］頁面保留充分留白，但正文欄寬不會橫跨整個螢幕，以維持長時間閱讀的舒適感。"] },
  { label: "PLACEHOLDER／文章續頁", placeholder: true, paragraphs: ["［Page 3 Placeholder］這是文章第三頁的示範正文，用來確認文章收尾時的排版與翻回上一頁的操作。", "［正文 Placeholder］這裡不放正式肌膜知識，也不預先替文章決定結論。當真正的文章內容完成後，將以人工編輯過的 Page 1、Page 2、Page 3 取代這些示範文字。"] },
];

export const myofascialScenerySlides: ScenerySlide[] = [
  { alt: "精選照片 Placeholder 01", label: "精選照片 Placeholder 01", note: "正式上課照片確認後替換", placeholder: true },
  { alt: "精選照片 Placeholder 02", label: "精選照片 Placeholder 02", note: "正式上課照片確認後替換", placeholder: true },
  { alt: "精選照片 Placeholder 03", label: "精選照片 Placeholder 03", note: "正式上課照片確認後替換", placeholder: true },
];

export const myofascialFurtherLinks: FurtherReadingItem[] = [
  { type: "文章", title: "示範文章標題", url: "#", order: 1 },
  { type: "影片", title: "示範影片標題", url: "#", order: 2 },
  { type: "課程", title: "示範相關主題", url: "#", order: 3 },
];
