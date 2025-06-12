+++
title = "迭代器模式：輕鬆遍歷集合元素"
date = 2025-06-13
dates = ["2025-06-13"]
tags = ["Code", "Csharp", "DesignPattern"]
prev_post_slug = "0020interpreter-pattern"
next_post_slug = "0022mediator-pattern"
series = ["DesignPattern"]
weight = 17
+++

哈囉朋友們～今天來聊聊**迭代器模式（Iterator）**，這個設計模式能幫你輕鬆管理和操作集合中的元素。

## 🌟 什麼是迭代器模式？

迭代器模式讓你可以逐一瀏覽集合中的每個元素，而不需知道集合的內部結構。
就像你用音樂 App 播放音樂時，播放清單會自動幫你一首一首播放下一首歌曲，你不需要知道歌曲是怎麼儲存的。這就是迭代器模式的精髓啦！

---

## 🤔 什麼情況適合使用迭代器模式？

以下情況很適合使用迭代器模式：

- 當你需要循序瀏覽集合中的元素，但不想暴露集合的內部結構。
- 你希望使用相同的方式來遍歷不同類型的集合。
- 想要讓集合的操作更加直觀與易用。

---

## 🎧 C# 迭代器模式範例：音樂播放清單

我們以「音樂播放清單」為範例，讓你輕鬆理解迭代器模式的應用。

### 🎵 定義抽象迭代器介面

```csharp
/// <summary>
/// 迭代器介面
/// </summary>
public interface IIterator
{
    /// <summary>
    /// 是否還有下一首
    /// </summary>
    bool HasNext();

    /// <summary>
    /// 取得下一首歌曲
    /// </summary>
    string Next();
}
```

### 🎶 建立集合類別（播放清單）

```csharp
using System.Collections.Generic;

/// <summary>
/// 音樂播放清單
/// </summary>
public class Playlist
{
    private readonly List<string> _songs = new();  // 儲存歌曲
    /// <summary>
    /// 歌曲清單(唯讀)
    /// </summary>
    public IReadOnlyList<string> Songs => _songs;
    /// <summary>
    /// 新增歌曲
    /// </summary>
    public void AddSong(string song)
    {
        _songs.Add(song);
    }

    /// <summary>
    /// 取得播放清單的迭代器
    /// </summary>
    public IIterator GetIterator()
    {
        return new PlaylistIterator(_songs);
    }
}
```

### 🎵 建立具體迭代器

```csharp
using System.Collections.Generic;

/// <summary>
/// 播放清單迭代器
/// </summary>
public class PlaylistIterator : IIterator
{
    private readonly List<string> _songs;         // 播放清單
    private int _currentIndex = 0;                // 目前索引

    public PlaylistIterator(List<string> songs)
    {
        _songs = songs;
    }

    /// <summary>
    /// 是否還有下一首
    /// </summary>
    public bool HasNext()
    {
        return _currentIndex < _songs.Count;
    }

    /// <summary>
    /// 取得下一首歌曲並移動索引
    /// </summary>
    public string Next()
    {
        return HasNext() ? _songs[_currentIndex++] : null;
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
        var playlist = new Playlist();
        playlist.AddSong("Song A");
        playlist.AddSong("Song B");
        playlist.AddSong("Song C");

        IIterator iterator = playlist.GetIterator();

        while (iterator.HasNext())
        {
            Console.WriteLine($"正在播放：{iterator.Next()}");
        }
    }
}
```

### 🎯 執行結果

```
正在播放：Song A
正在播放：Song B
正在播放：Song C
```

---

## ⚠️ 迭代器模式使用注意事項

- 優點：讓集合的遍歷操作更簡單易用，並與內部實現解耦。
- 缺點：可能會新增額外的迭代器類別，增加系統複雜度。

---

## 🎉 結語

恭喜你輕鬆學會了迭代器模式（Iterator）！有了這個模式，就能更優雅地操作各種集合，提升程式的彈性與可維護性。

繼續追蹤我們的設計模式系列吧，下篇再見啦～

