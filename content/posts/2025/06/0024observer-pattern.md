+++
title = "觀察者模式：即時通知的好幫手"
date = 2025-06-13T03:00:00+08:00
tags = ["Code", "C#", "DesignPattern"]
prev_post_slug = "0023memento-pattern"
series = ["DesignPattern"]
weight = 20
+++

哈囉朋友們～今天我們要聊的是**觀察者模式（Observer）**，這個模式在現實生活中非常常見，讓我們輕鬆理解並學會如何運用它！

## 🌟 觀察者模式是什麼？

觀察者模式定義了物件之間一對多的依賴關係，當一個物件的狀態發生變化時，所有依賴它的物件都能立即收到通知。

就像你在追蹤 YouTuber 的頻道一樣，當他們有新影片上傳，你就會收到通知，立刻去觀看新內容。這個頻道就像被觀察的物件（Subject），而你就像是觀察者（Observer）。

---

## 🤔 什麼時候適合使用觀察者模式？

以下情況很適合使用觀察者模式：

- 當你想要在物件的狀態改變時，自動通知其他相關物件。
- 希望實現鬆散耦合，提升系統彈性。
- 當系統的變更可能會影響多個物件時。

---

## 🔔 C# 觀察者模式範例：YouTube 頻道通知系統

這次我們以 YouTube 頻道訂閱通知為例，來實作觀察者模式。

### 📺 建立主題介面（Subject）

```csharp
using System.Collections.Generic;

/// <summary>
/// 主題介面，負責管理訂閱者
/// </summary>
public interface IChannel
{
    /// <summary>
    /// 訂閱頻道
    /// </summary>
    /// <param name="subscriber">訂閱者</param>
    void Subscribe(ISubscriber subscriber);

    /// <summary>
    /// 取消訂閱
    /// </summary>
    /// <param name="subscriber">訂閱者</param>
    void Unsubscribe(ISubscriber subscriber);

    /// <summary>
    /// 通知所有訂閱者
    /// </summary>
    /// <param name="videoTitle">影片標題</param>
    void NotifySubscribers(string videoTitle);
}
```

### 🎥 具體主題類別（頻道）

```csharp
using System;
using System.Collections.Generic;

/// <summary>
/// YouTube 頻道，負責發佈影片並通知訂閱者
/// </summary>
public class YouTubeChannel : IChannel
{
    private readonly List<ISubscriber> _subscribers = new();

    /// <summary>
    /// 頻道名稱
    /// </summary>
    public string ChannelName { get; }

    public YouTubeChannel(string name)
    {
        ChannelName = name;
    }

    /// <inheritdoc />
    public void Subscribe(ISubscriber subscriber)
    {
        _subscribers.Add(subscriber);
    }

    /// <inheritdoc />
    public void Unsubscribe(ISubscriber subscriber)
    {
        _subscribers.Remove(subscriber);
    }

    /// <inheritdoc />
    public void NotifySubscribers(string videoTitle)
    {
        Console.WriteLine($"{ChannelName} 發佈了新影片：「{videoTitle}」");
        foreach (var subscriber in _subscribers)
        {
            subscriber.Update(ChannelName, videoTitle);
        }
    }
}
```

### 👤 建立觀察者介面與具體觀察者

```csharp
/// <summary>
/// 觀察者介面
/// </summary>
public interface ISubscriber
{
    /// <summary>
    /// 收到頻道更新時觸發
    /// </summary>
    /// <param name="channelName">頻道名稱</param>
    /// <param name="videoTitle">影片標題</param>
    void Update(string channelName, string videoTitle);
}

/// <summary>
/// 具體觀察者
/// </summary>
public class Subscriber : ISubscriber
{
    /// <summary>
    /// 訂閱者名稱
    /// </summary>
    public string SubscriberName { get; }

    public Subscriber(string name)
    {
        SubscriberName = name;
    }

    /// <inheritdoc />
    public void Update(string channelName, string videoTitle)
    {
        Console.WriteLine($"{SubscriberName} 收到通知：{channelName} 上傳了新影片「{videoTitle}」");
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
        YouTubeChannel channel = new YouTubeChannel("有趣頻道");

        Subscriber alice = new Subscriber("Alice");
        Subscriber bob = new Subscriber("Bob");

        channel.Subscribe(alice);
        channel.Subscribe(bob);

        channel.NotifySubscribers("設計模式教學 - 觀察者模式篇");
    }
}
```

### 🎯 執行結果

```
有趣頻道 發佈了新影片：「設計模式教學 - 觀察者模式篇」
Alice 收到通知：有趣頻道 上傳了新影片「設計模式教學 - 觀察者模式篇」
Bob 收到通知：有趣頻道 上傳了新影片「設計模式教學 - 觀察者模式篇」
```

---

## ⚠️ 觀察者模式使用注意事項

- 優點：可有效實現鬆散耦合，系統容易擴充與維護。
- 缺點：觀察者過多時，通知效能可能降低，需注意管理。

---

## 🎉 結語

恭喜你輕鬆學會了觀察者模式（Observer）！透過這個模式，你可以讓系統更有彈性，更容易擴充。

持續追蹤我們的設計模式系列喔，下篇再見啦～
