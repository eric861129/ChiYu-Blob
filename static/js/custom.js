// 頁面載入完成後執行
document.addEventListener('DOMContentLoaded', () => {
  // 取得所有程式碼區塊，加入複製按鈕與語言標籤
  document.querySelectorAll('div.highlight').forEach(block => {
    // 建立複製按鈕
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-button';
    copyButton.type = 'button';
    copyButton.ariaLabel = 'Copy code to clipboard';
    copyButton.innerText = 'Copy';

    // 點擊按鈕後將程式碼複製到剪貼簿
    copyButton.addEventListener('click', () => {
      const code = block.querySelector('code').innerText;
      navigator.clipboard.writeText(code).then(() => {
        copyButton.innerText = 'Copied!';
        setTimeout(() => {
          copyButton.innerText = 'Copy';
        }, 2000);
      }, () => {
        copyButton.innerText = 'Error';
      });
    });

    // 解析程式語言名稱，並建立標籤顯示於程式碼區塊左上角
    const languageClass = block.classList[1];
    if (languageClass && languageClass.startsWith('language-')) {
      const lang = languageClass.replace('language-', '');
      const langTag = document.createElement('div');
      langTag.className = 'code-language-tag';
      langTag.innerText = lang;
      block.appendChild(langTag);
    }

    // 將按鈕加入程式碼區塊
    block.appendChild(copyButton);
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
