// 初始化 Pagefind 搜尋功能
function initPagefind() {
    if (window.PagefindUI) {
        new PagefindUI({
            element: '#search',
            showSubResults: false,
            baseUrl: '/ChiYu-Blob/',
            language: 'zh-tw'
        });
    }
}

// DOM 內容載入完成後執行的主程式
document.addEventListener('DOMContentLoaded', () => {
    // --- 主題切換按鈕邏輯 ---
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const activeTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = activeTheme === 'light' ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // 通知 giscus 評論區變更主題
            const giscusFrame = document.querySelector('iframe.giscus-frame');
            if (giscusFrame) {
                giscusFrame.contentWindow.postMessage({ giscus: { setTheme: newTheme } }, 'https://giscus.app');
            }
        });
    }

    // --- 複製程式碼按鈕邏輯 ---
    document.querySelectorAll('div.highlight').forEach(block => {
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-button';
        copyButton.type = 'button';
        copyButton.innerText = 'Copy';
        copyButton.addEventListener('click', () => {
            const code = block.querySelector('code').innerText;
            navigator.clipboard.writeText(code).then(() => {
                copyButton.innerText = 'Copied!';
                setTimeout(() => { copyButton.innerText = 'Copy'; }, 2000);
            });
        });
        block.appendChild(copyButton);
    });

    // --- 目錄高亮邏輯 ---
    const tocLinks = document.querySelectorAll('.post-toc-sidebar nav#TableOfContents a');
    const headings = Array.from(tocLinks).map(link => {
        try {
            const id = decodeURIComponent(link.getAttribute('href').substring(1));
            return document.getElementById(id);
        } catch (e) {
            return null;
        }
    }).filter(Boolean);

    if (headings.length > 0) {
        const observer = new IntersectionObserver(entries => {
            let visibleHeadings = [];
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    visibleHeadings.push(entry.target);
                }
            });

            if (visibleHeadings.length > 0) {
                const topHeading = visibleHeadings.reduce((prev, curr) => {
                    return prev.getBoundingClientRect().top < curr.getBoundingClientRect().top ? prev : curr;
                });

                tocLinks.forEach(link => link.classList.remove('active'));
                const id = topHeading.getAttribute('id');
                const correspondingLink = document.querySelector(`.post-toc-sidebar nav#TableOfContents a[href="#${encodeURIComponent(id)}"]`);
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        }, { rootMargin: '-80px 0px -60% 0px' });
        headings.forEach(heading => observer.observe(heading));
    }

    // --- Giscus 評論區初始化 ---
    const giscusContainer = document.getElementById('giscus-container');
    if (giscusContainer) {
        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.setAttribute('data-repo', 'eric861129/ChiYu-Blob');
        script.setAttribute('data-repo-id', 'R_kgDOO2a_UQ');
        script.setAttribute('data-category', 'Announcements');
        script.setAttribute('data-category-id', 'DIC_kwDOO2a_Uc4CrGzL');
        script.setAttribute('data-mapping', 'pathname');
        script.setAttribute('data-strict', '0');
        script.setAttribute('data-reactions-enabled', '1');
        script.setAttribute('data-emit-metadata', '0');
        script.setAttribute('data-input-position', 'top');
        script.setAttribute('data-theme', document.documentElement.getAttribute('data-theme'));
        script.setAttribute('data-lang', 'zh-TW');
        script.setAttribute('crossorigin', 'anonymous');
        script.async = true;
        giscusContainer.appendChild(script);
    }
});
