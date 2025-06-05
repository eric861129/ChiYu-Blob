package blog

import "testing"

func TestRenderHTML(t *testing.T) {
    post := NewPost("Title", "type", "content")
    html := post.RenderHTML()
    expected := "<h1>Title</h1><p>content</p>"
    if html != expected {
        t.Errorf("expected %s, got %s", expected, html)
    }
}

func TestNavBarHTML(t *testing.T) {
    nb := NavBar{Items: []NavItem{{Name: "Home", Link: "/"}}}
    html := nb.HTML()
    expected := "<nav><ul><li><a href=\"/\">Home</a></li></ul></nav>"
    if html != expected {
        t.Errorf("expected %s, got %s", expected, html)
    }
}
