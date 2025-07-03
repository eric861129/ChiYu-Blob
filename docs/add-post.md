# 新增文章說明

此專案以 [Hugo](https://gohugo.io/) 為靜態站生成器，新增文章流程如下。

## 1. 建立檔案

於專案根目錄執行：

```bash
hugo new posts/2025/06/0029example-post.md
```

執行後會在 `content/posts/2025/06/` 中產生檔案。可依照實際年份與月份分類。

## 2. 編輯前置資料（Front Matter）

每篇文章開頭皆須包含下列區塊，格式為 **TOML**：

```toml
+++
title = "訪問者模式：新增功能不動既有架構"
date = 2025-06-13
dates = ["2025-06-13"]
tags = ["Code", "Csharp", "DesignPattern"]
prev_post_slug = "0027template-method-pattern"
series = ["DesignPattern"]
weight = 28
+++
```

- `title`：文章標題。
- `date`：發佈日期，格式 `YYYY-MM-DD`。
- `dates`：同上，供排序使用。
- `tags`：文章標籤。
- `prev_post_slug`：前一篇文章檔名（不含副檔名）。
- `series`：系列名稱。
- `weight`：顯示順序權重，數字越小越前面。

## 3. 檔案放置位置

文章檔案需依「年份 / 月份」歸檔，例如：

```
content/posts/2025/06/0028visitor-pattern.md
```

新增完畢後，執行 `hugo server -DF` 便可在本地預覽。

