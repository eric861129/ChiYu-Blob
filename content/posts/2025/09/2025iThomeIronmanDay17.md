+++
title = "Day 17: 【前端 #0】前端世界的基石： HTML, CSS 與 JavaScript"
date = 2025-09-05
slug = "2025iThomeIronmanDay17"
dates = ["2025-09-05"]
tags = ["2025iThomeIronman", "Frontend", "HTML", "CSS", "JavaScript"]
series = ["2025iThomeIronman"]
categories = ["前端開發"]
weight = 17
prev_post_slug = "2025iThomeIronmanDay16"
next_post_slug = "2025iThomeIronmanDay18"
draft = false
description = "今天，我們將回歸本心，認識一下構成生命的三大基本元素：HTML, CSS, 與 JavaScript。"
+++

安安，我是 ChiYu！

昨天，我們為精彩的後端開發之旅，畫下了一個完美的句點。我們現在擁有一個性能強大、穩定可靠的「專案引擎」，一顆強壯、默默跳動的心臟，但它還沒有形體，等待著被賦予生命。

從今天起，我們將正式開啟一個全新的篇章： **前端開發**。我們將從幕後的「引擎工程師」，搖身一變，成為面向使用者的「 **造物主**」與「 **生命設計師**」。

但在我們開始 Vibe Coding 我們的數位生命之前，我們必須先花一天時間，回歸本心，認識一下構成生命的三大基本元素。今天，是前端開發的 Day 0，我們不寫任何一行專案程式碼，只專注於一件事：用最簡單的比喻和親手實作，讓你徹底搞懂構成全世界所有網頁的生命三要素——`HTML`, `CSS`, 與 `JavaScript`。

## Part 1：HTML - 生命的「骨骼」

想像一下我們要創造一個生命體。我們做的第一件事是什麼？塑造它的骨架。這就是 `HTML` (HyperText Markup Language) 的角色。

> HTML 的唯一職責，就是定義網頁的「內容」與「結構」。它決定了這個生命體「有哪些器官」，但完全不管它「長什麼樣子」。

- `<h1>` 標籤告訴瀏覽器：「嘿，這是頭顱」，是思考的中心。
- `<p>` 標籤說：「這是一塊軀幹」，是身體的主體。
- `<img>` 標籤說：「這裡要有眼睛」，用來觀看世界。
- `<button>` 標籤說：「這裡要有手」，用來與世界互動。

HTML 就是生命的骨架，最基礎、最核心，沒有它，皮囊與肌肉都將無所依附。

### 【動手玩玩看 #1】

1. **建立實驗室**：在你的電腦桌面，建立一個新的資料夾，取名為 `frontend-playground`。
2. **用 VS Code 開啟**：打開 VS Code，點擊左上角「檔案 (File)」->「開啟資料夾 (Open Folder)」，然後選擇我們剛剛建立的 `frontend-playground`。
3. **建立 HTML 檔案**：在 VS Code 左側的檔案總管中，點擊「新增檔案」的圖示，將檔案命名為 `index.html`。
4. **貼上骨架程式碼**：將下面的程式碼，完整地複製並貼到你剛剛建立的 `index.html` 檔案中。

```html
<!DOCTYPE html>
<html>
<head>
    <title>我的生命體</title>
</head>
<body>
    <h1>這是頭顱</h1>
    <p>這是一塊樸素的軀幹。</p>
    <button>這是一隻手</button>
</body>
</html>
```

**預覽結果**：直接在檔案總管中，找到 `index.html` 檔案並用你的瀏覽器（例如 Chrome）打開它。你看到的就是最原始、只有骨架的生命雛形。

### 【觀念小教室】標籤語言 vs. 程式語言

剛剛我們寫的 HTML，是一種 **「標籤語言 (Markup Language)」，這和我們稍後會學到的 JavaScript 那種「程式語言 (Programming Language)」** 有著本質的區別。搞懂這個，你的觀念就直接超越 50% 的新手了！

**標籤語言 (Markup Language) - 像是「解剖學圖譜」**

HTML 的作用是 **「描述」。它用一對對的標籤 (<h1>, </h1>) 來包裹內容，告訴瀏覽器「這塊東西是什麼」。它就像一張人體解剖圖，清楚地標示了「這是頭骨」、「這是肋骨」。它只負責定義結構和語意** ，但它本身沒有邏輯。你不能用 HTML 來做計算、下判斷 (if...else) 或重複執行任務 (for 迴圈)。它只是靜靜地描述著事物的樣貌。

**程式語言 (Programming Language) - 像是「大腦與神經」**

JavaScript 的作用是 **「命令」。它是一系列的指令，用來告訴電腦「去做什麼事」。它就像我們的大腦和神經系統，可以接收訊號（使用者點擊）、進行邏輯判斷（如果點擊的是手，就…）、並發出指令去控制身體（改變頭顱說的話）。程式語言的核心就是邏輯** 、運算和流程控制。

> 簡單來說：HTML 告訴瀏覽器網頁長什麼樣，而 JavaScript 告訴瀏覽器要做什麼。

## Part 2：CSS - 生命的「皮囊與外貌」

骨架有了，但沒人想看到一個骷髏吧？這時，就輪到我們的造型師——`CSS` (Cascading Style Sheets) 登場了。

> CSS 的唯一職責，就是決定網頁的「外觀」與「風格」。它為我們的骨架覆上皮囊，並決定了膚色、髮型與穿搭。CSS 負責所有關於「美」的事情，從顏色、樣貌、身形比例到動態表情，它讓我們的生命體從「骨架」，變成了有個性、有魅力的樣貌。

### 【動手玩玩看 #2】

1. **回到 VS Code**：切換回我們剛剛的 `index.html` 檔案。
2. **貼上造型程式碼**：用下面的程式碼， **完全取代**你檔案中現有的內容。

```html
<!DOCTYPE html>
<html>
<head>
    <title>我的漂亮生命體</title>
    <style>
        /* 這就是 CSS！ */
        h1 {
            color: steelblue; /* 頭髮染成藍色 */
        }
        p {
            font-family: "Helvetica", sans-serif; /* 換個說話語氣 (字體) */
        }
        button {
            background-color: lightcoral; /* 戴上珊瑚色手套 */
            border: none;
            padding: 10px 20px;
            border-radius: 8px; /* 修剪指甲 (圓角) */
        }
    </style>
</head>
<body>
    <h1>這是頭顱</h1>
    <p>這是一塊很有型的軀幹。</p>
    <button>這是一隻漂亮的手</button>
</body>
</html>
```

**重新整理看變化**：回到你的瀏覽器，重新整理剛剛打開的頁面。是不是瞬間感覺生命體有了自己的風格？

## Part 3：JavaScript - 生命的「肌肉與神經」

生命體又帥又美，但如果它動不了、不會思考，那依然只是個蠟像。這時，我們需要 `JavaScript` (JS)——一個真正的程式語言——來為它注入靈魂。

> JavaScript 的唯一職責，就是賦予網頁「互動性」與「功能」。它是我們生命體的肌肉與神經系統。它讓我們的網頁從一本只能看的「肖像畫」，變成了一個可以互動的「智慧夥伴」。

### 【動手玩玩看 #3】

1. **回到 VS Code**：再次切換回 `index.html`。
2. **貼上靈魂程式碼**：同樣地，用下面這段最終版的程式碼，**完全取代**現有內容。

```html
<!DOCTYPE html>
<html>
<head>
    <title>我的智慧生命體</title>
    <style>
        /* ... CSS 樣式跟上面一樣 ... */
        h1 { color: steelblue; }
        p { font-family: "Helvetica", sans-serif; }
        button {
            background-color: lightcoral;
            border: none;
            padding: 10px 20px;
            border-radius: 8px;
        }
    </style>
</head>
<body>
    <h1 id="main-title">這是頭顱</h1>
    <p>這是一塊很有型的軀幹。</p>
    <button id="main-button">這是一隻會思考的手</button>

    <script>
        // 這就是 JavaScript！一個真正的程式語言！
        const head = document.getElementById('main-title');
        const hand = document.getElementById('main-button');

        // 監聽手的觸碰事件 (這是邏輯！)
        hand.addEventListener('click', function() {
            // 當手被觸碰時，命令頭顱說話 (這是動作！)
            head.textContent = '你好，世界！我活過來了！';
        });
    </script>
</body>
</html>
```

**體驗互動魔法**：回到瀏覽器並重新整理。現在，試著觸碰那隻「會思考的手」看看！

> 【專業工具箱：Go Live】
> 
> 一直手動重新整理很麻煩吧？在 VS Code 的擴充功能市集搜尋並安裝  **Live Server**。安裝後，在 `index.html` 檔案上按右鍵，選擇「Open with Live Server」。它會幫你啟動一個本地伺服器，最棒的是，你每次存檔時，網頁都會**自動重新整理**！

## 結語：前端開發的生命協奏曲

`HTML` (骨骼) + `CSS` (皮囊) + `JavaScript` (肌肉)，這就是前端開發的生命三要素，缺一不可。

今天，我們不只認識了創造生命的三大元素，更親手孕育了一個迷年的智慧生命體原型。有了這個基礎，我們就有了共通的語言。

從明天開始，我們將再次回到「文件驅動」的開發流程。我們將化身為「首席視覺設計師」，與 Gemini 一同討論，為我們的 App 定義一套專業的 **「風格指南 (Style Guide)」**，也就是我們生命的「 **基因圖譜 (DNA)**」，為接下來的創造之旅，打下最穩固的設計基礎！
