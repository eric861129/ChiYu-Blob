+++
title = "Day 5: 【工具篇 #3】終端機裡的魔法：什麼是 Vibe Coding 與 Gemini CLI？"
date = 2025-08-24
slug = "2025iThomeIronmanDay5"
dates = ["2025-08-24"]
tags = ["2025iThomeIronman", "Gemini", "AI Agent", "CLI", "VibeCoding"]
series = ["2025iThomeIronman"]
categories = ["開發工具"]
weight = 5
prev_post_slug = "2025iThomeIronmanDay4"
next_post_slug = "2025iThomeIronmanDay6"
draft = false
description = "我們將迎來本系列第一個令人心跳加速的轉捩點。我們不只要安裝「引擎」，我們還要學會詠唱「魔法的咒語」，真正地與 AI 對話，把我們的意念灌注到終端機之中！"
+++

安安，我是 ChiYu！

昨天，我們完成了技師的工作，為我們的專案蓋好了**雲端機棚 (GitHub)**，也把**駕駛艙 (VS Code)** 裝潢得舒適又專業。硬體設施全部到位，現在，是時候為我們的專案注入真正的「靈魂」了。

今天，我們將迎來本系列第一個令人心跳加速的轉捩點。我們不只要安裝「引擎」，我們還要學會詠唱「魔法的咒語」，真正地與 AI 對話，把我們的意念灌注到終端機之中！準備好迎接你的「魔法覺醒」了嗎？

## Part 1：到底什麼是「Vibe Coding」？

最近你可能常常聽到 **Vibe Coding** 這個詞，但它到底是什麼意思？

它不是什麼艱深的技術或框架，而是一種徹底顛覆傳統的開發風格或心態。

這徹底顛覆了我們過去學習程式的模式。以前我們學的是機器的**「語法 (Syntax)」，現在我們學的是如何更精準地「表達意圖 (Intent)」**。你的中文能力，從未像此刻一樣，直接與你的生產力掛鉤。

這就像你從一個樂手，變成了一個指揮家。你不用親自演奏每個樂器，你只需要揮舞你的指揮法杖，告訴整個樂團（AI），這一段要「雄壯激昂」、那一段要「溫柔婉約」。你負責定義**「氛圍 (Vibe)」**，AI 負責實現它。

而我們今天要安裝的 `Gemini CLI`，就是我們的第一支客製化指揮法杖。

## Part 2：我們的魔法法杖：Gemini CLI，你的開源 AI 代理人

**CLI** 的全名是 **Command Line Interface (命令列介面)**。你不用害怕這個詞，它指的就是我們在 VS Code 裡打開的那個黑黑的、看起來很像駭客電影的「終端機」視窗。

我們要介紹的 `gemini-cli`，根據 Google 官方的說法，它不只是一個工具，更是一個**「開源的 AI 代理人 (Open Source AI Agent)」**。這代表它是一個住在你終端機裡的智慧夥伴，可以幫你讀取檔案、存取網路、甚至與其他工具串接，來完成更複雜的任務。

### 官方參考資料

對 `gemini-cli` 有興趣的讀者，可以直接參考它的官方 GitHub 倉庫與 Google 官方部落格文章：

  * **GitHub**: [https://github.com/google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli)
  * **Google Blog**: [https://blog.google/intl/zh-tw/products/cloud/gemini-cli-your-open-source-ai-agent/](https://blog.google/intl/zh-tw/products/cloud/gemini-cli-your-open-source-ai-agent/)

## Part 3：安裝與授權：法杖的鑄造與認主

好的，讓我們開始進行法杖的「鑄造與附魔」！

### Step 1：前置作業 - 準備 Node.js 環境

根據官方文件，`gemini-cli` 的執行環境是 `Node.js`。所以今天，請先確保你的電腦有 `Node.js` v20 或更高版本的環境。

你可以在終端機輸入 `node -v` 來檢查版本。如果沒有安裝，或版本太舊，請到官方網站下載安裝。

  * **Node.js 官方網站**：[https://nodejs.org/](https://nodejs.org/)

### Step 2：輸入安裝指令

打開你的終端機，深呼吸，然後貼上這段神聖的安裝咒語：

```bash
npm install -g @google/gemini-cli
```

`npm` 是 Node.js 的套件管理員，而 `-g` 代表我們要進行「全域安裝」，這樣在任何地方都能使用 `gemini` 這個指令。當你看到終端機跑完一連串安裝訊息，就代表你的指揮法杖已經裝備完成！

![Gemini CLI 安裝完成](https://ithelp.ithome.com.tw/upload/images/20250824/20132971m5fads0ku4.jpg)

### Step 3：授權儀式

接下來，我們要進行一場神聖的「**認主儀式**」，讓這支法杖只聽命於你一人。在終端機裡，輸入以下授權指令：

```bash
gemini auth login
```

按下 Enter 後，你的瀏覽器會自動打開一個 Google 登入與授權頁面。勇敢地按下「允許」，儀式就完成了！你的 CLI 工具現在已經跟你個人的 Google 帳號綁定在一起了。

## Part 4：調校你的法杖：深入 Gemini CLI 的各式設定

一把好的法杖，不僅要能用，更要能隨心所欲地調校。`gemini-cli` 提供了強大的 `config` 指令，讓我們可以客製化 AI 的行為。

我們可以先執行 `gemini` 進入對話模式，接著輸入 `/help`，
就會告訴你有哪些設定與功能

![Gemini CLI Help](https://ithelp.ithome.com.tw/upload/images/20250824/20132971APGU4j3iMT.png)

其實也可以只輸入 `/`，會直接跳出許多選項可以選取

![Gemini CLI Options](https://ithelp.ithome.com.tw/upload/images/20250824/20132971pNTyqlWtBG.png)

那第一次用一定要設定的東西就是：
`/theme` 設定 Gemini CLI 主題樣式

![Gemini CLI Theme](https://ithelp.ithome.com.tw/upload/images/20250824/20132971cWzi2XGJVq.png)

`/docs`
就會跳出官方的文件可以查詢～
[Gemini CLI Docs](https://github.com/google-gemini/gemini-cli/blob/main/docs/index.md)

還有個設定會需要特別注意！！！
**YOLO 模式！**
在 Gemini CLI 會話開啟前，如果我們在終端機打上 `gemini` 的同時，後面加上 `--yolo`!
會讓 Gemini CLI 在進行任務處理時都不會再詢問過 User！會直接執行！建議是很小或是不需要特別檢核的情況再開啟！以免出現意料外的錯誤，然後也沒有正確的篩選出來！

來看看 Gemini CLI 是怎麼跟我們說的:

![Gemini CLI YOLO Mode](https://ithelp.ithome.com.tw/upload/images/20250824/201329711BCnwkNP0X.png)


## Part 5：魔法指令深度導覽

萬事俱備！是時候見證奇蹟了。

### A. 破冰之旅：你的第一個指令

我們先來小試身手，確認法杖能正常揮舞。
先執行 `gemini` 進入對話模式，然後輸入：

```text
用一句話，以一個資深工程師的口吻，解釋什麼是 Hello World
```

### B. 上下文為王：用 ` @` 餵食 AI

這徹底改變了遊戲規則！` @` 符號能讓我們的對話變得「有根據」。AI 就像坐在你旁邊，能看到你正在看的檔案一樣。

讓 AI 讀取本地檔案：

```text
解釋一下 @main.py這個檔案在做什麼？並建議函式名稱可以怎麼改得更好 
```

```text
幫我閱讀 @/docs/doc1.md 文件，將文件內容整理給我
```

通常打上 ` @` 後，就可以透過方向鍵上下來選取我們所需的文件～
如果需要該資料夾下面的全部檔案，也可以直接 ` @` 該資料夾！

### C. 詠唱禁術：讓終端機開天眼看圖片

假設你有一張網頁設計的截圖叫做 `design.png`

```text
這是一張網頁設計圖，請用 HTML 和 CSS 幫我刻出這個畫面 @design.png 
```

### D. 終極魔法：命令 AI 代理人執行任務

這才是最震撼的部分。`gemini-cli` 不只能給你建議，它還能**直接幫你執行**！

```text
啟動我的 Flask 開發伺服器
```

你會看到它不再只是給你 `python app.py` 這行字，而是會規劃並執行這個指令！這就是 AI Agent 的真正威力。

## 結語：魔法，已然覺醒

太不可思議了！今天，我們不只安裝了一個工具，我們是在終端機裡，召喚了一位強大的 AI 盟友。你現在掌握的能力，已經遠超過去傳統的開發模式。

其實最簡單不用想太多的用法！我們在專案中開啟終端機，打上 `gemini` 後，直接如同使用 ChatGPT 在對話的方式給 AI 需求，但 Gemini CLI 可以直接看到專案，還不用錢＄＄＄！
現在當個工程師可是很花錢的，各式各樣的 AI 產品相繼推出，每個月都有不少的月費在搶劫我們的錢包！！！

今天我們只是熟悉工具。明天，我們就要正式啟動我們的專案，並且用我們今天學會的工具，使用 Gemini CLI 聊出我們的需求製作成第一份文件「專案章程」，正式進入左手藍圖的部份！
