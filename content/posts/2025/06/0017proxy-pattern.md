+++
title = "代理模式：控制存取的守門員"
date = 2025-06-12
dates = ["2025-06-12"]
tags = ["Code", "Csharp", "DesignPattern"]
prev_post_slug = "0016flyweight-pattern"
next_post_slug = "0018chain-of-responsibility-pattern"
series = ["DesignPattern"]
weight = 17
+++

哈囉各位朋友～今天我們要介紹的是很實用且日常生活也常碰到的 **代理模式（Proxy）**！

## 🌟 代理模式是什麼？

代理模式提供一個中介物件來控制對某個目標物件的存取，藉此加入額外行為或保護原本的物件。
就像看醫生必須先掛號一樣，櫃檯人員就是代理，他負責管理你與醫生之間的互動。

---

## 🤔 什麼情況適合用代理模式？

- 需要控制物件的存取權限，例如安全管理或權限限制。
- 想延遲建立昂貴的物件實例，例如檔案或資料庫連線。
- 想在不影響原有物件的情況下，加入額外行為（例如日誌紀錄）。

---

## 🛂 C# 代理模式範例

這裡以「檔案存取權限控制」為例，示範代理模式的實作。

### 📂 定義共通介面

```csharp
/// <summary>
/// 檔案介面
/// </summary>
public interface IFile
{
    /// <summary>
    /// 顯示檔案內容
    /// </summary>
    void Display();
}
```

### 📄 建立具體物件類別

```csharp
using System;

/// <summary>
/// 真實存取檔案的類別
/// </summary>
public class RealFile : IFile
{
    private readonly string _fileName;

    public RealFile(string fileName)
    {
        _fileName = fileName;
        LoadFromDisk(fileName);
    }

    /// <summary>
    /// 顯示檔案
    /// </summary>
    public void Display()
    {
        Console.WriteLine($"顯示檔案：{_fileName}");
    }

    private void LoadFromDisk(string fileName)
    {
        Console.WriteLine($"從磁碟載入檔案：{fileName}");
    }
}
```

### 🔐 建立代理類別

```csharp
using System;

/// <summary>
/// 檔案存取代理
/// </summary>
public class ProxyFile : IFile
{
    private RealFile _realFile;
    private readonly string _fileName;
    private readonly bool _hasPermission;

    public ProxyFile(string fileName, bool hasPermission)
    {
        _fileName = fileName;
        _hasPermission = hasPermission;
    }

    /// <summary>
    /// 依權限決定是否顯示檔案
    /// </summary>
    public void Display()
    {
        if (_hasPermission)
        {
            _realFile ??= new RealFile(_fileName);
            _realFile.Display();
        }
        else
        {
            Console.WriteLine("您沒有存取此檔案的權限。");
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
        // 有權限存取
        IFile fileWithPermission = new ProxyFile("secret.docx", true);
        fileWithPermission.Display();

        Console.WriteLine();

        // 無權限存取
        IFile fileWithoutPermission = new ProxyFile("secret.docx", false);
        fileWithoutPermission.Display();
    }
}
```

### 🎯 執行結果

```
從磁碟載入檔案：secret.docx
顯示檔案：secret.docx

您沒有存取此檔案的權限。
```

---

## ⚠️ 代理模式使用注意事項

- 優點：可以有效控制物件存取並加入額外行為。
- 缺點：可能增加系統複雜度，過度使用需謹慎。

---

## 🎉 結語

恭喜你，又掌握了一個超實用的設計模式—代理模式（Proxy）！透過這個模式，我們能更安全、更有效地管理物件存取。

繼續追蹤設計模式系列吧，下篇再見囉～
