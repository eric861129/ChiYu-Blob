+++
title = "橋接模式：抽象與實作分離"
date = 2025-06-12T15:00:00+08:00
dates = ["2025-06-12"]
tags = ["Code", "C#", "DesignPattern"]
prev_post_slug = "0011adapter-pattern"
next_post_slug = "0013composite-pattern"
series = ["DesignPattern"]
weight = 8
+++

哈囉大家～我們繼續來探索設計模式的世界吧！今天要介紹的是一個聽起來可能有點陌生，但其實很實用的設計模式：**橋接模式（Bridge）**。

## 🌟 橋接模式是什麼？

橋接模式將抽象部分和實作部分分離，讓它們可以獨立變化。想像遙控器與電視：不希望為每種遙控器和電視的組合都寫一次程式碼，這時就能運用橋接模式。

---

## 🤔 什麼時候適合用橋接模式？

- 避免抽象和實作之間產生過多耦合。
- 有多個維度需要獨立擴充。
- 想降低程式複雜度，避免類別過多。

---

## 📺 C# 橋接模式範例

以「遙控器控制電視」為例說明。

### 📡 建立實作介面（電視）

```csharp
/// <summary>
/// 電視實作介面
/// </summary>
public interface ITV
{
    void On();
    void Off();
    void SetChannel(int channel);
}
```

### 📺 建立具體實作

```csharp
using System;

/// <summary>
/// Sony 電視
/// </summary>
public class SonyTV : ITV
{
    public void On() => Console.WriteLine("Sony 電視開機");
    public void Off() => Console.WriteLine("Sony 電視關機");
    public void SetChannel(int channel) => Console.WriteLine($"Sony 電視設定頻道：{channel}");
}

/// <summary>
/// Samsung 電視
/// </summary>
public class SamsungTV : ITV
{
    public void On() => Console.WriteLine("Samsung 電視開機");
    public void Off() => Console.WriteLine("Samsung 電視關機");
    public void SetChannel(int channel) => Console.WriteLine($"Samsung 電視設定頻道：{channel}");
}
```

### 🎛️ 建立抽象部分（遙控器）

```csharp
/// <summary>
/// 遙控器抽象類別
/// </summary>
public abstract class RemoteControl
{
    protected ITV tv;

    protected RemoteControl(ITV tv)
    {
        this.tv = tv;
    }

    public abstract void TurnOn();
    public abstract void TurnOff();
    public abstract void SetChannel(int channel);
}
```

### 🎚️ 建立具體遙控器

```csharp
/// <summary>
/// 一般遙控器
/// </summary>
public class BasicRemote : RemoteControl
{
    public BasicRemote(ITV tv) : base(tv) { }

    public override void TurnOn() => tv.On();
    public override void TurnOff() => tv.Off();
    public override void SetChannel(int channel) => tv.SetChannel(channel);
}

/// <summary>
/// 智慧型遙控器
/// </summary>
public class SmartRemote : RemoteControl
{
    public SmartRemote(ITV tv) : base(tv) { }

    public override void TurnOn()
    {
        Console.WriteLine("使用智慧型遙控器：");
        tv.On();
    }

    public override void TurnOff()
    {
        Console.WriteLine("使用智慧型遙控器：");
        tv.Off();
    }

    public override void SetChannel(int channel)
    {
        Console.WriteLine("使用智慧型遙控器設定頻道：");
        tv.SetChannel(channel);
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
        ITV sonyTV = new SonyTV();
        ITV samsungTV = new SamsungTV();

        RemoteControl basicRemote = new BasicRemote(sonyTV);
        basicRemote.TurnOn();
        basicRemote.SetChannel(10);
        basicRemote.TurnOff();

        Console.WriteLine();

        RemoteControl smartRemote = new SmartRemote(samsungTV);
        smartRemote.TurnOn();
        smartRemote.SetChannel(5);
        smartRemote.TurnOff();
    }
}
```

### 🎯 執行結果

```
Sony 電視開機
Sony 電視設定頻道：10
Sony 電視關機

使用智慧型遙控器：
Samsung 電視開機
使用智慧型遙控器設定頻道：
Samsung 電視設定頻道：5
使用智慧型遙控器：
Samsung 電視關機
```

---

## ⚠️ 使用橋接模式注意事項

- 優點：降低耦合，提升系統靈活度，方便擴充。
- 缺點：初始設計較複雜，需要清楚區分抽象與實作。

---

## 🎉 結語

恭喜你又多認識了一個實用的設計模式：橋接模式（Bridge）！下一篇我們會繼續介紹更多好用的模式，敬請期待。
