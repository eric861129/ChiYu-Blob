+++
title = "狀態模式：依狀態改變行為的祕訣"
date = 2025-06-13T04:00:00+08:00
tags = ["Code", "C#", "DesignPattern"]
prev_post_slug = "0024observer-pattern"
series = ["DesignPattern"]
weight = 21
+++

哈囉朋友們～今天我們要聊的是非常實用且有趣的**狀態模式（State）**，這個模式讓你的物件能夠根據內部狀態的變化而自動改變行為。

## 🌟 狀態模式是什麼？

狀態模式允許一個物件在內部狀態改變時改變它的行為，就像換了一個角色一樣。

舉個實際例子，就像是手機的鈴聲狀態，手機在「靜音」模式時，不會響鈴；切換到「響鈴」模式後，就會有聲音通知你。這就是狀態模式的基本概念，透過改變狀態讓物件呈現不同的行為。

---

## 🤔 什麼時候適合使用狀態模式？

以下情況很適合使用狀態模式：

- 物件的行為會根據內部狀態不同而有所改變。
- 當有大量條件判斷，且這些條件判斷取決於物件的狀態時。
- 希望避免使用大量的條件語句（if-else或switch），讓程式更清晰、更易於維護。

---

## 📱 C# 狀態模式範例：手機鈴聲模式

我們以手機鈴聲模式為範例來示範狀態模式。

### 🔕 定義狀態介面

```csharp
/// <summary>
/// 狀態介面
/// </summary>
public interface IMobileState
{
    /// <summary>
    /// 依目前狀態執行提醒
    /// </summary>
    void Alert();
}
```

### 📳 建立具體狀態類別

```csharp
using System;

/// <summary>
/// 響鈴模式
/// </summary>
public class RingingState : IMobileState
{
    /// <inheritdoc />
    public void Alert()
    {
        Console.WriteLine("手機正在響鈴...");
    }
}

/// <summary>
/// 靜音模式
/// </summary>
public class SilentState : IMobileState
{
    /// <inheritdoc />
    public void Alert()
    {
        Console.WriteLine("手機處於靜音模式。");
    }
}
```

### 📱 建立 Context 類別（手機）

```csharp
/// <summary>
/// 手機類別，依狀態不同呈現不同行為
/// </summary>
public class MobileContext
{
    private IMobileState _state;   // 目前狀態

    public MobileContext(IMobileState initialState)
    {
        _state = initialState;
    }

    /// <summary>
    /// 切換狀態
    /// </summary>
    /// <param name="state">新的狀態</param>
    public void SetState(IMobileState state)
    {
        _state = state;
    }

    /// <summary>
    /// 執行提醒
    /// </summary>
    public void Alert()
    {
        _state.Alert();
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
        MobileContext mobile = new MobileContext(new SilentState());
        mobile.Alert();

        mobile.SetState(new RingingState());
        mobile.Alert();
    }
}
```

### 🎯 執行結果

```
手機處於靜音模式。
手機正在響鈴...
```

---

## ⚠️ 狀態模式使用注意事項

- 優點：能讓物件依據狀態不同有不同的行為，避免大量條件判斷。
- 缺點：若狀態過多，可能導致類別數量增加，管理起來稍有複雜度。

---

## 🎉 結語

恭喜你掌握了狀態模式（State）！透過這個模式，你能讓物件行為更彈性、程式碼更清晰易維護。

持續追蹤我們的設計模式系列喔，下篇再見啦～
