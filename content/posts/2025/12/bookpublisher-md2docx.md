+++
title = "[開源專案] 寫書不再被 Word 搞瘋！我開發了 BookPublisher MD2Docx —— 專為技術書作者打造的 Markdown 轉檔神器"
date = 2025-12-30T10:00:00+08:00
slug = "bookpublisher-md2docx"
dates = ["2025-12-30"]
tags = ["Open Source", "Markdown", "Word", "Productivity", "React"]
series = ["開源專案"]
categories = ["開發工具"]
weight = 1
draft = false
+++

# 寫書寫到想砸電腦？我受不了 Word 排版，直接自幹了一個 Markdown 轉檔神器！🚀

**身為工程師，世界上最遙遠的距離，就是「我寫好的 Markdown」和「編輯要的 Word 檔」。**

大家應該都有這種經驗吧？
我們在 VS Code 裡用 Markdown 寫文章、寫技術文件，那個排版多乾淨、多舒服。
結果一要投稿或出書，編輯直接傳來一句：「麻煩給 Word 檔喔，字體要微軟正黑體、程式碼要 Consolas、邊距要 X 公分...」

然後你打開 Word，圖片亂飄、程式碼沒亮點、字體跳來跳去...那一刻真的會寫到崩潰。

**所以我受夠了！我不寫了（誤），我是說，我直接寫了一個工具來解決這件事：[BookPublisher MD2Docx](https://github.com/eric861129/BookPublisher_MD2Doc)**。

簡單說，這就是一個「懂技術書排版」的轉檔工具。你繼續爽寫你的 Markdown，排版那種髒活交給程式碼去扛。

## ✨ 這東西到底厲害在哪？

我看過市面上很多轉檔工具，但都不符合「寫技術書」的需求，所以我加了這些功能：

**1. 對話框直接生成（這個最爽）**
現在寫 AI 教學，一定會有 `User` 跟 `AI` 的對話。以前在 Word 裡面要畫那個對話框，還要分左右邊，真的會畫到手抽筋。
在這個工具裡，你只要這樣寫：

```markdown
User: 嘿 Gemini，幫我不爽的情緒寫成 code。
AI: 沒問題 `console.log("I am angry")`...

```

轉出來的 Word 檔，**直接幫你排好左右對齊**！User 在右邊（虛線框），AI 在左邊（點狀框），完全不用手調。

**2. 字體格式「強制鎖定」**
不用再擔心 Word 貼上後格式跑掉。

* **中文**：不管你怎麼貼，轉出來強制就是 **微軟正黑體 (Microsoft JhengHei)**。
* **英文/程式碼**：強制用最舒服的等寬字體 **Consolas**。
* **頁面大小**：內建技術書標準的 17x23cm，或是 A4、B5 隨你選，匯出來直接是準的。

**3. 那些漂亮的提示框 (Callouts)**
Markdown 裡面的 `> [!TIP]` 或 `> [!WARNING]`，轉成 Word 後不再只是醜醜的引言。它會變成帶有**實線/虛線邊框**的專業提示區塊，看起來就像市面上賣的技術書一樣專業。

**4. 專治「按鍵」跟「按鈕」**
寫教學文常要寫「請按 [Ctrl] + [S]」或是「點選【設定】」。
這裡支援特殊語法，轉檔後直接變成**按鍵樣式**跟**按鈕樣式**，不用在那邊截圖截半天。

**5. 所見即所得**
左邊寫 Code，右邊直接預覽 Word 印出來長怎樣。不用一直匯出檢查，省下的時間拿去喝咖啡剛好。

---

## 🛠️ 用了什麼黑科技？

身為開發者，稍微這介紹一下技術棧也是合情合理的：

* **前端**：用最新的 React 19 + Vite，速度就是快。
* **核心**：TypeScript 寫好寫滿，邏輯不炸裂。
* **轉檔**：用 `docx` 這個套件在瀏覽器端直接生成 Word 檔，完全不用過後端。

---

## 🚀 想要試試看？

這個專案完全開源（MIT License），你可以直接開網頁用，也可以 clone 下來自己魔改：

* 🔗 **線上直接玩 (Live Demo)**: [https://eric861129.github.io/BookPublisher_MD2Doc/](https://eric861129.github.io/BookPublisher_MD2Doc/)
* 🐙 **GitHub 傳送門**: [https://github.com/eric861129/BookPublisher_MD2Doc](https://github.com/eric861129/BookPublisher_MD2Doc)

如果你也是被 Word 荼毒過的工程師/作者，歡迎拿去用用看！覺得好用的話，GitHub 星星幫我按一下 ⭐，或是發個 PR 一起讓它更強！

**把生命浪費在美好的事物上，不要浪費在 Word 排版上。** Peace! ✌️
