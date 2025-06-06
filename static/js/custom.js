// 頁面載入完成後執行
document.addEventListener('DOMContentLoaded', () => {
  // 取得所有程式碼區塊並加入複製按鈕
  document.querySelectorAll('div.highlight').forEach(block => {
    // 建立按鈕元素
    const button = document.createElement('button');
    button.className = 'copy-code-button';
    button.type = 'button';
    button.innerText = 'Copy';

    // 點擊按鈕後將程式碼複製到剪貼簿
    button.addEventListener('click', () => {
      const code = block.querySelector('code').innerText;
      navigator.clipboard.writeText(code).then(() => {
        button.innerText = 'Copied!';
        setTimeout(() => {
          button.innerText = 'Copy';
        }, 2000);
      }, () => {
        button.innerText = 'Error';
      });
    });

    // 將按鈕放到程式碼區塊最前面
    block.insertBefore(button, block.firstChild);
  });

  // 深色模式切換按鈕
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    // 依使用者偏好或儲存的值設定初始主題
    const storedTheme = localStorage.getItem('theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', storedTheme);

    // 點擊後切換主題並記錄到 localStorage
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const targetTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', targetTheme);
      localStorage.setItem('theme', targetTheme);
    });
  }
});
