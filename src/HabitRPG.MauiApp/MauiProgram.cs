using Microsoft.Extensions.DependencyInjection;
using Microsoft.Maui;
using Microsoft.Maui.Controls.Hosting;
using Microsoft.Maui.Hosting;
using HabitRPG.MauiApp.Services;
using HabitRPG.MauiApp.ViewModels;
using HabitRPG.MauiApp.Views;

namespace HabitRPG.MauiApp;

/// <summary>
/// MAUI 應用程式組態。
/// </summary>
public static class MauiProgram
{
    /// <summary>
    /// 建立並設定 <see cref="MauiApp"/> 執行個體。
    /// </summary>
    /// <returns>組態完成的 <see cref="MauiApp"/>。</returns>
    public static MauiApp CreateMauiApp()
    {
        var builder = MauiApp.CreateBuilder();
        builder
            .UseMauiApp<App>()
            .ConfigureFonts(fonts =>
            {
                fonts.AddFont("PressStart2P.ttf", "PressStart2P");
            });

        builder.Services.AddSingleton<INavigationService, NavigationService>();
        builder.Services.AddTransient<LoginPage>();
        builder.Services.AddTransient<LoadingPage>();
        builder.Services.AddTransient<LoadingPageViewModel>();

        return builder.Build();
    }
}
