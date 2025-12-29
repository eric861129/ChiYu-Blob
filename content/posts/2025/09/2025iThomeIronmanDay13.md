+++
title = "Day 13: 【後端 #2】AI 建築師：依藍圖自動建構 CRUD API"
date = 2025-09-01
slug = "2025iThomeIronmanDay13"
dates = ["2025-09-01"]
tags = ["2025iThomeIronman", "Gemini", "Flask", "CRUD", "OpenAPI", "Swagger"]
series = ["2025iThomeIronman"]
categories = ["後端開發"]
weight = 13
prev_post_slug = "2025iThomeIronmanDay12"
next_post_slug = "2025iThomeIronmanDay14"
draft = false
description = "今天我們將扮演「專案總建築師」，把詳細的「設計藍圖 (API_SPEC.yml)」交給 AI 首席工程師，命令它根據藍圖建構完整的 Habits 資源模組。"
+++

安安，我是 ChiYu！歡迎來到 Vibe Coding 協奏曲的第一個最大的開發項目！

昨天，我們用一個指令召喚出了整個專案骨架。今天，我們要進行一次令人振奮的專案升級。我們將扮演一位「**專案總建築師**」，把詳細的「**設計藍圖 (API_SPEC.yml)**」交給我們的 AI 首席工程師，命令它根據藍圖，將完整的「習慣 (Habits)」資源模組，精準地**建構**到我們現有的專案結構中！

而在工程完工後，我們還需要一套最先進的「**驗收工具**」，來驗證成果是否符合藍圖規範。而這套工具的安裝與設定，我們同樣要交給 AI 來完成！

## Part 1：Vibe Coding 實戰：下達「程式碼建構」指令

專案藍圖已備妥，讓我們打開終端機，指揮我們的 AI 首席工程師開始施工。

### 【實戰魔法詠唱：我們的 Prompt】

```markdown
# 角色 (Role)

你是一位資深的 Python 後端工程師，專精於 Flask 框架與 API 開發。
你擁有豐富的經驗，能夠根據 OpenAPI 規格書，快速、精準地建構出穩定、
安全且符合業務邏輯的後端程式碼。你擅長使用 SQLAlchemy 進行資料庫操作，
並習慣撰寫清晰、可維護的程式碼。

# 目標 (Objective)

你的任務是，根據提供的 `API_SPEC.yml` 規格書與相關設計文件，
在一個已存在的 Python Flask 專案結構中，實作所有 API 端點的後端業務邏輯。
你將直接修改指定的 Python 檔案，
填入完整、可執行、生產級別 (Production-Ready) 的程式碼。

# 上下文與關鍵資訊 (Context & Key Information)

* **OpenAPI 規格書 (OpenAPI Specification)**: 檔案位於 `[請提供 API_SPEC.yml 的相對路徑或內容]`。這是定義所有 API 端點、路徑、方法、請求/回應模型的唯一真實來源 (Single Source of Truth)。
* **專案結構 (Project Structure)**: 你將在一個已建立的 Flask 專案中工作。主要的修改目標是 `[請提供目標 Python 檔案的具體路徑，例如：app/api/habits.py, app/api/users.py]` 目錄下的檔案。
* **資料庫模型 (Database Models)**: 所有與資料庫互動的操作，都必須使用定義在 `app/models.py` 中的 SQLAlchemy 模型。檔案路徑：`[請提供 app/models.py 的相對路徑或內容]`。
* **業務邏輯與設計文件 (Business Logic & Design Documents)**: 為了完整理解 API 背後的業務規則與使用者流程，請務必參考以下文件：`[請列出所有相關設計文件、流程圖、使用者故事等的路徑或內容]`。
* **技術棧 (Tech Stack)**:
* 後端框架 (Backend Framework): Python Flask
* ORM: SQLAlchemy
* `[請補充：其他關鍵函式庫或框架，例如 Flask-RESTx, Marshmallow, Flask-Login 等]`

# 產出格式與要求 (Output Format & Requirements)

* **直接實作程式碼**: 你不需要產生報告或說明文字。你的最終產出，是直接在指定的 Python 檔案中，完成所有 API 視圖函式 (View Functions) 的實作。
* **完整性 (Completeness)**: 每個函式都必須是完整、可執行的。這包括：
1. 接收並驗證請求參數 (路徑參數、查詢參數、請求體)。
2. 執行必要的業務邏輯。
3. 使用 SQLAlchemy Session 進行資料庫查詢、新增、更新或刪除操作。
4. 實作完整的錯誤處理 (例如：資源未找到回傳 404，請求無效回傳 400)。
5. 根據規格書建構成功時的回應 (JSON 格式與對應的 HTTP 狀態碼)。
* **函式簽名**: 函式的參數與回傳值，必須與 `API_SPEC.yml` 中定義的請求與回應結構嚴格對應。
* **測試**: 我會使用Swagger UI，需要安裝Swagger UI 相關設定。

# 限制與風格 (Constraints & Style)

* **嚴格遵循規格**: 絕對不允許創造 `API_SPEC.yml` 中未定義的 API 端點或回應欄位。所有實作都必須是規格的直接體現。
* **不建立新檔案**: 除非特別指示與需求，否則不要任意建立新的 Python 檔案。在現有的檔案結構中進行修改。
* **註解風格**: 必須在每一個 API 視圖函式的正上方，加上一行簡潔的「繁體中文」註解，用來說明該端點的主要功能。
* **程式碼風格**: 遵循 PEP 8 編碼風格。優先考慮程式碼的清晰度、可讀性與可維護性。
* **安全性**: 程式碼需考慮基本安全性。對所有來自客戶端的輸入都應視為不可信，並進行適當的驗證或清理。
```

## Part 2：用 Git Diff 審核建構成果

AI 完成建構後，點擊 VS Code 左側的「原始碼管理」圖示，選擇 `app/api/habits.py`。VS Code 會立刻為你打開一個「差異比對 (Diff)」視窗，左邊是施工前，右邊是施工後，所有新增的程式碼都一目了然。

這就是我們身為開發者的核心價值：我們不需親手寫每一行，但我們必須具備審核 (Code Review) 與驗收的能力。

## Part 3：AI 助理：自動化架設「互動式 API 驗收平台」

AI 的建構成果非常成功，程式碼也通過了我們的初步審核。但身為總建築師，我們信奉「眼見為憑」。在合併程式碼之前，我們需要一個專業的工具來進行「實彈驗收」。

這個工具就是 Swagger UI。而它的安裝設定，我們當然也要交給 AI 助理來完成！

繼續在 gemini chat 模式中，下達我們的第二道指令：

### 【魔法詠唱：安裝 Swagger UI】

```markdown
### # 角色 (Role)

你是一位聰明的開發助理，擅長處理 Python 專案的依賴管理與 Flask 框架的設定。

### # 目標 (Objective)

請為我目前的 Flask 專案，整合並設定好 `Flask-Swagger-UI`，以便我能透過網頁介面來測試 API。

---

### ## 你的任務與產出要求 (Your Task & Output Requirements)

請依序執行以下所有操作：

1. **安裝套件**:
    - 將 `Flask-Swagger-UI` 新增到 `requirements.txt` 檔案的末尾。
    - 執行 `pip install -r requirements.txt` 來安裝新增的依賴。
2. **設定應用程式**:
    - **修改 `@app/__init__.py` 檔案**。
    - 在檔案中導入 `get_swaggerui_blueprint`。
    - 參考官方文件，設定好 Swagger UI 的 Blueprint，讓它在 `/api/docs` URL 下生效，並指向 API 規格文件。
3. **準備規格文件**:
    - 建立一個名為 `static` 的新資料夾 (如果它不存在)。
    - 將 `@docs/API_SPEC.yml` **複製**一份到 `static` 資料夾中。

請一步步完成，確保所有設定都正確無誤。
```

看著 AI 像一位熟練的 DevOps 工程師，自動幫你修改文件、安裝套件、設定程式碼，這就是未來！

## Part 4：用 Swagger UI 進行實彈驗收

萬事俱備！審核通過的程式碼加上 AI 自動架設的專業驗收工具，是時候確認最終成果了！

1. **啟動伺服器**：在終端機執行 `flask run`。
2. **打開瀏覽器**，訪問 http://127.0.0.1:5000/api/docs。你將看到華麗的 Swagger UI 介面！
3. **測試 `POST /habits`**：
    - 在 `Habits` 區塊下，找到綠色的 `POST /habits`，點擊展開它。
    - 點擊右上角的 `Try it out` 按鈕。
    - 修改下方的 `Request body`，例如：`{ "name": "每日閱讀 20 頁" }`。
    - 點擊 blue 的 `Execute` 按鈕！
    - 向下滑動，看到 Server response 中出現 `Code 201` 和成功建立的資料，就代表驗收通過！
4. **測試 `GET /habits`**：
    - 展開藍色的 `GET /habits`。
    - 同樣點擊 `Try it out` -> `Execute`。
    - 你應該能在 `Response body` 中看到一個包含了剛剛新增習慣的陣列。
5. **繼續測試 `PUT` 和 `DELETE`**：用同樣的方式，嘗試更新或刪除你剛剛建立的習慣，看看是否一切運作正常！

是不是超酷的？我們不只讓 AI 寫了 Code，還讓它幫我們架設了測試平台，最後由我們親手完成最終的品質驗收！

## Part 5：提交我們的豐碩成果

測試通過，完美！

Commit 訊息: `feat: Implement full CRUD for habits and setup Swagger UI via AI`

Commit & Push！

## 結語：後端核心竣工！

太神啦！今天，我們完整體驗了一次最前沿的 AI 協作開發流程。我們扮演「建築師」規劃藍圖，由「AI 工程師」負責施工與工具架設，最後由我們親自完成「品質驗收」。

至此，我們專案後端最核心的功能已經全部完工！

我們的後端架構現在功能齊全，但每次都要靠人工來驗收，還是太慢了。明天，我們就要導入現代化的管理流程，為我們的專案聘請一位 24 小時全年無休的自動化「衛生稽查員」——設定 GitHub Actions，來自動化我們的程式碼品質檢查！
