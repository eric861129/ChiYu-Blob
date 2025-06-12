# ChiYu's Personal Blob

這是使用 [Hugo](https://gohugo.io/) 構建的個人靜態部落格，作為一個簡單且易於維護的寫作與分享平台。

## 特色

- 以 Markdown 撰寫文章，輕鬆管理內容
- 透過 Hugo 產生靜態頁面，部署快速
- 使用 GitHub Actions 自動部署到 GitHub Pages

## 安裝與執行

### 1. 安裝 Hugo & htmltest
若要在本地端預覽或檢查連結，需要安裝 Hugo (extended 版本) 與 htmltest。

**macOS (使用 Homebrew):**
```bash
brew install hugo --HEAD --extended
brew install htmltest
```

**其他系統 (使用 Go):**

```bash
# 安裝 Hugo (請參考官方文件)
# [https://gohugo.io/getting-started/installing/](https://gohugo.io/getting-started/installing/)

# 安裝 htmltest
go install github.com/wjdp/htmltest@latest
export PATH="$PATH:$(go env GOPATH)/bin"
```

### 2. 建立文章

於專案根目錄執行 `hugo new posts/my-post.md`，然後至 `content/posts/` 目錄下編輯產生的檔案。

### 3. 本地端預覽

在專案目錄執行 `hugo server -DF`，即可在 [http://localhost:1313](https://www.google.com/search?q=http://localhost:1313) 預覽。

## 自動部署

本專案已設定 GitHub Actions，在每次推送 (`push`) 到 `main` 分支後，會自動將網站部署至 `gh-pages` 分支。

部署完成後，即可在以下網址看到最新內容：
[https://eric861129.github.io/ChiYu-Blob/](https://www.google.com/search?q=https://eric861129.github.io/ChiYu-Blob/)

若網站未正常更新，請至 Repository 的 `Settings` > `Pages` 檢查來源分支是否設定為 `gh-pages`。

## Giscus 留言功能

若要更換留言區綁定的 Repository，請修改 `layouts/_default/baseof.html` 中的 `data-repo` 屬性，並在 giscus.app 重新設定。

```html
<script
    ...
    src="https://giscus.app/client.js"
    data-repo="eric861129/ChiYu-Blob" 
    ...
></script>
```

## 本地端測試指令

在部署前，可於根目錄執行下列指令，確保網站建置成功且無壞掉的連結。

```bash
hugo --minify --gc --baseURL "/ChiYu-Blob/"
htmltest -c .htmltest.yml ./public
```

## License

This project is licensed under the MIT License.

