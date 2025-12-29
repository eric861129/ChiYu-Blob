+++
title = "Day 12: 【後端 #1】起手式：AI 代理人 生成模組化的 Flask 專案"
date = 2025-08-31
slug = "2025iThomeIronmanDay12"
dates = ["2025-08-31"]
tags = ["2025iThomeIronman", "Gemini", "Flask", "Scaffolding", "Backend", "Python"]
series = ["2025iThomeIronman"]
categories = ["後端開發"]
weight = 12
prev_post_slug = "2025iThomeIronmanDay11"
next_post_slug = "2025iThomeIronmanDay13"
draft = false
description = "今天我們將命令 AI 代理人，根據設計好的「模組化專案結構」，一步到位地為我們生成整個後端專案的基礎架構。"
+++

安安，我是 ChiYu！歡迎來到歷史性的一刻！

過去一週，我們是專案的「規劃師」，用文字和圖表描繪著未來。從今天起，我們是「建築師」與「魔法師」，要將那些平面的藍圖，用程式碼，一行一行地「召喚」到這個世界上！

今天，我們不打算一個檔案一個檔案地慢慢來。我們要直接挑戰專業的作法！我們將命令 AI 代理人，根據我們 Day 8 設計的「模組化專案結構」，一步到位地為我們生成整個後端專案的基礎架構，包含所有資料庫模型的定義！

## Part 1：為什麼要一開始就這麼「搞剛」？

你可能會問，為什麼不先從一個簡單的檔案開始，之後再慢慢改？

**因為專業的習慣，從第一天就要養成。**

我們在 Day 7 設計的**「應用程式工廠 (Application Factory)」**模式，雖然看起來檔案比較多，但它為我們專案的未來，鋪設了一條康莊大道。這種結構能幫助我們將專案的不同部分（如設定、資料庫模型、API 路由）清晰地分開，讓專案更有條理、更容易測試與擴展。

從一開始就採用這種專業結構，就像是蓋房子時，直接把客廳、臥室、廚房的隔間都規劃好，而不是先蓋一個大通鋪，之後再來敲牆壁。

## Part 2：Vibe Coding 實戰：命令 AI 代理人建立專案

好了，讓我們來指揮 Gemini，讓它為我們建立這座「中央廚房」。這次，我們不只要求它生成文字，**我們要命令它直接行動！**

### Step 1：進入互動模式並下達總指令

我們要使用 `gemini chat` 互動模式，因為這最能模擬我們與一位「代理人」進行對話的感覺。

1. 在 VS Code 終端機中，輸入 `gemini chat` 並按下 Enter。
2. 看到 `>>>` 提示符後，詠唱我們的「專案創世」咒語：

### 【魔法詠唱：我們的 Prompt】

```markdown
# ---------------------------------------------------------------------------
# PROMPT FOR GEMINI: Production-Ready Flask Project Scaffolding Agent
# ---------------------------------------------------------------------------

# 角色 (Role)
你是一位精通 Python Flask 專案架構與 Shell 指令的 AI Code Scaffolding Agent。你的核心任務是根據設計文件，自動化地生成一個結構清晰、可立即執行的模組化 Flask 專案骨架。

# 目標 (Objective)
我的目標是讓你根據「軟體架構」與「資料庫綱要」文件，為我生成一個遵循業界最佳實踐的 Flask 專案。這個專案在生成後，應能立即安裝依賴並成功運行。

# 上下文 (Context)
-   **核心依據**: 你的所有操作都必須基於以下兩份文件的定義：
    1.  `@docs/ARCHITECTURE.md` (定義了專案結構與技術選型)
    2.  `@docs/DATABASE_SCHEMA.md` (定義了資料模型)

---

## 你的任務與產出要求 (Your Task & Output Requirements)

請直接在我的專案中，執行以下所有檔案系統操作與程式碼生成任務。

### 任務 1: 建立專案目錄結構 (Create Project Directory Tree)
請建立以下完整的目錄與空的 `__init__.py` 檔案，以確保它們被視為 Python 模組：
/
├── app/
│   ├── init.py
│   ├── api/
│   │   ├── init.py
│   │   ├── auth.py
│   │   ├── habits.py
│   │   └── moods.py
│   └── models.py
├── instance/
│   └── config.py
├── tests/
│   └── init.py
└── app.py

### 任務 2: 生成依賴與環境設定檔 (Generate Dependency & Env Files)
1.  **建立 `requirements.txt`**:
    
    Flask
    Flask-SQLAlchemy
    Flask-Migrate
    python-dotenv
    # Add other dependencies from ARCHITECTURE.md if mentioned
    
2.  **建立 `.flaskenv`**:
    
    FLASK_APP=app.py
    FLASK_ENV=development
    

### 任務 3: 撰寫核心檔案內容 (Generate Core File Contents)

**請為以下每個檔案生成指定的內容：**

1.  **`instance/config.py`**:
    -   建立一個 `Config` 類別，並定義 `SECRET_KEY` 和 `SQLALCHEMY_DATABASE_URI`（指向 `instance/app.db`）。

2.  **`app/models.py`**:
    -   **關鍵指令**: 導入 `Flask-SQLAlchemy` 的 `db` 物件。
    -   將 `@docs/DATABASE_SCHEMA.md` 中定義的**每一個資料表**，精確地轉譯為一個 `SQLAlchemy` 的 `Model` 類別。
    -   確保正確實現主鍵、外鍵、欄位類型，以及 `db.relationship` 來定義模型間的關聯。

3.  **`app/api/auth.py`, `habits.py`, `moods.py` (Blueprint 檔案)**:
    -   **為每個檔案**:
        -   導入 `Blueprint` 和 `jsonify`。
        -   建立一個對應的 Blueprint (例如: `auth_bp = Blueprint('auth', __name__)`)。
        -   **關鍵指令**: 根據 `@docs/USER_STORIES.md` 或 `@docs/API_SPEC.yml` (如果存在) 的內容，為該資源的**每個核心 API 端點**建立一個空的路由函式。
        -   每個路由函式目前只需返回一個簡單的 JSON 確認訊息，例如 `return jsonify(message="Auth endpoint OK"), 200`。

4.  **`app/__init__.py` (應用程式工廠)**:
    -   **關鍵指令**: 實現 **應用程式工廠模式 (Application Factory Pattern)**，建立一個名為 `create_app` 的函式。
    -   在 `create_app` 函式內部：
        -   初始化 Flask app。
        -   從 `instance/config.py` 載入設定。
        -   初始化 `Flask-SQLAlchemy` 和 `Flask-Migrate` 擴充套件。
        -   **導入並註冊** `auth`, `habits`, `moods` 這三個 Blueprint。
        -   返回 `app` 實例。

5.  **`app.py` (專案進入點)**:
    -   從 `app` 模組導入 `create_app` 工廠函式。
    -   呼叫 `create_app()` 來建立應用程式實例。
    -   在 `if __name__ == '__main__':` 區塊中，運行 `app.run()`。

### 最終確認
-   請確保所有生成的程式碼檔案都互相正確引用（例如，`__init__.py` 正確導入並註冊了 Blueprints），使得整個專案在安裝 `requirements.txt` 後，可以透過 `flask run` 指令無錯誤地啟動。

```

### 

### Step 2：審核並授權 AI 的行動計畫 (指揮官的最終確認)

在正式開發時，輸入了上面的Prompt可能就會出現下面這段文字:

```markdown
✦ 好的，身為 Flask 專案建構代理 (Scaffolding Agent)，我將根據您的設計文件，為您自動化地建立一個結構清晰、可立即執行的專案骨架。

  我將開始執行一系列的檔案系統與程式碼生成操作。

  任務 1: 建立專案目錄結構

  首先，我將建立您指定的專案目錄與空的 __init__.py 檔案。
 ╭───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
 │ ?  Shell mkdir app && mkdir app\api && mkdir instance && mkdir tests && echo. > app\__init__.py && echo. > app\api\__init__.py &&… ←  │
 │                                                                                                                                       │
 │   mkdir app && mkdir app\api && mkdir instance && mkdir tests && echo. > app\__init__.py && echo. > app\api\__init__.py               │
 │   && echo. > app\api\auth.py && echo. > app\api\habits.py && echo. > app\api\moods.py && echo. > app\models.py && echo. >             │
 │    instance\config.py && echo. > tests\__init__.py && echo. > app.py                                                                  │
 │                                                                                                                                       │
 │ Allow execution of: 'mkdir, echo.'?                                                                                                   │
 │                                                                                                                                       │
 │ ● 1. Yes, allow once                                                                                                                  │
 │   2. Yes, allow always ...                                                                                                            │
 │   3. No, suggest changes (esc)                                                                                                        │
 │                                                                                                                                       │
 ╰───────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
⠏ Waiting for user confirmation...
```

> 這邊開始 會需要我們授權AI 進行動作，如果看得懂內容，會建議大家先閱讀過AI要幫我們做什麼，再去同意，那同意可以選擇只同意這一次或是該選項永遠同意，當然如果懶的話，在可控狀況下可以開啟YOLO模式（快速開啟可以使用Ctrl + Y）跳過這個授權的詢問，直接讓AI幫我們處理完全部的任務。
> 

## Part 3：與 AI 對話：成為專案的「程式碼考古學家」

太棒了！我們的專案現在有了一個專業的結構。但對於初學者來說，看到突然冒出來的一堆檔案，肯定會一頭霧水。

別怕！這正是 Gemini CLI 作為「學習工具」最強大的地方。我們不需要自己去 Google 每個檔案的作用，我們可以直接問我們的 AI 代理人！

繼續在剛才的 `gemini chat` 模式中，讓我們來當個「程式碼考古學家」，一層層地挖掘出這個專案結構的秘密：

> 
> 
> 
> ### 【對話式學習範例】
> 
> - **你：** 你剛剛幫我建立了幾個檔案，可以簡單解釋一下 `app.py`和`app/__init__.py` 的差別和各自的角色嗎？
> - **AI：** 當然！... (AI 會給你清晰的解釋)
> - **你：** 原來如此。那請你詳細解釋一下 `app/models.py`裡面的`User`class，我想知道`db.relationship` 到底是什麼意思？請用一個簡單的比喻說明。
> - **AI：** 很好的問題！`db.relationship` 就像是... (AI 會用比喻的方式，讓你秒懂 ORM 的關聯)
> - **你：** 太酷了！最後，請解釋 `app/api/habits.py`裡的`Blueprint`是什麼？為什麼路由要寫成`@habits_bp.route`？
> - **AI：** `Blueprint` 是 Flask 用來組織... (AI 會解釋模組化的概念)
> 

看到了嗎？透過這種「提問-回答」的循環，我們不只得到了程式碼，更重要的是，**我們理解了這些程式碼**。這就像是有一個 24 小時待命的資深工程師，隨時可以回答你的任何問題。這才是 Vibe Coding 最有價值的學習模式！

## Part 4：請Gemini CLI 幫我們執行專案！

在執行完上面的指令後，AI可能會回覆我：

```markdown
✦ 專案骨架已全部生成完畢！

  您現在可以執行以下指令來安裝依賴並啟動專案：

   1. 安裝依賴:
   1     pip install -r requirements.txt
   2. 初始化資料庫遷移:

   1     flask db init
   2     flask db migrate -m "Initial migration."
   3     flask db upgrade
   3. 運行應用程式:

   1     flask run

  伺服器將會在 http://127.0.0.1:5000 上運行，並且 API 端點可以透過 /api/v1/... 訪問。
```

那我們可以直接請AI幫我們執行這些指令，安裝依賴並啟動專案。

```markdown

╭───────────────────────────────╮
│  > 你能夠幫我執行這些指令嗎?  │
╰───────────────────────────────╯

✦ 當然可以。我會一步步為您執行這些指令。

  首先，安裝專案所需的 Python 依賴。
 ╭────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
 │ ✔ Shell pip install -r requirements.txt (從 requirements.txt 檔案安裝所有必要的 Python 套件。)                                  │
 │   
 │             ///....中間省略                                                                                                     
 │                                                                                  
 │                                                                                                                                │
 ╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ 依賴安裝完成。

  接下來，我將初始化資料庫遷移環境。
 ╭────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
 │ ✔ Shell flask db init (初始化 Flask-Migrate，建立資料庫遷移所需的資料夾與設定。)                                              │
 │         中間省略
 │                                                                                                                                │
 ╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ 資料庫遷移環境已成功初始化。

  現在，我將根據您在 app/models.py 中定義的模型，建立第一個遷移腳本。
 ╭────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
 │ ✔ Shell flask db migrate -m "Initial migration." (根據 SQLAlchemy 模型自動生成資料庫綱要的遷移腳本。)                         │
 │                                                                                                                                │
 │               中間省略...
 │                                                                                                                                │
 ╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ 遷移腳本已生成。不過，輸出顯示「No changes in schema detected」，這有點出乎意料，因為我們已經定義了模型。這有時可能是因為
  db.create_all() 在 flask db migrate 之前被某種方式觸發了。

  不過沒關係，我將繼續執行 upgrade 命令，這會確保資料庫與模型同步。
 ╭────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╮
 │ ✔ Shell flask db upgrade (將遷移腳本應用到資料庫，建立或更新資料表。)                                                         │
 │                                      中間省略...
 │                                                                                                                                │
 ╰────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────────╯
✦ 資料庫更新命令已執行。現在資料庫綱要應該已經是最新的了。

  最後，我將為您啟動 Flask 開發伺服器。這個指令會持續運行，您可以隨時在終端機中按下 Ctrl+C 來停止它。

```

那我們可以到  `[http://127.0.0.1:5000](http://127.0.0.1:5000/)` 查看是否有在運行，當然我們現在什麼都沒開發只有基底專案，所以會顯示

```markdown
Not Found
The requested URL was not found on the server. If you entered the URL manually please check your spelling and try again.
```

上面這是以目前的專案是正常的，如果是無效的站台會顯示：

```markdown
無法連上這個網站
127.0.0.1 拒絕連線。
```

## Part 5：提交我們的專案地基

當你透過與 AI 的對話，對這個新結構有了充分的理解後，讓我們來完成今天的最後一步。

1. **Stage 變更**：將所有由 AI 建立的新檔案都按 `+`。
2. **Commit 訊息**：`feat: Generate initial modular project structure via AI agent`
3. **Commit & Push！**

## 結語：不只建立，更要理解

恭喜！今天，我們不只指揮 AI 為我們建立了一個專業、可擴展的應用程式架構，更學會了如何利用 AI 作為我們的專屬家教，來深入理解這個架構的每一個細節。

我們的廚房現在不只窗明几淨、井井有條，我們還拿到了一份完整的**「廚房導覽手冊」**。

有了這麼扎實的基礎，明天，我們終於要來為這個廚房點火，讓引擎真正地運轉起來！我們將學習如何啟動伺服器，並為我們的資料庫填充第一批測試數據！
