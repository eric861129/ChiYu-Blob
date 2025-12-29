+++
title = "Day 23: 【前端 #4】非同步的藝術：深入 Fetch API 與 Promise"
date = 2025-09-11
slug = "2025iThomeIronmanDay23"
dates = ["2025-09-11"]
tags = ["2025iThomeIronman", "Gemini", "Frontend", "Asynchronous", "JavaScript", "Fetch API", "Promise"]
series = ["2025iThomeIronman"]
categories = ["前端開發"]
weight = 23
prev_post_slug = "2025iThomeIronmanDay22"
next_post_slug = "2025iThomeIronmanDay24"
draft = false
description = "今天我們將深入前端開發中最核心的觀念——非同步程式設計，並學習如何使用 Fetch API 讓前後端進行對話。"
+++

安安，我是 ChiYu！

昨天，我們扮演了一位「創世神」，指揮 AI 在一天之內，為我們建構出了 App 完整、精美的靜態 UI。我們現在手上，有了一個外觀完美，但沒有靈魂的「App 蠟像館」。

它很美，但它是靜默的。它無法感知外界，也無法與我們在後端建立的強大「大腦」進行溝通。

今天，我們就要來為它安裝這套至關重要的神經系統！我們將深入前端開發中最核心、也最讓新手困惑的觀念——非同步程式設計 (Asynchronous Programming)，並學習如何使用 Fetch API，讓前端的「身體」與後端的「大腦」進行第一次的歷史性對話！

## Part 1：前端心法：為什麼我們需要「非同步」？

想像一個場景：你去一家超紅的手搖飲店點餐。你點完一杯「珍珠鮮奶茶，半糖少冰」後，是會呆呆地站在櫃檯前，死盯著店員，從他開始煮珍珠、泡茶、加牛奶、到最後封膜，一步都不離開嗎？

當然不會！那樣不僅你自己浪費時間，還會把後面的客人全都堵死。一個正常的流程是：你點完餐，店員給你一個會震動的「取餐呼叫器」，然後你就可以去旁邊找個位子坐下、滑滑手機、看看書。等到飲料做好了，呼叫器「嗡嗡嗡」地震動，你再優雅地過去取餐。

前端與後端的溝通，就跟這個過程一模一樣！

- **同步 (Synchronous)**：就是那個呆站在櫃檯的笨方法。如果前端用「同步」的方式去跟後端要資料（例如，去資料庫拿你的習慣列表），那整個網頁畫面就會完全卡死，捲動不了、按鈕沒反應，直到後端把資料傳回來為止。這對使用者來說，是災難性的體驗。
- **非同步 (Asynchronous)**：就是那個聰明的「呼叫器」方法。前端發出一個請求給後端後，它不會原地等待，而是會繼續做自己的事（例如：保持畫面的流暢、回應使用者的其他操作）。後端處理完資料後，會透過一個機制「通知」前端：「嘿，你的資料好了，快來拿！」

而這個神奇的「呼叫器」，在 JavaScript 的世界裡，就叫做 Promise。

### 什麼是 Promise？

Promise 是一個物件，它代表一個「承諾」。當你呼叫一個非同步操作（例如 `fetch`）時，它會立刻回給你一個 Promise。這個 Promise 就像是那個取餐呼叫器，它有三種狀態：

- **Pending (等待中)**：你剛拿到呼叫器，它還沒震動。代表飲料還在做。
- **Fulfilled (已實現)**：呼叫器震動了！代表你的珍奶做好了（數據成功取回）。
- **Rejected (已拒絕)**：呼叫器發出悲鳴！代表珍珠賣完了（網路錯誤或伺服器出錯）。

### async/await：優雅地等待呼叫器

早期的 JavaScript 處理 Promise 非常麻煩（俗稱「回調地獄」），但現代 JS 提供了一套超級優雅的語法糖——`async/await`。它能讓我們用寫「同步」程式碼的感覺，來處理「非同步」操作，大大提升了程式碼的可讀性。

## Part 2：Vibe Coding 實戰：建立我們的「通訊模組」

好了，理論武裝完畢！在我們開始呼叫 API 之前，專業的作法是建立一個專門負責與後端溝通的「通訊模組」，而不是把 `fetch` 寫得到處都是。這也是一種「關注點分離」！

### Step 1: 命令 AI 建立 api.js

讓我們進入 gemini chat 模式，指揮 AI 為我們建立這個模組。

### 【魔法詠唱：建立通訊模組】

```markdown
# 角色

你是一位精通 JavaScript 模組化的前端工程師。

**# 任務**

請在 `frontend` 資料夾中，為我建立一個新的檔案 `api.js`，它將作為我們所有 API 請求的中央模組。
```

### Step 2: 命令 AI 撰寫第一個 API 請求函式

現在，我們要讓 AI 在這個新檔案中，撰寫我們第一個、也是最重要的 API 請求函式——獲取所有習慣。

### 【魔法詠唱：生成 fetchHabits 函式】

```markdown
# 角色 (Role)

你是一位資深前端工程師與 API 用戶端架構師 (API Client Architect)，專精於設計乾淨、可維護、且具備高度彈性的數據獲取模組。你對 `fetch` API、`async/await` 語法以及模組化的錯誤處理策略有著深刻的理解。

# 目標 (Objective)

請為我們的應用程式 **建立 foundational API client module (`api.js`)**。你將從實作第一個函式 `fetchHabits` 開始，用於從後端獲取所有習慣列表，同時為未來所有 API 函式**建立可複用的模式與最佳實踐**。

# 上下文與關鍵資訊 (Context & Key Information)

  * **目標修改檔案**: `@frontend/api.js`
  * **後端 API 端點**: `http://127.0.0.1:5000/habits`

# 架構性要求 (Architectural Requirements)

1.  **抽離 Base URL**: 在檔案的最上方，定義一個 `const BASE_URL = 'http://127.0.0.1:5000';`。後續所有的 `fetch` 請求都應使用此常數與相對路徑（例如：`${BASE_URL}/habits`）組合而成，以便於未來在開發環境與生產環境之間切換。
2.  **可擴展性**: 模組的結構應該清晰，便於未來輕易地在 `fetchHabits` 函式下方，新增 `createHabit`, `updateHabit`, `deleteHabit` 等其他 API 函式。

# `fetchHabits` 函式實作要求 (Function Implementation Requirements)

1.  **直接修改**: 請直接重寫 `@frontend/api.js` 的內容。
2.  **函式簽名 (Signature)**:
      * 函式必須是 `async` 函式，並命名為 `fetchHabits`。
      * 使用 `export` 將 `fetchHabits` 函式導出，以便其他檔案可以使用。
3.  **JSDoc 註解**: 在函式上方，請加上專業的 JSDoc 註解，清晰地說明函式的用途、回傳值（成功時的型別和失敗時的 `null`）。
4.  **錯誤處理 (Error Handling)**:
      * 使用 `try...catch` 結構來處理所有潛在的錯誤。
      * **Try Block**:
          * 使用 `await fetch(...)` 來發送 GET 請求。
          * **必須**檢查回應狀態 `response.ok`。如果回應不成功 (例如 404 或 500 錯誤)，請拋出一個帶有描述性訊息的錯誤，例如 `throw new Error('Network response was not ok');`。
          * 成功時，返回 `await response.json()` 的解析結果。
      * **Catch Block**:
          * 將捕捉到的錯誤 `error` 使用 `console.error` 打印出來，訊息應包含上下文，例如 `console.error('Failed to fetch habits:', error);`。
          * 向呼叫者返回 `null`，以明確表示操作失敗。
```

## Part 3：將「神經系統」接入 App

通訊模組建好了，現在我們要把它接入我們的主要腳本 `script.js`，讓 App 真正擁有「聽覺」。

### 【魔法詠唱：整合與測試】

```markdown
# 角色 (Role)

你是一位資深的 JavaScript 前端工程師，專精於現代應用程式架構、非同步數據流管理與 ES6 模組化開發。

# 目標 (Objective)

請為我們的應用程式，建立 **初次數據載入的管道 (initial data-fetching pipeline)**。你的任務將 `api.js` 模組，整合進主要的 `script.js` 檔案中，並執行一次測試性的 API 呼叫，以驗證前後端之間的通訊連結是否成功建立。

# 上下文與關鍵資訊 (Context & Key Information)

  * **API 模組**: `@frontend/api.js` (其中包含我們需要使用的 `fetchHabits` 函式)。
  * **主腳本檔案**: `@frontend/script.js` (應用程式的主要邏輯進入點)。
  * **主 HTML 檔案**: `@frontend/index.html` (需要被修改以啟用模組功能)。
  * **核心任務**: 啟用模組載入，導入 API 函式，並在頁面載入完成後，執行一次數據獲取並將結果打印到主控台。

# 產出格式與要求 (Your Task & Output Requirements)

**請直接修改我現有的 `index.html` 和 `script.js` 檔案。**

-----

### **Part 1: 修改 `@frontend/index.html` (啟用 ES6 模組)**

1.  **啟用模組化**: 找到引入 `script.js` 的 `<script>` 標籤。
2.  **添加屬性**: 在該標籤中，加入 `type="module"` 屬性來啟用 ES6 模組功能。
3.  **最佳實踐**: 確保該標籤同時也包含 `defer` 屬性，以確保 HTML 解析完畢後再執行腳本。最終結果應類似：`<script src="./script.js" type="module" defer></script>`。

-----

### **Part 2: 修改 `@frontend/script.js` (整合與測試)**

1.  **導入模組**: 在檔案的最頂部，使用 `import` 語法，從 `./api.js` 中導入 `fetchHabits` 函式。

    ```javascript
    import { fetchHabits } from './api.js';
    ```

2.  **修改 `DOMContentLoaded` 監聽器**: 在現有的 `DOMContentLoaded` 事件監聽器內部，進行以下操作：

      * **建立啟動函式**: 建立一個新的 `async` 函式，並命名為 `loadInitialData`。
      * **加上 JSDoc**: 在函式上方，為 `loadInitialData` 加上簡潔的 JSDoc 註解，說明其用途。
      * **呼叫 API**:
          * 在 `try...catch` 區塊中，使用 `const habits = await fetchHabits();` 來呼叫 API 並獲取數據。
      * **處理回傳結果**:
          * **成功情境**: 檢查 `habits` 是否為真值 (truthy，即不是 `null`)。如果是，則使用 `console.log` 打印出成功的訊息與獲取到的數據，例如：`console.log('✅ Habits loaded successfully:', habits);`
          * **失敗情境**: 如果 `habits` 是 `null`（代表 API 請求失敗），則使用 `console.error` 打印出失敗的訊息，例如：`console.error('❌ Failed to load habits.');`。
      * **錯誤處理**: 在 `catch` 區塊中，捕獲非預期的錯誤並打印出來。
      * **立即執行**: 在 `DOMContentLoaded` 監聽器的底部，立即呼叫 `loadInitialData();` 來執行這個啟動函式。
```

## Part 4：歷史性的一刻：前後端的首次對話

是時候見證奇蹟了！請確保你的：

- 後端伺服器正在運行 (在 `mindtrack-api` 專案目錄下執行 `flask run`)。
- 前端 Live Server 正在運行。

現在，打開你的瀏覽器，訪問前端頁面，然後按下 `F12` 打開「開發者工具」，切換到「主控台 (Console)」分頁。

你會看到，主控台裡靜靜地躺著一個陣列 (Array)。點開它，裡面正是我們在 Day 12 用 seed 指令存入資料庫的那些真實的習慣數據！

這就是歷史性的一刻！ 我們的「前端身體」第一次成功地與「後端大腦」建立了神經連結，並獲取了記憶！

## Part 5：提交我們的「神經系統」

- **Commit 訊息**: `feat(frontend): Implement async API module and fetch initial data`
- **Commit & Push**！

## 結語：App 有了記憶，但還不會表達

再次恭喜！今天，我們跨越了前端開發的一道重要門檻，徹底搞懂了「非同步」的奧秘。我們的 App 不再是離線的空殼，它現在能與我們的伺服器溝通，擁有了「記憶」。

但是，這些記憶現在還只存在於冰冷的 `console` 裡，使用者完全看不到。明天，我們將學習前端開發的另一個核心心法——「狀態管理」。我們將學會如何將這些從後端獲取的數據，優雅地「反映」到我們的 UI 上，讓 App 真正地 **「開口說話」**！
