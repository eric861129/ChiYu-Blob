# ChiYu Code Journey

ChiYu Code Journey 是一個使用 [Hugo](https://gohugo.io/) 構建的靜態部落格，目標是提供簡單且易於維護的寫作與分享平台。

## 特色

- 以 Markdown 撰寫文章，輕鬆管理內容
- 透過 Hugo 產生靜態頁面，部署快速
- 使用 GitHub Actions 自動部署到 GitHub Pages

## 安裝 Hugo

1. 下載並安裝 Hugo（需使用 **extended** 版本）：
   ```bash
   sudo apt-get install hugo
   ```
   若套件庫未提供 extended 版，請至 [官方文件](https://gohugo.io/getting-started/installing/) 下載對應平台的安裝檔。
### macOS
在 macOS 環境可透過 Homebrew 安裝：
```bash
brew install hugo --HEAD --extended
```
若需要檢查連結，可安裝 htmltest：
```bash
brew install htmltest
# 或使用 go install
go install github.com/wjdp/htmltest@latest
export PATH="$PATH:$(go env GOPATH)/bin"
```

## 安裝 htmltest (選用)

如果想在本地端檢查連結，可安裝 [htmltest](https://github.com/wjdp/htmltest)：

```bash
go install github.com/wjdp/htmltest@latest
export PATH="$PATH:$(go env GOPATH)/bin"
```

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

本專案可透過 GitHub Actions 在每次推送到 `main` 分支後，自動將產生的檔案部署至 `gh-pages` 分支。範例 workflow 如下：
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: '0.123.7'
          extended: true
      - run: hugo --minify --gc
      - name: Check links
        uses: wjdp/htmltest-action@master
        with:
          path: ./public
          config: .htmltest.yml
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./public
          publish_branch: gh-pages
```
上述 workflow 範例會啟用 Hugo 的 **extended** 版本，以支援 SCSS 等功能。
將此檔案存成 `.github/workflows/gh-pages.yml` 後，並在 GitHub Pages 設定中將分支設為 `gh-pages`，即可啟用自動部署。

若網站仍僅顯示 README，請檢查下列設定：

1. GitHub Actions workflow 是否已成功執行並建立 `gh-pages` 分支。
2. GitHub Pages 設定頁面是否選擇 `gh-pages` 作為來源分支。
3. 部署完成後，即可在 <https://eric861129.github.io/MyBlob/> 看到網站首頁。

### 需要的 Secret

## 啟用 giscus 留言功能

1. 前往 <https://giscus.app> 安裝 giscus GitHub App。
2. 在設定頁面選擇留言用的 repository 與討論分類，產生 repoId 與 categoryId。
3. 將 `hugo.toml` 內 `[params.giscus]` 區段的 `repo`、`repoId`、`category` 與 `categoryId` 更新為取得的值。
4. 重新部署到 GitHub Pages 後，即可在文章頁面看到 giscus 留言區。
此 workflow 預設使用 GitHub 提供的 `GITHUB_TOKEN` 推送內容，因此不需額外設定憑證。若存取權不足，可建立具 `repo` 權限的 Personal Access Token，並在倉庫的 Secrets 中設定 `GH_PAGES_TOKEN`，再於 workflow 內以 `github_token: ${{ secrets.GH_PAGES_TOKEN }}` 使用。

## 貢獻方式

1. Fork 本倉庫並建立分支進行開發。
2. 完成後提交 Pull Request，描述所做修改。
3. 請確保程式碼格式整潔並通過下方測試指令。
4. 更多程式碼規範請參考 [CONTRIBUTING.md](CONTRIBUTING.md)

## 測試指令

在根目錄執行：
```bash
hugo --minify --gc
htmltest -c .htmltest.yml ./public
```
若兩個命令皆成功完成，表示產生的靜態檔案位於 `public/` 目錄且連結皆有效，可進一步部署。
若無網路環境，可使用 `.htmltest.yml` 中的 `CheckExternal: false` 設定，略過外部連結檢查。


若系統顯示 `htmltest: command not found`，請先安裝 htmltest：
```bash
go install github.com/wjdp/htmltest@latest
export PATH="$PATH:$(go env GOPATH)/bin"
```

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
