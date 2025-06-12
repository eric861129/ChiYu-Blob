+++
title = "策略模式：靈活切換行為的好幫手"
date = 2025-06-13
dates = ["2025-06-13"]
tags = ["Code", "Csharp", "DesignPattern"]
prev_post_slug = "0025state-pattern"
next_post_slug = "0027template-method-pattern"
series = ["DesignPattern"]
weight = 22
+++

哈囉朋友們～今天我們要介紹的設計模式是非常靈活好用的**策略模式（Strategy）**，透過它，你可以輕鬆替換不同的行為，讓你的程式更有彈性！

## 🌟 策略模式是什麼？

策略模式允許你定義一系列的演算法，並讓這些演算法可以互相替換，且獨立於使用它們的客戶端。

想像一下，你去旅行時可以選擇不同的交通方式，比如搭飛機、搭高鐵或開車。你根據不同的需求（時間、成本、舒適度）選擇不同的策略，這就是策略模式的核心概念！

---

## 🤔 什麼情況適合使用策略模式？

以下情況很適合使用策略模式：

- 需要動態地切換不同的演算法或行為。
- 想避免使用大量的條件判斷語句（if-else 或 switch）。
- 希望使系統容易擴充，能輕鬆增加新的演算法或行為。

---

## 🚗 C# 策略模式範例：旅遊交通工具選擇

這次我們以旅遊時選擇交通工具作為範例。

### 🚅 定義策略介面

```csharp
/// <summary>
/// 交通策略介面
/// </summary>
public interface ITravelStrategy
{
    /// <summary>
    /// 前往指定目的地
    /// </summary>
    /// <param name="destination">目的地</param>
    void Travel(string destination);
}
```

### ✈️ 建立具體策略類別

```csharp
using System;

/// <summary>
/// 飛機策略
/// </summary>
public class PlaneStrategy : ITravelStrategy
{
    public void Travel(string destination)
    {
        Console.WriteLine($"搭飛機前往 {destination}");
    }
}

/// <summary>
/// 高鐵策略
/// </summary>
public class HighSpeedRailStrategy : ITravelStrategy
{
    public void Travel(string destination)
    {
        Console.WriteLine($"搭高鐵前往 {destination}");
    }
}

/// <summary>
/// 汽車策略
/// </summary>
public class CarStrategy : ITravelStrategy
{
    public void Travel(string destination)
    {
        Console.WriteLine($"開車前往 {destination}");
    }
}
```

### 🎒 建立 Context 類別（旅客）

```csharp
/// <summary>
/// 旅客
/// </summary>
public class Traveler
{
    private ITravelStrategy _travelStrategy;

    /// <summary>
    /// 設定交通策略
    /// </summary>
    /// <param name="strategy">策略實例</param>
    public void SetStrategy(ITravelStrategy strategy)
    {
        _travelStrategy = strategy;
    }

    /// <summary>
    /// 前往目的地
    /// </summary>
    /// <param name="destination">目的地</param>
    public void TravelTo(string destination)
    {
        _travelStrategy.Travel(destination);
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
        Traveler traveler = new Traveler();

        // 改變策略為搭飛機
        traveler.SetStrategy(new PlaneStrategy());
        traveler.TravelTo("東京");

        // 改變策略為搭高鐵
        traveler.SetStrategy(new HighSpeedRailStrategy());
        traveler.TravelTo("台南");

        // 改變策略為開車
        traveler.SetStrategy(new CarStrategy());
        traveler.TravelTo("宜蘭");
    }
}
```

### 🎯 執行結果

```
搭飛機前往 東京
搭高鐵前往 台南
開車前往 宜蘭
```

---

## ⚠️ 策略模式使用注意事項

- 優點：能靈活替換行為，避免大量的條件判斷，使程式更容易擴充與維護。
- 缺點：可能會產生大量策略類別，增加程式碼的複雜性。

---

## 🎉 結語

恭喜你掌握了策略模式（Strategy）！透過這個模式，你的程式能輕鬆應對各種變化，靈活又好用！

繼續追蹤我們的設計模式系列，下篇再見啦～
