+++
title = "Day 15: 【後端 #3】API 測試：用 Gemini CLI 輔助撰寫 Pytest"
date = 2025-09-03
slug = "2025iThomeIronmanDay15"
dates = ["2025-09-03"]
tags = ["2025iThomeIronman", "Gemini", "Pytest", "Testing", "CI", "Python"]
series = ["2025iThomeIronman"]
categories = ["後端開發"]
weight = 15
prev_post_slug = "2025iThomeIronmanDay14"
next_post_slug = "2025iThomeIronmanDay16"
draft = false
description = "今天我們將引入自動化測試，指揮 Gemini 化身為測試工程師，為我們撰寫測試案例，並直接升級 CI 流程。"
+++

安安，我是 ChiYu！

昨天，我們的 CI 品管員 (GitHub Actions) 成功上崗，確保了所有程式碼的「風格」都符合最高標準。

但是，一本語法完全正確的食譜，不代表按照它做出來的菜就一定好吃。我們的專案，即使程式碼風格再優雅，如果 API 的商業邏輯出現錯誤，那依然是嚴重的品質問題。

今天，我們就要來建立一張更堅實的「 **安全網**」。我們將引入自動化測試，指揮 Gemini 化身為「 **測試工程師**」，為我們撰寫測試案例，並直接升級 CI 流程，確保我們的 API 邏輯永遠精準無誤！

## Part 1：告別「手動點點點」：為什麼需要自動化測試？

你可能會問：「我們不是已經用 Swagger UI 手動測試過 API 了嗎？」

手動測試在開發時很方便，但它有幾個致命缺點：**效率極低、容易遺漏、無法規模化**。當專案功能變多，你不可能每次修改後，都把所有 API 再手動點一次。

而自動化測試，就是「用程式碼來測試程式碼」。我們預先寫好一系列的「考卷」（測試案例），然後讓電腦在幾秒鐘內，自動「批改」我們的應用程式。

> 比喻來說：
> 
> 自動化測試就像是高空走鋼索表演底下的那張「**安全網**」。有了它，開發者才能充滿信心地在鋼索上快速前進、大膽地嘗試新動作（重構或新增功能）。因為我們知道，即使不小心失足（不小心改壞了舊功能），這張安全網也會立刻接住我們（測試會失敗並報錯），而不是讓我們直接摔到地上（等使用者回報 Bug）。

## Part 2：我們的測試武器：Pytest

`Pytest` 是 Python 世界中最受歡迎、也最簡單易用的測試框架。我們將用它來撰寫我們的「考卷」。

## Part 3：Vibe Coding 實戰：與 AI 測試工程師的協作

準備好了嗎？讓我們進入 gemini chat 模式，一步步指揮我們的 AI 測試工程師。

### Step 1: 命令 AI 設置「測試實驗室」

首先，我們要讓 AI 為我們準備好測試所需的環境。

### 【魔法詠唱：設置測試環境】

好的，我們準備為專案加入自動化測試。

請幫我執行以下任務：

1. **安裝測試框架**: 使用 `pip` 安裝 `pytest`。
2. **更新依賴清單**: 將 `pytest` 新增到 `requirements.txt` 的 `# Development dependencies` 區塊中。
3. **建立測試檔案**: 在 `tests` 資料夾中，建立一個空的測試檔案 `test_habits_api.py`。

AI 會立刻完成環境設定，乾淨俐落！

### Step 2: 命令 AI 撰寫「考卷 (Test Cases)」

實驗室搭好了，是時候讓 AI 根據我們的 API 規格書，來撰寫考卷了。

### 【魔法詠唱：生成測試案例】

```markdown
# 角色 (Role)

你是一位精通 Python、Flask 與 Pytest 的資深測試工程師，擁有豐富的 RESTful API 測試經驗。你擅長根據 API 規格書撰寫清晰、高效、且覆蓋全面的自動化測試案例，並遵循 Arrange-Act-Assert (AAA) 的最佳實踐。

# 目標 (Objective)

請基於下方提供的專案上下文與 API 規格，為 `Habits` API 的 `GET /habits` 和 `POST /habits` 這兩個端點，在指定的檔案 (`@tests/test_habits_api.py`) 中，擴寫 Pytest 測試案例。

# 上下文與關鍵資訊 (Context & Key Information)

  * **API 規格書**: `@docs/API_SPEC.yml` (請將此檔案作為主要參考依據)
  * **應用程式結構**: `@app/`
  * **目標修改檔案**: `@tests/test_habits_api.py`

  * **Endpoint 1: `GET /habits` (取得所有習慣)**
      * **成功情境 (Success Case)**:
          * 當資料庫中有習慣存在時，應回傳 `200 OK` 狀態碼。
          * 回應的 JSON body 應為一個包含多個「習慣物件」的列表。
      * **邊界情境 (Edge Case)**:
          * 當資料庫中沒有任何習慣時，應回傳 `200 OK` 狀態碼，且 JSON body 應為一個空列表 `[]`。

  * **Endpoint 2: `POST /habits` (新增一個習慣)**
      * **成功情境 (Success Case)**:
          * 當提供合法的請求 body 時，應回傳 `201 Created` 狀態碼。
          * 回應的 JSON body 應為剛剛建立的那個「習慣物件」。
          * 資料庫中應成功寫入一筆新的習慣資料。
      * **失敗/錯誤情境 (Failure/Error Cases)**:
          * **缺少必要欄位**: 當請求 body 中缺少 `name` 等必要欄位時，應回傳 `400 Bad Request`。
          * **資料格式錯誤**: 當請求 body 中欄位的資料型別不符預期時 (例如 `name` 給予一個數字)，應回傳 `400 Bad Request`。

# 產出格式與要求 (Output Format & Requirements)

1.  **程式碼輸出**: 請直接產出要寫入 `test_habits_api.py` 的 Python 程式碼，並將其包裹在一個 `python` 程式碼區塊中 (`python ...`)。
2.  **函式命名**: 測試函式的名稱應清晰地描述其測試目的，例如 `test_get_all_habits_returns_list_of_habits` 或 `test_create_habit_with_missing_name_returns_400`。
3.  **測試結構 (AAA)**: 每個測試案例都應遵循 Arrange-Act-Assert 的結構，並可選擇性地使用註解標示。
4.  **斷言 (Assertions)**: 斷言必須明確且具體。除了檢查狀態碼 `response.status_code`，也應盡可能檢查回應內容 `response.json()` 的結構與數值是否符合預期。
5.  **涵蓋範圍**: 請至少為每個端點的「成功情境」和至少一個「失敗/邊界情境」撰寫測試案例。

# 限制與風格 (Constraints & Style)

  * **框架**: 必須使用 `Pytest` 框架。
  * **風格**: 遵循 PEP 8 Python 程式碼風格指南。
  * **獨立性**: 每個測試案例都應是獨立的，不依賴於其他測試案例的執行結果。請善用 Pytest fixture 來達成此目標。
```

AI 會立刻化身為測試專家，將一份結構清晰、遵循最佳實踐的測試程式碼，注入到我們的專案中！

### Step 3: 命令 AI 升級「CI 稽查 SOP」

考卷寫好了，最後一步，就是把「批改考卷」這個任務，加入到我們 CI 品管員的 SOP 中。

### 【魔法詠唱：升級 CI 工作流】

```markdown
# 角色 (Role)
你是一位精通 GitHub Actions 的 DevOps 專家。

# 目標 (Objective)
請讀取 `@.github/workflows/ci.yml` 檔案，並在 `lint` 工作後面，新增一個名為 `test` 的新工作。

# 產出格式與要求 (Output Format & Requirements)
1.  **直接修改**: 直接輸出修改後、完整的 `.github/workflows/ci.yml` 內容。
2.  **新工作規格 (`test`)**:
    -   **依賴關係 (`needs`)**: 設定 `needs: lint`，確保它在 lint 工作成功後才運行。
    -   **運行環境**: `ubuntu-latest`。
    -   **步驟**: 包含 checkout code, set up python, install dependencies，以及最後執行 `pytest` 的步驟。
```

AI 會再次展現它的能力，將升級後的 CI 設定檔交給你。你只需要將它複製貼上，覆蓋掉舊的 `ci.yml` 即可！

## Part 4：將我們的「安全網」部署到雲端

所有工作都由 AI 完成了，讓我們來提交成果吧！

1. **Commit 訊息**: `feat(testing): Add Pytest for habits API and integrate into CI`
2. **Commit & Push**！

推送完成後，飛奔到你的 GitHub Actions 頁面。你會看到這次的工作流，在 `lint` 成功後，多了一個 `test` 的工作！當所有步驟都亮起綠色勾勾時，就代表我們的 API 不只風格優雅，邏輯也堅若磐石！如果有錯，一樣的處理方式，將錯誤訊息自己先閱讀過，看的懂可以自己解決，看不懂的再請 AI 解釋或直接請 AI 幫我們處理。

![GitHub Actions 測試成功](https://ithelp.ithome.com.tw/upload/images/20250903/20132971xbhG8nrO6k.jpg)

## 結語：為品質保駕護航的雙重保險

太不可思議了！今天，我們為專案加上了第二道、也是更重要的一道品質防線！

我們的 CI 品管員現在擁有兩項技能：

- **文學編輯 (flake8)**：確保我們的程式碼乾淨、優雅、易讀。
- **邏輯考官 (pytest)**：確保我們的 API 運作方式，分毫不差地符合我們的預期。

這張自動化的安全網，將是我們未來敢於快速迭代、大膽重構的最大底氣。

至此，後端的程式碼、自動化檢查、自動化測試都已到位。明天，我們將迎來後端開發階段的最終章！我們將進行一次總回顧，並展望接下來激動人心的前端開發之旅！
