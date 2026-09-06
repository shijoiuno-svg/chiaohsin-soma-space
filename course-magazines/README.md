# Course Magazine source

可持續維護的課程雜誌原始碼與共用閱讀元件。

## Build

在本目錄執行（需要可用的 Node.js 18+ 與 pnpm）：

```sh
pnpm install
pnpm build:myofascial
```

肌膜輸出位置為網站根目錄的 `myofascial-magazine/`，仍由完整網站既有 iframe route 載入。

## 建立下一門課

1. 在 `src/courses/<course-slug>/` 建立課程資料、頁面與課程專屬 CSS。
2. 從 `src/shared/` 使用 Magazine Shell、Pager、MobileSwipeReader、影片、深度閱讀、照片瀏覽與延伸閱讀模組。
3. 在 `scripts/build.mjs` 登記 entry 與 output。
4. 01–04 不使用固定章節模板；依課程內容自行編排，只共用基礎 section／chapter heading 能力。
