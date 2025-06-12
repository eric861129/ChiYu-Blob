+++
title = "命令模式：靈活封裝的請求指令"
date = 2025-06-12
dates = ["2025-06-12"]
tags = ["Code", "Csharp", "DesignPattern"]
prev_post_slug = "0018chain-of-responsibility-pattern"
next_post_slug = "0020interpreter-pattern"
series = ["DesignPattern"]
weight = 15
+++

哈囉大家，今天我們來聊聊 **命令模式（Command）**，這個設計模式能幫助你將請求封裝成物件，讓你可以輕鬆地操作、延遲或撤銷命令。

## 🌟 命令模式是什麼？

命令模式是一種將「動作」封裝成獨立物件的設計模式。這樣做的好處是，你可以隨時決定何時執行這個動作，甚至是取消它。

舉個例子來說，就像餐廳點餐時，你的每一份點餐單都是一個命令，廚房按照你的點餐單來做餐點，服務生只需將點餐單交給廚房即可，不需要知道廚房如何烹飪食物。

---

## 🤔 什麼情況適合使用命令模式？

- 想要將執行動作的物件與觸發動作的物件解耦。
- 需要將命令排程、延遲或撤銷。
- 想記錄請求歷史，以支援撤銷操作。

---

## 🍔 C# 命令模式範例

這次我們以餐廳點餐的例子來實作命令模式。

### 📝 定義命令介面

```csharp
/// <summary>
/// 命令介面
/// </summary>
public interface ICommand
{
    /// <summary>
    /// 執行命令
    /// </summary>
    void Execute();
}
```

### 🍲 建立具體命令

```csharp
using System;

/// <summary>
/// 點餐命令
/// </summary>
public class OrderCommand : ICommand
{
    private readonly Kitchen _kitchen;
    private readonly string _dish;

    public OrderCommand(Kitchen kitchen, string dish)
    {
        _kitchen = kitchen;
        _dish = dish;
    }

    /// <summary>
    /// 執行點餐動作
    /// </summary>
    public void Execute()
    {
        _kitchen.PrepareDish(_dish);
    }
}
```

### 👨‍🍳 建立接收者（Receiver）

```csharp
using System;

/// <summary>
/// 廚房，負責準備料理
/// </summary>
public class Kitchen
{
    /// <summary>
    /// 準備菜餚
    /// </summary>
    public void PrepareDish(string dish)
    {
        Console.WriteLine($"廚房正在準備：{dish}");
    }
}
```

### 🧑‍💼 建立調用者（Invoker）

```csharp
using System.Collections.Generic;

/// <summary>
/// 服務生，負責接收並送出點餐
/// </summary>
public class Waiter
{
    private readonly List<ICommand> _orders = new();

    /// <summary>
    /// 接收點餐
    /// </summary>
    public void TakeOrder(ICommand command)
    {
        _orders.Add(command);
    }

    /// <summary>
    /// 送出所有點餐
    /// </summary>
    public void SubmitOrders()
    {
        foreach (var order in _orders)
        {
            order.Execute();
        }
        _orders.Clear();
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
        Kitchen kitchen = new();
        Waiter waiter = new();

        ICommand order1 = new OrderCommand(kitchen, "牛排");
        ICommand order2 = new OrderCommand(kitchen, "沙拉");

        waiter.TakeOrder(order1);
        waiter.TakeOrder(order2);

        waiter.SubmitOrders();
    }
}
```

### 🎯 執行結果

```
廚房正在準備：牛排
廚房正在準備：沙拉
```

---

## ⚠️ 命令模式使用注意事項

- 優點：能夠輕鬆處理命令的延遲執行、撤銷以及記錄歷史。
- 缺點：可能會產生大量的命令類別，增加系統複雜度。

---

## 🎉 結語

太棒了！你又學會了一個有趣又實用的設計模式—命令模式（Command）！透過這個模式，你的系統將更加靈活、易於控制。

繼續追蹤設計模式系列吧，下篇再見囉～
