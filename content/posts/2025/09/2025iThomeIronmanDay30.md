+++
title = "Day 30: 【前端 #9】建立大門與鑰匙：根據流程圖實現前端使用者認證"
date = 2025-09-18
slug = "2025iThomeIronmanDay30"
dates = ["2025-09-18"]
tags = ["2025iThomeIronman", "Gemini", "Frontend", "Authentication", "JWT", "Security", "SPA"]
series = ["2025iThomeIronman"]
categories = ["前端開發"]
weight = 30
prev_post_slug = "2025iThomeIronmanDay29"
next_post_slug = "2025iThomeIronmanDay31"
draft = false
description = "今天我們將迎來前端整合的最終章！嚴格依據流程圖實現認證系統，為 App 裝上大門與門鎖。"
+++

說在前頭！！！
有些部分多花費了些時間在講，所以雖然今天已經滿30天了，
但我還沒有正式完成這次鐵人賽系列文！！！
我後面還是會繼續更新到正式完結。畢竟還是要有頭有尾有始有終！

以下正文開始！
-----
---
安安，我是 ChiYu！

昨天，我們為 App 的安全性，打下了最堅實的理論基礎。我們沒有憑感覺去處理這個複雜的流程，而是再次透過 **「文件驅動」**，將所有可能的路徑與邏輯，都預先規劃得一清二楚。

我們手上現在握著一份精密的「安全白皮書」。有了它，我們接下來的開發工作將會變得無比順暢，因為所有關於「如何設計」的燒腦問題，都已經被解決了。我們的任務只剩下一個—— **專注於「如何實現」**。

今天，我們將迎來前端整合的最終章！我們將 **嚴格依據**昨天的這份流程圖，指揮 AI，將這套堅不可摧的認證系統，變成真實、可運行的前端程式碼，為我們的 App 裝上大門與門鎖！

---

## Part 1：前端心法：為我們的單頁應用模擬「多個頁面」

在開始之前，我們需要先解決一個結構性問題。我們的 App 目前是一個嚴格意義上的「單頁應用」——所有的 UI 都在同一個 `index.html` 裡。但現在，我們需要一個獨立的「登入/註冊」頁面。

在不引入複雜前端框架的情況下，最聰明、最簡單的作法，就是 **「用 `<div>` 模擬頁面」**。

我們的策略是：

1. 將我們現有的主應用程式介面，用一個 `<div id="app-page">` 包起來。
2. 再建立一個新的 `<div id="auth-page">`，用來放置登入和註冊的表單。
3. 這兩個 `<div>` 永遠只會有一個顯示在畫面上。
4. 我們將用 JavaScript 來控制，根據使用者的登入狀態，決定要顯示哪一個「頁面」。

這是一個輕量級且高效的前端路由 (Routing) 模擬方法。

---

## Part 2：Vibe Coding 實戰：詠唱「認證系統創生」的超級咒語

好了，作戰計畫擬定，讓我們進入 `gemini chat` 模式，用一個全面的「超級 Prompt」，指揮 AI 為我們完成這次複雜的手術。

### 【魔法詠唱：注入認證靈魂】

```markdown
# 角色 (Role)
你是一位頂尖的資安前端架構師 (Principal Frontend Engineer & Security Advocate)，精通 JWT 認證機制、狀態管理、API 客戶端設計與單頁應用程式 (SPA) 的路由管理。你擅長將複雜的認證規格，轉化為一個安全、穩固、可擴展且具備卓越使用者體驗的完整前端架構。

# 目標 (Objective)
請**嚴格依據**《前端認證架構藍圖》，對我現有的前端專案進行一次全面的**架構性重構與功能實作**，為其注入一個完整的「使用者認證」系統。

# 上下文與關鍵資訊 (Context & Key Information)
* **唯一真理來源**: `@docs/AUTH_FLOW.md` (所有流程、狀態、路由決策的最終依據)。
* **目標修改檔案**: `@frontend/index.html`, `@frontend/script.js`, `@frontend/api.js`, `@frontend/style.css`。

# 核心架構決策 (Key Architectural Decisions)
1.  **API 客戶端攔截器**: `api.js` 必須被重構，使其包含一個**集中的 `apiFetch` 函式**。未來所有需要認證的 API 請求，都必須透過此函式發出，它會自動處理 `Authorization` 標頭的附加。
2.  **SPA 路由模擬**: 我們將透過一個簡單的 `router` 物件來管理頁面的顯示與隱藏，模擬單頁應用的路由行為。
3.  **應用程式啟動程序 (Bootstrap Sequence)**: `script.js` 的執行入口將是一個名為 `initializeApp` 的函式，它負責協調「檢查本地 Token -> 設定初始狀態 -> 執行首次路由」的完整啟動流程。

---
## 產出格式與要求 (Your Task & Output Requirements)

### **Part 1: 重構 `api.js` (實現 Token 感知的 API 客戶端)**
1.  **新增 `loginUser` 和 `registerUser` 函式**，它們不需要 Token，可以直接發送請求。
2.  **建立 `apiFetch` 攔截器**:
    * 建立一個**新的 `apiFetch` 函式** (可參考之前的優化版本)。
    * **關鍵**: 在發送請求前，此函式必須先從 `localStorage` 讀取 Token。如果 Token 存在，就將其附加到 `Authorization: 'Bearer ' + token` 的標頭中。
    * 未來所有需要登入後才能存取的 API 函式（如 `fetchHabits`），都應**重構**為透過 `apiFetch` 來發送請求。

### **Part 2: 重構 `index.html` (搭建 SPA 舞台)**
1.  **建立頁面容器**:
    * 建立 `<div id="auth-page-container">`，並在其中放入登入和註冊的表單結構。
    * 將現有的 `<div class="app-layout">`，用 `<div id="app-page-container">` 包裹起來。
2.  **預設狀態**: 在 CSS 或 JS 中，確保這兩個容器預設都是隱藏的 (`display: none`)。

### **Part 3: 全面升級 `script.js` (注入認證核心)**
1.  **升級狀態中心 (`state`)**:
    * 根據規格書，擴充 `state` 物件，加入完整的認證狀態機：`authStatus: 'idle'`, `user: null`, `authToken: getTokenFromStorage()` (從本地初始化)。
2.  **實作 Token 管理**: 建立 `saveToken(token)` 和 `clearToken()` 等函式，封裝 `localStorage` 操作。
3.  **實作「路由」模組**:
    * 建立一個 `router` 物件，包含 `showAuthPage()` 和 `showAppPage()` 方法，用於切換頁面容器的顯示。
4.  **實作「認證動作 (Auth Actions)」**:
    * 建立 `handleLogin`, `handleRegister`, `handleLogout` 等 `async` 函式。
    * **嚴格遵循**規格書中的流程圖撰寫，完整包含**狀態更新 (`setState`)**、**API 呼叫**、**Token 操作**、**錯誤處理**、以及**最終的路由跳轉** (`router.show...`)。
    * **使用者體驗**: 在 API 請求期間 (`authStatus: 'loading'`)，**必須**禁用相關的表單提交按鈕。
5.  **建立「應用程式啟動器 (App Initializer)」**:
    * 建立一個名為 `initializeApp` 的主 `async` 函式。
    * **啟動流程**:
        1. 檢查 `state.authToken` 是否存在。
        2. (可選，但建議) 如果存在，可以呼叫一個 `/auth/verify` 之類的 API 來驗證其有效性。
        3. 根據驗證結果，設定最終的初始狀態 (`authenticated` 或 `unauthenticated`)。
        4. 呼叫 `render()` 進行首次渲染。
        5. 呼叫 `router` 顯示正確的初始頁面。
6.  **升級渲染引擎 (`render`)**:
    * `render` 函式現在需要根據 `state.authStatus` 和 `state.user` 來決定 UI 的顯示方式（例如，在 `app-page` 的 header 中顯示使用者名稱和登出按鈕）。
    * 監聽登出按鈕的點擊事件，觸發 `handleLogout`。

### **Part 4: 修改 `style.css` (美化新介面)**
* 為新的登入/註冊頁面 (`#auth-page-container`)，追加符合《風格指南》的 CSS 樣式。
* 為按鈕的 `:disabled` 狀態，加入明確的視覺樣式（例如 `opacity: 0.5; cursor: not-allowed;`）。
```

---

## Part 3：設計理念深度剖析

AI 完成操作後，讓我們來仔細品味一下我們煥然一新的 `script.js`，看看它是如何將昨天的「流程圖」變成真實程式碼的。

### **設計解讀 (WHY WE DO THIS):**

- **`routeGuard()`：我們的保全**
    - **WHY**：這個函式完美地實現了我們昨天設計的「保全」角色。它成為了 App 啟動時的**第一個檢查點**，以及每次認證狀態改變後（登入/登出）的 **最終裁決者**。它確保了使用者永遠只會看到他們該看的頁面。
- **`localStorage`：我們的鑰匙串**
    - **WHY**：將 Token 存在 `localStorage`，確保了使用者即使關閉瀏覽器再打開，依然能保持登入狀態，這提供了良好的使用者體驗。而我們的 `getTokenFromStorage()`則確保了 App 啟動時，能立刻知道使用者之前是否登入過。

---

## Part 4：成果驗收：一個安全、完整的 App！

是時候驗收了！再次確保所有伺服器都在運行，然後刷新你的瀏覽器。

這次，你看到的將不再是主控台，而是一個專業的 **登入頁面**！去盡情地測試我們完整的認證流程吧：

1. **直接訪問**：嘗試在未登入的情況下，手動修改網址，看看是否能進入主控台（你不能！路由守衛會把你擋下來）。
2. **註冊與登入**：註冊一個新帳號，然後用它登入，看看是否能成功進入主控台。
3. **保持登入**：重新整理頁面，看看你是否依然保持在登入狀態。
4. **登出**：點擊登出，看看是否能成功返回登入頁面。

### Part 5：提交我們 App 的「大門與門鎖」

1. **Commit 訊息**: `feat(frontend): implement complete authentication flow`
2. **Commit & Push**！

### 結語：從「產品」到「服務」

再次恭喜！今天，我們的 App 真正地從一個任何人都可以使用的「產品」，進化成了一個需要身份驗證、提供個人化體驗的 **「服務」**。我們為使用者的隱私和數據安全，建立起了第一道、也是最重要的一道防線。

我們的 MVP 核心功能已全部完成！但我們的旅程還沒結束。一個專業的專案，還需要優雅的程式碼結構和方便的部署流程。明天，我們將為我們的程式碼進行一次 **「整形手術」**，引入 JavaScript 模組化，讓我們的專案達到生產級別的清晰度！