+++
title = "我是如何使用 AI (Codex) 打造這個 Hugo 部落格的"
date = 2025-06-08
tags = [ "AI"]
description = "一篇實戰紀錄，分享我如何利用 AI 程式助理 Codex (整合於 ChatGPT) 從零到一開發這個 Hugo 靜態網站，從前端互動功能到後端自動化部署的完整過程。"
prev_post_slug = "1codex-intro"
next_post_slug = "3hugo-blob-template-intro"
+++

在上一篇文章 [《第一次認識 Codex：讓 AI 幫你寫程式不是夢！》](/ChiYu-Blob/posts/codex-intro/) 中，我介紹了 Codex 這個強大的 AI 程式助理。而今天，我想分享一個更具體的實戰經驗：我是如何利用 Codex 來開發**你現在正在看的這個部落格**。

這個網站是使用 [Hugo](https://gohugo.io/) 靜態網站產生器搭建的，並搭配 [Tailwind CSS](https://tailwindcss.com/) 進行樣式設計。從前端的 JavaScript 互動功能，到後端的 GitHub Actions 自動化部署，許多環節都有 AI 的深度參與。接下來，我會分享幾個關鍵功能的開發過程，以及我是如何「詠唱」我的需求，讓 AI 幫我完成任務的。

## 1. 前端互動功能：讓網站活起來的 JavaScript

靜態網站很容易變得單調，但透過 JavaScript，我們可以加入許多動態的現代化功能。這也是我認為 Codex 最能大顯身手的地方。

### 深色/淺色主題切換

這是現代網站的標配功能。我需要一個按鈕，它能：
1.  切換 `<html>` 標籤上的 `data-theme` 屬性 (在 `light` 與 `dark` 之間)。
2.  將用戶的偏好儲存在瀏覽器的 `localStorage` 中，以便下次造訪時維持設定。
3.  當主題變更時，通知 Giscus 留言區一起變更主題。

我的提問大致如下：
> 「幫我寫一段 JavaScript。當使用者點擊 ID 為 `theme-toggle` 的按鈕時，在 `<html>` 元素上切換 `data-theme` 屬性，值為 'light' 或 'dark'。將這個設定存到 localStorage。頁面載入時，優先從 localStorage 讀取設定。最後，當主題改變時，發送一個 postMessage 給 class 為 `giscus-frame` 的 iframe，內容為 `{ giscus: { setTheme: newTheme } }`。」

Codex 很快就生成了 `layouts/_default/baseof.html` 中的核心邏!

### 文章月曆與發布熱圖
我想在側邊欄放一個月曆，並標示出當天有發布文章的日期，讓訪客能快速找到特定日期的文章。

這個功能比較複雜，我將需求拆解開來：
1.  首先，在 Hugo 模板中，遍歷所有文章，將「日期」與「文章連結」建成一個 JavaScript 物件。
2.  接著，我需要一個函式來渲染指定年月的月曆 UI。
3.  該函式在渲染日期時，會檢查該日期是否存在於步驟 1 的物件中。如果存在，就將其渲染成一個可點擊的連結。

我的提問像是：
> 「用 JavaScript 寫一個文章月曆。我會從 Hugo 傳入一個像 `{'2025-6-8': '/post/link/', ...}` 的物件。請建立一個函式 `renderCalendar(year, month)`，它能產生月曆的 HTML。如果某個日期存在於資料物件中，請將它變成一個 `<a>` 連結，否則顯示為一般文字。同時提供『上個月』與『下個月』的按鈕。」

最終的成果就是您在側邊欄看到的月曆 (`layouts/partials/calendar.html` )。

### 程式碼區塊的「一鍵複製」按鈕
為了方便讀者複製文章中的程式碼，我希望每個程式碼區塊右上角都有一個複製按鈕。

我的提問很直接：
> 「使用 JavaScript，為網頁中所有 class 為 `div.highlight` 的元素，動態新增一個『複製』按鈕。當點擊這個按鈕時，會將該元素內部的 `<code>` 標籤裡的文字複製到剪貼簿，並將按鈕文字短暫地變為『已複製！』。」

這個小而實用的功能，AI 幾乎一次就給出了完美的程式碼。

## 2. Hugo 模板語法的好幫手

Hugo 使用的是 Go Template 語法，有時候語法規則並不是那麼直觀。例如，當我想在文章頁面顯示標籤時，我需要遍歷 `.Params.tags` 陣列，並為每個標籤產生連結。

我可以直接問：
> 「在 Hugo 模板中，如何遍歷一篇文章的所有 tags，並為每個 tag 產生一個連結到 `/tags/TAG_NAME/` 的 `<a>` 標籤？」

AI 給出的 `{{ range .Params.tags }}` 迴圈寫法，正是我所需要的，我將其應用在了 `layouts/partials/content-body.html` 中。

## 3. 自動化部署流程 (GitHub Actions)

最後，我希望每次將程式碼推送到 GitHub 的 `main` 分支時，網站都能自動建置並部署到 GitHub Pages。這需要撰寫一個 `.github/workflows/gh-pages.yml` 檔案。

雖然我對 GitHub Actions 有基本了解，但具體的 Action 名稱、參數等細節很容易忘記。

我的提問是：
> 「請幫我寫一個 GitHub Actions workflow。當 push 到 main 分支時觸發。它需要：
> 1.  Checkout 專案原始碼。
> 2.  使用 `peaceiris/actions-hugo` action 安裝 Hugo extended 版本。
> 3.  執行 `hugo --minify --gc --baseURL "/ChiYu-Blob/"` 指令建置網站。
> 4.  使用 `npx pagefind` 為網站建立搜尋索引。
> 5.  最後，使用 `peaceiris/actions-gh-pages` action 將 `public` 資料夾的內容部署到 `gh-pages` 分支。」

AI 不僅給出了完整的 YAML 檔案，還包含了每個步驟的註解，讓我能快速理解並進行微調。

## 結論

從這個專案的經驗來看，Codex 這類 AI 工具已經不僅僅是個玩具。它在以下幾個方面給了我巨大的幫助：
-   **解決陌生領域的問題**：對於不熟悉的 JavaScript API (如 IntersectionObserver) 或 YAML 語法，AI 能快速給出可行的解決方案。
-   **處理樣板程式碼**：許多重複性高、邏輯固定的功能 (如複製按鈕、主題切換)，交給 AI 處理可以節省大量時間。
-   **提供靈感與可能性**：有時候我只有一個模糊的想法 (例如文章月曆)，透過與 AI 的對話和迭代，能幫助我將想法具象化。

當然，AI 生成的程式碼並非總是完美，我們仍需要具備審閱、除錯與修改的能力。但它無疑是一位能力超群、24 小時待命的程式助理，讓開發過程變得前所未有的高效與有趣。如果你還沒試過，強烈推薦你在下一個專案中引入 AI 來協助你！
