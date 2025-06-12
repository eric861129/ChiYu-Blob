+++
title = "裝飾者模式：讓功能自由加點"
date = 2025-06-12
dates = ["2025-06-12"]
tags = ["Code", "Csharp", "DesignPattern"]
prev_post_slug = "0013composite-pattern"
next_post_slug = "0015facade-pattern"
series = ["DesignPattern"]
weight = 14
+++

哈囉朋友們～今天要介紹的設計模式可是非常實用又有趣的喔，那就是 **裝飾者模式（Decorator）**！

## 🌟 什麼是裝飾者模式？

裝飾者模式讓你在不修改現有物件程式碼的情況下，動態地增加新的功能。簡單來說，就是「包一層再包一層」的概念。

想像一下買一杯飲料，你可以加珍珠、椰果、鮮奶油等等，每個配料就像一個裝飾，你可以自由組合，做出你專屬的飲料，這就是裝飾者模式的概念！

---

## 🤔 什麼情況適合用裝飾者模式？

當你遇到以下情境時，很適合使用裝飾者模式：

- 需要動態地為物件增加或移除功能。
- 不想直接修改原本類別的程式碼，避免影響原本物件的穩定性。
- 想要彈性地組合不同的功能，並且可以隨時調整功能。

---

## 🎂 C# 裝飾者模式範例

我們用最容易理解的「咖啡加料」案例，來看看怎麼實作裝飾者模式吧！

### ☕ 定義抽象元件（Component）

```csharp
using System;

/// <summary>
/// 咖啡抽象元件
/// </summary>
public abstract class Coffee
{
    /// <summary>
    /// 取得描述
    /// </summary>
    public abstract string GetDescription();

    /// <summary>
    /// 供應咖啡
    /// </summary>
    public abstract void Serve();
}
```

### ☕ 實作具體元件

```csharp
using System;

/// <summary>
/// 基本咖啡
/// </summary>
public class SimpleCoffee : Coffee
{
    /// <summary>
    /// 取得描述
    /// </summary>
    public override string GetDescription() => "基本咖啡";

    /// <summary>
    /// 供應咖啡
    /// </summary>
    public override void Serve()
    {
        Console.WriteLine("提供一杯基本咖啡。");
    }
}
```

### 🍯 建立裝飾者（Decorator）

```csharp
using System;

/// <summary>
/// 裝飾者抽象類別
/// </summary>
public abstract class CoffeeDecorator : Coffee
{
    /// <summary>
    /// 被裝飾的咖啡
    /// </summary>
    protected Coffee _coffee;

    protected CoffeeDecorator(Coffee coffee)
    {
        _coffee = coffee;
    }

    /// <summary>
    /// 取得描述
    /// </summary>
    public override string GetDescription() => _coffee.GetDescription();

    /// <summary>
    /// 供應咖啡並套用裝飾
    /// </summary>
    public override void Serve()
    {
        _coffee.Serve();
    }
}
```

### 🥛 實作具體裝飾者（牛奶、糖漿）

```csharp
using System;

/// <summary>
/// 牛奶裝飾者
/// </summary>
public class MilkDecorator : CoffeeDecorator
{
    public MilkDecorator(Coffee coffee) : base(coffee) {}

    public override void Serve()
    {
        base.Serve();
        Console.WriteLine("加上牛奶。");
    }

    public override string GetDescription() => base.GetDescription() + " + 牛奶";
}

/// <summary>
/// 糖漿裝飾者
/// </summary>
public class SyrupDecorator : CoffeeDecorator
{
    public SyrupDecorator(Coffee coffee) : base(coffee) {}

    public override void Serve()
    {
        base.Serve();
        Console.WriteLine("加上糖漿。");
    }

    public override string GetDescription() => base.GetDescription() + " + 糖漿";
}
```

### 🚀 實際使用範例

```csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        Coffee coffee = new SimpleCoffee();

        // 加牛奶
        Coffee milkCoffee = new MilkDecorator(coffee);

        // 再加糖漿
        Coffee syrupMilkCoffee = new SyrupDecorator(milkCoffee);

        syrupMilkCoffee.Serve();
    }
}
```

### 🎯 執行結果

```
提供一杯基本咖啡。
加上牛奶。
加上糖漿。
```

---

## ⚠️ 使用裝飾者模式注意事項

- 優點：靈活性極高，可以自由搭配增加功能，不會修改現有程式碼。
- 缺點：可能產生大量的小型類別，增加系統複雜性。

---

## 🎉 結語

恭喜你又輕鬆學會了一個重要又實用的設計模式—裝飾者模式（Decorator）！有了這個技巧，未來你就可以輕鬆地動態增加各種你想要的功能啦。

繼續追蹤我們的設計模式系列吧，下篇再見囉～
