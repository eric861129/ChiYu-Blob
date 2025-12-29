+++
title = "Day 21: 【前端 #2】從原型到架構：拆解並整合 AI 生成的 UI 程式碼"
date = 2025-09-09
slug = "2025iThomeIronmanDay21"
dates = ["2025-09-09"]
tags = ["2025iThomeIronman", "Gemini", "Frontend", "Refactoring", "Clean Code"]
series = ["2025iThomeIronman"]
categories = ["前端開發"]
weight = 21
prev_post_slug = "2025iThomeIronmanDay20"
next_post_slug = "2025iThomeIronmanDay22"
draft = false
description = "今天我們將扮演「結構工程師」，將昨天生成的 UI 原型進行專業級的「大改造」，落實關注點分離原則。"
+++

安安，我是 ChiYu！

昨天那場「視覺魔法秀」是不是超震撼的？才幾分鐘，AI 就「咻」一下變出一個又美又能動的 UI 原型，真的太扯了！這證明 AI 拿來做 prototype 根本是開外掛啊。

不過，身為一個有格調的工程師，光是「能動」怎麼夠呢？今天，我們就要來當個「結構工程師」，幫這棟魔法變出來的漂亮房子，來個專業級的 **「大改造 (Refactoring)」**！

## Part 1：心法時間：為什麼高手絕對不把 CSS 跟 JS 塞在同一個 HTML 檔？

昨天 AI 給我們的那個檔案，HTML、CSS、JavaScript 全都擠在一起。拿來看看樣子當然很方便，但在真專案裡，這樣搞可是超級大忌喔！為什麼？這背後藏著三個高手才知道的心法：

1. **各管各的 (Separation of Concerns)**：這點最重要！HTML 是骨架、CSS 是外表、JS 是肌肉，大家各有各的工作。把它們全混在一起，就像把廚房、臥室、客廳的功能全塞到一個房間裡，保證亂到你媽都認不出來，以後要修根本是惡夢！
2. **讓瀏覽器偷懶 (Browser Caching)**：你想想，你把 CSS 跟 JS 分開成獨立檔案後，瀏覽器第一次看完，就可以把它們存起來。下次你再逛同個網站的其他頁面，因為 `style.css` 跟 `script.js` 沒變，瀏覽器就不用再下載一次，直接拿舊的來用就好，這樣網站跑起來才會飛快啊！
3. **大家好做事 (Maintainability & Collaboration)**：專案一搞大，肯定不止你一個人寫。把檔案分開，管畫面的同事就專心搞 `.css`，管功能的就專心搞 `.js`，大家井水不犯河水，才不會打架，做事效率才會高嘛！

所以啦，我們的目標很簡單，就是把昨天那個漂亮的「藝術品」，改造成一個真正可以用在專案上、結構超清楚的「工業級產品」！

## Part 2：開工啦：來唸個「一鍵改造」的超級咒語

這個精細的「分家手術」，我們不用慢慢來。我們要用一個更猛的 Prompt，直接叫 AI 「一次搞定」！

### Step 1: 把昨天變出來的魔法成果搬進來

首先，當然是把昨天的成果，正式放到我們的專案裡。

1. **建立前端基地**：在 VS Code 的專案根目錄，建立一個叫 `frontend` 的新資料夾。
2. **儲存原型**：把昨天從 Canvas 下載或複製的完整程式碼，在 `frontend` 資料夾裡存成 `prototype.html`。

OK！現在我們有了一個可以動手術的「原型」了。

### Step 2: Vibe Coding - 使喚我們的 AI 結構工程師

讓我們進入 gemini chat 模式，詠唱我們今天唯一的、也是最強大的「超級咒語」！

### 【魔法詠唱：一鍵重構】

```markdown
# 角色 (Role)

你是一位頂尖的前端架構師與重構專家，以其對「關注點分離 (Separation of Concerns)」原則的深刻理解與嚴謹實踐而聞名。你擅長將混亂的原型程式碼， methodical 地重構成清晰、可擴展、且易於維護的專業級專案。

# 目標 (Objective)

你的核心任務是執行一次完整的前端專案結構重構。你需要將一個單體的 `prototype.html` 檔案，徹底分解為一個遵循行業最佳實踐的、由 `index.html`, `style.css`, `script.js` 三個職責分離的檔案組成的專案結構。

# 上下文與關鍵資訊 (Context & Key Information)

  * **重構源檔案**: `@frontend/prototype.html` (這是一個包含內聯 CSS 和 JavaScript 的單體 HTML 檔案)。
  * **核心重構原則**: **關注點分離 (Separation of Concerns)**。重構後的結果必須確保：
      * HTML (`index.html`) 只負責 **結構 (Structure)**。
      * CSS (`style.css`) 只負責 **表現 (Presentation)**。
      * JavaScript (`script.js`) 只負責 **行為 (Behavior)**。
  * **目標檔案結構**:
    ```
    frontend/
    ├── index.html     <-- (新的結構檔案)
    ├── style.css      <-- (新的樣式檔案)
    └── script.js      <-- (新的腳本檔案)
    ```

# 產出格式與要求 (Output Format & Requirements)

請一步到位，生成一個包含以下三個新檔案完整內容的回應。請使用清晰的檔案標頭（例如 `--- index.html ---`）來分隔每個檔案的程式碼。

### 1. 新的 `index.html` (結構)

  * **基礎結構**: 使用標準的 HTML5 樣板。
  * **<head> 內容**:
      * 遷移 `prototype.html` 中的 `<title>` 和所有外部資源 `<link>` (例如 Google Fonts)。
      * **移除** `prototype.html` 中原有的內聯 `<style>` 標籤。
      * 新增 `<link rel="stylesheet" href="style.css">` 來引用新的樣式表。
  * **<body> 內容**:
      * 將 `prototype.html` 的 `<body>` 標籤**內部所有**的 HTML 結構，完整地複製過來。
      * **移除** `prototype.html` 中原有的內聯 `<script>` 標籤。
  * **腳本引用**:
      * 在 `</body>` 結束標籤的**正上方**，新增 `<script src="script.js" defer></script>`。
      * *(最佳實踐說明：使用 `defer` 屬性可以確保 HTML 解析完畢後再執行腳本，是現代前端開發的首選方式。)*

### 2. 新的 `style.css` (表現)

  * **內容來源**: 讀取 `prototype.html`，將 `<style>` 標籤**內部所有**的 CSS 規則，完整、無修改地複製到此檔案中。
  * **純粹性**: 此檔案應只包含純粹的 CSS 程式碼，不應包含 `<style>` 標籤本身。

### 3. 新的 `script.js` (行為)

  * **內容來源**: 讀取 `prototype.html`，將 `<script>` 標籤**內部所有**的 JavaScript 程式碼，完整、無修改地複製到此檔案中。
  * **純粹性**: 此檔案應只包含純粹的 JavaScript 程式碼，不應包含 `<script>` 標籤本身。
  * *(最佳實踐說明：由於腳本使用了 `defer`，如果原始程式碼依賴 DOM，它應該已經可以正常工作。若需更強的保證，可將程式碼包裹在 `document.addEventListener('DOMContentLoaded', () => { ... });` 中。)*

# 限制與風格 (Constraints & Style)

  * **功能不變**: 重構後的專案，其外觀和功能必須與原始的 `prototype.html` 完全一致。
  * **徹底分離**: 最終的 `index.html` 中不應再包含任何內聯的 `<style>` 或 `<script>` 程式碼塊。
  * **一步到位**: 請在單一回應中，提供所有三個檔案的最終內容。
```

## Part 3：來看看成果：專業結構，一樣漂亮！

是時候來驗收我們的工程啦！

1. **刪除原型**：為了保持專案乾淨，現在可以把 `frontend/prototype.html` 這個暫存檔給刪了。
2. **啟動 Live Server**：在重構後的 `frontend/index.html` 檔案上按右鍵，選擇「Open with Live Server」。

你會嚇一跳，用瀏覽器打開一看，畫面跟功能，居然跟昨天那個一模一樣，完美！

但我們的專案骨子裡，已經脫胎換骨了！不再是那個亂七八糟的「大雜燴」，而是超專業的「三房兩廳」格局：

- `index.html`：只管內容跟結構 (骨骼)。
- `style.css`：只管長相跟風格 (皮囊)。
- `script.js`：只管互動跟功能 (肌肉)。

## Part 4：把我們的智慧結晶存檔！

- **Commit 訊息**: `refactor(frontend): Separate HTML, CSS, and JS from prototype`
- **Commit & Push**！

## 結語：AI 的速度 x 工程師的結構 = 無敵啦！

再次恭喜啦！今天我們做了一件超有價值的事。這完美秀了一手現代 AI 開發的最佳玩法：

1. **第一步 (腦洞大開)**：用 Canvas 這種視覺化工具，光速做出原型，看看點子行不行。
2. **第二步 (專業施工)**：用 Gemini CLI 這種終端機工具，把原型改造成專業的架構，這樣專案才能活得長長久久。

我們把 AI 的「超速度」跟工程師的「好結構」結合，簡直無敵了！

現在，我們手上有了一個又美、功能又齊全、結構又清楚的前端專案。明天開始，就要基於這個超棒的架構，開始真正的功能開發跟前後端整合啦！第一站：深入了解並優化我們的 JavaScript 互動 logic！
