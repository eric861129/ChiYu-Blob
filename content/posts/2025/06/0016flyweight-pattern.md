+++
title = "享元模式：節省記憶體的利器"
date = 2025-06-12T19:00:00+08:00
dates = ["2025-06-12"]
tags = ["Code", "C#", "DesignPattern"]
prev_post_slug = "0015facade-pattern"
next_post_slug = "0017proxy-pattern"
series = ["DesignPattern"]
weight = 12
+++

哈囉各位朋友，今天我們要聊的是一個特別省資源的設計模式：**享元模式（Flyweight）**。

## 🌟 享元模式是什麼？

享元模式是一種可以有效節省記憶體的設計模式，透過共享相同或相似的物件，避免建立過多重複的小型物件。

舉個例子：假設你在做簡報，需要大量使用同一張圖片，與其在每張投影片裡都重新複製一次圖片，不如只保留一張原始圖片，其他投影片只需要參考這張圖片就好。這樣一來可以降低檔案大小，節省記憶體。

---

## 🤔 什麼情境適合使用享元模式？

- 系統中存在大量重複的物件。
- 物件的建立與銷毀成本過高，並且這些物件大多類似。
- 想節省記憶體資源，提升系統效能。

---

## 🌳 C# 享元模式範例

以下以遊戲中常見的「樹木」為例，示範享元模式的實作方式。

### 🌳 享元介面與實作

```csharp
using System;

/// <summary>
/// 樹木介面
/// </summary>
public interface ITree
{
    /// <summary>
    /// 顯示樹木
    /// </summary>
    /// <param name="x">位置 X 座標</param>
    /// <param name="y">位置 Y 座標</param>
    void Display(int x, int y);
}

/// <summary>
/// 具體享元類別
/// </summary>
public class Tree : ITree
{
    private readonly string _treeType;

    public Tree(string treeType)
    {
        _treeType = treeType;
        Console.WriteLine($"建立了一個 {treeType} 樹物件。");
    }

    /// <summary>
    /// 在指定位置顯示樹木
    /// </summary>
    public void Display(int x, int y)
    {
        Console.WriteLine($"在位置 ({x}, {y}) 顯示一棵{_treeType}樹。");
    }
}
```

### 🌲 享元工廠

```csharp
using System.Collections.Generic;

/// <summary>
/// 享元工廠
/// </summary>
public class TreeFactory
{
    private readonly Dictionary<string, ITree> _trees = new Dictionary<string, ITree>();

    /// <summary>
    /// 取得樹木實例，若不存在則建立並快取
    /// </summary>
    public ITree GetTree(string treeType)
    {
        if (!_trees.ContainsKey(treeType))
        {
            _trees[treeType] = new Tree(treeType);
        }
        return _trees[treeType];
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
        var treeFactory = new TreeFactory();

        // 建立多棵樹，但共用相同物件
        var oak = treeFactory.GetTree("橡樹");
        oak.Display(1, 1);
        oak.Display(2, 5);

        var maple = treeFactory.GetTree("楓樹");
        maple.Display(3, 3);
        maple.Display(4, 8);

        // 再次取得橡樹，會重複使用現有實例
        var anotherOak = treeFactory.GetTree("橡樹");
        anotherOak.Display(5, 5);
    }
}
```

### 🎯 執行結果

```
建立了一個 橡樹 樹物件。
在位置 (1, 1) 顯示一棵橡樹樹。
在位置 (2, 5) 顯示一棵橡樹樹。
建立了一個 楓樹 樹物件。
在位置 (3, 3) 顯示一棵楓樹樹。
在位置 (4, 8) 顯示一棵楓樹樹。
```

---

## ⚠️ 使用享元模式注意事項

- 優點：有效減少記憶體消耗，尤其適用於大量重複物件的場景。
- 缺點：程式碼結構相對複雜，需要謹慎管理共享物件生命週期。

---

## 🎉 結語

恭喜你，又成功掌握了享元模式（Flyweight）！學會這個模式，便能更有效率地管理資源，讓系統更輕盈高效。

持續關注我們的設計模式系列，學習更多實用又好玩的程式技巧吧！我們下篇見～
