# MyBlob

MyBlob 是一個使用 [Hugo](https://gohugo.io/) 構建的靜態部落格，目標是提供簡單且易於維護的寫作與分享平台。

## 特色

- 以 Markdown 撰寫文章，輕鬆管理內容
- 透過 Hugo 產生靜態頁面，部署快速
- 使用 GitHub Actions 自動部署到 GitHub Pages

## 安裝 Hugo

1. 下載並安裝 Hugo：
   ```bash
   sudo apt-get install hugo
   ```
   或前往 [官方文件](https://gohugo.io/getting-started/installing/) 取得其他系統的安裝方式。

## 建立與編輯文章

1. 於專案根目錄執行以下指令產生新文章：
   ```bash
   hugo new posts/my-post.md
   ```
2. 於 `content/posts/` 目錄下找到產生的檔案並使用喜愛的編輯器撰寫內容。

## 本地端啟動

在專案目錄執行：
```bash
hugo server -D
```
瀏覽器開啟 [http://localhost:1313](http://localhost:1313) 即可預覽。

## GitHub Pages 自動部署

本專案可透過 GitHub Actions 在每次推送後自動部署至 GitHub Pages。範例 workflow 內容如下：
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-go@v5
        with:
          go-version: '1.22'
      - uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.123.7'
      - run: hugo --minify
      - uses: actions/upload-pages-artifact@v2
        with:
          path: ./public
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - uses: actions/deploy-pages@v2
        id: deployment
```
將此檔案存成 `.github/workflows/gh-pages.yml` 即可啟用。

## 貢獻方式

1. Fork 本倉庫並建立分支進行開發。
2. 完成後提交 Pull Request，描述所做修改。
3. 請確保程式碼格式整潔並通過下方測試指令。

## 測試指令

在根目錄執行：
```bash
hugo --minify
```
若命令成功完成，表示產生的靜態檔案位於 `public/` 目錄，可進一步部署。

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
