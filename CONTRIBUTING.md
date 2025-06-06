# 貢獻指南

感謝你有興趣參與改進 **MyBlob**！在提交 Pull Request 前，請依照以下步驟操作，以保持專案品質與一致性。

## 提交流程

1. 先 Fork 本倉庫並於自身帳號建立分支進行開發。
2. 完成後提交 Pull Request，清楚描述所做的修改內容與原因。
3. 提交前務必執行下列指令，確認靜態網站可以成功產生並通過連結檢查：
   ```bash
   hugo --minify --gc
   htmltest -c .htmltest.yml ./public
   ```
   若缺少相關指令，可參考 `README.md` 的安裝說明。

## 程式碼風格

- 命名應清楚易懂，避免重複與過度巢狀。
- 必要時加入繁體中文註解，幫助他人理解程式邏輯。
- 提交文件或範例程式碼更新時，請一併附上。

本專案目前並未使用 Go modules，`go.mod` 與 `go.sum` 已移除，僅需要安裝 `htmltest` 即可：
```bash
go install github.com/wjdp/htmltest@latest
export PATH="$PATH:$(go env GOPATH)/bin"
```

歡迎你的貢獻，一同讓本部落格更臻完善！
