# 貢獻指南

感謝你對 MyBlob 的興趣！為了維持一致且高品質的程式碼，請在提交 Pull Request 前閱讀並遵循以下守則。

## 程式碼規範

- **物件導向設計與 SOLID 原則**：自訂的 Hugo 模組或腳本應以物件導向方式撰寫，確保符合單一職責、開放封閉、Liskov 取代、介面隔離與依賴反轉等原則。
- **Clean Code 風格**：保持函式短小、命名清楚，避免過度巢狀與重複程式碼。
- **XML 註解**：所有類別、方法與欄位需以繁體中文撰寫 XML 註解，說明用途與預期行為。
- **測試**：變更前請執行 `hugo --minify --gc` 與 `htmltest ./public`，確保站點能正確產生且連結有效。

## 範例

以下範例示範簡單的 Go 模組寫法，展示 XML 註解與物件導向風格：

```go
package example

// ExampleService 代表範例服務。
type ExampleService struct {
    // name 儲存服務名稱。
    name string
}

// NewExampleService 建立新的 ExampleService。
func NewExampleService(name string) *ExampleService {
    return &ExampleService{name: name}
}

// GetName 回傳服務名稱。
func (s *ExampleService) GetName() string {
    return s.name
}
```

## 參考資源

- [Clean Code](https://www.oreilly.com/library/view/clean-code/9780136083238/)
- [SOLID 原則簡介](https://ithelp.ithome.com.tw/articles/10227655)

提交前請再次確認程式碼風格與測試結果，讓我們共同維護專案品質。
