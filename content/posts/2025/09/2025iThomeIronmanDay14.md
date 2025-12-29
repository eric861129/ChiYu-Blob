+++
title = "Day 14: 【DevOps #1】AI 品管員：設定 GitHub Actions 自動化程式碼檢查"
date = 2025-09-02
slug = "2025iThomeIronmanDay14"
dates = ["2025-09-02"]
tags = ["2025iThomeIronman", "Gemini", "GitHub Actions", "CI", "Linting", "flake8"]
series = ["2025iThomeIronman"]
categories = ["DevOps"]
weight = 14
prev_post_slug = "2025iThomeIronmanDay13"
next_post_slug = "2025iThomeIronmanDay15"
draft = false
description = "今天我們就要來幫專案請一位 24 小時不休息的稽查員—— GitHub Actions ，順便設定好我們的第一條自動化品管流程 (CI)！"
+++

安安，我是 ChiYu！

我們前幾天火力全開，後端 API 核心功能都搞定了。我們的後端架構現在什麼功能都做得出來！但問題來了，我們怎麼保證每個工程師（當然也包括幾週後的你自己！）在添加新功能時，都遵守一樣的編碼標準跟架構美學？

光靠口頭約定絕對不夠，我們需要一套自動的、鐵面無私的「 **品質稽查系統** 」。只要有新的程式碼被提交 (`commit`)，系統就自動進行檢查，確保一切都符合最高標準！

今天，我們就要來幫專案請一位 24 小時不休息的稽查員—— **GitHub Actions** ，順便設定好我們的第一條自動化品管流程 (CI)！

## Part 1：什麼是 CI？為什麼要從「程式碼風格」開始？

`CI` (Continuous Integration)，持續整合，是現代軟體開發的基本功！它的精神就是「沒事多 commit，多 commit 沒事」。每次完成一小塊功能，就提交上來讓系統檢查，這樣才不會到最後要合併時，大家的程式碼風格迥異、互相衝突，那簡集是開發地獄！

我們要派給這位品管員的第一個任務，非常基礎，就是 **「檢查程式碼乾不乾淨 (Linting)」**！這就好像檢查建築的管線有沒有外露、牆面是否平整一樣。我們要讓所有的 Code 都遵循 Python 的官方風格指南 (`PEP 8`)，看起來整整齊齊、清爽漂亮！

## Part 2：Vibe Coding 實戰：聘請 AI 撰寫「自動化工作手冊」

準備好了嗎？又到了我們使喚 Gemini 的快樂時光！把它當成我們的 DevOps 專家，來幫我們撰寫那份詳細的工作手冊 (`.yml` 檔) 吧！

### Step 1: 命令 AI 準備「稽查工具清單」

第一步，我們要先列一張「工具清單 (`requirements.txt`)」，告訴我們的稽查員執行任務時需要哪些工具。這點小事，當然也是丟給 AI 去做！

打開終端機，切換到 gemini chat 模式，下達我們的第一道指令：

### 【魔法詠唱：生成依賴文件】

```markdown
# 角色 (Role)

你是一位經驗豐富的 Python 開發者，非常熟悉使用 `requirements.txt` 來管理專案的相依性套件，並了解區分「生產環境依賴」與「開發環境依賴」的最佳實踐。

# 目標 (Objective)

請為一個 Python 專案生成 `requirements.txt` 檔案的完整內容。此檔案需要包含所有必要的生產環境依賴以及用於程式碼風格檢查的開發依賴。

# 上下文與關鍵資訊 (Context & Key Information)

  * **專案類型**: Python Web API (基於 Flask 框架)。
  * **任務背景**: 這是為專案設定 CI/CD 工作流的前置準備工作，第一步是定義程式碼風格檢查所需的工具。
  * **生產環境依賴 (Application Dependencies)**:
      * `Flask`
      * `Flask-SQLAlchemy`
      * `Flask-Migrate`
      * `python-dotenv`
      * `Flask-Swagger-UI`
  * **開發環境依賴 (Development Dependencies)**:
      * `flake8`

# 產出格式與要求 (Output Format & Requirements)

1.  **檔案內容**: 請直接生成或修改 `requirements.txt` 檔案的內容，不要有任何額外的解釋或對話。
2.  **程式碼區塊**: 產出的所有內容都必須被包裹在一個 `text` 或 `bash` 程式碼區塊中 (` text ...  `)，以便我可以直接複製。
3.  **註解分隔**: 為了提高可讀性，請在檔案中使用註解（`#`）來明確區分「生產環境依賴」和「開發環境依賴」。
4.  **排序**: 每個區塊內的套件請按照字母順序排列。

# 限制與風格 (Constraints & Style)

  * **精確性**: 嚴格按照「上下文與關鍵資訊」中列出的套件清單生成，不要增加或刪減任何套件。
  * **格式標準**: 遵循 `pip` 對於 `requirements.txt` 檔案的標準格式，即每個套件佔一行。
  * **風格**: 簡潔、清晰、專業，產出內容需可立即投入生產環境使用。
```

AI 會立刻分析你的需求，咻一下就幫你把 `requirements.txt` 檔案生出來，乾淨俐落！

### Step 2: 命令 AI 撰寫「稽查SOP (Workflow)」

工具清單有了，再來就是重頭戲！我們要來寫 GitHub Actions 的「標準作業流程 (SOP)」了。繼續在 chat 模式中，詠唱我們的第二道咒語：

### 【魔法詠唱：生成 CI 工作流】

```markdown
# 角色 (Role)

你是一位資深的 DevOps 工程師，專精於為 Python 專案建構 CI/CD 工作流，尤其擅長使用 GitHub Actions 進行自動化測試與程式碼品質控管。

# 目標 (Objective)

請為一個 Python Flask API 專案，生成一個名為 `ci.yml` 的 GitHub Actions 工作流設定檔。此設定檔的目標是建立一個基礎的持續整合 (Continuous Integration, CI) 流程，並將程式碼風格檢查作為其第一個核心步驟。

# 上下文與關鍵資訊 (Context & Key Information)

  * **專案類型**: Python Flask API
  * **CI/CD 平台**: GitHub Actions
  * **核心任務**: 建立工作流的第一步：程式碼風格檢查。
  * **執行者**: 此 YAML 檔案將交付給 Gemini CLI 進行生成，並由我進行最終審查。
  * **[專案的相依性管理方式與檔案參考 requirements.txt]**
  * **[觸發此 CI 工作流的具體 Git 事件，例如 `push`到`main`分支時]**

# 產出格式與要求 (Output Format & Requirements)

1.  **檔案格式**: 請直接產出完整的 `ci.yml` 檔案內容。
2.  **程式碼區塊**: 最終的 YAML 內容必須被包裹在一個 `yaml` 程式碼區塊中 (` yaml ...  `)。
3.  **註解**: 請在 YAML 檔案的關鍵步驟中，加入清晰、簡潔的中文註解，說明該步驟的目的（例如：`# 簽出程式碼`、`# 設定 Python 環境`、`# 安裝專案依賴`、`# 執行程式碼風格檢查`）。
4.  **結構清晰**: YAML 檔案的結構應遵循 GitHub Actions 的最佳實踐，保持良好的可讀性與可維護性。

# 限制與風格 (Constraints & Style)

  * **專注於單一任務**: 目前僅需專注於「程式碼風格檢查」這個步驟，暫時不要加入單元測試、部署等其他階段。
  * **語法正確**: 確保產出的 YAML 語法完全正確，可直接存放於專案的 `.github/workflows/` 目錄下使用。
  * **風格**: 專業、嚴謹、符合工程標準。
```

AI 會再次出動，超精準地在對的位置，幫你建好那份完美的 `ci.yml`！

## Part 3：把「稽查員」派上雲端... 然後看著它失敗！

SOP 看起來沒問題！是時候把我們的稽查員派上雲端，叫他開始上班啦！

1. **提交變更**: 在 VS Code 的原始碼管理頁面，將 `requirements.txt` 和 `.github/workflows/ci.yml` 都按 `+` (Stage Changes) 加進去。
2. **Commit 訊息**: `ci: Add initial GitHub Actions workflow for linting`
3. **Commit & Push**！

一推上去，馬上飛奔到你的 GitHub 倉庫頁面，點一下上面的「Actions」頁籤。
你會看到你的 commit 旁邊有個黃色的小圈圈在轉...但很快，它就變成了一個刺眼的紅色叉叉！

![GitHub Actions 失敗範例](https://ithelp.ithome.com.tw/upload/images/20250902/20132971wvQ1nCXP0p.jpg)

先別慌！這不是失敗，這代表我們的稽查員 **「成功上工」**了！ 它真的幫我們找到了問題！這正是我們要的！

## Part 4：AI 偵錯實戰：讓 AI Agent 成為你的除錯專家

現在，讓我們來體驗 Vibe Coding 最強大的地方：讓 AI 幫我們解決問題。

### Step 1: 在 VS Code 中直接查看「稽查報告」

與其一直切換到瀏覽器，不如讓情報直接送到我們手上！我們可以安裝一個超讚的 VS Code 擴充功能，讓我們在編輯器裡就能看到 CI 的狀況。

> 【專業工具箱】
> 
>  **VS Code 擴充功能**: GitHub Actions (由 GitHub 官方出品)
> 
> 安裝它之後，點擊 VS Code 左側活動列的 GitHub 圖示，你就可以直接看到所有 Workflow 的運行狀態，點擊失敗的項目還能直接查看 Log，超級方便！

從擴充功能或 GitHub 網頁上，點進失敗的 `lint` 工作，複製 `Run flake8 .` 步驟下的整段錯誤訊息。

### Step 2: 命令 AI Agent 進行「根本原因分析」並修復

回到 VS Code 的 gemini chat 模式，我們要下達一個「偵錯指令」：

### 【魔法詠唱：AI 偵錯與修復】

```markdown
我的 GitHub Actions CI 工作流在 flake8 步驟失敗了。

這是我從日誌中複製的完整錯誤訊息：

`[在這裡貼上你剛剛從 GitHub 複製的整段錯誤訊息]`

請幫我執行以下任務：

1. **分析錯誤**: 閱讀上面的日誌，用簡單的中文向我解釋錯誤的根本原因是什麼。
2. **自動修復**: 直接修改專案中所有存在這些 `flake8` 錯誤的檔案，將它們全部修正。
```

當你按下 Enter，奇蹟發生了。AI 會先給你一段分析報告，例如：

> ✦ 好的，我分析了您提供的 flake8 錯誤日誌。
> 
> 根本原因分析：
> 
> 錯誤主要集中在 app/api/auth.py 和 app/api/moods.py 這兩個檔案中。原因是我們在建立 Blueprint 骨架時，導入了 jsonify 和 request 模組，但目前的 placeholder 函式中並未使用到它們，這違反了 F401 '...' imported but unused (導入了但未使用) 的規則。
> 
> 我將開始為您自動修復這些檔案，移除未被使用的導入。

接著，它會直接執行檔案修改操作！

## Part 5：再次提交，迎接綠色勾勾！

AI 修復完畢後，再次回到原始碼管理頁面，你會看到 AI 幫你修改好的檔案。

1. **Commit 訊息**: `fix: Resolve flake8 linting errors identified by CI`
2. **Commit & Push**！

再次回到 GitHub Actions 頁面（或 VS Code 擴充功能），你會看到一個新的 Workflow 正在運行。這次，稍待片刻... 你將會看到一個得來不易、充滿成就感的綠色勾勾！就算再出現錯誤也沒事，我們就重複這個「CI 發現問題 -> AI 分析修復」的循環，直到完美為止！

![GitHub Actions 成功範例](https://ithelp.ithome.com.tw/upload/images/20250902/20132971zqYUtXM6ql.jpg)

## 結語：不只自動化，更是「自我修復」

恭喜啦！今天我們完成了一次驚人的進化！我們不只設定了自動化品管，更學會了如何利用 AI，建立一個「 **發現問題 -> 分析問題 -> 自動修復**」的強大開發循環！

程式碼寫得漂亮只是第一步，更重要的是...它跑起來到底對不對啊？我們的 API 邏輯真的沒問題嗎？

明天，我們就要來搞個更厲害的「安全網」！我們要來玩 **自動化測試 (Pytest)**，還要叫 Gemini 幫我們寫測試案例，確保我們的 API 永遠都乖乖的照我們想的樣子運作！
