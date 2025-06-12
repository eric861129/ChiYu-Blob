+++
title = "組合模式：樹狀結構的好幫手"
date = 2025-06-12T16:00:00+08:00
tags = ["Code", "C#", "DesignPattern"]
prev_post_slug = "0011bridge-pattern"
series = ["設計模式"]
weight = 8
+++

哈囉大家，歡迎繼續探索設計模式之旅！今天要介紹的是一個既實用又好理解的設計模式：**組合模式（Composite）**。

## 🌟 組合模式是什麼？

組合模式讓你能將物件組織成樹狀結構，表示「整體—部分」的層次關係。像資料夾裡有資料夾、檔案又放在資料夾中，這正是組合模式的典型應用。

---

## 🤔 什麼時候適合用組合模式？

- 需要表示物件的「整體—部分」階層。
- 想要用一致的方式處理個別物件和物件群組。
- 希望簡化客戶端程式碼，不必區分個體與集合的處理邏輯。

---

## 📁 C# 組合模式範例

用「檔案系統」來示範組合模式。

### 📄 建立抽象組件介面

```csharp
/// <summary>
/// 抽象檔案系統元件
/// </summary>
public interface IFileSystemComponent
{
    /// <summary>
    /// 以縮排方式顯示結構
    /// </summary>
    void Display(int depth);
}
```

### 📁 建立樹枝構件（資料夾）

```csharp
using System;
using System.Collections.Generic;

/// <summary>
/// 資料夾
/// </summary>
public class Folder : IFileSystemComponent
{
    private string _name;
    private List<IFileSystemComponent> _components = new List<IFileSystemComponent>();

    public Folder(string name)
    {
        _name = name;
    }

    /// <summary>
    /// 新增子元件
    /// </summary>
    public void Add(IFileSystemComponent component)
    {
        _components.Add(component);
    }

    /// <summary>
    /// 移除子元件
    /// </summary>
    public void Remove(IFileSystemComponent component)
    {
        _components.Remove(component);
    }

    public void Display(int depth)
    {
        Console.WriteLine(new string('-', depth) + _name);
        foreach (var component in _components)
        {
            component.Display(depth + 2);
        }
    }
}
```

### 📄 建立樹葉構件（檔案）

```csharp
using System;

/// <summary>
/// 檔案
/// </summary>
public class File : IFileSystemComponent
{
    private string _name;

    public File(string name)
    {
        _name = name;
    }

    public void Display(int depth)
    {
        Console.WriteLine(new string('-', depth) + _name);
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
        // 根目錄
        Folder root = new Folder("根目錄");

        // 新增檔案與子資料夾
        root.Add(new File("檔案A.txt"));
        root.Add(new File("檔案B.jpg"));

        Folder subFolder = new Folder("子資料夾");
        subFolder.Add(new File("檔案C.doc"));
        root.Add(subFolder);

        // 顯示整個結構
        root.Display(1);
    }
}
```

### 🎯 執行結果

```
-根目錄
---檔案A.txt
---檔案B.jpg
---子資料夾
-----檔案C.doc
```

---

## ⚠️ 使用組合模式注意事項

- 優點：使用方式直覺，易於新增新元件。
- 缺點：結構過於龐大時可能影響效能。

---

## 🎉 結語

又輕鬆掌握了一個重要的設計模式—組合模式（Composite）！持續追蹤我們的系列，學習更多實用技巧吧！
