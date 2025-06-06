using System;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Maui.Controls;
using HabitRPG.MauiApp.Views;

namespace HabitRPG.MauiApp.Services;

/// <summary>
/// 提供導覽功能的預設實作。
/// </summary>
public class NavigationService : INavigationService
{
    private readonly IServiceProvider _serviceProvider;

    /// <summary>
    /// 建立 <see cref="NavigationService"/> 的新執行個體。
    /// </summary>
    /// <param name="serviceProvider">DI 容器。</param>
    public NavigationService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    /// <inheritdoc />
    public async Task NavigateToLoginPageAsync(Page currentPage)
    {
        if (Application.Current?.MainPage is not NavigationPage navPage)
        {
            return;
        }

        var loginPage = _serviceProvider.GetRequiredService<LoginPage>();
        await navPage.PushAsync(loginPage);
        navPage.Navigation.RemovePage(currentPage);
    }
}
