using System;
using Microsoft.Maui.Controls;

namespace HabitRPG.MauiApp;

/// <summary>
/// 應用程式入口。
/// </summary>
public partial class App : Application
{
    /// <summary>
    /// 提供對服務容器的存取。
    /// </summary>
    public static IServiceProvider Services { get; private set; } = null!;

    /// <summary>
    /// 初始化 <see cref="App"/> 類別的新執行個體。
    /// </summary>
    /// <param name="serviceProvider">DI 容器。</param>
    public App(IServiceProvider serviceProvider)
    {
        InitializeComponent();
        Services = serviceProvider;
        MainPage = new NavigationPage(serviceProvider.GetRequiredService<Views.LoadingPage>());
    }
}
