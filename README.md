# ChiYu Code Journey

這是 ChiYu (Eric Huang) 的個人技術部落格，主要記錄程式學習旅程。內容涵蓋物件導向設計模式 (Design Patterns)、2025 iThome 鐵人賽挑戰文章，以及軟體開發相關的技術分享。

網站使用 [Hugo](https://gohugo.io/) 靜態生成器構建，並透過 GitHub Actions 自動部署於 GitHub Pages。

## 精選系列

- **Design Patterns (設計模式)**: 深入淺出介紹 Singleton, Factory, Strategy 等 23 種 GoF 設計模式，搭配 C# 實務範例。
- **2025 iThome 鐵人賽**: 記錄連續 30 天的技術寫作挑戰與心得。
- **Hugo 部落格架設**: 分享如何從零開始架設此靜態網站與自定義樣式。

## 特色

- **技術導向**: 專注於軟體工程、架構設計與開發心得。
- **高效閱讀**: 簡潔的 Markdown 排版與靜態頁面載入速度。
- **自動化**: 整合 GitHub Actions CI/CD 流程。
- **互動交流**: 內建 Giscus 留言系統。

## 安裝與執行

### 1. 安裝 Hugo & htmltest

若要在本地端預覽或檢查連結，需要安裝 Hugo (Extended 版本) 與 htmltest。

**macOS (使用 Homebrew):**
```bash
brew install hugo --HEAD --extended
brew install htmltest
```

**其他系統 (使用 Go):**
```bash
# 安裝 Hugo (請參考官方文件)
# https://gohugo.io/getting-started/installing/

# 安裝 htmltest
go install github.com/wjdp/htmltest@latest
export PATH="$PATH:$(go env GOPATH)/bin"
```

### 2. 下載專案

```bash
git clone https://github.com/eric861129/ChiYu-Blob.git
cd ChiYu-Blob
```

### 3. 本地端預覽

在專案目錄執行以下指令，即可在 [http://localhost:1313](http://localhost:1313) 預覽網站：

```bash
hugo server -DF
```

### 4. 建立新文章

```bash
hugo new posts/my-new-post.md
```

## 自動部署

本專案已設定 GitHub Actions。當推送到 `main` 分支時，會自動建置網站並部署至 `gh-pages` 分支。

- **Live Site**: [https://eric861129.github.io/ChiYu-Blob/](https://eric861129.github.io/ChiYu-Blob/)

## Giscus 留言功能

若要更換留言區綁定的 Repository，請修改 `hugo.toml` 或 `params` 設定，並在 [giscus.app](https://giscus.app/zh-TW) 重新取得配置。

## 本地端測試指令

在部署前，建議執行下列指令確保建置無誤且無失效連結：

```bash
hugo --minify --gc --baseURL "/ChiYu-Blob/"
htmltest -c .htmltest.yml ./public
```

## License

This project is licensed under the MIT License.