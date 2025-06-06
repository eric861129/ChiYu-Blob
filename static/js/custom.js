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


  // 文章目錄反白邏輯，利用 IntersectionObserver 追蹤標題
  const tocLinks = document.querySelectorAll('.post-toc-sidebar nav#TableOfContents a');
  const headings = Array.from(tocLinks).map(link => {
    const id = decodeURIComponent(link.getAttribute('href').substring(1));
    return document.getElementById(id);
  }).filter(Boolean);

  if (headings.length > 0) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const current = document.querySelector(`.post-toc-sidebar nav#TableOfContents a[href="#${encodeURIComponent(id)}"]`);
        if (entry.isIntersecting && entry.intersectionRatio > 0) {
          tocLinks.forEach(link => link.classList.remove('active'));
          if (current) current.classList.add('active');
        }
      });
    }, { rootMargin: '0px 0px -80% 0px' });

    headings.forEach(h => observer.observe(h));
  }

  // -------- 主題切換邏輯 --------
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const getStoredTheme = () => localStorage.getItem('theme');
    const getPreferredTheme = () => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    const setTheme = theme => {
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', theme);
    };

    // 初始化主題
    const currentTheme = getStoredTheme() || getPreferredTheme();
    setTheme(currentTheme);

    // 切換按鈕點擊
    themeToggle.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    });
  }
});
