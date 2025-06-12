+++
title = "備忘錄模式：保存與恢復物件狀態"
date = 2025-06-13T02:00:00+08:00
tags = ["Code", "C#", "DesignPattern"]
prev_post_slug = "0022mediator-pattern"
next_post_slug = "0024observer-pattern"
series = ["DesignPattern"]
weight = 19
+++

哈囉朋友們！今天我們要介紹的是一個超實用的設計模式：**備忘錄模式（Memento）**，透過它，我們可以輕鬆儲存並回復物件的狀態！

## 🌟 備忘錄模式是什麼？

備忘錄模式允許你捕捉一個物件的內部狀態，並且在未來需要時，能夠將物件回復到原先的狀態。

就像玩遊戲時的「存檔」和「讀取進度」功能一樣，當你不小心走錯路或失敗時，可以輕鬆回到之前的狀態重新來過。

---

## 🤔 什麼情況適合使用備忘錄模式？

當你有以下情境時，很適合使用備忘錄模式：

- 需要提供撤銷（undo）或回復（redo）操作。
- 物件狀態可能頻繁改變，且希望能隨時回到某個特定的狀態。
- 不想暴露物件內部狀態的細節給外部使用者。

---

## 🎮 C# 備忘錄模式範例：遊戲存檔系統

我們透過「遊戲角色存檔」來說明備忘錄模式的應用。

### 🎲 建立備忘錄（Memento）

```csharp
/// <summary>
/// 遊戲狀態備忘錄
/// </summary>
public class GameMemento
{
    /// <summary>
    /// 等級
    /// </summary>
    public int Level { get; }

    /// <summary>
    /// 生命值
    /// </summary>
    public int Health { get; }

    public GameMemento(int level, int health)
    {
        Level = level;
        Health = health;
    }
}
```

### 🧙 遊戲角色（Originator）

```csharp
using System;

/// <summary>
/// 遊戲角色
/// </summary>
public class GameCharacter
{
    /// <summary>
    /// 等級
    /// </summary>
    public int Level { get; set; }

    /// <summary>
    /// 生命值
    /// </summary>
    public int Health { get; set; }

    /// <summary>
    /// 顯示目前狀態
    /// </summary>
    public void DisplayStatus()
    {
        Console.WriteLine($"目前狀態 => 等級：{Level}，生命值：{Health}");
    }

    /// <summary>
    /// 儲存目前狀態
    /// </summary>
    public GameMemento Save()
    {
        return new GameMemento(Level, Health);
    }

    /// <summary>
    /// 從備忘錄回復狀態
    /// </summary>
    public void Restore(GameMemento memento)
    {
        Level = memento.Level;
        Health = memento.Health;
    }
}
```

### 📔 存檔管理員（Caretaker）

```csharp
/// <summary>
/// 存檔管理員
/// </summary>
public class GameCaretaker
{
    /// <summary>
    /// 目前的備忘錄
    /// </summary>
    public GameMemento Memento { get; set; }
}
```

### 🚀 實際使用範例

```csharp
using System;

class Program
{
    static void Main(string[] args)
    {
        GameCharacter hero = new GameCharacter { Level = 10, Health = 100 };
        hero.DisplayStatus();

        // 存檔
        GameCaretaker caretaker = new GameCaretaker();
        caretaker.Memento = hero.Save();

        // 角色狀態改變
        hero.Level = 12;
        hero.Health = 50;
        hero.DisplayStatus();

        // 讀取存檔
        hero.Restore(caretaker.Memento);
        hero.DisplayStatus();
    }
}
```

### 🎯 執行結果

```
目前狀態 => 等級：10，生命值：100
目前狀態 => 等級：12，生命值：50
目前狀態 => 等級：10，生命值：100
```

---

## ⚠️ 備忘錄模式使用注意事項

- 優點：能有效支援狀態回復和撤銷，並且不暴露內部細節。
- 缺點：當保存狀態過多時，可能占用大量記憶體。

---

## 🎉 結語

恭喜你掌握了備忘錄模式（Memento）！透過這個模式，你的程式可以輕鬆管理物件的歷史狀態，讓用戶體驗更順暢！

持續追蹤我們的設計模式系列喔，下篇再見啦～
