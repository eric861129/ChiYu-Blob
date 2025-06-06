using Android.App;
using Android.Runtime;

namespace HabitRPG.MauiApp;

[Application]
public class MainApplication : MauiApplication
{
    protected MainApplication(IntPtr handle, JniHandleOwnership ownership) : base(handle, ownership)
    {
    }

    protected override MauiApp CreateMauiApp() => MauiProgram.CreateMauiApp();
}
