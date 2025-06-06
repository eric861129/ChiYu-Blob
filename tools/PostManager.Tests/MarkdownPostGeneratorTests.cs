using System;
using System.Globalization;
using System.IO;
using PostManagerTool;
using Xunit;

namespace PostManager.Tests;

/// <summary>
/// MarkdownPostGenerator 測試。
/// </summary>
public class MarkdownPostGeneratorTests
{
    /// <summary>
    /// 確認產生的檔案與 Front Matter 內容正確。
    /// </summary>
    [Fact]
    public void Generate_CreateFileWithCorrectFrontMatter()
    {
        // Arrange
        var tempDir = Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString());
        var generator = new MarkdownPostGenerator(tempDir);
        var post = new Post("單元測試文章");

        // Act
        generator.Generate(post);

        // Assert
        var expectedFile = Path.Combine(tempDir, "單元測試文章".Replace(' ', '-').ToLowerInvariant() + ".md");
        Assert.True(File.Exists(expectedFile));

        var lines = File.ReadAllLines(expectedFile);
        Assert.Equal("---", lines[0]);
        Assert.Equal($"title: \"{post.Title}\"", lines[1]);
        Assert.Equal($"date: {post.Date.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture)}", lines[2]);
        Assert.Equal("draft: true", lines[3]);
        Assert.Equal("---", lines[4]);
        Assert.Equal(string.Empty, lines[5]);
        Assert.Equal("請開始撰寫內容...", lines[6]);

        Directory.Delete(tempDir, true);
    }
}
