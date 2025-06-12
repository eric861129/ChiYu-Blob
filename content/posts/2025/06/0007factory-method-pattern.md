+++
title = "工廠方法模式：點披薩不用親自下廚"
date = 2025-06-12
dates = ["2025-06-12"]
tags = ["Code", "Csharp", "DesignPattern"]
prev_post_slug = "0006singleton-pattern"
next_post_slug = "0008abstract-factory-pattern"
series = ["DesignPattern"]
weight = 7
+++
哈囉大家，接續上一次 Singleton 模式，這一次我們要介紹的是另一個超實用的模式：**工廠方法模式（Factory Method）**。

別看到「工廠」兩個字就開始緊張，其實它超簡單！讓我們先來個輕鬆的比喻吧：

假設你今天去一家披薩店，店員跟你說：「告訴我你想吃什麼披薩，我們後面的廚師就會幫你做出來！」你不用在意披薩到底怎麼做，反正店家會處理好所有製作細節。這樣，你只要說出你想要的東西，剩下的交給專業的工廠就行。

這就是「工廠方法模式」的核心精神啦！

---

## 🤔 工廠方法模式什麼時候派得上用場？

當你遇到以下狀況時，就可以考慮使用工廠方法模式：

- 你有多種類似的物件需要建立，但你不想每次都自己指定具體的類別。
- 你想要簡化物件的建立過程，並且統一管理物件的生成邏輯。
- 你想要未來可以輕鬆新增不同類型的物件，而不需要大幅修改現有的程式碼。

---

## C# 工廠方法模式實作範例

這次我們就以「披薩店」作為具體的案例，示範如何使用工廠方法模式：

### 🍕 首先，定義產品介面

```csharp
/// <summary>
/// 披薩產品介面
/// </summary>
public interface IPizza
{
    /// <summary>
    /// 準備食材
    /// </summary>
    void Prepare();

    /// <summary>
    /// 烘烤披薩
    /// </summary>
    void Bake();

    /// <summary>
    /// 切割披薩
    /// </summary>
    void Cut();

    /// <summary>
    /// 裝盒披薩
    /// </summary>
    void Box();
}
```

### 🧑‍🍳 建立具體的產品類別

```csharp
using System;

/// <summary>
/// 起司披薩
/// </summary>
public class CheesePizza : IPizza
{
    public void Prepare() => Console.WriteLine("準備起司披薩的食材");
    public void Bake() => Console.WriteLine("烤製起司披薩中");
    public void Cut() => Console.WriteLine("切割起司披薩");
    public void Box() => Console.WriteLine("起司披薩裝盒完成");
}

/// <summary>
/// 海鮮披薩
/// </summary>
public class SeafoodPizza : IPizza
{
    public void Prepare() => Console.WriteLine("準備海鮮披薩的食材");
    public void Bake() => Console.WriteLine("烤製海鮮披薩中");
    public void Cut() => Console.WriteLine("切割海鮮披薩");
    public void Box() => Console.WriteLine("海鮮披薩裝盒完成");
}
```

### 🏭 定義工廠方法類別

```csharp
/// <summary>
/// 披薩工廠介面
/// </summary>
public interface IPizzaFactory
{
    /// <summary>
    /// 建立披薩
    /// </summary>
    IPizza CreatePizza();
}

/// <summary>
/// 起司披薩工廠
/// </summary>
public class CheesePizzaFactory : IPizzaFactory
{
    public IPizza CreatePizza() => new CheesePizza();
}

/// <summary>
/// 海鮮披薩工廠
/// </summary>
public class SeafoodPizzaFactory : IPizzaFactory
{
    public IPizza CreatePizza() => new SeafoodPizza();
}
```

### 🚀 實際使用範例

```csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        // 顧客點了一個起司披薩
        IPizzaFactory cheeseFactory = new CheesePizzaFactory();
        IPizza cheesePizza = cheeseFactory.CreatePizza();
        cheesePizza.Prepare();
        cheesePizza.Bake();
        cheesePizza.Cut();
        cheesePizza.Box();

        Console.WriteLine();

        // 顧客點了一個海鮮披薩
        IPizzaFactory seafoodFactory = new SeafoodPizzaFactory();
        IPizza seafoodPizza = seafoodFactory.CreatePizza();
        seafoodPizza.Prepare();
        seafoodPizza.Bake();
        seafoodPizza.Cut();
        seafoodPizza.Box();
    }
}
```

### 🎯 執行結果

```
準備起司披薩的食材
烤製起司披薩中
切割起司披薩
起司披薩裝盒完成

準備海鮮披薩的食材
烤製海鮮披薩中
切割海鮮披薩
海鮮披薩裝盒完成
```

---

## ⚠️ 工廠方法模式的小提醒

- 工廠方法讓程式碼擴充性更強，但可能增加了一些額外的類別。
- 當物件類型不多或固定時，不一定要使用工廠方法模式，以免過度設計。

---

## 結語

恭喜你，第二個設計模式也輕鬆入袋啦！透過工廠方法模式，我們把製造細節藏起來，專心點餐就好！

接下來，我們會繼續介紹更多設計模式，每篇文章一樣用輕鬆有趣的方式帶你深入理解，而且所有程式碼範例也都會在 GitHub 上公開。

喜歡的話記得追蹤一下，有問題隨時留言告訴我，下次見！
