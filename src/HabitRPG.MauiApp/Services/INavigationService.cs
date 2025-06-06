using System.Threading.Tasks;
using Microsoft.Maui.Controls;

namespace HabitRPG.MauiApp.Services;

/// <summary>
/// 定義導覽相關功能的介面。
/// </summary>
public interface INavigationService
{
    /// <summary>
    /// 導航至登入畫面。
    /// </summary>
    /// <param name="currentPage">目前頁面。</param>
    Task NavigateToLoginPageAsync(Page currentPage);
}
