+++
title = "Day 25: 【前端 #6】核心生命週期：一天搞定習慣的「增刪改查」與「打卡」"
date = 2025-09-13
slug = "2025iThomeIronmanDay25"
dates = ["2025-09-13"]
tags = ["2025iThomeIronman", "Gemini", "Frontend", "CRUD", "JavaScript", "API Integration"]
series = ["2025iThomeIronman"]
categories = ["前端開發"]
weight = 25
prev_post_slug = "2025iThomeIronmanDay24"
next_post_slug = "2025iThomeIronmanDay26"
draft = false
description = "今天我們將火力全開，搞定所有習慣的「增、刪、改、查」與「打卡」功能，讓 App 真正地動起來。"
+++

安安，我是 ChiYu！

昨天，我們的 App 經歷了一次質的飛躍。我們為它植入了「靈魂」——一個中央的狀態 (`state`) 和一個渲染引擎 (`render`)。它學會了如何「思考」（管理數據）並「表達」（渲染畫面），成功地將從後端獲取的真實數據，呈現在使用者面前。

我們的 App 現在有了一個能反映真實數據的漂亮外殼。但是，它還是一個只能「讀」，不能「寫」的「展示品」。使用者還無法新增、修改或刪除這些習慣，無法真正地與 App 產生連結。

今天，我們將迎來一個內容極其豐富、極具挑戰、也極富成就感的 **「濃縮實戰篇」**。我們將火力全開，一天之內，搞定所有習慣的「增、刪、改、查」與「打卡」功能，讓我們的 App 真正地「動」起來，完成其核心功能的生命週期！

## Part 1：前端心法：萬變不離其宗的「互動模式」

在我們開始瘋狂寫 Code 之前，讓我們先建立一個清晰的「心智模型」。今天我們要做的所有功能，無論是新增、刪除還是打卡，都將嚴格遵循我們前幾天建立的、那個優雅而強大的「數據驅動」模式。

這個模式，就是我們所有互動功能的 **「黃金公式」**：

1. **使用者事件 (User Event)**：使用者觸發一個動作（例如：點擊「儲存」按鈕）。
2. **呼叫 API (Call API)**：我們的 JavaScript 會捕捉到這個事件，然後呼叫對應的 `api.js` 函式，向後端發送一個請求（`POST`, `DELETE`, `PUT`...）。
3. **更新狀態 (Update State)**：在成功收到後端的回應後，我們不去手動修改畫面，而是去更新我們中央的 `state` 物件。
4. **自動渲染 (Auto Re-render)**：`setState` 函式會自動觸發 `render()`，我們的 UI 就會像鏡子一樣，自動、精準地反映出 `state` 的最新樣貌。

記住這個公式，你會發現，再複雜的互動，都能被拆解成這幾個簡單、可預測的步驟。

## Part 2：Vibe Coding 實戰 (上)：擴充我們的「通訊模組」

我們的 `api.js` 現在只會「讀取」(`fetchHabits`)，是時候教它「寫入」了。

### 【魔法詠唱：升級通訊模組】

讓我們進入 gemini chat 模式，指揮 AI 為我們擴充 `api.js`。

```markdown
# 角色 (Role)
你是一位資深的 API 用戶端架構師 (API Client Architect)，精通 `fetch` API 與 `async/await`，並致力於遵循 DRY (Don't Repeat Yourself) 原則，撰寫可複用、可擴展且易於維護的數據獲取模組。

# 目標 (Objective)
請對現有的 `@frontend/api.js` 檔案進行一次全面的功能擴充，為「習慣 (Habits)」資源 **實現完整的 CRUD (Create, Read, Update, Delete) 操作介面**。你需要透過建立一個可複用的請求處理函式，來優雅地實現所有新的 API 請求。

# 上下文與關鍵資訊 (Context & Key Information)
* **目標修改檔案**: `@frontend/api.js`
* **後端 API Base URL**: `http://127.0.0.1:5000` (已在檔案中定義為 `BASE_URL` 常數)
* **現有函式**: `fetchHabits` (用於 Read 操作)

# 架構性要求 (Architectural Refinement)
1.  **建立 `apiFetch` 輔助函式 (Helper Function)**:
    * 在檔案內部，建立一個**不被 `export`** 的私有 `async` 函式，命名為 `apiFetch`。
    * 此函式的職責是 **集中處理所有 API 請求的通用邏輯**，包括：
        * 接收 `path`, `method`, `body` 等參數。
        * 設定通用的 `headers` (例如 `'Content-Type': 'application/json'`)。
        * 使用 `try...catch` 結構包裹 `fetch` 呼叫。
        * 檢查 `response.ok` 並在失敗時拋出錯誤。
        * 處理不同情況下的回應 (例如：有 JSON body 的回應 vs. 沒有內容的 204 No Content 回應)。
        * 集中處理錯誤並返回 `null`。
2.  **重構現有函式 (可選但建議)**:
    * (可選) 輕微重構現有的 `fetchHabits` 函式，使其也透過呼叫 `apiFetch` 來實現，以保持模組內風格一致。

# 新增 CRUD 函式實作要求 (New CRUD Functions Implementation)
**請直接重寫 `@frontend/api.js` 的內容，保留 `BASE_URL` 和 `fetchHabits`，並新增以下三個 `export` 的 `async` 函式。所有新函式都應該是呼叫內部 `apiFetch` 函式的簡潔包裝。**

1.  **`addHabit(habitData)` - (Create)**
    * **參數**: `habitData` (一個物件，例如 `{ name: '學習 Vim' }`)。
    * **內部邏輯**: 呼叫 `apiFetch`，傳入路徑 `/habits`，方法 `POST`，以及請求 `body`。
    * **回傳值**: 成功時，返回後端建立的新習慣物件；失敗時，返回 `null`。

2.  **`updateHabit(habitId, updateData)` - (Update)**
    * **參數**: `habitId` (字串或數字), `updateData` (一個包含要更新欄位的物件)。
    * **內部邏輯**: 呼叫 `apiFetch`，傳入路徑 ``/habits/${habitId}``，方法 `PUT`，以及請求 `body`。
    * **回傳值**: 成功時，返回後端更新後的習慣物件；失敗時，返回 `null`。

3.  **`deleteHabit(habitId)` - (Delete)**
    * **參數**: `habitId` (字串或數字)。
    * **內部邏輯**: 呼叫 `apiFetch`，傳入路徑 ``/habits/${habitId}``，方法 `DELETE`。
    * **回傳值**: 成功時 (例如後端回應 204)，返回 `true`；失敗時，返回 `false`。

4.  **JSDoc 註解**: 請為所有新增的函式，提供清晰的 JSDoc 註解，說明其用途、參數 (`@param`) 與回傳值 (`@returns`)。
```

## Part 3：Vibe Coding 實戰 (下)：為 App 注入完整生命力

通訊模組升級完畢，是時候回到 `script.js`，將我們的「黃金公式」付諸實踐了！

### 【魔法詠唱：實現完整 CRUD】

```markdown
# 角色 (Role)
你是一位資深前端架構師，精通現代 JavaScript、DOM 操作、狀態管理模式，以及**非同步操作下的使用者體驗 (Asynchronous UX) 設計**。你擅長將複雜的業務邏輯，轉化為穩固、可預測、且具備清晰反饋的互動式介面。

# 目標 (Objective)
請對現有的 `@frontend/script.js` 進行一次全面的功能擴充，**為「習慣 (Habit)」資源實現一個具備完整生命週期管理、且能優雅處理非同步狀態的互動介面**。

# 上下文與關鍵資訊 (Context & Key Information)
* **目標修改檔案**: `@frontend/script.js` (內含 `state` 物件與 `render` 函式)。
* **API 模組**: `@frontend/api.js` (已提供完整的 `addHabit`, `updateHabit`, `deleteHabit` 等 CRUD 函式)。

# 核心互動哲學：管理非同步狀態
我們的黃金法則是：**UI 必須始終忠實反映應用程式的當前狀態，尤其是在等待 API 回應的「中間狀態」**。為此，我們需要：
1.  **擴充 `state` 物件**: 在現有 `state` 中增加用於追蹤非同步操作狀態的屬性，例如 `isSubmitting: false` 或 `deletingHabitId: null`。
2.  **更新 `render` 函式**: `render` 函式需要能夠識別這些新狀態，並在畫面上給予使用者清晰的視覺反饋（例如：禁用按鈕、顯示載入指示器）。
3.  **遵循流程**: 所有互動操作都必須遵循「**設定載入狀態 -> 呼叫 API -> 根據結果更新最終狀態**」的穩健流程。

---
# 產出格式與要求 (Your Task & Output Requirements)
**請直接重寫 `@frontend/script.js` 的完整內容，並實現以下所有功能與狀態管理邏輯：**

### 1. **擴充 State & Render**
* 在 `state` 物件中，新增 `isSubmitting: false` 屬性。
* 修改 `render` 函式，讓它在渲染 Modal 時，檢查 `state.isSubmitting`。如果為 `true`，則 Modal 中的「儲存」按鈕應被設置為 `disabled` 狀態。

### 2. **新增習慣 (Create)**
* 為「新增習慣 Modal」的表單，加上 `submit` 事件監聽器。
* **處理流程**:
    1.  阻止表單預設提交行為。
    2.  獲取輸入框的值，進行基本驗證（例如，不能為空）。
    3.  **進入載入狀態**: `setState({ isSubmitting: true });`
    4.  呼叫 `addHabit()` API。
    5.  **處理回應**:
        * **成功**: 將返回的新習慣物件，加到 `state.habits` 陣列的**最前面**，並呼叫 `setState({ habits: ..., isSubmitting: false });`。
        * **失敗**: 彈出 `alert` 或在 `console.error` 中顯示錯誤，並呼叫 `setState({ isSubmitting: false });` 來解除載入狀態。
    6.  關閉 Modal 並清空輸入框。

### 3. **刪除習慣 (Delete)**
* **心法**: 使用**事件委派 (Event Delegation)** 模式，在父層容器 `.habit-list-container` 上掛載一個 `click` 事件監聽器。
* **處理流程**:
    1.  在 `renderHabitList` 中，為每個習慣項的刪除按鈕，加上 `data-action="delete"` 和 `data-habit-id="..."` 屬性。
    2.  在事件監聽器中，判斷被點擊的是否為 `[data-action="delete"]` 的按鈕。
    3.  獲取 `habitId`。
    4.  **樂觀更新 (Optimistic Update) 準備**: 可以在呼叫 API **前**，就先從畫面移除該項目，提供更流暢的體驗。
    5.  呼叫 `deleteHabit(habitId)` API。
    6.  **處理回應**:
        * **成功**: 如果採用樂觀更新，則無需額外操作。如果沒有，則在此處從 `state.habits` 陣列中**過濾掉**被刪除的習慣，並呼叫 `setState()`。
        * **失敗**: 如果採用樂觀更新，需要將剛才移除的項目**加回來**，並提示使用者刪除失敗。

### 4. **完成/取消習慣 (Update - Toggle Completion)**
* **同樣使用事件委派**。
* **處理流程**:
    1.  在 `renderHabitList` 中，為每個習慣項的 checkbox 或完成區域，加上 `data-action="toggle"` 和 `data-habit-id`。
    2.  在事件監聽器中，判斷點擊目標。
    3.  獲取 `habitId`。
    4.  **樂觀更新**:
        * 在 `state.habits` 中找到對應的習慣，將其 `completed_today` (或類似) 屬性反轉。
        * 立即呼叫 `setState({ habits: ... })` 來刷新 UI。
    5.  **背景同步**: 呼叫 `updateHabit(habitId, { completed_today: ... })` API。
        * **注意**: 成功時無需操作，但若 API 呼叫**失敗**，應將狀態**還原**並提示使用者。
    6.  **TODO 註解**: 請在程式碼中用 `// TODO:` 標示出 API 同步失敗後的回滾 (rollback) 邏輯尚未實現。

### 5. **(挑戰) 實現原地編輯 (In-place Edit)**
* **狀態管理**: 在 `state` 中新增 `editingHabitId: null`。
* **Render 邏輯**: `renderHabitList` 需修改，當 `habit.id === state.editingHabitId` 時，習慣名稱的 `<span>` 應被替換為一個 `<input type="text">`。
* **事件委派**:
    * 點擊「編輯」按鈕 (`[data-action="edit"]`) 時，呼叫 `setState({ editingHabitId: habitId });`。
    * 監聽 `<input>` 的 `blur` (失焦) 或 `keydown` (Enter 鍵) 事件。
    * 事件觸發時，獲取新值，呼叫 `updateHabit()` API，並在成功後呼叫 `setState({ editingHabitId: null });` 退出編輯模式。
```

## Part 4：成果驗收：一個完全可互動的 App！

是時候驗收了！再次確保所有伺服器都在運行，然後刷新你的瀏覽器。

現在，去盡情地玩你的 App 吧！

- 點擊「新增習慣」，輸入內容並儲存，看看新的習慣是否立刻出現在列表頂部！
- 點擊任何一個習慣項目，看看它是否能成功打卡和取消打卡！
- 點擊習慣項目旁的刪除按鈕，看看它是否立刻從列表中消失！

這就是我們努力的成果！一個遵循專業架構、數據驅動、功能完整的 MVP 核心！

## Part 5：提交我們 App 的「完整生命力」

- **Commit 訊息**: `feat(frontend): Implement full CRUD and completion logic for habits`
- **Commit & Push**！

## 結語：從思考到行動，下一步是體驗

再次恭喜！今天，我們的 App 真正地「活」了過來。它不僅能思考和表達，現在更擁有了完整的行動能力。我們也透過這次的綜合實戰，將「狀態管理」的黃金公式，深深地烙印在了我們的開發模式中。

我們的 App 現在功能很強大，但在使用者體驗的細節上，還有可以打磨的空間。例如，當網路慢的時候，使用者點擊按鈕後會發生什麼？如果 API 出錯了，又該怎麼辦？

明天，我們將學習用戶體驗的最後一哩路，為我們的 App 加上優雅的「載入中」和「錯誤處理」狀態，讓它從一個「能用」的產品，進化成一個「好用」的產品！
