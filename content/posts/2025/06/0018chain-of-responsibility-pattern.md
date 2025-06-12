+++
title = "責任鏈模式：層層把關的處理機制"
date = 2025-06-12
dates = ["2025-06-12"]
tags = ["Code", "Csharp", "DesignPattern"]
prev_post_slug = "0017proxy-pattern"
next_post_slug = "0019command-pattern"
series = ["DesignPattern"]
weight = 14
+++

哈囉～又來到了我們設計模式系列啦，今天要介紹的是一個非常靈活又好用的模式：**責任鏈模式（Chain of Responsibility）**。

## 🌟 責任鏈模式是什麼？

責任鏈模式是一種將請求逐一傳遞，直到找到合適的處理者來處理的設計模式。就像公司報銷流程，先交給直屬主管簽核，如果權限不足就往上一層，直到有權限的人批准為止。

透過這個模式，每個處理者只專注自己的職責，無法處理的部分就交給下一個處理者，既清楚又明確。

---

## 🤔 什麼情況適合使用責任鏈模式？

- 多個物件都能處理同一個請求，但條件或處理範圍不同。
- 責任層級可能會更動，希望降低請求者與處理者的耦合度。
- 想讓系統更彈性，可依需求增減處理節點。

---

## 📝 C# 責任鏈模式範例

以下以「公司費用審核」為例，示範責任鏈模式的實作。

### 💼 建立抽象處理者（Handler）

```csharp
using System;

/// <summary>
/// 抽象處理者
/// </summary>
public abstract class Approver
{
    /// <summary>
    /// 下一位處理者
    /// </summary>
    protected Approver _nextApprover;

    /// <summary>
    /// 設定下一位處理者
    /// </summary>
    public void SetNext(Approver approver)
    {
        _nextApprover = approver;
    }

    /// <summary>
    /// 處理請求
    /// </summary>
    /// <param name="amount">請求金額</param>
    public abstract void HandleRequest(decimal amount);
}
```

### 👩‍💻 建立具體處理者（主管、經理、總經理）

```csharp
using System;

/// <summary>
/// 主管
/// </summary>
public class Supervisor : Approver
{
    public override void HandleRequest(decimal amount)
    {
        if (amount <= 1000)
        {
            Console.WriteLine($"主管批准了金額 {amount} 的請求。");
        }
        else if (_nextApprover != null)
        {
            _nextApprover.HandleRequest(amount);
        }
    }
}

/// <summary>
/// 經理
/// </summary>
public class Manager : Approver
{
    public override void HandleRequest(decimal amount)
    {
        if (amount <= 5000)
        {
            Console.WriteLine($"經理批准了金額 {amount} 的請求。");
        }
        else if (_nextApprover != null)
        {
            _nextApprover.HandleRequest(amount);
        }
    }
}

/// <summary>
/// 總經理
/// </summary>
public class GeneralManager : Approver
{
    public override void HandleRequest(decimal amount)
    {
        Console.WriteLine($"總經理批准了金額 {amount} 的請求。");
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
        Approver supervisor = new Supervisor();
        Approver manager = new Manager();
        Approver generalManager = new GeneralManager();

        supervisor.SetNext(manager);
        manager.SetNext(generalManager);

        supervisor.HandleRequest(500);
        supervisor.HandleRequest(3000);
        supervisor.HandleRequest(8000);
    }
}
```

### 🎯 執行結果

```
主管批准了金額 500 的請求。
經理批准了金額 3000 的請求。
總經理批准了金額 8000 的請求。
```

---

## ⚠️ 責任鏈模式使用注意事項

- 優點：降低請求者與處理者之間的耦合度，方便擴充與維護。
- 缺點：若責任鏈過長，可能導致效能降低且不易除錯。

---

## 🎉 結語

恭喜你又學會了責任鏈模式（Chain of Responsibility）！透過這個模式，你可以讓程式更彈性，輕鬆處理複雜請求。下篇再見囉～
