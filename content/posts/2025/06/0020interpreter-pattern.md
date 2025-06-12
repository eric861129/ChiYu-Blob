+++
title = "解譯器模式：讓程式聽懂你的指令"
date = 2025-06-12T23:00:00+08:00
tags = ["Code", "C#", "DesignPattern"]
prev_post_slug = "0019command-pattern"
series = ["DesignPattern"]
weight = 16
+++

哈囉各位朋友，今天我們來認識一個有趣又實用的設計模式：**解譯器模式（Interpreter）**，並以好玩的「文字冒險遊戲」為例，輕鬆學會如何讓你的程式讀懂自訂語言或指令。

## 🌟 解譯器模式是什麼？

解譯器模式是一種用來解析特定語言或表達式的設計模式，它能夠讓你的程式懂得使用者輸入的特定語法或指令，並做出相應的回應或行動。

就像在玩文字冒險遊戲時，你輸入「攻擊 巨龍 使用 火球」，遊戲就能理解你的指令，並做出相應的動作一樣。

---

## 🤔 什麼情況適合使用解譯器模式？

- 需要處理使用者輸入的特殊指令或語法。
- 想設計一個易於擴充與修改的指令解析系統。
- 系統需要理解並執行使用者自定義的操作。

---

## 🎮 C# 解譯器模式範例（文字冒險遊戲）

以下以文字冒險遊戲為例，示範如何透過解譯器模式解析玩家輸入的指令。

### 🎲 定義抽象指令介面

```csharp
/// <summary>
/// 遊戲指令介面
/// </summary>
public interface IGameCommand
{
    /// <summary>
    /// 執行指令
    /// </summary>
    void Execute();
}
```

### ⚔️ 建立具體指令

```csharp
using System;

/// <summary>
/// 攻擊指令
/// </summary>
public class AttackCommand : IGameCommand
{
    private readonly string _target;  // 攻擊目標
    private readonly string _weapon;  // 使用武器

    public AttackCommand(string target, string weapon)
    {
        _target = target;
        _weapon = weapon;
    }

    /// <inheritdoc />
    public void Execute()
    {
        Console.WriteLine($"你使用{_weapon}攻擊了{_target}！");
    }
}

/// <summary>
/// 移動指令
/// </summary>
public class MoveCommand : IGameCommand
{
    private readonly string _direction;  // 移動方向

    public MoveCommand(string direction)
    {
        _direction = direction;
    }

    /// <inheritdoc />
    public void Execute()
    {
        Console.WriteLine($"你往{_direction}移動了。");
    }
}
```

### 🗺️ 建立指令解譯器

```csharp
using System;

/// <summary>
/// 遊戲指令解譯器
/// </summary>
public static class GameCommandInterpreter
{
    /// <summary>
    /// 解析文字指令並回傳對應的 <see cref="IGameCommand"/>
    /// </summary>
    /// <param name="commandText">玩家輸入的指令文字</param>
    /// <returns>解析後的遊戲指令</returns>
    /// <exception cref="InvalidOperationException">指令格式錯誤時擲出</exception>
    public static IGameCommand Interpret(string commandText)
    {
        var parts = commandText.Split(' ');

        switch (parts[0])
        {
            case "攻擊":
                // 期待格式：攻擊 目標 使用 武器
                return new AttackCommand(parts[1], parts[3]);
            case "移動":
                // 期待格式：移動 方向
                return new MoveCommand(parts[1]);
            default:
                throw new InvalidOperationException("無法識別的指令");
        }
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
        // 解析並執行兩個不同的指令
        var command1 = GameCommandInterpreter.Interpret("攻擊 巨龍 使用 火球");
        var command2 = GameCommandInterpreter.Interpret("移動 北方");

        command1.Execute();
        command2.Execute();
    }
}
```

### 🎯 執行結果

```
你使用火球攻擊了巨龍！
你往北方移動了。
```

---

## ⚠️ 解譯器模式使用注意事項

- 優點：易於擴展和修改語法規則，增加新功能輕鬆方便。
- 缺點：當指令或語法過於複雜時，可能使系統變得難以維護。

---

## 🎉 結語

恭喜你輕鬆掌握了解譯器模式（Interpreter）！透過這個模式，你能讓程式理解並執行玩家輸入的特殊指令，輕鬆實現靈活且互動性高的遊戲或應用程式。

記得繼續追蹤設計模式系列喔，下篇再見啦～

