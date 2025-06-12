+++
title = "單例模式：只要一個就夠！"
date = 2025-06-12
tags = ["Code", "C#", "DesignPattern"]
prev_post_slug = "5design-pattern-intro"
next_post_slug = "7abstract-factory-pattern"
weight = 6
+++

在上一篇文章中，我們簡單認識了什麼是「設計模式」。這次，就讓我們從最經典的「單例模式（Singleton）」開始，看看它究竟能為開發帶來什麼幫助吧！

---

## ☕ 小故事：世界上只此一家

想像你開了一間只允許存在一個分店的咖啡廳，無論客人怎麼找，都只能到這家。單例模式的精神也差不多：確保整個應用程式裡只有同一個實例存在。

## 🤔 什麼情境適合用 Singleton？

- **系統設定**：確保設定檔只有一份，避免各模組各自讀取產生混亂。
- **日誌記錄**：統一紀錄進入點，不會讓檔案四散。
- **資料庫連線**：集中管理連線、節省資源。

接下來的範例將以「系統設定」為主角，用 C# 程式碼示範 Singleton 的實作。

### 💻 Singleton 類別

```csharp
using System;

/// <summary>
/// 系統設定管理器，只允許產生一個實例
/// </summary>
public sealed class ConfigurationManager
{
    // 保留唯一實例
    private static ConfigurationManager _instance;
    // 執行緒鎖定物件，確保多執行緒環境下仍只會建立一次
    private static readonly object _lock = new object();

    /// <summary>
    /// 連線字串設定
    /// </summary>
    public string ConnectionString { get; private set; }

    // 建構子設為私有，阻止外部直接建立
    private ConfigurationManager()
    {
        Console.WriteLine("建立 ConfigurationManager 唯一實例");
        // 模擬載入設定值
        ConnectionString = "Server=myServer;Database=myDB;User Id=myUser;";
    }

    /// <summary>
    /// 取得唯一實例的存取點
    /// </summary>
    public static ConfigurationManager Instance
    {
        get
        {
            if (_instance == null)
            {
                lock (_lock)
                {
                    if (_instance == null)
                    {
                        _instance = new ConfigurationManager();
                    }
                }
            }
            return _instance;
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
        // 第一次取得實例
        ConfigurationManager config1 = ConfigurationManager.Instance;

        // 再次取得同一個實例
        ConfigurationManager config2 = ConfigurationManager.Instance;

        if (config1 == config2)
        {
            Console.WriteLine("確認過眼神，是同一個 Singleton 實例！");
            Console.WriteLine("設定資料庫連線字串為：" + config1.ConnectionString);
        }
    }
}
```

### 🎯 執行結果

```
建立 ConfigurationManager 唯一實例
確認過眼神，是同一個 Singleton 實例！
設定資料庫連線字串為：Server=myServer;Database=myDB;User Id=myUser;
```

---

## Singleton 使用上的小提醒

- 過度依賴單例物件，可能讓程式難以測試。
- 單例本質上是一種全域狀態，過多使用容易增加耦合度。

## 結語

第一個模式就先分享到這裡，希望你對 Singleton 已經有更清楚的認識。下篇文章，我們會再往下一個設計模式邁進，敬請期待！

