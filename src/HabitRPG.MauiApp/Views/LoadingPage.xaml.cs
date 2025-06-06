using System.Threading.Tasks;
using Microsoft.Maui.Controls;

namespace HabitRPG.MauiApp.Views;

/// <summary>
/// 載入畫面。
/// </summary>
public partial class LoadingPage : ContentPage
{
    /// <summary>
    /// 判斷是否已完成載入。
    /// </summary>
    private bool _isLoaded;

    /// <summary>
    /// 初始化 <see cref="LoadingPage"/> 類別的新執行個體。
    /// </summary>
    public LoadingPage()
    {
        InitializeComponent();
    }

    /// <inheritdoc />
    protected override async void OnAppearing()
    {
        base.OnAppearing();
        await StartLoadingAnimation();
    }

    /// <summary>
    /// 開始播放載入動畫。
    /// </summary>
    private async Task StartLoadingAnimation()
    {
        await LoadingProgressBar.ProgressTo(1, 1500, Easing.Linear);
        LoadingProgressLabel.Text = "100%";
        _isLoaded = true;

        await PressStartLabel.FadeTo(1, 250, Easing.CubicIn);
        await PressStartLabel.ScaleTo(1.05, 100);
        await PressStartLabel.ScaleTo(1, 100);

        var animation = new Animation(v => PressStartLabel.Opacity = v, 0.3, 1.0);
        animation.Commit(this, "BlinkingAnimation", 16, 1000, Easing.Linear,
            (v, c) => PressStartLabel.Opacity = 1, () => true);
    }

    /// <summary>
    /// 點擊螢幕後的處理邏輯。
    /// </summary>
    private async void OnScreenTapped(object sender, TappedEventArgs e)
    {
        if (!_isLoaded)
        {
            return;
        }

        this.AbortAnimation("BlinkingAnimation");
        PressStartLabel.Opacity = 1;

        await PressStartLabel.ScaleTo(1.2, 100);
        await PressStartLabel.FadeTo(0, 200);

        if (Application.Current?.MainPage is NavigationPage navPage)
        {
            await navPage.PushAsync(new LoginPage());
            navPage.Navigation.RemovePage(this);
        }
    }
}
