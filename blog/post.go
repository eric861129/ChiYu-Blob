package blog

import "fmt"

// Renderable 用於渲染為 HTML 的介面
//
// 提供 RenderHTML 方法以取得 HTML 字串
// <summary>Renderable 介面</summary>
type Renderable interface {
    // RenderHTML 產生 HTML 字串
    RenderHTML() string
}

// Post 表示部落格文章
// <summary>文章物件</summary>
type Post struct {
    // Title 文章標題
    Title string
    // Type 文章類型
    Type string
    // Content 文章內容
    Content string
}

// NewPost 建立新的 Post
func NewPost(title, postType, content string) *Post {
    return &Post{Title: title, Type: postType, Content: content}
}

// RenderHTML 將文章渲染為 HTML
func (p *Post) RenderHTML() string {
    return fmt.Sprintf("<h1>%s</h1><p>%s</p>", p.Title, p.Content)
}

// NavItem 導覽列項目
// <summary>導覽列單一項目</summary>
type NavItem struct {
    // Name 名稱
    Name string
    // Link 連結
    Link string
}

// HTML 產生 NavItem 的 HTML
func (n NavItem) HTML() string {
    return fmt.Sprintf("<li><a href=\"%s\">%s</a></li>", n.Link, n.Name)
}

// NavBar 導覽列
// <summary>導覽列集合</summary>
type NavBar struct {
    // Items 導覽列項目清單
    Items []NavItem
}

// HTML 回傳 NavBar 的 HTML
func (nb NavBar) HTML() string {
    result := "<nav><ul>"
    for _, item := range nb.Items {
        result += item.HTML()
    }
    result += "</ul></nav>"
    return result
}
