# 專案備忘

此為 **ChiYu-Blob** 個人部落格專案。

## 本地開發流程

1.  **建立新文章**
    ```bash
    hugo new posts/new-post-title.md
    ```

2.  **本地預覽**
    ```bash
    hugo server -DF
    ```

3.  **提交前檢查**
    在推送 (`git push`) 到 `main` 分支前，執行以下指令，確保網站可以成功產生。
    ```bash
    hugo --minify --gc --buildFuture --baseURL "/ChiYu-Blob/"
    htmltest -c .htmltest.yml ./public
    ```
