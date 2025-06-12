+++
title = "外觀模式：化繁為簡"
date = 2025-06-12
dates = ["2025-06-12"]
tags = ["Code", "Csharp", "DesignPattern"]
prev_post_slug = "0014decorator-pattern"
next_post_slug = "0016flyweight-pattern"
series = ["DesignPattern"]
weight = 11
+++

哈囉大家～今天的主題非常實用，那就是「外觀模式（Facade）」！這個模式可以有效地讓複雜的系統變得簡單又好用，就像你按下遙控器的開機鍵，電視就會自動開啟、調整音量，甚至切換到你最愛的頻道一樣。

---

## 🌟 外觀模式是什麼？

外觀模式其實就是為複雜系統提供一個簡單的介面，讓使用者不需要了解複雜的細節，就能輕鬆操作系統內部的功能。

例如，去電影院看電影時，你只需要買一張電影票，電影院就幫你搞定座位安排、播放電影、空調系統等等，這就是外觀模式的概念啦！

---

## 🤔 什麼情況適合用外觀模式？

當你遇到以下的狀況時，特別適合使用外觀模式：

- 系統變得複雜，使用者需要了解太多細節。
- 想提供一個簡單的介面給使用者，隱藏複雜的內部運作細節。
- 想降低系統的耦合性，提高易用性與可維護性。

---

## 🎬 C# 外觀模式範例

這次我們就用「電影院系統」的例子，來看看外觀模式怎麼運作吧！

### 🎥 複雜的子系統類別

```csharp
using System;

/// <summary>
/// 投影機
/// </summary>
public class Projector
{
    /// <summary>
    /// 開啟投影機
    /// </summary>
    public void TurnOn() => Console.WriteLine("投影機已開啟。");

    /// <summary>
    /// 關閉投影機
    /// </summary>
    public void TurnOff() => Console.WriteLine("投影機已關閉。");
}

/// <summary>
/// 音響系統
/// </summary>
public class AudioSystem
{
    /// <summary>
    /// 開啟音響系統
    /// </summary>
    public void TurnOn() => Console.WriteLine("音響系統已開啟。");

    /// <summary>
    /// 關閉音響系統
    /// </summary>
    public void TurnOff() => Console.WriteLine("音響系統已關閉。");
}

/// <summary>
/// 燈光系統
/// </summary>
public class Lights
{
    /// <summary>
    /// 調暗燈光
    /// </summary>
    public void DimLights() => Console.WriteLine("燈光已調暗。");

    /// <summary>
    /// 關閉燈光
    /// </summary>
    public void TurnOff() => Console.WriteLine("燈光已關閉。");

    /// <summary>
    /// 開啟燈光
    /// </summary>
    public void TurnOn() => Console.WriteLine("燈光已開啟。");
}
```

### 🎫 建立 Facade（外觀類別）

```csharp
using System;

/// <summary>
/// 家庭劇院外觀
/// </summary>
public class HomeTheaterFacade
{
    private Projector _projector;
    private AudioSystem _audioSystem;
    private Lights _lights;

    public HomeTheaterFacade()
    {
        _projector = new Projector();
        _audioSystem = new AudioSystem();
        _lights = new Lights();
    }

    /// <summary>
    /// 開始觀賞電影
    /// </summary>
    public void WatchMovie()
    {
        Console.WriteLine("準備觀賞電影...");
        _projector.TurnOn();
        _audioSystem.TurnOn();
        _lights.TurnOff();
    }

    /// <summary>
    /// 結束電影並關閉設備
    /// </summary>
    public void EndMovie()
    {
        Console.WriteLine("電影結束，準備關閉設備...");
        _projector.TurnOff();
        _audioSystem.TurnOff();
        _lights.TurnOn();
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
        HomeTheaterFacade homeTheater = new HomeTheaterFacade();

        homeTheater.WatchMovie();

        Console.WriteLine();

        homeTheater.EndMovie();
    }
}
```

### 🎯 執行結果

```
準備觀賞電影...
投影機已開啟。
音響系統已開啟。
燈光已關閉。

電影結束，準備關閉設備...
投影機已關閉。
音響系統已關閉。
燈光已開啟。
```

---

## ⚠️ 外觀模式使用注意事項

- 優點：簡化客戶端的使用介面、降低系統複雜度。
- 缺點：Facade 本身可能會變得過於龐大，隱藏了底層細節。

---

## 🎉 結語

恭喜你，又掌握了一個好用的設計模式—外觀模式（Facade）！透過這個模式，讓複雜的系統操作變得更簡單直覺，用戶體驗也會更棒喔。

繼續追蹤我們的設計模式系列，一起輕鬆學習更多實用技巧吧！我們下篇再見啦～


