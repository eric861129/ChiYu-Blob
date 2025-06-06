using System.ComponentModel;
using System.Runtime.CompilerServices;

namespace HabitRPG.MauiApp.ViewModels;

/// <summary>
/// 載入畫面的 ViewModel。
/// </summary>
public class LoadingPageViewModel : INotifyPropertyChanged
{
    /// <inheritdoc />
    public event PropertyChangedEventHandler? PropertyChanged;

    private bool _isLoaded;
    private double _progress;

    /// <summary>
    /// 是否已完成載入。
    /// </summary>
    public bool IsLoaded
    {
        get => _isLoaded;
        private set => SetField(ref _isLoaded, value);
    }

    /// <summary>
    /// 進度值，範圍 0~1。
    /// </summary>
    public double Progress
    {
        get => _progress;
        private set => SetField(ref _progress, value);
    }

    /// <summary>
    /// 開始模擬載入流程。
    /// </summary>
    public async Task LoadAsync()
    {
        const int steps = 10;
        for (var i = 1; i <= steps; i++)
        {
            await Task.Delay(150);
            Progress = i / (double)steps;
        }

        IsLoaded = true;
    }

    private void SetField<T>(ref T field, T value, [CallerMemberName] string? propertyName = null)
    {
        if (EqualityComparer<T>.Default.Equals(field, value))
        {
            return;
        }

        field = value;
        PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
    }
}
