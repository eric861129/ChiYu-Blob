+++
title = "Day 10: 【文件 #5】溝通的契約：用 Gemini 撰寫「Web API 規格書」"
date = 2025-08-29
slug = "2025iThomeIronmanDay10"
dates = ["2025-08-29"]
tags = ["2025iThomeIronman", "Gemini", "API", "OpenAPI", "Swagger", "YAML"]
series = ["2025iThomeIronman"]
categories = ["API 設計"]
weight = 10
prev_post_slug = "2025iThomeIronmanDay9"
next_post_slug = "2025iThomeIronmanDay11"
draft = false
description = "今天，我們要交給「服務生 (API)」一份精準的「菜單」，讓他知道如何跟廚房溝通，這就是後端藍圖的最後一塊拼圖——Web API 規格書。"
+++

安安，我是 ChiYu！

昨天，我們完成了餐廳的「食材倉庫」設計圖——資料庫綱要。至此，我們專案的願景、使用者需求、系統架構、數據儲存方式，都已經有了明確的定義。

我們的餐廳藍圖（架構）和食材倉庫（資料庫）都設計好了。下一步，就是要交給「服務生 (API)」一份精準的「菜單」，讓他知道如何跟廚房溝通，顧客可以點哪些菜，以及餐點會以什麼形式送上。

這份「菜單」，就是我們今天要產出的，後端藍圖的最後一塊拼圖——**Web API 規格書**。

## Part 1：什麼是「API 規格書」？

我們在 Day 7 提過，API 是前端（前台）與後端（廚房）之間的溝通橋樑。而「API 規格書」就是一份極其嚴謹、毫無模糊空間的技術文件，如同法律契約一般，精準地定義了前端與後端之間每一次互動的細節。

### 什麼是 OpenAPI 3.0 (Swagger)？

為了避免每家公司都用自己的格式來寫規格書，業界發展出了一套公認的標準，其中最流行的就是 **OpenAPI 3.0**（前身就是大名鼎鼎的 `Swagger`）。它用 `YAML` 或 `JSON` 格式，提供了一套完整的語法規則來描述 API。`YAML` 格式因其對人類更友善、更易讀的特性而廣受歡迎。

使用 OpenAPI 的最大好處是，有非常多工具可以讀取這份文件，自動生成可以互動的 API 文件網站、不同語言的客戶端程式碼、甚至是伺服器端的程式碼骨架！這也體現了一種專業的「設計優先 (Design-First)」開發哲學——我們先把契約定義好，再動手寫程式，這與我們系列「藍圖優先」的核心思想不謀而合。

## Part 2：實戰開始：讓 Gemini 成為我們的 API 設計專家

好了，讓我們來設計這份最重要的契約吧！

### Step 1：詠唱我們的魔法 (Craft the Prompt)

API 的設計，需要通盤考慮專案的目標、使用者故事、系統架構、以及資料庫綱要。所以這次，我們要拿出至今為止的所有成果，全部餵給 Gemini！

打開 VS Code 終端機，詠唱我們至今為止最複雜的一個「文件生成咒語」：

### 【魔法詠唱：我們的 Prompt】

```markdown
# ---------------------------------------------------------------------------
# PROMPT FOR GEMINI: Production-Ready OpenAPI 3.0.3 Specification Generator
# ---------------------------------------------------------------------------

# 角色 (Role)
你是一位頂尖的後端工程師與 API 設計專家，精通 RESTful API 設計原則與 OpenAPI 3.0 (Swagger) 規格。你設計的 API 以清晰、一致、安全且對開發者友好著稱。

# 目標 (Objective)
我的目標是讓你根據專案的完整設計文件，生成一份生產級別 (Production-Ready)、機器可讀 (Machine-Readable) 的 OpenAPI 3.0.3 規格文件。

# 上下文 (Context)
-   **完整的設計依據**: 你的所有設計都必須嚴格基於以下四份文件，它們共同定義了從業務目標到資料庫結構的全部細節：
    1.  `@docs/PROJECT_CHARTER.md`
    2.  `@docs/USER_STORIES.md`
    3.  `@docs/ARCHITECTURE.md`
    4.  `@docs/DATABASE_SCHEMA.md`

---

## 你的任務與產出要求 (Your Task & Output Requirements)

請生成一份**單一的 `YAML` 格式文件**，並嚴格遵循以下所有規範與結構：

### 1. 基礎元數據 (Metadata - `info` & `servers`)
-   **`info` 物件**: 包含一個完整的 `info` 區塊，需有 `title`, `description` (從專案章程提取), `version` (使用 `1.0.0`)。
-   **`servers` 陣列**: 至少定義兩個伺服器 URL：一個用於本地開發 (`http://localhost:5000/api/v1`)，另一個用於生產環境 (`https://api.mindtrack.app/api/v1`)。

### 2. 安全機制 (Security - `securitySchemes`)
-   在 `components` 中定義一個名為 `BearerAuth` 的 `securityScheme`。
-   規格需為 `type: http`, `scheme: bearer`, `bearerFormat: JWT`。

### 3. 可複用元件 (Reusable Components)
-   **`schemas`**: 將 `@docs/DATABASE_SCHEMA.md` 中定義的所有資料模型，轉化為 OpenAPI 的 `schemas`。所有 API 路徑中用到的資料模型，**必須**透過 `$ref` 引用此處的定義。
-   **`responses` (標準化錯誤)**: 在 `components` 中，預先定義幾個可複用的標準錯誤響應，例如 `UnauthorizedError`, `NotFoundError`, `ValidationError`。這將用於所有 API 路徑，以確保錯誤格式的一致性。
-   **`parameters` (分頁)**: 在 `components` 中，定義兩個可複用的參數：`QueryLimit` (查詢數量) 和 `QueryOffset` (查詢偏移量)，用於所有需要返回列表的 GET 請求。

### 4. API 路徑定義 (API Paths - `paths`)
-   **資源**: 至少包含對 `Auth` (註冊/登入), `Habits` (習慣), `HabitCompletions` (打卡紀錄), `Moods` (心情) 四個核心資源的完整 CRUD 操作。
-   **RESTful 實踐**: 嚴格遵循 RESTful 設計原則，例如使用複數名詞命名資源 (`/habits`)，並正確使用 HTTP 動詞 (`GET`, `POST`, `PUT`, `DELETE`)。
-   **對每個路徑 (Path) 的要求**:
    -   **`tags`**: 為每個路徑分配合理的標籤（例如：`Authentication`, `Habits`）。
    -   **`summary`**: 提供一個簡短、清晰的操作摘要。
    -   **`operationId`**: 為每個操作提供一個**唯一**且有意義的 `operationId` (例如：`listHabits`, `createHabit`)，這對程式碼生成器至關重要。
    -   **`parameters`**: 引用 `components` 中定義的分頁參數（如適用）。
    -   **`requestBody` / `responses`**: 必須引用 `components` 中定義的 `schemas` 和標準錯誤響應。
    -   **`security`**: 對所有需要認證的端點，應用前面定義的 `BearerAuth` 安全機制。
    -   **`examples`**: 為請求體 (requestBody) 和成功響應 (responses) 提供有意義的範例資料。

### 5. 最終產出指令 (Final Output Command)
-   **執行動作**: 將以上所有內容生成為一份完整的 YAML 文件，命名為 `API_SPEC.yml`，並放置於 `@docs` 資料夾內。
```

### Step 2：迭代與分析我們的 AI 產出

老規矩，AI 給的永遠是草稿。在你與 AI 經過幾輪的迭代優化後，最終你會得到一份高品質的定稿文件，就像下面這樣：

### 【AI 生成文件範例(簡略備註版本)】

### 【文件重點深度剖析】

```yaml
# 使用 OpenAPI 3.0.3 標準
openapi: 3.0.3

# --- API 基本資訊 ---
# 提供 API 的整體描述、標題和版本號
info:
  title: MindTrack API
  description: >-
    一個旨在幫助使用者追蹤好習慣、記錄每日心情，並透過視覺化洞察揭示行為與感受之間關聯的 Web
    應用程式。我們的願景是打造一個最直覺、最富有洞察力的個人成長工具。
  version: 1.0.0

# --- 伺服器資訊 ---
# 定義 API 的不同環境，例如開發和生產環境
servers:
  - url: http://localhost:5000/api/v1
    description: 本地開發伺服器

# --- API 路由 (Endpoints) ---
# 這裡是 API 功能的核心，定義了所有可用的 URL 路徑和對應的 HTTP 方法
paths:
  # --- 使用者認證 (Authentication) ---
  /auth/register:
    post:
      tags:
        - Authentication
      summary: 註冊新使用者
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/UserCredentials'
      responses:
        '201':
          description: 使用者成功建立
          ...
        '400':
          $ref: '#/components/responses/ValidationError'

  /auth/login:
    post:
      tags:
        - Authentication
      summary: 使用者登入
      ...

  # --- 習慣 (Habits) 管理 ---
  /habits:
    get:
      tags:
        - Habits
      summary: 獲取當前使用者的所有習慣
      security:
        - BearerAuth: []
      parameters:
        - $ref: '#/components/parameters/QueryLimit'
        - $ref: '#/components/parameters/QueryOffset'
      responses:
        '200':
          description: 成功返回習慣列表
          ...
    post:
      tags:
        - Habits
      summary: 建立一個新習慣
      ...

  /habits/{habitId}:
    parameters:
      - name: habitId
        in: path
        required: true
        ...
    get:
      summary: 根據 ID 獲取特定習慣
      ...
    put:
      summary: 根據 ID 更新特定習慣
      ...
    delete:
      summary: 根據 ID 刪除特定習慣
      ...

  # --- 習慣與心情紀錄 ---
  /habit-logs:
    post:
      summary: 為指定習慣新增一筆完成紀錄 (打卡)
      ...

  /mood-logs:
    post:
      summary: 新增或更新當日的心情紀錄
      ...

# --- 可重用元件 (Components) ---
# 定義可以在 API 各處重複使用的元素，例如資料模型、參數和安全機制
components:
  # 安全性方案：定義如何進行身份驗證，這裡是使用 JWT Bearer Token
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT

  # 可重用參數：例如用於分頁的 limit 和 offset
  parameters:
    QueryLimit:
      name: limit
      in: query
      ...
    QueryOffset:
      name: offset
      in: query
      ...

  # 可重用回應：定義通用的 API 回應，如 401 未授權、404 找不到等
  responses:
    UnauthorizedError:
      description: 認證失敗或缺少憑證
      ...
    NotFoundError:
      description: 找不到指定的資源
      ...
    ValidationError:
      description: 請求的資料格式無效
      ...

  # 資料模型 (Schemas)：定義 API 中使用的資料結構
  schemas:
    UserCredentials:
      type: object
      properties:
        email:
          type: string
          format: email
        password:
          type: string
          format: password

    User:
      type: object
      properties:
        id:
          type: integer
        email:
          type: string
        ...

    Habit:
      type: object
      properties:
        id:
          type: integer
        name:
          type: string
        ...

    HabitInput:
      ...
    HabitLog:
      ...
    HabitLogInput:
      ...
    MoodLog:
      ...
    MoodLogInput:
      ...

    Error:
      type: object
      properties:
        code:
          type: string
        message:
          type: string
```

- **專業的資源劃分 (`tags`)**：這份文件不再是把所有 API 混在一起，而是透過 `tags`，將 API 清楚地劃分為 `Auth`, `Habits`, `Habit Trackings` 等幾個獨立的資源群組，這讓文件變得極其清晰、易於查找。
- **安全第一 (`securitySchemes`)**：這是本次升級的亮點！AI 為我們加入了 `securitySchemes` 區塊，定義了一個名為 `BearerAuth` 的 JWT 認證機制。接著，在所有需要登入才能操作的端點（例如 `GET /habits`）下方，都加上了 `security: - BearerAuth: []`。這清楚地宣告了：「嘿，前端！要呼叫這個 API，你必須在請求的標頭 (Header) 裡，附上有效的登入 Token 才行！」
- **輸入與輸出的分離 (`Habit` vs `HabitInput`)**：這是專業 API 設計的精髓！AI 知道，前端「傳送」的資料（例如新增習慣時），和後端「回傳」的資料（包含了 `id`, `created_at` 等伺服器生成的欄位）是不一樣的。因此，它貼心地為我們建立了 `Habit`（輸出用）和 `HabitInput`（輸入用）兩種不同的 Schema，這種嚴謹的區分能避免很多潛在的錯誤。
- **滴水不漏的細節定義 (`paths`)**：在每個 `path` 底下，AI 都鉅細靡遺地定義了所有細節：`summary` (一句話總結), `parameters` (路徑參數), `requestBody` (請求內容), 以及 `responses` (多種可能的回應)。特別是 `example` 的提供，讓前端開發者不用猜，就能立刻知道會收到什麼樣的資料！

那這份文件我放在文章中是放簡略的版本，畢竟完整版太長了！完整版本 可以直接到這邊來做查看：https://github.com/eric861129/2025iThome-HabitMoodApp/blob/main/docs/API_SPEC.yml


---

## Part 3：將 API 契約存檔

1. 建立本地檔案：
    
    回到 VS Code，在 docs 資料夾中建立新檔案 API_SPEC.yml（注意，副檔名是 .yml）。
    
    將 Gemini 生成並經過你迭代優化的最終內容，貼上並存檔。
    
2. **預覽專業 API 文件**：
    
    > 【小提示】：想看看這份 YAML 文件的威力嗎？你可以把內容貼到線上的 Swagger Editor，或是為 VS Code 安裝像是 Swagger Viewer 的擴充功能。你會立刻看到一份由你的文字幻化而成的、可以互動的華麗 API 文件網站！
    > 
3. **提交至 GitHub**：
    - 在原始碼管理頁面，對 `API_SPEC.yml` 按 `+` (Stage Changes)。
    - 輸入 Commit 訊息: `docs: Add comprehensive OpenAPI 3.0 specification`
    - 點擊打勾按鈕 (Commit)，然後同步變更 (Push)。

## 結語：後端藍圖，大功告成！

太神了！至此，我們「後端藍圖」的所有規劃文件，已經全部設計完成！回顧一下我們這五天產出的豐碩成果：

- **Day 5: 專案章程** (定義了方向)
- **Day 6: 使用者故事** (釐清了需求)
- **Day 7: 軟體架構** (搭建了骨架)
- **Day 8: 資料庫綱要** (規劃了數據)
- **Day 9: API 規格書** (確立了契約)

我們手上現在握著一套完整、清晰、專業的開發藍圖。

從明天開始，我們就要切換角色，從「領航員」變身為「引擎手」！我們將正式告別文件，拿起我們的魔法法杖 Gemini CLI，開始 Vibe Coding，將我們過去五天精心設計的藍圖，一行行地變成真實可運行的程式碼！第一步，就是用 CLI 生成我們的伺服器骨架與資料模型！敬請期待！
