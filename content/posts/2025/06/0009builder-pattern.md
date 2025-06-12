+++
title = "建造者模式：一步步完成複雜任務"
date = 2025-06-12
tags = ["Code", "C#", "DesignPattern"]
prev_post_slug = "0008prototype-pattern"
next_post_slug = "0010adapter-pattern"
weight = 9
+++

哈囉各位朋友們～今天我們繼續設計模式之旅，來聊聊 **建造者模式（Builder）** 吧！

## 🌟 建造者模式是什麼？

簡單地說，建造者模式就是將一個複雜產品的建構過程拆分成幾個獨立的步驟，然後逐步組裝起來。

你可以想像去 Subway 點三明治：店員會一步一步詢問你想加什麼食材，麵包種類、起司、蔬菜、醬料……最後做出你最愛的那個獨特三明治。這個點餐流程就有點像建造者模式的概念。

透過建造者模式，你可以有系統地建立出不同組合的複雜產品，並且輕鬆管理每一個步驟。

---

## 🤔 什麼時候要用建造者模式？

- 產品建立過程複雜，有許多可變步驟或選項。
- 想要明確區分物件的構建步驟與產出的物件。
- 未來可能會新增更多的建構方式，但不想更動產品本身。

---

## 🥪 C# 建造者模式範例

我們就用「三明治店」當作實際範例，讓你馬上理解這個模式吧！

### 🥖 首先定義產品類別

```csharp
using System;
using System.Collections.Generic;

/// <summary>
/// 三明治產品
/// </summary>
public class Sandwich
{
    /// <summary>
    /// 麵包種類
    /// </summary>
    public string Bread { get; set; }

    /// <summary>
    /// 起司種類
    /// </summary>
    public string Cheese { get; set; }

    /// <summary>
    /// 蔬菜配料
    /// </summary>
    public List<string> Veggies { get; set; } = new List<string>();

    /// <summary>
    /// 醬料
    /// </summary>
    public string Sauce { get; set; }

    /// <summary>
    /// 顯示三明治內容
    /// </summary>
    public void Display()
    {
        Console.WriteLine($"三明治配料：麵包({Bread})、起司({Cheese})、蔬菜({string.Join(", ", Veggies)})");
    }
}
```

### 🔨 建立建造者介面

```csharp
/// <summary>
/// 建造者介面
/// </summary>
public interface ISandwichBuilder
{
    /// <summary>
    /// 添加麵包
    /// </summary>
    void AddBread();

    /// <summary>
    /// 添加起司
    /// </summary>
    void AddCheese();

    /// <summary>
    /// 添加蔬菜
    /// </summary>
    void AddVeggies();

    /// <summary>
    /// 取得完成的三明治
    /// </summary>
    Sandwich GetSandwich();
}
```

### 👨‍🍳 實作具體建造者

```csharp
/// <summary>
/// 義大利風味三明治建造者
/// </summary>
public class ItalianSandwichBuilder : ISandwichBuilder
{
    private Sandwich _sandwich = new Sandwich();

    public void AddBread() => _sandwich.Bread = "義大利麵包";
    public void AddCheese() => _sandwich.Cheese = "莫札瑞拉起司";
    public void AddVeggies() => _sandwich.Veggies = new List<string> { "番茄", "羅勒", "洋蔥" };

    public Sandwich GetSandwich() => _sandwich;
}

/// <summary>
/// 素食三明治建造者
/// </summary>
public class VeggieSandwichBuilder : ISandwichBuilder
{
    private Sandwich _sandwich = new Sandwich();

    public void AddBread() => _sandwich.Bread = "全麥麵包";
    public void AddCheese() => _sandwich.Cheese = "素食起司";
    public void AddVeggies() => _sandwich.Veggies = new List<string> { "生菜", "番茄", "小黃瓜" };

    public Sandwich GetSandwich() => _sandwich;
}
```

### 👷 實作指揮者 (Director)

```csharp
/// <summary>
/// 指揮者，負責掌控建造過程
/// </summary>
public class SandwichDirector
{
    public Sandwich Construct(ISandwichBuilder builder)
    {
        builder.AddBread();
        builder.AddCheese();
        builder.AddVeggies();
        return builder.GetSandwich();
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
        var director = new SandwichDirector();

        // 製作義式三明治
        var italianBuilder = new ItalianSandwichBuilder();
        var italianSandwich = director.Construct(italianBuilder);
        italianSandwich.Display();

        // 製作素食三明治
        var veggieBuilder = new VeggieSandwichBuilder();
        var veggieSandwich = director.Construct(veggieBuilder);
        veggieSandwich.Display();
    }
}
```

### 🎯 執行結果

```
三明治配料：麵包(義大利麵包)、起司(莫札瑞拉起司)、蔬菜(番茄, 羅勒, 洋蔥)
三明治配料：麵包(全麥麵包)、起司(素食起司)、蔬菜(生菜, 番茄, 小黃瓜)
```

---

## ⚠️ 建造者模式小提醒

- 優點：易於維護，建構物件的過程與表示分離，提升程式碼彈性。
- 缺點：可能導致類別數量增加，使用時需衡量必要性。

---

## 🎉 結語

現在你又掌握了一個強大的模式—建造者模式（Builder）！透過這個模式，你能更方便地建立複雜、多樣化的物件。

繼續期待後面的設計模式介紹，喜歡的話記得收藏和分享喔～ 下篇再見啦！
