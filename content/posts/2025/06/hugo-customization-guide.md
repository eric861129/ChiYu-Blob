+++
title = "讓部落格成為你的形狀：Hugo 個人化設定終極指南"
date = 2025-06-11
tags = ["Hugo"]
description = "一份終極指南，教你如何將 HugoBlobTemplate 或 ChiYu-Blob 專案，從裡到外徹底改造成專屬於你的個人網站。內容涵蓋核心資訊設定、Giscus 留言系統、大頭貼更換、多種 CSS 配色範本、字型更換教學，以及所有個人化細節。"
prev_post_slug = "hugo-blob-template-intro"
+++
-----

### **讓部落格成為你的形狀：Hugo 個人化設定終極指南**

當你成功部署了這個部落格模板，恭喜你完成了第一步！但真正的樂趣現在才開始：將這個公版的部落格，徹底改造成專屬於你的樣子。

這篇文章是一份完整的個人化指南，將帶你從裡到外，一步步設定與調整，打造出獨一無二的個人網站。

-----

### **第一站：核心設定 (`hugo.toml`)**

`hugo.toml` 是你部落格的「大腦」與「指揮中心」，幾乎所有基本資訊都在這裡設定。

#### **1. 網站基本資訊**

首先，打開 `hugo.toml` 檔案，找到並修改以下幾個關鍵欄位：

  * `baseURL`: **(最重要\!)** 這裡必須換成你未來部署網站的最終網址。如果是使用 GitHub Pages，通常會是 `https://<你的GitHub帳號>.github.io/<你的專案名稱>/`。
  * `title`: 你部落格的主要名稱，會顯示在瀏覽器分頁和網站標頭上。
  * `[params] description`: 網站的副標題或描述，會顯示在首頁的大標題下方。
  * `[params.author] name`: 你的名字或暱稱。

#### **2. 你的社交連結**

在 `hugo.toml` 中，有一個 `[params.social]` 區塊，你可以在這裡新增、刪除或修改你的社群媒體連結。

```toml
# hugo.toml
[params.social]
  GitHub = "https://github.com/eric861129"
  LinkedIn = "https://www.linkedin.com/in/chiyu-huang/"
  Threads = "https://www.threads.com/@chiyuisme"
  # 你也可以新增自己的，例如：
  # Twitter = "https://twitter.com/your_account"
```

#### **3. 啟用你自己的留言區 (Giscus)**

這個部落格模板整合了 [Giscus](https://giscus.app/) 留言系統。為了讓讀者能在**你的**部落格留言，而不是在我的模板專案上，你必須進行設定：

1.  跟隨 Giscus 官網的教學，為你自己的 GitHub 專案啟用 Giscus。
2.  將 `hugo.toml` 檔案中 `[params.giscus]` 的設定值，換成你在 Giscus 官網上取得的你自己的設定。 這些設定會被 `layouts/_default/baseof.html` 中的腳本讀取並啟用留言功能。

-----

### **第二站：視覺風格**

搞定基本資料後，接下來就是讓部落格「看起來」像你的。

#### **1. 換上你的大頭貼**

預設的大頭貼是一張範例圖片。請將你自己的大頭貼照片命名為 `avatar.jpg`，並替換掉 `/static/images/avatar.jpg` 這個路徑下的檔案。這個頭像會顯示在側邊欄和瀏覽器的頁籤圖示上。

> **注意**：如果你想使用不同的檔名或路徑，記得要去 `layouts/partials/tag_sidebar.html` 和 `layouts/_default/baseof.html` 中，手動修改圖片的路徑。

#### **2. 客製化 UI 配色**

部落格的所有顏色，都由 `assets/css/custom.css` 這一個檔案統一管理。你可以透過修改裡面的 CSS 變數，輕鬆改變全站的配色。打開這個檔案，你會看到兩個關鍵區塊：

  * `:root`：定義\*\*淺色主題（Light Mode）\*\*的顏色。
  * `[data-theme='dark']`：定義\*\*深色主題（Dark Mode）\*\*的顏色。

下面提供幾種風格範本，你只需要將對應的程式碼，複製並覆蓋掉 `assets/css/custom.css` 中原有的區塊即可。

-----

##### **風格範本一：溫暖大地色系 (Warm Earth Tones)**

這是一種看起來很舒服、溫暖且專業的配色，適合知性的內容。

```css
/* 淺色模式：溫暖大地 */
:root {
    --bg-color: #f5f5f5;
    --text-color: #3d3d3d;
    --text-secondary: #757575;
    --border-color: #e0e0e0;
    --link-color: #8d6e63;
    --card-bg: #ffffff;
    --code-bg: #eeeeee;
}

/* 深色模式：深夜咖啡 */
[data-theme='dark'] {
    --bg-color: #212121;
    --text-color: #e0e0e0;
    --text-secondary: #9e9e9e;
    --border-color: #424242;
    --link-color: #a1887f;
    --card-bg: #303030;
    --code-bg: #303030;
}
```

-----

##### **風格範本二：沉穩科技藍 (Professional Tech Blue)**

這是一種很適合技術部落格的配色，給人一種冷靜、精確且現代的感覺。

```css
/* 淺色模式：科技藍白 */
:root {
    --bg-color: #f0f4f8;
    --text-color: #1c3d5a;
    --text-secondary: #607d8b;
    --border-color: #cfd8dc;
    --link-color: #007acc;
    --card-bg: #ffffff;
    --code-bg: #e3f2fd;
}

/* 深色模式：午夜代碼 */
[data-theme='dark'] {
    --bg-color: #0d1117;
    --text-color: #c9d1d9;
    --text-secondary: #8b949e;
    --border-color: #30363d;
    --link-color: #58a6ff;
    --card-bg: #161b22;
    --code-bg: #161b22;
}
```

-----

##### **風格範本三：復古墨綠風 (Retro Dark Green)**

這是一種很有個性的風格，帶有復古、文青的氣息，適合分享生活、書評或深度思考的內容。

```css
/* 淺色模式：薄荷奶油 */
:root {
    --bg-color: #f0fff4;
    --text-color: #2f4f4f;
    --text-secondary: #556b2f;
    --border-color: #d8e8d8;
    --link-color: #8fbc8f;
    --card-bg: #ffffff;
    --code-bg: #e6f3e6;
}

/* 深色模式：森林書房 */
[data-theme='dark'] {
    --bg-color: #1a2a2a;
    --text-color: #e0eee0;
    --text-secondary: #a8b8a8;
    --border-color: #3a4a4a;
    --link-color: #a8d8a8;
    --card-bg: #2a3a3a;
    --code-bg: #2a3a3a;
}
```

> **去哪裡找更多配色靈感？**
> 如果你想自己搭配顏色，可以到下面這些網站逛逛：
>
>   * **Coolors.co**：快速產生協調的配色組合。
>   * **Adobe Color**：功能強大的專業配色工具。
>   * **Color Hunt**：由使用者投稿的四色配色卡，非常有啟發性。

-----

#### **3. (進階) 更換字體與調整版面**

  * **字體更換教學**
    這個專案預設使用 Google Fonts 來載入字型。更換字體非常簡單：

    1.  **尋找字型**：前往 **[Google Fonts](https://fonts.google.com/)** 網站，尋找你喜歡的英文字型或中文字型（例如「思源黑體 Noto Sans TC」）。
    2.  **選取樣式**：點選你喜歡的字型，選取你需要的字重（例如 Regular 400、Bold 700）。
    3.  **取得程式碼**：在右側的面板中，複製 `<link>` 開頭的 HTML 程式碼。
    4.  **替換程式碼**：打開 `layouts/_default/baseof.html` 檔案，用你剛剛複製的程式碼，去取代掉原本載入 Google Fonts 的那幾行 `<link>` 標籤。
    5.  **更新 CSS**：打開 `assets/css/custom.css`，在 `:root` 區塊中，將 `font-family` 的值改成你新選擇的字型名稱。

    > **更多字型資源**：

    >   * **[justfont](https://www.justfont.com/)**：提供高品質的中文Web Font服務。
    >   * **[Adobe Fonts](https://fonts.adobe.com/)**：如果你有 Adobe 訂閱，這是一個龐大的高品質字型庫。

  * **版面調整**
    如果你懂 HTML，甚至可以修改 `layouts/` 資料夾底下的任何範本檔案，例如調整文章卡片 (`layouts/_default/card.html`) 的樣式，或是首頁 (`layouts/index.html`) 的排版。

-----

### **第三站：個人內容**

最後，就是將網站的內容換成你自己的。

#### **1. 撰寫「關於我」**

`content/about.md` 是你的個人介紹頁面。用 Markdown 語法，在這裡寫下任何你想讓大家認識你的事。

#### **2. 修改首頁歡迎詞**

首頁標題下方有一段歡迎詞，它的內容來自 `content/_index.md` 這個檔案。你可以自由修改，讓它更貼近你想對訪客說的話。

### **結論**

個人化設定的過程，就像在裝潢自己的新家。透過以上三個步驟：**設定 `hugo.toml`、調整視覺風格、撰寫個人內容**，你就能將這個公版的部落格，打造成一個充滿個人印記的網路小天地。

現在就動手試試看，讓你的部落格，真正成為你的形狀吧！
