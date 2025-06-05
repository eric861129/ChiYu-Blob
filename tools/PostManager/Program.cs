using System;
using System.Globalization;
using System.IO;

namespace PostManagerTool
{
    /// <summary>
    /// 文章資料模型。
    /// </summary>
    internal class Post
    {
        /// <summary>
        /// 文章標題。
        /// </summary>
        public string Title { get; }

        /// <summary>
        /// 建立日期。
        /// </summary>
        public DateTime Date { get; }

        /// <summary>
        /// 使用指定的標題建立新文章。
        /// </summary>
        /// <param name="title">文章標題。</param>
        public Post(string title)
        {
            Title = title;
            Date = DateTime.Now;
        }
    }

    /// <summary>
    /// 文章產生器。
    /// </summary>
    internal interface IPostGenerator
    {
        /// <summary>
        /// 產生文章檔案。
        /// </summary>
        /// <param name="post">文章資料。</param>
        void Generate(Post post);
    }

    /// <summary>
    /// 以 Markdown 檔案形式產生文章。
    /// </summary>
    internal class MarkdownPostGenerator : IPostGenerator
    {
        /// <summary>
        /// 儲存文章的根目錄。
        /// </summary>
        private readonly string _contentRoot;

        /// <summary>
        /// 建立產生器並指定內容根目錄。
        /// </summary>
        /// <param name="contentRoot">內容根目錄路徑。</param>
        public MarkdownPostGenerator(string contentRoot)
        {
            _contentRoot = contentRoot;
        }

        /// <inheritdoc />
        public void Generate(Post post)
        {
            var fileName = post.Title.Replace(' ', '-').ToLowerInvariant() + ".md";
            var filePath = Path.Combine(_contentRoot, fileName);

            if (!Directory.Exists(_contentRoot))
            {
                Directory.CreateDirectory(_contentRoot);
            }

            using var writer = new StreamWriter(filePath);
            writer.WriteLine("---");
            writer.WriteLine($"title: \"{post.Title}\"");
            writer.WriteLine($"date: {post.Date.ToString("yyyy-MM-dd", CultureInfo.InvariantCulture)}");
            writer.WriteLine("---");
            writer.WriteLine();
            writer.WriteLine("請開始撰寫內容...");
        }
    }

    /// <summary>
    /// 應用程式入口點。
    /// </summary>
    internal static class Program
    {
        /// <summary>
        /// 主要執行方法。
        /// </summary>
        /// <param name="args">命令列參數。</param>
        private static void Main(string[] args)
        {
            if (args.Length < 2 || args[0] != "new")
            {
                Console.WriteLine("用法: dotnet run -- new [標題]");
                return;
            }

            var title = string.Join(' ', args, 1, args.Length - 1);
            var post = new Post(title);

            var contentRoot = Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "..", "..", "content", "posts");
            IPostGenerator generator = new MarkdownPostGenerator(contentRoot);
            generator.Generate(post);

            Console.WriteLine($"已建立文章: {title}");
        }
    }
}
