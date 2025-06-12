+++
title = "中介者模式：管理複雜溝通的好幫手"
date = 2025-06-13T01:00:00+08:00
tags = ["Code", "C#", "DesignPattern"]
prev_post_slug = "0021iterator-pattern"
next_post_slug = "0023memento-pattern"
series = ["DesignPattern"]
weight = 18
+++

哈囉朋友們～今天要聊的設計模式是**中介者模式（Mediator）**，這個模式能讓你的程式輕鬆管理物件之間複雜的溝通關係。

## 🌟 中介者模式是什麼？

中介者模式透過一個中介者物件來協調其他物件之間的互動，避免物件間的直接聯繫導致的混亂。

想像你使用聊天室時，你並不直接跟每個使用者對話，而是透過聊天室作為中介，幫你發送訊息給其他使用者，這樣每個人只要與聊天室溝通即可，簡單明瞭。

---

## 🤔 什麼情況適合使用中介者模式？

以下情況適合使用中介者模式：

- 當系統內有許多物件需要彼此溝通，關係變得複雜難以管理。
- 想降低物件間的耦合度，讓系統容易維護與擴充。
- 想集中管理物件之間的溝通邏輯。

---

## 💬 C# 中介者模式範例：聊天室應用程式

我們透過「聊天室」範例來實際展示中介者模式。

### 💻 定義中介者介面

```csharp
/// <summary>
/// 中介者介面
/// </summary>
public interface IChatMediator
{
    /// <summary>
    /// 傳送訊息給其他使用者
    /// </summary>
    /// <param name="message">訊息內容</param>
    /// <param name="user">發送者</param>
    void SendMessage(string message, User user);

    /// <summary>
    /// 註冊使用者到聊天室
    /// </summary>
    /// <param name="user">新使用者</param>
    void RegisterUser(User user);
}
```

### 👥 建立具體中介者（聊天室）

```csharp
using System;
using System.Collections.Generic;

/// <summary>
/// 聊天室中介者，負責轉發訊息
/// </summary>
public class ChatMediator : IChatMediator
{
    private readonly List<User> _users = new();  // 聊天室中的使用者名單

    /// <inheritdoc />
    public void RegisterUser(User user)
    {
        _users.Add(user);
    }

    /// <inheritdoc />
    public void SendMessage(string message, User sender)
    {
        foreach (var user in _users)
        {
            if (user != sender)
            {
                user.Receive(message, sender.Name);
            }
        }
    }
}
```

### 🙋 建立使用者（參與者）

```csharp
using System;

/// <summary>
/// 聊天室使用者
/// </summary>
public class User
{
    /// <summary>
    /// 使用者名稱
    /// </summary>
    public string Name { get; }

    private readonly IChatMediator _chatMediator;  // 中介者

    public User(string name, IChatMediator chatMediator)
    {
        Name = name;
        _chatMediator = chatMediator;
        _chatMediator.RegisterUser(this);
    }

    /// <summary>
    /// 發送訊息
    /// </summary>
    /// <param name="message">要傳送的訊息</param>
    public void Send(string message)
    {
        Console.WriteLine($"{Name} 發送訊息：{message}");
        _chatMediator.SendMessage(message, this);
    }

    /// <summary>
    /// 接收訊息
    /// </summary>
    /// <param name="message">收到的訊息</param>
    /// <param name="senderName">發送者名稱</param>
    public void Receive(string message, string senderName)
    {
        Console.WriteLine($"{Name} 收到來自 {senderName} 的訊息：{message}");
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
        ChatMediator chatMediator = new ChatMediator();

        User alice = new User("Alice", chatMediator);
        User bob = new User("Bob", chatMediator);
        User charlie = new User("Charlie", chatMediator);

        alice.Send("大家好！");
        bob.Send("嗨 Alice！");
    }
}
```

### 🎯 執行結果

```
Alice 發送訊息：大家好！
Bob 收到來自 Alice 的訊息：大家好！
Charlie 收到來自 Alice 的訊息：大家好！
Bob 發送訊息：嗨 Alice！
Alice 收到來自 Bob 的訊息：嗨 Alice！
Charlie 收到來自 Bob 的訊息：嗨 Alice！
```

---

## ⚠️ 中介者模式使用注意事項

- 優點：簡化物件之間的溝通，降低耦合性，系統容易維護。
- 缺點：中介者物件可能會變得複雜，需注意設計清晰。

---

## 🎉 結語

恭喜你掌握了中介者模式（Mediator）！透過這個模式，你的程式將更好管理物件間的互動與溝通，清晰又有彈性。

持續追蹤我們的設計模式系列吧，下篇再見啦～
