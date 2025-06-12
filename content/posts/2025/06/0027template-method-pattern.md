+++
title = "模板方法模式：固定流程靈活實作"
date = 2025-06-13
dates = ["2025-06-13"]
tags = ["Code", "Csharp", "DesignPattern"]
prev_post_slug = "0026strategy-pattern"
series = ["DesignPattern"]
weight = 23
next_post_slug = "0028visitor-pattern"
+++

哈囉朋友們～今天我們要介紹的是非常實用且常見的**模板方法模式（Template Method）**，透過它你可以固定一系列的步驟，讓子類別靈活地去實現細節。

## 🌟 模板方法模式是什麼？

模板方法模式定義了一個演算法的骨架，並將一些步驟延遲到子類別去實現。這樣的設計可以確保演算法的結構保持一致，但又能靈活地調整細節。

例如，你在製作各種口味的披薩時，無論是海鮮披薩還是夏威夷披薩，都有一個基本的製作步驟（揉麵團、加醬料、放餡料、烤披薩）。模板方法模式就是把這個固定步驟封裝起來，讓子類別專注於實現每個細節。

---

## 🤔 什麼時候適合使用模板方法模式？

以下情況很適合使用模板方法模式：

- 當你有一系列步驟，但每個步驟的具體實現可能會有所不同。
- 想確保演算法的結構不被子類別改變，保證流程的統一性。
- 希望提供一個明確的框架，讓開發者能快速實現不同的具體步驟。

---

## 🍕 C# 模板方法模式範例：披薩製作流程

這次我們以製作披薩的流程作為範例。

### 🍅 建立抽象類別

```csharp
using System;

/// <summary>
/// 披薩製作抽象類別
/// </summary>
public abstract class PizzaMaker
{
    /// <summary>
    /// 製作披薩的流程
    /// </summary>
    public void MakePizza()
    {
        PrepareDough();
        AddSauce();
        AddToppings();
        BakePizza();
    }

    /// <summary>
    /// 準備麵團
    /// </summary>
    protected void PrepareDough()
    {
        Console.WriteLine("揉製麵團...");
    }

    /// <summary>
    /// 加入醬料
    /// </summary>
    protected void AddSauce()
    {
        Console.WriteLine("加入醬料...");
    }

    /// <summary>
    /// 加入配料，由子類別實作
    /// </summary>
    protected abstract void AddToppings();

    /// <summary>
    /// 烘烤披薩
    /// </summary>
    protected void BakePizza()
    {
        Console.WriteLine("烤製披薩...");
    }
}
```

### 🍍 建立具體子類別

```csharp
/// <summary>
/// 夏威夷披薩
/// </summary>
public class HawaiianPizzaMaker : PizzaMaker
{
    /// <summary>
    /// 加入夏威夷披薩的配料
    /// </summary>
    protected override void AddToppings()
    {
        Console.WriteLine("加入鳳梨與火腿...");
    }
}

/// <summary>
/// 海鮮披薩
/// </summary>
public class SeafoodPizzaMaker : PizzaMaker
{
    /// <summary>
    /// 加入海鮮披薩的配料
    /// </summary>
    protected override void AddToppings()
    {
        Console.WriteLine("加入鮮蝦、章魚和起司...");
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
        PizzaMaker hawaiianPizza = new HawaiianPizzaMaker();
        hawaiianPizza.MakePizza();

        Console.WriteLine();

        PizzaMaker seafoodPizza = new SeafoodPizzaMaker();
        seafoodPizza.MakePizza();
    }
}
```

### 🎯 執行結果

```
揉製麵團...
加入醬料...
加入鳳梨與火腿...
烤製披薩...

揉製麵團...
加入醬料...
加入鮮蝦、章魚和起司...
烤製披薩...
```

---

## ⚠️ 模板方法模式使用注意事項

- 優點：能有效地重用程式碼，保證演算法結構一致，並能靈活擴充。
- 缺點：當步驟太多時，抽象類別可能變得複雜，需謹慎設計。

---

## 🎉 結語

恭喜你掌握了模板方法模式（Template Method）！透過這個模式，你的程式可以更有條理，更易維護與擴充。

繼續追蹤我們的設計模式系列，下篇再見啦～
