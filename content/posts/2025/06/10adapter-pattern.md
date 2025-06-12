+++
title = "介面卡模式：讓不相容也能合作"
date = 2025-06-12
tags = ["Code", "C#", "DesignPattern"]
prev_post_slug = "9builder-pattern"
next_post_slug = "11bridge-pattern"
weight = 10
+++

哈囉大家！今天我們要介紹的設計模式是：**介面卡模式（Adapter）**，又叫做轉接器模式。

## 🌟 介面卡模式（Adapter）到底在做什麼？

就像生活中的轉接頭，它能讓本來不相容的介面順利溝通。在軟體開發裡，Adapter 模式同樣扮演橋樑角色，讓舊有系統與新系統或外部套件能順利合作。

---

## 🤔 什麼時候適合用 Adapter？

- 既有系統或類別的介面與你需要的不相容。
- 想使用外部套件，但介面不同，無法直接套用。
- 希望在不修改既有程式碼的前提下解決介面不合的問題。

---

## 🔌 C# Adapter 模式範例

我們以「充電器轉接頭」的例子來說明介面卡模式。

### 🔋 既有不相容的類別

```csharp
using System;

/// <summary>
/// 現有的歐洲插座
/// </summary>
public class EuropeanSocket
{
    public void SpecificRequest() => Console.WriteLine("使用歐洲規格的插座");
}
```

### 🔋 定義目標介面

```csharp
/// <summary>
/// 台灣插頭介面
/// </summary>
public interface ITaiwanPlug
{
    /// <summary>
    /// 連接插座
    /// </summary>
    void Request();
}
```

### 🔌 建立介面卡

```csharp
/// <summary>
/// 介面卡：讓歐洲插座能用於台灣插頭
/// </summary>
public class PlugAdapter : ITaiwanPlug
{
    private EuropeanSocket _europeanSocket;

    public PlugAdapter(EuropeanSocket socket)
    {
        _europeanSocket = socket;
    }

    public void Request()
    {
        // 透過轉接頭呼叫原本的歐洲規格插座
        _europeanSocket.SpecificRequest();
        Console.WriteLine("透過介面卡轉接，順利連接到台灣插頭。");
    }
}
```

### 🚀 實際使用範例

```csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        EuropeanSocket europeanSocket = new EuropeanSocket();

        // 透過 Adapter 轉接為台灣插頭介面
        ITaiwanPlug adapter = new PlugAdapter(europeanSocket);
        adapter.Request();
    }
}
```

### 🎯 執行結果：

```
使用歐洲規格的插座
透過介面卡轉接，順利連接到台灣插頭。
```

---

## ⚠️ 使用 Adapter 模式的小提醒

- 優點：無需修改既有程式碼即可解決介面不相容問題。
- 缺點：可能增加額外的類別數量，讓架構略顯複雜。

---

## 🎉 結語

透過介面卡模式，我們可以讓不同介面之間順暢地溝通與協作，不再為介面不合而煩惱。

持續關注下一篇設計模式介紹吧！
