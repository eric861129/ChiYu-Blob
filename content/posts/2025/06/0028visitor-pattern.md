+++
title = "訪問者模式：新增功能不動既有架構"
date = 2025-06-13
dates = ["2025-06-13"]
tags = ["Code", "Csharp", "DesignPattern"]
prev_post_slug = "0027template-method-pattern"
series = ["DesignPattern"]
weight = 24
+++

哈囉朋友們～今天要介紹的是比較特殊但十分強大的**訪問者模式（Visitor）**，透過這個模式，你可以在不修改物件結構的情況下輕鬆新增功能！

## 🌟 訪問者模式是什麼？

訪問者模式允許你在不改變現有類別結構的情況下，為類別增加新的操作。

舉個例子，就像遊樂園的各種設施，每個訪客來到遊樂園會玩不同的設施。設施本身不會改變，但每位訪客的行為和感受可能不同，訪客們就是訪問者（Visitor），設施則是被訪問的元素（Element）。

---

## 🤔 什麼情況適合使用訪問者模式？

以下情況很適合使用訪問者模式：

- 當你需要對一個物件結構新增許多不同且不相關的操作。
- 希望在不修改現有結構的情況下，能輕鬆增加新功能。
- 當物件結構相對穩定，但操作或功能可能經常變動時。

---

## 🎢 C# 訪問者模式範例：遊樂園設施與訪客

這次我們以遊樂園的訪客與設施為例。

### 🎠 定義元素介面（設施）

```csharp
/// <summary>
/// 設施介面
/// </summary>
public interface IAmusementFacility
{
    /// <summary>
    /// 接受訪問者
    /// </summary>
    /// <param name="visitor">訪問者</param>
    void Accept(IVisitor visitor);
}
```

### 🎡 具體設施類別

```csharp
/// <summary>
/// 雲霄飛車
/// </summary>
public class RollerCoaster : IAmusementFacility
{
    public void Accept(IVisitor visitor)
    {
        visitor.Visit(this);
    }
}

/// <summary>
/// 摩天輪
/// </summary>
public class FerrisWheel : IAmusementFacility
{
    public void Accept(IVisitor visitor)
    {
        visitor.Visit(this);
    }
}
```

### 👨‍👩‍👧‍👦 定義訪問者介面與具體訪問者

```csharp
using System;

/// <summary>
/// 訪問者介面
/// </summary>
public interface IVisitor
{
    /// <summary>
    /// 造訪雲霄飛車
    /// </summary>
    /// <param name="rollerCoaster">雲霄飛車</param>
    void Visit(RollerCoaster rollerCoaster);

    /// <summary>
    /// 造訪摩天輪
    /// </summary>
    /// <param name="ferrisWheel">摩天輪</param>
    void Visit(FerrisWheel ferrisWheel);
}

/// <summary>
/// 成人訪客
/// </summary>
public class AdultVisitor : IVisitor
{
    public void Visit(RollerCoaster rollerCoaster)
    {
        Console.WriteLine("成人訪客很享受雲霄飛車的刺激！");
    }

    public void Visit(FerrisWheel ferrisWheel)
    {
        Console.WriteLine("成人訪客悠閒地坐著摩天輪欣賞風景。");
    }
}

/// <summary>
/// 小孩訪客
/// </summary>
public class ChildVisitor : IVisitor
{
    public void Visit(RollerCoaster rollerCoaster)
    {
        Console.WriteLine("小孩訪客覺得雲霄飛車太可怕了！");
    }

    public void Visit(FerrisWheel ferrisWheel)
    {
        Console.WriteLine("小孩訪客開心地乘坐摩天輪。");
    }
}
```

### 🚀 實際使用範例

```csharp
using System;
using System.Collections.Generic;

class Program
{
    static void Main(string[] args)
    {
        List<IAmusementFacility> facilities = new List<IAmusementFacility>
        {
            new RollerCoaster(),
            new FerrisWheel()
        };

        IVisitor adult = new AdultVisitor();
        IVisitor child = new ChildVisitor();

        Console.WriteLine("成人訪客進入遊樂園：");
        foreach (var facility in facilities)
        {
            facility.Accept(adult);
        }

        Console.WriteLine("\n小孩訪客進入遊樂園：");
        foreach (var facility in facilities)
        {
            facility.Accept(child);
        }
    }
}
```

### 🎯 執行結果

```
成人訪客進入遊樂園：
成人訪客很享受雲霄飛車的刺激！
成人訪客悠閒地坐著摩天輪欣賞風景。

小孩訪客進入遊樂園：
小孩訪客覺得雲霄飛車太可怕了！
小孩訪客開心地乘坐摩天輪。
```

---

## ⚠️ 訪問者模式使用注意事項

- 優點：能輕鬆新增新功能而不影響原有結構，保持系統靈活性。
- 缺點：新增元素或修改結構會較困難，適合穩定的物件結構。

---

## 🎉 結語

恭喜你掌握了訪問者模式（Visitor）！透過這個模式，你的程式能在不改動既有結構的情況下，輕鬆擴充新功能！

繼續追蹤我們的設計模式系列，下篇再見啦～
